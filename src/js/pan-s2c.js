
  /* ================================================================
     WP4 — PANNING CONTROLLER
     Drives s2c top→bottom auto-pan of homepage_with_yellow_annotation.svg
     Source SVG: 1474×1218 px. Rendered inside #s2c .pan-wrap at ~1728px wide.
     Rendered img height ≈ 1728 * (1218/1474) ≈ 1428px.
     pan-wrap visible height: slide 1080 - 164 (top offset) - 76 (bottom) = ~840px
     So total scrollable px ≈ 1428 - 840 = ~588px of translateY range.

     Annotation y-zones (source px, 1474×1218): [146, 381, 547, 762, 1002, 1184]
     Scale factor (rendered/source): 1728/1474 ≈ 1.172
     Scaled y-centers: [171, 447, 641, 893, 1175, 1388]
     translateY = -(scaledY - wrapHeight/2) clamped to [-scrollRange, 0]
     ================================================================ */
  (function initPanController(){
    if(reduced){ /* reduced-motion: no auto-pan; static top view */
      deck.pan.toggle=function(){};
      return;
    }

    const WAYPOINTS_SRC=[146,381,547,762,1002,1184]; /* source px y-centers */
    const SRC_W=1474, SRC_H=1218;
    const HOLD_MS=1400;     /* hold time at each waypoint (ms) */
    const ZOOM_AT_HOLD=1.04; /* subtle scale zoom at hold points */
    const PAN_SPEED=0.8;    /* px per ms for ease between waypoints */

    let panRunning=false;
    let panPaused=false;
    let panRaf=null;
    let panAbort=null; /* AbortController for current pan sequence */

    function getPanEls(){
      const wrap=document.getElementById('s2c-pan-inner');
      const img=document.getElementById('s2c-pan-img');
      return {wrap,img};
    }

    /* Compute rendered scale and clamp translateY */
    function computeGeometry(){
      const {wrap,img}=getPanEls();
      if(!wrap||!img) return null;
      const wrapRect=wrap.parentElement.getBoundingClientRect();
      const wrapH=wrapRect.height||840;
      const renderW=wrapRect.width||1728;
      const scale=renderW/SRC_W;
      const renderH=SRC_H*scale;
      const scrollRange=Math.max(0,renderH-wrapH);
      return {scale,renderH,wrapH,scrollRange};
    }

    /* Convert source-px y-center to translateY offset */
    function srcYToTranslate(srcY,geo){
      const scaledY=srcY*geo.scale;
      const raw=-(scaledY-geo.wrapH/2);
      return Math.max(-geo.scrollRange,Math.min(0,raw));
    }

    function applyTransform(wrap,ty,sc){
      wrap.style.transition='transform 0s linear';
      wrap.style.transform='translateY('+ty.toFixed(2)+'px) scale('+(sc||1)+')';
    }

    /* Animate from currentY to targetY over duration ms — returns Promise */
    function animatePan(wrap,fromY,toY,duration,abortSignal){
      return new Promise(resolve=>{
        if(abortSignal&&abortSignal.aborted){resolve('aborted');return;}
        const t0=performance.now();
        function frame(now){
          if(abortSignal&&abortSignal.aborted){resolve('aborted');return;}
          const p=Math.min((now-t0)/duration,1);
          /* ease-in-out cubic */
          const e=p<0.5?4*p*p*p:(1-Math.pow(-2*p+2,3)/2);
          const ty=fromY+(toY-fromY)*e;
          wrap.style.transition='none';
          wrap.style.transform='translateY('+ty.toFixed(2)+'px)';
          if(p<1) requestAnimationFrame(frame);
          else resolve('done');
        }
        requestAnimationFrame(frame);
      });
    }

    function delay(ms,abortSignal){
      return new Promise(resolve=>{
        if(abortSignal&&abortSignal.aborted){resolve('aborted');return;}
        const t=setTimeout(()=>resolve('done'),ms);
        if(abortSignal) abortSignal.addEventListener('abort',()=>{clearTimeout(t);resolve('aborted');});
      });
    }

    async function runPanSequence(){
      const {wrap,img}=getPanEls();
      if(!wrap||!img) return;
      const geo=computeGeometry();
      if(!geo) return;

      /* Wait for image to load if not already */
      if(!img.complete){
        await new Promise(r=>{img.addEventListener('load',r,{once:true});});
        /* recompute after load */
      }

      const abortCtrl=new AbortController();
      panAbort=abortCtrl;
      const sig=abortCtrl.signal;

      /* Start at top (translateY=0) with hold */
      applyTransform(wrap,0,1);
      let r=await delay(HOLD_MS*1.2/(!panPaused?1:1e9),sig);
      if(r==='aborted') return;

      /* Loop: while paused, spin-wait in small increments */
      async function waitUnpaused(){
        while(panPaused){
          const r2=await delay(120,sig);
          if(r2==='aborted') return false;
        }
        return true;
      }

      let currentY=0;
      const allStops=[0,...WAYPOINTS_SRC.map(y=>srcYToTranslate(y,geo)),-geo.scrollRange];
      /* Deduplicate and sort DESCENDING (0 → most negative): top → bottom travel.
         (was ascending — pan jumped deep then crawled back UP, ending at the top) */
      const stops=[...new Set(allStops.map(v=>Math.round(v)))].sort((a,b)=>b-a);

      for(let i=1;i<stops.length;i++){
        const targetY=stops[i];
        const dist=Math.abs(targetY-currentY);
        const dur=Math.max(600,dist/PAN_SPEED);

        if(!await waitUnpaused()) return;
        if(sig.aborted) return;

        const res=await animatePan(wrap,currentY,targetY,dur,sig);
        if(res==='aborted') return;
        currentY=targetY;

        /* zoom-hold at each stop */
        wrap.style.transform='translateY('+currentY.toFixed(2)+'px) scale('+ZOOM_AT_HOLD+')';
        wrap.style.transition='transform 0.35s var(--ease-out,cubic-bezier(.22,1,.36,1))';
        const hr=await delay(HOLD_MS,sig);
        if(hr==='aborted') return;
        wrap.style.transform='translateY('+currentY.toFixed(2)+'px) scale(1)';
      }
      /* Rest at end — no auto-restart; P key restarts */
      panRunning=false;
    }

    function startPan(){
      if(panAbort) panAbort.abort();
      panRunning=true;
      panPaused=false;
      runPanSequence().catch(()=>{});
    }

    function stopPan(){
      panRunning=false;
      if(panAbort){ panAbort.abort(); panAbort=null; }
    }

    /* Register into deck.pan so P key works */
    deck.pan.toggle=function(){
      if(!panRunning){
        /* Not running → start/restart from top */
        startPan();
      } else if(panPaused){
        panPaused=false; /* resume */
      } else {
        panPaused=true;  /* pause */
      }
    };

    /* Hook into slide lifecycle: start on enter s2c, stop on leave */
    registerHook('s2c',{
      onEnter(){ startPan(); },
      onLeave(){
        stopPan();
        const {wrap}=getPanEls();
        if(wrap){ wrap.style.transform=''; wrap.style.transition=''; }
      }
    });
  })();