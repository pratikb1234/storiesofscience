/* Canvas constellation. No external runtime or CDN dependency. */
'use strict';
window.ScienceConstellation=class {
 constructor(host){
  this.host=host;this.cache=new Map();this.images=new Map();this.pointers=new Map();this.camera={x:0,y:0,k:1};this.target={...this.camera};this.reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;this.visible=true;
  this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(host);
  this.observer=new IntersectionObserver(entries=>{this.visible=entries[0].isIntersecting;if(this.visible)this.wake()});this.observer.observe(host);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)this.wake()});
 }
 mount(options){
  this.options=options;const {list,links,selected,focus,wider,mode}=options;
  const key=mode+':'+focus+':'+wider+':'+(focus?selected:'')+':'+list.map(n=>n.id).join(',')+':'+links.map(e=>e.slice(0,3).join('/')).join('|');
  this.selected=selected;this.hover=null;this.edgeHover=null;
  if(!this.canvas?.isConnected){
   this.host.innerHTML='<canvas class="constellation-canvas" tabindex="0" role="img" aria-label="Interactive science constellation. Use arrow keys to pan, plus and minus to zoom, and the connection buttons below to explore."></canvas><div class="constellation-intro"><span>THE LIVING ATLAS</span><strong>Everything connects.</strong><p>Find the people. Follow the ideas.</p></div><div class="constellation-tooltip" hidden></div><div class="constellation-selection" aria-live="polite"></div><div class="constellation-help">Drag to explore · Pinch or use zoom controls<span>Names reveal as you move closer</span></div>';
   this.canvas=this.host.querySelector('canvas');this.ctx=this.canvas.getContext('2d');this.tip=this.host.querySelector('.constellation-tooltip');this.card=this.host.querySelector('.constellation-selection');this.bind();
  }
  if(this.key!==key){
   this.key=key;let data=this.cache.get(key);
   if(!data){data=this.layout(list,links,focus,wider,selected);if(this.cache.size>16)this.cache.clear();this.cache.set(key,data)}
   this.ns=data.ns.map(n=>({...n}));this.byId=new Map(this.ns.map(n=>[n.id,n]));this.ls=links.filter(e=>this.byId.has(e[0])&&this.byId.has(e[1]));this.groups=data.groups;
   this.fit(true);
  }
  this.neighbours=new Set([selected,...this.ls.filter(e=>e[0]===selected||e[1]===selected).flatMap(e=>e.slice(0,2))]);
  this.resize();this.selection();this.wake();
 }
 layout(list,links,focus,wider,selected){
  const degree=new Map(list.map(n=>[n.id,0]));for(const e of links){degree.set(e[0],degree.get(e[0])+1);degree.set(e[1],degree.get(e[1])+1)}
  let show=list,groups=[];
  if(focus){
   const first=new Set([selected,...links.filter(e=>e[0]===selected||e[1]===selected).flatMap(e=>e.slice(0,2))]);const ids=new Set(first);
   if(wider)for(const e of links)if(first.has(e[0])||first.has(e[1])){ids.add(e[0]);ids.add(e[1])}
   show=list.filter(n=>ids.has(n.id));
   const rest=show.filter(n=>n.id!==selected).sort((a,b)=>Number(first.has(b.id))-Number(first.has(a.id))||b.year-a.year);
   const ns=rest.map((n,i)=>{const ring=Math.floor(i/12),count=Math.min(12,rest.length-ring*12),angle=-Math.PI/2+(i%12)*Math.PI*2/count+ring*.18,r=220+ring*180;return {...n,x:Math.cos(angle)*r,y:Math.sin(angle)*r,degree:degree.get(n.id),direct:first.has(n.id)}});
   const centre=show.find(n=>n.id===selected);if(centre)ns.push({...centre,x:0,y:0,degree:degree.get(selected),direct:true});return {ns,groups};
  }
  const fields=[...new Set(list.map(n=>n.field))].sort((a,b)=>list.filter(n=>n.field===b).length-list.filter(n=>n.field===a).length);
  // Allocate space by population rather than squeezing every subject into equal boxes.
  let cursor=0;const total=fields.reduce((s,f)=>s+Math.sqrt(list.filter(n=>n.field===f).length),0);
  fields.forEach((field,i)=>{const members=list.filter(n=>n.field===field),weight=Math.sqrt(members.length),angle=(cursor+weight/2)/total*Math.PI*2-Math.PI/2;cursor+=weight;const radius=fields.length===1?0:480;groups.push({field,x:Math.cos(angle)*radius,y:Math.sin(angle)*radius,weight,count:members.length})});
  const ns=[];for(const g of groups){const members=list.filter(n=>n.field===g.field).sort((a,b)=>degree.get(b.id)-degree.get(a.id));members.forEach((n,i)=>{const a=i*2.399963,r=32*Math.sqrt(i);ns.push({...n,x:g.x+Math.cos(a)*r,y:g.y+Math.sin(a)*r,ax:g.x,ay:g.y,vx:0,vy:0,degree:degree.get(n.id)})})}
  const byId=new Map(ns.map(n=>[n.id,n]));
  // Short bounded collision simulation produces stable, repeatable neighbourhoods.
  for(let t=0;t<75;t++){
   for(let i=0;i<ns.length;i++)for(let j=i+1;j<ns.length;j++){const a=ns[i],b=ns[j],dx=b.x-a.x,dy=b.y-a.y,d2=dx*dx+dy*dy+.1;if(d2<6400){const d=Math.sqrt(d2),f=(80-d)/d*.07;a.vx-=dx*f;a.vy-=dy*f;b.vx+=dx*f;b.vy+=dy*f}}
   for(const e of links){const a=byId.get(e[0]),b=byId.get(e[1]);if(!a||!b)continue;const dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1,f=(d-140)*.0009;a.vx+=dx/d*f;a.vy+=dy/d*f;b.vx-=dx/d*f;b.vy-=dy/d*f}
   for(const n of ns){n.vx+=(n.ax-n.x)*.025;n.vy+=(n.ay-n.y)*.025;n.vx*=.65;n.vy*=.65;n.x+=n.vx;n.y+=n.vy}
  }
  return {ns,groups};
 }
 resize(){if(!this.canvas)return;const w=this.host.clientWidth,h=this.host.clientHeight;if(!w||!h)return;const ratio=Math.min(devicePixelRatio||1,2);this.w=w;this.h=h;this.canvas.width=w*ratio;this.canvas.height=h*ratio;this.ctx.setTransform(ratio,0,0,ratio,0,0);if(!this.sized){this.sized=true;this.fit(true)}this.wake()}
 fit(immediate=false){if(!this.ns?.length)return;const xs=this.ns.map(n=>n.x),ys=this.ns.map(n=>n.y),minX=Math.min(...xs)-100,maxX=Math.max(...xs)+100,minY=Math.min(...ys)-100,maxY=Math.max(...ys)+100;const w=this.host.clientWidth||900,h=this.host.clientHeight||640;this.target={x:-(minX+maxX)/2,y:-(minY+maxY)/2,k:Math.min((w-70)/(maxX-minX),(h-(this.options?.focus?230:310))/(maxY-minY),1.6)};this.target.y-=55/this.target.k;this.baseK=this.target.k;if(immediate)this.camera={...this.target};this.wake()}
 zoom(factor,x=this.w/2,y=this.h/2){const c=this.target,k=Math.max(.12,Math.min(4,c.k*factor)),wx=(x-this.w/2)/c.k-c.x,wy=(y-this.h/2)/c.k-c.y;c.x=(x-this.w/2)/k-wx;c.y=(y-this.h/2)/k-wy;c.k=k;this.wake()}
 screen(n){return {x:this.w/2+(n.x+this.camera.x)*this.camera.k,y:this.h/2+(n.y+this.camera.y)*this.camera.k}}
 point(e){const r=this.canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
 hit(p){for(const item of this.labelHits||[]){const b=item.box;if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h)return this.byId.get(item.id)}let best=null,min=20;for(const n of this.ns||[]){const s=this.screen(n),d=Math.hypot(p.x-s.x,p.y-s.y);if(d<min){best=n;min=d}}return best}
 bind(){
  const c=this.canvas;
  c.addEventListener('pointerdown',e=>{const p=this.point(e);c.setPointerCapture(e.pointerId);this.pointers.set(e.pointerId,p);this.gesture={start:p,last:p,node:this.hit(p),moved:false};this.hideTip();if(this.pointers.size===2){const [a,b]=[...this.pointers.values()];this.pinch=Math.hypot(a.x-b.x,a.y-b.y);this.gesture.moved=true}c.classList.add('dragging')});
  c.addEventListener('pointermove',e=>{const p=this.point(e);if(this.pointers.has(e.pointerId)){
   const old=this.pointers.get(e.pointerId);this.pointers.set(e.pointerId,p);if(this.pointers.size===2){const [a,b]=[...this.pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y);this.zoom(distance/(this.pinch||distance),(a.x+b.x)/2,(a.y+b.y)/2);this.pinch=distance;this.gesture.moved=true}
   else{const g=this.gesture;if(Math.hypot(p.x-g.start.x,p.y-g.start.y)>5)g.moved=true;if(g.moved){this.target.x+=(p.x-old.x)/this.target.k;this.target.y+=(p.y-old.y)/this.target.k;this.camera={...this.target};this.wake()}}
  }else{const n=this.hit(p);this.hover=n?.id||null;c.style.cursor=n?'pointer':'grab';if(n)this.tooltip(n,p);else this.hideTip();this.wake()}});
  const finish=e=>{const g=this.gesture;this.pointers.delete(e.pointerId);if(e.type==='pointerup'&&g&&!g.moved&&g.node)this.options.onSelect(g.node.id);if(!this.pointers.size){this.gesture=null;this.pinch=null;c.classList.remove('dragging')}};c.addEventListener('pointerup',finish);c.addEventListener('pointercancel',finish);c.addEventListener('lostpointercapture',()=>{this.pointers.clear();this.gesture=null;c.classList.remove('dragging')});
  c.addEventListener('pointerleave',()=>{this.hover=null;this.hideTip();this.wake()});
  c.addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey||document.querySelector('.atlas.is-expanded')){e.preventDefault();const p=this.point(e);this.zoom(Math.exp(-e.deltaY*.003),p.x,p.y)}},{passive:false});
  c.addEventListener('dblclick',e=>{const n=this.hit(this.point(e));if(n)this.options.onFocus(n.id);else this.zoom(1.5,...Object.values(this.point(e)))});
  c.addEventListener('keydown',e=>{const delta=80/this.target.k;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','0','Enter'].includes(e.key)){e.preventDefault();if(e.key==='ArrowLeft')this.target.x+=delta;if(e.key==='ArrowRight')this.target.x-=delta;if(e.key==='ArrowUp')this.target.y+=delta;if(e.key==='ArrowDown')this.target.y-=delta;if(e.key==='+'||e.key==='=')this.zoom(1.35);if(e.key==='-')this.zoom(1/1.35);if(e.key==='0')this.fit();if(e.key==='Enter')this.options.onFocus(this.selected);this.wake()}});
 }
 tooltip(n,p){this.tip.hidden=false;this.tip.innerHTML=`<strong>${this.options.escape(n.title)}</strong><span>${this.options.escape(n.field)} · ${this.options.date(n)}</span><small>Tap to follow the connections</small>`;this.tip.style.left=Math.max(8,Math.min(p.x+16,this.w-250))+'px';this.tip.style.top=Math.max(8,Math.min(p.y+16,this.h-100))+'px'}
 hideTip(){if(this.tip)this.tip.hidden=true}
 selection(){const n=this.byId.get(this.selected);if(!n)return;const o=this.options,related=this.ls.filter(e=>e[0]===n.id||e[1]===n.id),seen=new Set();const picks=related.filter(e=>{const id=e[0]===n.id?e[1]:e[0];if(seen.has(id))return false;seen.add(id);return true}).slice(0,3);this.card.innerHTML=`<div class="constellation-current"><span>${o.focus?'FOLLOWING THIS THREAD':'YOUR STARTING POINT'} · ${o.escape(n.field)}</span><strong>${o.escape(n.title)}</strong><button type="button" data-focus>${o.focus?'See the whole atlas':'Follow this thread'}</button></div><div class="constellation-links">${picks.map(e=>{const id=e[0]===n.id?e[1]:e[0];return `<button type="button" data-follow="${o.escape(id)}"><small>${o.escape(e[2])}</small>${o.escape(this.byId.get(id).title)}</button>`}).join('')||'<span>No connections in these filters. Try another selection.</span>'}</div>`;this.card.querySelector('[data-focus]').onclick=()=>o.onFocus(n.id);this.card.querySelectorAll('[data-follow]').forEach(b=>b.onclick=()=>o.onSelect(b.dataset.follow));this.host.querySelector('.constellation-intro').hidden=o.focus;
 }
 wake(){if(this.frame||!this.canvas?.isConnected||!this.visible||document.hidden)return;this.frame=requestAnimationFrame(t=>{this.frame=null;this.draw(t)})}
 draw(t){if(!this.canvas?.isConnected||!this.visible||document.hidden)return;const c=this.ctx,cam=this.camera,target=this.target;let moving=false;for(const key of ['x','y','k']){const diff=target[key]-cam[key];if(Math.abs(diff)>.001){cam[key]+=diff*(this.reduced?1:.17);moving=true}else cam[key]=target[key]}
  c.clearRect(0,0,this.w,this.h);const gradient=c.createRadialGradient(this.w*.48,this.h*.44,20,this.w*.48,this.h*.44,this.w*.7);gradient.addColorStop(0,'#15312f');gradient.addColorStop(1,'#081916');c.fillStyle=gradient;c.fillRect(0,0,this.w,this.h);
  // A quiet coordinate field anchors spatial movement.
  c.fillStyle='#91b6a21c';for(let i=0;i<130;i++){const x=((i*137.508+cam.x*cam.k*.12)%this.w+this.w)%this.w,y=((i*97.31+cam.y*cam.k*.12)%this.h+this.h)%this.h;c.beginPath();c.arc(x,y,i%7===0?1.2:.6,0,Math.PI*2);c.fill()}
  const active=this.hover||this.selected,near=new Set([active,...this.ls.filter(e=>e[0]===active||e[1]===active).flatMap(e=>e.slice(0,2))]);
  const points=new Map(this.ns.map(n=>[n.id,this.screen(n)]));const direct=this.ls.filter(e=>e[0]===active||e[1]===active);
  const strokeEdge=(e,isActive)=>{const a=points.get(e[0]),b=points.get(e[1]),dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1,context=['Context','Background','Shared milestone','Connected ideas'].includes(e[2]),bend=Math.min(45,len*.12),mx=(a.x+b.x)/2-dy/len*bend,my=(a.y+b.y)/2+dx/len*bend;c.beginPath();c.moveTo(a.x,a.y);c.quadraticCurveTo(mx,my,b.x,b.y);c.lineWidth=isActive?1.7:.65;c.strokeStyle=isActive?(context?'#91b8a88a':'#e5bf7be0'):'#79988c27';c.setLineDash(context?[2,5]:e[2]==='Mentorship'?[7,4]:[]);c.stroke();c.setLineDash([]);
   if(isActive&&!this.options.symmetric(e)){const u=.82,px=(1-u)**2*a.x+2*(1-u)*u*mx+u*u*b.x,py=(1-u)**2*a.y+2*(1-u)*u*my+u*u*b.y,angle=Math.atan2((1-u)*(my-a.y)+u*(b.y-my),(1-u)*(mx-a.x)+u*(b.x-mx));c.beginPath();c.moveTo(px,py);c.lineTo(px-6*Math.cos(angle-.45),py-6*Math.sin(angle-.45));c.lineTo(px-6*Math.cos(angle+.45),py-6*Math.sin(angle+.45));c.closePath();c.fillStyle='#e5bf7b';c.fill()}
   if(isActive&&!context&&!this.reduced){const u=(t/3800+this.ls.indexOf(e)*.173)%1,px=(1-u)**2*a.x+2*(1-u)*u*mx+u*u*b.x,py=(1-u)**2*a.y+2*(1-u)*u*my+u*u*b.y;c.beginPath();c.arc(px,py,2.2,0,Math.PI*2);c.fillStyle='#f6dcaa';c.fill()}
  };
  for(const e of this.ls)if(e[0]!==active&&e[1]!==active)strokeEdge(e,false);for(const e of direct)strokeEdge(e,true);
  const subjectBoxes=[];
  if(!this.options.focus){c.font='9px Arial';c.textAlign='center';for(const g of this.groups){const p=this.screen(g),length=Math.hypot(g.x,g.y)||1,x=p.x+g.x/length*28,y=p.y+g.y/length*28-20*cam.k,text=g.field.toUpperCase(),width=c.measureText(text).width,b={x:x-width/2,y:y-11,w:width,h:14};if(subjectBoxes.some(a=>b.x<a.x+a.w+7&&b.x+b.w+7>a.x&&b.y<a.y+a.h+5&&b.y+b.h+5>a.y))continue;subjectBoxes.push(b);c.fillStyle='#8eac9b';c.fillText(text,x,y)}}
  const ranked=[...this.ns].sort((a,b)=>Number(b.id===active)-Number(a.id===active)||Number(near.has(b.id))-Number(near.has(a.id))||b.degree-a.degree),boxes=[...subjectBoxes];this.labelHits=[];
  for(const n of this.ns){const p=points.get(n.id);if(p.x<-40||p.y<-40||p.x>this.w+40||p.y>this.h+40)continue;const chosen=n.id===active,isNear=near.has(n.id),r=chosen?12:isNear?6:Math.min(5.5,2.5+Math.sqrt(n.degree)*.4);if(chosen){const halo=c.createRadialGradient(p.x,p.y,r,p.x,p.y,42);halo.addColorStop(0,'#e9bf7355');halo.addColorStop(1,'#e9bf7300');c.fillStyle=halo;c.fillRect(p.x-42,p.y-42,84,84);c.strokeStyle='#e9bf7366';c.lineWidth=1;c.beginPath();c.arc(p.x,p.y,20,0,Math.PI*2);c.stroke()}
   c.beginPath();c.arc(p.x,p.y,r,0,Math.PI*2);c.fillStyle=chosen?'#f4d6a0':isNear?'#b6ddd0':this.options.colors[n.field]||'#90b8a8';c.globalAlpha=isNear?1:.75;c.fill();c.globalAlpha=1;c.strokeStyle='#071914';c.lineWidth=1.5;c.stroke();
   const key=this.options.visual(n);if(key&&(chosen||isNear&&cam.k>.8)){let img=this.images.get(key);if(!img){img=new Image();img.onload=()=>this.wake();img.src=this.options.asset(key);this.images.set(key,img)}if(img.complete&&img.naturalWidth){const rr=chosen?13:9;c.save();c.beginPath();c.arc(p.x,p.y,rr,0,Math.PI*2);c.clip();const side=Math.min(img.naturalWidth,img.naturalHeight);c.drawImage(img,(img.naturalWidth-side)/2,(img.naturalHeight-side)*.2,side,side,p.x-rr,p.y-rr,rr*2,rr*2);c.restore();c.beginPath();c.arc(p.x,p.y,rr,0,Math.PI*2);c.strokeStyle='#e9bf73';c.stroke()}}
  }
  if(this.options.focus){c.font='9px Arial';c.textAlign='center';const relationshipBoxes=[];for(const e of direct){const a=points.get(e[0]),b=points.get(e[1]),dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1,bend=Math.min(45,len*.12),x=(a.x+b.x)/2-dy/len*bend/2,y=(a.y+b.y)/2+dx/len*bend/2,width=c.measureText(e[2]).width+12,box={x:x-width/2,y:y-8,w:width,h:16};if(len<100||y<30||y>this.h-175||relationshipBoxes.some(b=>box.x<b.x+b.w+6&&box.x+box.w+6>b.x&&box.y<b.y+b.h+5&&box.y+box.h+5>b.y))continue;relationshipBoxes.push(box);c.fillStyle='#10291fed';c.beginPath();c.roundRect(box.x,box.y,width,16,3);c.fill();c.fillStyle='#cbb583';c.fillText(e[2],x,y+3)}}
  for(let i=0;i<ranked.length;i++){const n=ranked[i],p=points.get(n.id),chosen=n.id===active,isNear=near.has(n.id);if(!isNear&&i>Math.max(22,cam.k*60))continue;const font=chosen?15:isNear?12:11;c.font=`${chosen?'600':'400'} ${font}px Arial`;let text=n.title;if(text.length>43)text=text.slice(0,40)+'…';const width=c.measureText(text).width+14,x=p.x+15,y=p.y-9,box={x,y:y-13,w:width,h:22};if(x<5||x+width>this.w-5||y<(this.options.focus?25:110)||y>this.h-170)continue;if(!chosen&&boxes.some(b=>box.x<b.x+b.w+6&&box.x+box.w+6>b.x&&box.y<b.y+b.h+4&&box.y+box.h+4>b.y))continue;boxes.push(box);c.fillStyle=chosen?'#28463d':'#0b201dd9';c.beginPath();c.roundRect(box.x-4,box.y,width,22,4);c.fill();c.fillStyle=chosen?'#f5d7a5':isNear?'#edf4ef':'#bed0c4';c.textAlign='left';c.fillText(text,x+2,y+2);this.labelHits.push({box,id:n.id})}
  if(moving||(!this.reduced&&direct.some(e=>!['Context','Background','Shared milestone','Connected ideas'].includes(e[2]))))this.wake();
 }
};
