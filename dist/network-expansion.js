Object.assign(sources,{
faradayMotor:['Royal Institution · Faraday’s rotation apparatus','https://www.rigb.org/explore-science/explore/collection/michael-faradays-electric-magnetic-rotation-apparatus-motor'],
faradayLetters:['Royal Institution · Faraday’s correspondence','https://www.rigb.org/explore-science/explore/collection/michael-faradays-correspondence']
});
peopleEdges.push(['ampere','faraday','Influence','Faraday investigated the work of Ampère and Ørsted while developing electromagnetic rotation in 1821.','faradayMotor']);
for(const id of ['kelvin','tyndall'])if(people.some(p=>p.id===id))peopleEdges.push(['faraday',id,'Correspondence','The Royal Institution’s collected correspondence records exchanges between these scientists. This establishes correspondence without assuming agreement on every scientific question.','faradayLetters']);
/* Connections inferred from sourced milestone associations, not personal relationships. */
const personalConnectionCount=peopleEdges.length;
const mappedPersonPairs=new Set(peopleEdges.map(e=>[e[0],e[1]].sort().join('|')));
function addMilestoneConnection(a,b,type,text,source){if(a===b)return;const key=[a,b].sort().join('|');if(mappedPersonPairs.has(key))return;mappedPersonPairs.add(key);peopleEdges.push([a,b,type,text,source]);}
for(const d of discoveries)for(let i=0;i<d.people.length;i++)for(let j=i+1;j<d.people.length;j++)addMilestoneConnection(d.people[i],d.people[j],'Shared milestone',`Both are associated in this atlas with “${d.title}”. This is a shared milestone, not by itself evidence of collaboration or a personal meeting.`,d.source);
for(const e of discoveryEdges){const a=discoveries.find(d=>d.id===e[0]),b=discoveries.find(d=>d.id===e[1]);if(!a||!b)continue;for(const p of a.people)for(const q of b.people)addMilestoneConnection(p,q,'Connected ideas',`Their mapped work connects “${a.title}” with “${b.title}”. ${e[3]} This link follows the ideas; it does not establish a personal relationship.`,e[4]);}
