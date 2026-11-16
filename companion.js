/* A tiny visitor. Position lasts for this visit only. */
(()=>{
 const bird=document.createElement('button');bird.type='button';bird.className='goose-companion';bird.id='gooseCompanion';bird.setAttribute('aria-label','漂浮的小鹅，可拖动位置；方向键移动，Home 回到角落');bird.innerHTML='<span class="goose-drift"><img src="assets/goose.svg?v=20261116" alt="" draggable="false" width="120" height="145"></span><span class="goose-tooltip" aria-hidden="true">拖我去别处</span>';document.body.append(bird);
 let position={x:0,y:0},drag=null,moved=false;
 const bounds=()=>({w:document.documentElement.clientWidth,h:window.visualViewport?.height||window.innerHeight});
 function place(x,y){const b=bounds();position={x:Math.max(12,Math.min(x,b.w-bird.offsetWidth-12)),y:Math.max(12,Math.min(y,b.h-bird.offsetHeight-12))};bird.style.left=position.x+'px';bird.style.top=position.y+'px'}
 function reset(){const b=bounds();const y=b.w<=700?(document.querySelector('.site-header')?.getBoundingClientRect().height||70)+8:b.h-bird.offsetHeight-28;place(b.w-bird.offsetWidth-22,y);moved=false}
 function finish(cancel=false){if(!drag)return;const old=drag;drag=null;bird.classList.remove('is-dragging');if(cancel)place(old.x,old.y);else if(Math.hypot(position.x-old.x,position.y-old.y)>3)moved=true;if(bird.hasPointerCapture(old.id))bird.releasePointerCapture(old.id)}
 bird.addEventListener('pointerdown',e=>{if(e.button!==0||drag)return;e.preventDefault();drag={id:e.pointerId,startX:e.clientX,startY:e.clientY,x:position.x,y:position.y};bird.setPointerCapture(e.pointerId);bird.classList.add('is-dragging')});
 bird.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;place(drag.x+e.clientX-drag.startX,drag.y+e.clientY-drag.startY)});
 bird.addEventListener('pointerup',e=>{if(drag?.id===e.pointerId)finish()});
 bird.addEventListener('pointercancel',e=>{if(drag?.id===e.pointerId)finish(true)});
 bird.addEventListener('lostpointercapture',()=>finish());
 bird.addEventListener('keydown',e=>{const delta={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(delta){e.preventDefault();const step=e.shiftKey?24:12;place(position.x+delta[0]*step,position.y+delta[1]*step);moved=true}else if(e.key==='Home'){e.preventDefault();reset()}else if(e.key==='Escape')finish(true)});
 const resize=()=>{if(drag)finish(true);if(moved)place(position.x,position.y);else reset()};window.addEventListener('resize',resize);window.addEventListener('hashchange',()=>{if(!moved)reset()});window.visualViewport?.addEventListener('resize',resize);reset();
})();
