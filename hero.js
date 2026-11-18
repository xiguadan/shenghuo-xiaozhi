/* One steady question at a time: a goose delivers a note from the real handbook. */
(()=>{
 const hero=document.querySelector('.pool-hero'),scene=document.querySelector('#poolScene');
 const bird=document.querySelector('#poolGoose'),paper=document.querySelector('#poolNote');
 const opener=document.querySelector('#poolNoteOpen'),answer=document.querySelector('#poolNoteAnswer');
 const scoop=document.querySelector('#poolScoop'),again=document.querySelector('#poolAgain');
 const pause=document.querySelector('#heroPause'),status=document.querySelector('#poolStatus');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const slips=[
  ['coffee','白衣服沾了咖啡，先做什么？','先用干净纸巾轻压吸走液体，别来回擦。查看洗护标签；允许水洗时，再从污渍背面冲洗。'],
  ['mango','芒果的果核，藏在哪个方向？','观察果实较扁的方向，果核通常沿这个方向延伸。洗净擦干、放稳后，沿果核两侧下刀。'],
  ['oil','衣服沾了油，马上用水搓吗？','先在污渍下面垫纸巾，从正面轻压吸走多余油。别向外擦大，再按洗护标签处理。'],
  ['onion','洋葱切到一半，怎么不散开？','把切面朝下放稳，切丁时保留根部连接。手指弯曲、指节靠刀，最后再处理根部。'],
  ['fridge','生肉放在冰箱哪一层更合适？','密封后放在冷藏室下层，避免汁液滴到其他食物。与熟食、即食食物分开放。'],
  ['knit','毛衣洗完，能直接挂起来吗？','先看洗护标签。适合水洗的针织衫可用毛巾包裹吸水，托住衣身整理后平铺阴干，避免湿挂拉长。'],
  ['grease','灶台油乎乎，先喷清洁剂吗？','先断火，等表面冷却。用纸巾带走浮油和食物碎屑，再按台面材质处理剩下的油膜。'],
  ['drawer-zones','抽屉总会乱，先买分隔盒吗？','先按拿取动作给物品分区，量好尺寸再决定隔盒。给抽屉开关和物品增减留一点余量。'],
  ['kiwi-cut','猕猴桃熟软了，还要费劲削皮吗？','洗净擦干后，熟软的猕猴桃可以切开，用小勺沿果皮内侧取肉；偏硬的再考虑用刀。'],
  ['mud-stain','裤脚沾了厚泥，直接丢洗衣机吗？','确认衣物允许水洗，先和干净衣物分开。等泥干后轻刷掉浮土，再按面料处理残渍。'],
  ['keyboard-clean','键盘缝里有碎屑，先拿湿布吗？','先关闭设备、断开连接，再按说明干清碎屑。别直接往键盘喷水，也别擅自拆键帽。'],
  ['packing','短途出门，怎样少带又够穿？','先看天数、天气和活动，按穿着组合筛选衣物，拿掉用途重复的备选件，再安排装箱顺序。']
 ].filter(s=>notes.some(n=>n.id===s[0]));
 let current=slips[0],bag=[],open=false,paused=reduced.matches,visible=false;
 let drag=null,position={x:0,y:0},target=null,frame=0,last=0,restUntil=0,deliveryUntil=0;
 const clamp=(v,min,max)=>Math.max(min,Math.min(v,max));
 function limits(){return {x:Math.max(0,scene.clientWidth-bird.offsetWidth),y:Math.max(0,Math.min(scene.clientHeight*.25,paper.offsetTop-bird.offsetHeight+18))}}
 function place(x,y){const b=limits();position={x:clamp(x,0,b.x),y:clamp(y,0,b.y)};bird.style.left=position.x+'px';bird.style.top=position.y+'px'}
 function draw(){
  if(!bag.length){bag=slips.filter(s=>s[0]!==current[0]);for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]]}}
  if(bag.length)current=bag.pop();render();
 }
 function render(){
  const n=notes.find(n=>n.id===current[0]);paper.dataset.guide=n.id;
  document.querySelector('#poolQuestion').textContent=current[1];
  document.querySelector('#poolNoteCategory').textContent=n.category;
  document.querySelector('#poolAnswer').textContent=current[2];
  document.querySelector('#poolGuide').href=href(n.id);
  opener.setAttribute('aria-label',(open?'收起':'展开')+'纸条：'+current[1]);
 }
 function setOpen(value){
  open=value;paper.classList.toggle('is-open',open);answer.hidden=!open;
  opener.setAttribute('aria-expanded',String(open));bird.setAttribute('aria-expanded',String(open));
  opener.querySelector('.pool-note-prompt').innerHTML=open?'收起纸条 <span aria-hidden="true">↗</span>':'点开，看看第一步 <span aria-hidden="true">↗</span>';
  scoop.firstChild.textContent=open?'再捞一个小办法 ':'捞一个小办法 ';
  render();target=null;restUntil=performance.now()+2200;
  place(position.x,position.y);
 }
 function deliver(fresh=false,focus=false){
  if(fresh||open)draw();setOpen(true);
  status.textContent='小鹅捎来一条关于'+notes.find(n=>n.id===current[0]).category+'的小办法。';
  hero.classList.remove('note-delivered');void paper.offsetWidth;hero.classList.add('note-delivered');deliveryUntil=performance.now()+800;
  if(focus)opener.focus({preventScroll:true});
  requestAnimationFrame(()=>{const r=paper.getBoundingClientRect();if(r.bottom>innerHeight-12||r.top<80)paper.scrollIntoView({block:'nearest',behavior:reduced.matches?'instant':'smooth'})});
 }
 scoop.addEventListener('click',()=>deliver(open,true));
 opener.addEventListener('click',()=>{if(open)setOpen(false);else deliver(false)});
 again.addEventListener('click',()=>deliver(true,true));
 paper.addEventListener('animationend',e=>{if(e.target===paper&&e.animationName==='pond-delivery')hero.classList.remove('note-delivered')});
 function syncPause(){
  hero.classList.toggle('water-paused',paused);hero.classList.toggle('pond-paused',paused);
  pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'播放动效':'暂停动效');
  pause.querySelector('span').textContent=paused?'▷':'Ⅱ';pause.querySelector('.pool-motion-label').textContent=paused?'播放动效':'暂停动效';
  stop();start();
 }
 pause.addEventListener('click',()=>{paused=!paused;syncPause()});
 function stop(){if(frame)cancelAnimationFrame(frame);frame=0;last=0}
 function start(){if(!frame&&visible&&!paused&&!reduced.matches&&!document.hidden)frame=requestAnimationFrame(tick)}
 function tick(now){
  frame=0;const dt=last?Math.min((now-last)/1000,.05):0;last=now;
  if(!drag&&now>restUntil&&now>deliveryUntil&&!bird.matches(':focus-visible')){
   if(!target){const b=limits();target={x:b.x*(.18+Math.random()*.72),y:b.y*Math.random()}}
   const dx=target.x-position.x,dy=target.y-position.y,d=Math.hypot(dx,dy);
   if(d<1){target=null;restUntil=now+1500+Math.random()*2500}else{const step=Math.min(d,dt*9);place(position.x+dx/d*step,position.y+dy/d*step)}
  }
  start();
 }
 function finish(cancel=false){
  if(!drag)return;const saved=drag;drag=null;bird.classList.remove('is-held');
  if(cancel)place(saved.x,saved.y);
  if(bird.hasPointerCapture(saved.id))bird.releasePointerCapture(saved.id);
  target=null;restUntil=performance.now()+1800;start();
  if(!cancel&&!saved.moved)deliver(false);
 }
 bird.addEventListener('pointerdown',e=>{
  if(e.button!==0||drag)return;e.preventDefault();
  drag={id:e.pointerId,startX:e.clientX,startY:e.clientY,x:position.x,y:position.y,moved:false};
  bird.setPointerCapture(e.pointerId);bird.classList.add('is-held');target=null;
 });
 bird.addEventListener('pointermove',e=>{
  if(!drag||drag.id!==e.pointerId)return;
  if(Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)>6)drag.moved=true;
  place(drag.x+e.clientX-drag.startX,drag.y+e.clientY-drag.startY);
 });
 bird.addEventListener('pointerup',e=>{if(drag?.id===e.pointerId)finish()});
 bird.addEventListener('pointercancel',e=>{if(drag?.id===e.pointerId)finish(true)});
 bird.addEventListener('lostpointercapture',()=>finish(true));
 bird.addEventListener('click',e=>{if(e.detail===0)deliver(false)});
 bird.addEventListener('keydown',e=>{
  const d={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];
  if(d){e.preventDefault();place(position.x+d[0]*16,position.y+d[1]*16);target=null;restUntil=performance.now()+4000}
  if(e.key==='Escape')finish(true);
 });
 const resize=new ResizeObserver(()=>{if(drag)finish(true);target=null;place(scene.clientWidth*.46,scene.clientHeight*.06)});resize.observe(scene);
 const observer=new IntersectionObserver(([entry])=>{
  visible=entry.isIntersecting&&!hero.hidden;document.body.classList.toggle('hero-in-view',visible);
  if(!visible){if(drag)finish(true);stop()}else start();
 });observer.observe(hero);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){if(drag)finish(true);stop()}else start()});
 reduced.addEventListener('change',()=>{if(reduced.matches)paused=true;syncPause()});
 render();setOpen(false);syncPause();
})();
