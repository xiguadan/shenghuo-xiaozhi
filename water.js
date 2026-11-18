/* Light moves across the painted pool; the deck, ladder and reading surfaces stay still. */
(()=>{
 const hero=document.querySelector('.hero'),surface=hero.querySelector('.pool-water-surface');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const syncVisibility=()=>hero.classList.toggle('water-inactive',document.hidden);
 document.addEventListener('visibilitychange',syncVisibility);syncVisibility();
 const observer=new IntersectionObserver(([entry])=>hero.classList.toggle('water-outside',!entry.isIntersecting),{threshold:0});observer.observe(hero);
 const clearRipples=()=>surface.querySelectorAll('.pool-touch-ripple').forEach(e=>e.remove());
 reduced.addEventListener('change',clearRipples);
 document.querySelector('#heroPause').addEventListener('click',clearRipples);
 hero.addEventListener('pointerdown',e=>{
  if(e.button!==0||reduced.matches||hero.classList.contains('water-paused')||e.target.closest('a,button,input,.hero-copy'))return;
  const r=surface.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
  if(x<0||y<r.height*.2||x>r.width||y>r.height)return;
  const ripple=document.createElement('i');ripple.className='pool-touch-ripple';ripple.style.left=x/r.width*100+'%';ripple.style.top=y/r.height*100+'%';surface.append(ripple);
  while(surface.querySelectorAll('.pool-touch-ripple').length>6)surface.querySelector('.pool-touch-ripple').remove();
  ripple.addEventListener('animationend',()=>ripple.remove(),{once:true});setTimeout(()=>ripple.remove(),2100);
 },{passive:true});
})();
