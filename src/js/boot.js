  /* === BOOT === */
  try{ if(window.lucide) lucide.createIcons(); }catch(e){}
  restore();
  /* WP1 D12: hash wins; else stored position; else 0 */
  const hashVal=parseInt((location.hash||'').replace('#',''),10);
  let startSlide=0;
  if(!isNaN(hashVal)&&hashVal>=1){
    startSlide=hashVal-1;
  } else {
    try{
      const pos=JSON.parse(localStorage.getItem(LS_POS)||'null');
      if(pos&&typeof pos.slide==='number') startSlide=pos.slide;
    }catch(e){}
  }
  show(Math.max(0,Math.min(startSlide,slides.length-1)),true);
  /* 커버에 도착해 있고 reduced-motion이면 즉시 bloom */
  if(reduced&&cur===0) playCover();
})();