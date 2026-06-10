
  /* ================================================================
     WP5 — S3c AUTO-PLAY sequential path-draw + pill/ghead reveal
     7 rays from Notion hub to tool slots; sequential with stagger.
     AUTO-PLAY on enter; reduced-motion = instant full reveal (CSS).
     ================================================================ */
  (function initS3cDraw(){
    /* Sequential timing: each ray + its pill revealed one after another */
    /* ray → pill pairs (1-indexed) */
    const SEQ=[
      /* delay ms, rayId, pillId(s), gheadId (optional) */
      {delay:400,  ray:'s3c-ray1', pills:['s3c-gh1','s3c-p1']},
      {delay:700,  ray:'s3c-ray2', pills:['s3c-p2']},
      {delay:1000, ray:'s3c-ray3', pills:['s3c-p3']},
      {delay:1300, ray:'s3c-ray4', pills:['s3c-p4']},
      {delay:1700, ray:'s3c-ray5', pills:['s3c-gh2','s3c-p5']},
      {delay:2000, ray:'s3c-ray6', pills:['s3c-p6']},
      {delay:2300, ray:'s3c-ray7', pills:['s3c-p7']},
    ];

    function resetS3c(){
      SEQ.forEach(({ray,pills})=>{
        const r=document.getElementById(ray);
        if(r) r.classList.remove('path-drawn');
        pills.forEach(pid=>{
          const el=document.getElementById(pid);
          if(el){ el.style.opacity='0'; el.style.transform='translateX(18px)'; el.style.transition='none'; }
        });
      });
    }

    function revealPill(el,d){
      if(!el) return;
      setTimeout(()=>{
        el.style.transition='opacity .45s var(--ease-out,cubic-bezier(.22,1,.36,1)),transform .45s var(--ease-out,cubic-bezier(.22,1,.36,1))';
        el.style.opacity='1';
        el.style.transform='translateX(0)';
      },d);
    }

    registerHook('s3c',{
      onEnter(slide){
        if(reduced){
          /* instant full reveal */
          SEQ.forEach(({ray,pills})=>{
            const r=document.getElementById(ray);
            if(r) r.classList.add('path-drawn');
            pills.forEach(pid=>{
              const el=document.getElementById(pid);
              if(el){ el.style.opacity='1'; el.style.transform='none'; el.style.transition='none'; }
            });
          });
          return;
        }
        resetS3c();
        SEQ.forEach(({delay:d,ray,pills})=>{
          later(()=>{
            const r=document.getElementById(ray);
            if(r) r.classList.add('path-drawn');
            pills.forEach((pid,i)=>revealPill(document.getElementById(pid),i*120));
          }, d);
        });
      },
      onLeave(){ resetS3c(); }
    });
  })();
