
  /* ================================================================
     WP5 — S3b CAPTURE PAN CONTROLLER
     Drives capture fallback pan of homepage.png (1910×1811) top→bottom
     inside #s3b .shot when the live iframe is hidden (capture mode).
     Reuses the same pan-sequence pattern as the WP4 s2c pan controller.
     When live iframe is shown, no pan needed — iframe scrolls natively.
     P key dispatches via deck.pan.toggle; only active when s3b is active.
     ================================================================ */
  (function initS3bPanController(){
    if(reduced){
      /* reduced-motion: no auto-pan; static top view */
      return;
    }

    const SRC_W=1910, SRC_H=1811;
    const HOLD_MS=1400;
    const ZOOM_AT_HOLD=1.03;
    const PAN_SPEED=0.7; /* px/ms — slightly slower than s2c (taller image) */
    /* Approximate y-stops: top, mid sections, bottom (clamped into travel range) */
    const WAYPOINTS_SRC=[0, 905, 1200, 1811];

    let panRunning=false;
    let panPaused=false;
    let panAbort=null;

    function getPanEls(){
      /* The .shot inside s3b's browser-col */
      const shot=document.querySelector('#s3b .browser-col .shot');
      /* We pan the capture-base directly via a wrapper approach:
         dynamically inject a pan-inner wrapper if not present */
      if(!shot) return {shot:null, inner:null};
      let inner=shot.querySelector('.capture-pan-inner');
      if(!inner){
        /* wrap capture-base in pan-inner on first use */
        const cb=shot.querySelector('.capture-base');
        if(!cb) return {shot,inner:null};
        inner=document.createElement('div');
        inner.className='capture-pan-inner';
        shot.insertBefore(inner,cb);
        inner.appendChild(cb);
      }
      return {shot,inner};
    }

    function computeGeoS3b(){
      const {shot,inner}=getPanEls();
      if(!shot||!inner) return null;
      const shotRect=shot.getBoundingClientRect();
      const wrapH=shotRect.height||694;
      const wrapW=shotRect.width||880;
      const scale=wrapW/SRC_W;
      const renderH=SRC_H*scale;
      const scrollRange=Math.max(0,renderH-wrapH);
      return {scale,renderH,wrapH,scrollRange};
    }

    function srcYToTranslateS3b(srcY,geo){
      const scaledY=srcY*geo.scale;
      const raw=-(scaledY-geo.wrapH/2);
      return Math.max(-geo.scrollRange,Math.min(0,raw));
    }

    function animatePanS3b(inner,fromY,toY,duration,abortSignal){
      return new Promise(resolve=>{
        if(abortSignal&&abortSignal.aborted){resolve('aborted');return;}
        const t0=performance.now();
        function frame(now){
          if(abortSignal&&abortSignal.aborted){resolve('aborted');return;}
          const p=Math.min((now-t0)/duration,1);
          const e=p<0.5?4*p*p*p:(1-Math.pow(-2*p+2,3)/2);
          const ty=fromY+(toY-fromY)*e;
          inner.style.transition='none';
          inner.style.transform='translateY('+ty.toFixed(2)+'px)';
          if(p<1) requestAnimationFrame(frame);
          else resolve('done');
        }
        requestAnimationFrame(frame);
      });
    }

    function delayS3b(ms,sig){
      return new Promise(resolve=>{
        if(sig&&sig.aborted){resolve('aborted');return;}
        const t=setTimeout(()=>resolve('done'),ms);
        if(sig) sig.addEventListener('abort',()=>{clearTimeout(t);resolve('aborted');});
      });
    }

    async function runS3bPanSequence(){
      const {inner}=getPanEls();
      if(!inner) return;
      const geo=computeGeoS3b();
      if(!geo) return;

      /* Check if live iframe is visible — if so, skip pan (iframe scrolls natively) */
      const liveIframe=document.getElementById('s3b-iframe');
      if(liveIframe&&!liveIframe.classList.contains('hidden')){
        panRunning=false;
        return;
      }

      const abortCtrl=new AbortController();
      panAbort=abortCtrl;
      const sig=abortCtrl.signal;

      inner.style.transform='translateY(0px)';
      let r=await delayS3b(HOLD_MS*1.2,sig);
      if(r==='aborted') return;

      async function waitUnpausedS3b(){
        while(panPaused){
          const r2=await delayS3b(120,sig);
          if(r2==='aborted') return false;
        }
        return true;
      }

      let currentY=0;
      const allStops=[0,...WAYPOINTS_SRC.map(y=>srcYToTranslateS3b(y,geo)),-geo.scrollRange];
      /* DESCENDING (0 → most negative): pan travels top → bottom.
         Ascending order made stops[0] the deepest point and ended at 0 = no motion. */
      const stops=[...new Set(allStops.map(v=>Math.round(v)))].sort((a,b)=>b-a);

      for(let i=1;i<stops.length;i++){
        const targetY=stops[i];
        const dist=Math.abs(targetY-currentY);
        const dur=Math.max(600,dist/PAN_SPEED);
        if(!await waitUnpausedS3b()) return;
        if(sig.aborted) return;
        /* Re-check iframe state before each step */
        if(liveIframe&&!liveIframe.classList.contains('hidden')){ panRunning=false; return; }
        const res=await animatePanS3b(inner,currentY,targetY,dur,sig);
        if(res==='aborted') return;
        currentY=targetY;
        inner.style.transform='translateY('+currentY.toFixed(2)+'px) scale('+ZOOM_AT_HOLD+')';
        inner.style.transition='transform 0.35s var(--ease-out,cubic-bezier(.22,1,.36,1))';
        const hr=await delayS3b(HOLD_MS,sig);
        if(hr==='aborted') return;
        inner.style.transform='translateY('+currentY.toFixed(2)+'px) scale(1)';
      }
      panRunning=false;
    }

    function startS3bPan(){
      if(panAbort) panAbort.abort();
      panRunning=true;
      panPaused=false;
      runS3bPanSequence().catch(()=>{});
    }

    function stopS3bPan(){
      panRunning=false;
      if(panAbort){ panAbort.abort(); panAbort=null; }
      const {inner}=getPanEls();
      if(inner){ inner.style.transform=''; inner.style.transition=''; }
    }

    /* Hook into slide lifecycle */
    registerHook('s3b',{
      onEnter(){ startS3bPan(); },
      onLeave(){ stopS3bPan(); }
    });

    /* P key on s3b: toggle pause/resume */
    const origPanToggle=deck.pan.toggle;
    deck.pan.toggle=function(){
      const id=slides[cur]&&slides[cur].id;
      if(id==='s3b'){
        if(!panRunning){ startS3bPan(); }
        else if(panPaused){ panPaused=false; }
        else { panPaused=true; }
      } else if(origPanToggle){ origPanToggle(); }
    };
  })();