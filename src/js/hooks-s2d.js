
  /* ================================================================
     WP4 — S2d AUTO-PLAY sequential chip reveal on enter
     3 stage chips: 수집 → AI 분류 → Notion DB 적재
     Staggered 600ms apart; reduced-motion = instant (CSS handles it)
     ================================================================ */
  registerHook('s2d',{
    onEnter(slide){
      if(reduced) return; /* CSS handles instant full reveal */
      const chips=slide.querySelectorAll('.stage-chip');
      chips.forEach(c=>c.classList.remove('chip-shown'));
      chips.forEach((c,i)=>{
        later(()=>c.classList.add('chip-shown'), 700 + i*600);
      });
    },
    onLeave(slide){
      slide.querySelectorAll('.stage-chip').forEach(c=>c.classList.remove('chip-shown'));
    }
  });