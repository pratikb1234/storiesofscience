const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('dist/index.html','utf8');
const globalIds=new Map(),roots=[];
function matches(el,s){if(s.startsWith('#'))return el.id===s.slice(1);const m=s.match(/^\[([^\]=]+)(?:="([^\"]+)")?\]$/);if(m)return m[1] in el.attrs&&(m[2]===undefined||el.attrs[m[1]]===m[2]);if(s.startsWith('.'))return(el.attrs.class||'').split(' ').includes(s.slice(1));return el.tagName.toLowerCase()===s;}
function parse(text){return [...text.matchAll(/<([a-zA-Z][\w-]*)\b([^>]*)>/g)].map(m=>{const attrs={};for(const a of m[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g))attrs[a[1]]=a[2]||'';return new El(m[1],attrs);});}
class El{
 constructor(tag='div',attrs={}){this.tagName=tag;this.attrs=attrs;this.id=attrs.id;this.dataset={};for(const [k,v]of Object.entries(attrs))if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,x)=>x.toUpperCase())]=v;this.value=attrs.value||'';this.children=[];this.isConnected=true;this.classList={toggle(){},add(){},remove(){}};if(this.id)globalIds.set(this.id,this);}
 set innerHTML(s){this.markup=s;this.children=parse(s);if(this.tagName==='select'&&!this.value)this.value=this.children.find(c=>c.tagName==='option')?.attrs.value||'All';}
 get innerHTML(){return this.markup||'';}
 querySelectorAll(s){return this.children.filter(e=>matches(e,s));}querySelector(s){return this.querySelectorAll(s)[0]||null;}
 setAttribute(k,v){this.attrs[k]=v;}addEventListener(k,f){this['on'+k]=f;}scrollIntoView(){}focus(){}showModal(){this.open=true;}close(){this.open=false;}
}
const staticEls=parse(html);const document={body:new El('body'),querySelector(s){if(s.startsWith('#'))return globalIds.get(s.slice(1))||null;return staticEls.find(e=>matches(e,s))||null;},querySelectorAll(s){return [...staticEls,...staticEls.flatMap(e=>e.children)].filter(e=>matches(e,s));}};
for(const [id,v] of [['field','All'],['era','all'],['relation','all']])globalIds.get(id).value=v;
const ctx=vm.createContext({document,history:{replaceState(){}},location:{hash:''},window:{addEventListener(){}},innerWidth:1200,console});
const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);for(const f of scripts)vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),ctx,{filename:f});
function run(s){return vm.runInContext(s,ctx);}
run(`for(const set of [people,discoveries]){if(new Set(set.map(x=>x.id)).size!==set.length)throw Error('Duplicate IDs');for(const n of set){if(!Number.isFinite(n.year)||!sources[n.source])throw Error('Bad record '+n.id)}}
for(const [links,map] of [[discoveryEdges,dMap],[peopleEdges,pMap]])for(const [a,b,type,text,source] of links)if(!map.has(a)||!map.has(b)||!type||!text||!sources[source])throw Error('Bad edge '+a+' '+b);
for(const d of discoveries)for(const id of d.people)if(!pMap.has(id))throw Error('Bad person '+id);
for(const p of people)for(const id of p.contributions)if(!dMap.has(id))throw Error('Bad contribution '+id);
for(const s of stories)for(const id of s.ids)if(!dMap.has(id))throw Error('Bad route '+id);
for(const s of narratives){for(const id of s.people)if(!pMap.has(id))throw Error('Bad narrative person '+id);for(const id of s.discoveries)if(!dMap.has(id))throw Error('Bad narrative discovery '+id);for(const key of s.sources)if(!sources[key])throw Error('Bad narrative source '+key);}
for(const s of Object.values(sources))if(!s[1].startsWith('https://'))throw Error('Non HTTPS source');`);
const get=id=>globalIds.get(id);
assert(!get('atlas-stats'));
assert(get('map').innerHTML.includes('overview-network'));
assert(get('map').innerHTML.includes('visible-name'));
for(let i=0;i<5;i++)get('zoom-in').onclick();assert(run('zoom')>3);assert(get('map').innerHTML.includes('font-size:'));
get('fit-map').onclick();assert(run('zoom')===.85);assert(get('map').scrollLeft===0);
get('network-depth').onclick();assert(run("networkView==='focus' && widerNetwork"));
get('network-depth').onclick();assert(run('!widerNetwork'));
get('network-depth').onclick();assert(run("networkView==='all'"));
const modes=staticEls.filter(e=>e.dataset.mode);
modes[1].onclick();assert(get('count').textContent.includes(run('people.length')+' scientists'));
get('search').value='faraday';get('search').oninput();assert(run("filtered().some(n=>n.id==='faraday') && filtered().length<10"));
get('search').value='no-such-scientist';get('search').oninput();assert(get('map').innerHTML.includes('No matches'));
get('reset').onclick();get('relation').value='Mentorship';get('relation').onchange();assert(run('filtered().length')>25);
get('reset').onclick();modes[2].onclick();assert(get('map').innerHTML.includes('timeline'));
get('era').value='ancient';get('era').onchange();assert(run('filtered().every(n=>n.year<500)'));assert(run('filtered().length')>5);
get('reset').onclick();get('field').value='Genetics';get('field').onchange();assert(run('filtered().length')>20);
get('reset').onclick();modes[0].onclick();const before=get('catalogue').children.filter(e=>e.dataset.node).length;get('load-more').onclick();assert(get('catalogue').children.filter(e=>e.dataset.node).length>before);
run(`for(const m of ['discoveries','people']){clearFilters();mode=m;for(const n of nodes()){selected=n.id;render();}}`);
run(`for(const s of narratives){openStory(s.id);if(!document.querySelector('#reader-content').innerHTML.includes('Read more'))throw Error('Missing deep reading '+s.id);}`);assert(get('story-reader').open);get('close-reader').onclick();assert(!get('story-reader').open);
get('story-search').value='Ramanujan';get('story-search').oninput();assert(get('narrative-cards').innerHTML.includes('letter'));get('story-search').value='no-match';get('story-search').oninput();assert(get('narrative-cards').innerHTML.includes('No stories match'));
run(`journey=stories[0];step=0;mode='discoveries';selected=journey.ids[0];clearFilters();render()`);get('next').onclick();assert(run('step')===1);get('prev').onclick();assert(run('step')===0);get('end').onclick();assert(run('journey')===null);
run(`location.hash='#node=p/bernal';readHash()`);assert(run('mode')==='people');assert(run('selected')==='bernal');
run(`console.log(JSON.stringify({milestones:discoveries.length,scientists:people.length,relationships:discoveryEdges.length+peopleEdges.length,subjects:new Set(discoveries.map(n=>n.field)).size,narratives:narratives.length,routes:stories.length,years:[Math.min(...discoveries.map(n=>n.year)),Math.max(...discoveries.map(n=>n.year))]}))`);
console.log('PASS: dataset integrity, every node and story rendering, modes, search, empty results, era/subject/relationship filters, pagination, reading dialog, route navigation and deep links. DOM logic mock only; no visual browser validation.');
