import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const context=vm.createContext({});
vm.runInContext(['data','expanded','connections','narratives','atlas-additions','network-expansion','media','more-stories'].map(f=>fs.readFileSync(`dist/${f}.js`,'utf8')).join('\n')+'\nglobalThis.atlas={discoveries,people,discoveryEdges,peopleEdges,stories,narratives,sources,visualAssets,personVisuals,discoveryVisuals,storyVisuals}',context);
const a=context.atlas;
for(const [name,ns,es] of [['discoveries',a.discoveries,a.discoveryEdges],['people',a.people,a.peopleEdges]]){
 const ids=new Set(ns.map(n=>n.id));assert.equal(ids.size,ns.length,`Duplicate ${name} IDs`);
 for(const n of ns){assert(n.title&&n.text&&n.field&&Number.isFinite(n.year),`Incomplete ${name}: ${n.id}`);assert(a.sources[n.source],`Missing source: ${n.id}`)}
 for(const e of es){assert(ids.has(e[0])&&ids.has(e[1]),`Dangling edge ${e}`);assert(a.sources[e[4]],`No edge source ${e}`);assert(e[0]!==e[1],`Self edge ${e}`)}
}
const ds=new Set(a.discoveries.map(d=>d.id)),ps=new Set(a.people.map(p=>p.id));
for(const d of a.discoveries)for(const p of d.people)assert(ps.has(p),`${d.id} missing person ${p}`);
for(const s of a.stories)for(const id of s.ids)assert(ds.has(id),`Broken journey ${s.title}: ${id}`);
for(const s of a.narratives){assert(s.chapters.length>=3);for(const id of s.people)assert(ps.has(id),`Story person ${id}`);for(const id of s.discoveries)assert(ds.has(id),`Story discovery ${id}`);for(const id of s.sources)assert(a.sources[id],`Story source ${id}`)}
for(const [key,source] of Object.entries(a.sources)){assert(source&&source[0]&&source[1],`Malformed source ${key}`);assert.equal(new URL(source[1]).protocol,'https:',`Non HTTPS source ${key}`)}
const html=fs.readFileSync('dist/index.html','utf8');for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(!match[1].includes('://'))assert(fs.existsSync('dist/'+match[1]),`Missing asset ${match[1]}`)}
assert(html.includes('narratives.js')&&html.includes('expanded.js'));
console.log(JSON.stringify({milestones:a.discoveries.length,scientists:a.people.length,relationships:a.discoveryEdges.length+a.peopleEdges.length,stories:a.narratives.length,journeys:a.stories.length,earliest:Math.min(...a.discoveries.map(d=>d.year)),latest:Math.max(...a.discoveries.map(d=>d.year)),result:'All dataset, relationship, source and asset checks passed.'}));

for(const [id,v] of Object.entries(a.visualAssets)){assert(fs.statSync('dist/'+v.src).size>1000,`Missing image ${id}`);assert(v.alt&&v.caption&&v.credit&&v.license&&v.source,`Missing credit ${id}`)}
assert(a.narratives[0].id==='sarabhai-detour');
console.log('Image files, credits and featured story validated.');

for(const s of a.narratives){const v=a.storyVisuals[s.id];assert(v,`Missing story image ${s.id}`);assert(v.hero||v.portraits?.length);for(const key of [v.hero,...(v.portraits||[]).map(p=>p.key),...Object.values(v.chapters||{})].filter(Boolean))assert(a.visualAssets[key],`Unknown story image ${key}`)}
console.log('All stories have validated illustrations.');
