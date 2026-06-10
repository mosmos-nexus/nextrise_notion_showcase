
  /* ================================================================
     WP-B D2 — S2c CAMERA CROP-ZOOM CONTROLLER  (v3 rewrite)
     Per-zone crop-zoom + DOM callout chip sequencer.
     Asset: homepage_with_yellow_annotation.svg, 1474×1218 source px.
     Rendered inside #s2c .pan-wrap (overflow:hidden clip boundary).
     .pan-inner transform: translate(tx,ty) scale(s) — origin 0 0.
     Frame coords: wrap rect (left=0, top=0).
     For a zone anchored at source (sx, sy):
       scaledX = sx * renderScale
       scaledY = sy * renderScale
       tx = -(scaledX - frameW/2)   [x: keep content centre x≈737 for centred zones]
       ty = -(scaledY - frameH/2)
     Chips live INSIDE .pan-wrap (frame space) — crisp + unclipped at zoom.
     ================================================================ */
  (function initPanController(){
    if(reduced){ /* reduced-motion: no animation; chips shown statically via CSS */
      deck.pan.toggle=function(){};
      return;
    }

    /* ── DATA ─────────────────────────────────────────────────────── */
    const SRC_W=1474, SRC_H=1218;
    const SRC_CONTENT_CX=737; /* logical centre-x of the content area in source px */

    /* 6 zoom stops — all have chips (verified chip map, authoritative) */
    const STOPS=[
      { srcY:146,  srcX:SRC_CONTENT_CX, chips:[0] },          /* S1 */
      { srcY:381,  srcX:SRC_CONTENT_CX, chips:[1,2] },         /* S2 */
      { srcY:547,  srcX:SRC_CONTENT_CX, chips:[3] },           /* S3 */
      { srcY:790,  srcX:SRC_CONTENT_CX, chips:[4,5] },         /* S4 */
      { srcY:1002, srcX:SRC_CONTENT_CX, chips:[6] },           /* S5 */
      { srcY:1178, srcX:SRC_CONTENT_CX, chips:[7,8,9] },       /* S6 */
    ];

    /* 2.0: 가시 소스 폭 = 1474/2.0 = 737px < 콘텐츠 폭(~810px)
       → 좌우 여백의 베이크된 노란 라벨이 항상 프레임 밖으로 크롭된다 */
    const ZOOM_AT_HOLD=2.0;
    const HOLD_MS=1800;       /* hold time at each stop */
    const CHIP_FADE_MS=350;   /* chip fade-in/out transition */
    const PAN_SPEED=1.0;      /* px/ms for travel between stops */

    /* ── STATE ────────────────────────────────────────────────────── */
    let panRunning=false;
    let panPaused=false;
    let panAbort=null;

    /* ── ELEMENTS ─────────────────────────────────────────────────── */
    function getPanEls(){
      const wrap=document.querySelector('#s2c .pan-wrap');
      const inner=document.getElementById('s2c-pan-inner');
      const img=document.getElementById('s2c-pan-img');
      return {wrap,inner,img};
    }

    function getChips(){
      return document.querySelectorAll('#s2c .s2c-chip');
    }

    /* ── GEOMETRY ─────────────────────────────────────────────────── */
    function computeGeometry(){
      const {wrap,inner,img}=getPanEls();
      if(!wrap||!inner||!img) return null;
      const wrapRect=wrap.getBoundingClientRect();
      const frameW=wrapRect.width||1728;
      const frameH=wrapRect.height||840;
      const renderScale=frameW/SRC_W;
      const renderH=SRC_H*renderScale;
      return {renderScale,renderH,frameW,frameH};
    }

    /* Compute transform for a given stop at a given zoom scale.
       Uses transform-origin:0 0, so we manually translate to centre the zone. */
    /* E5: 줌 홀드 중 가로 클램프를 '콘텐츠 밴드'(사이트 영역 330..1140px)로 좁혀
       좌우 여백의 베이크된 라벨 파편이 프레임에 절대 들어오지 않게 한다.
       (가시 밴드 737px < 콘텐츠 810px 이므로 항상 만족 가능) */
    const CONTENT_X0=330, CONTENT_X1=1140;
    function stopTransform(stop,scale,geo){
      const scaledX=stop.srcX*geo.renderScale;
      const scaledY=stop.srcY*geo.renderScale;
      /* centre the zone in the frame */
      let tx=geo.frameW/2-scaledX*scale;
      let ty=geo.frameH/2-scaledY*scale;
      /* horizontal clamp: keep the visible band inside the content area */
      const maxTx=-CONTENT_X0*geo.renderScale*scale;
      const minTx=geo.frameW-CONTENT_X1*geo.renderScale*scale;
      const maxTy=0;
      const minTy=geo.frameH-geo.renderScale*SRC_H*scale;
      tx=Math.max(minTx,Math.min(maxTx,tx));
      ty=Math.max(minTy,Math.min(maxTy,ty));
      return {tx,ty};
    }

    /* Transform for the full-fit overview (scale so whole image fits with contain-like letterbox) */
    function overviewTransform(geo){
      const scaleX=geo.frameW/(geo.renderScale*SRC_W);
      const scaleY=geo.frameH/(geo.renderScale*SRC_H);
      const s=Math.min(scaleX,scaleY,1); /* never upscale beyond 1 (image already fills width) */
      const renderW=geo.renderScale*SRC_W*s;
      const renderH2=geo.renderScale*SRC_H*s;
      const tx=(geo.frameW-renderW)/2;
      const ty=(geo.frameH-renderH2)/2;
      return {tx,ty,s};
    }

    /* ── TRANSFORM APPLICATION ────────────────────────────────────── */
    function applyTransformInstant(inner,tx,ty,s){
      inner.style.transition='none';
      inner.style.transform='translate('+tx.toFixed(2)+'px,'+ty.toFixed(2)+'px) scale('+s.toFixed(4)+')';
    }

    function applyTransformEased(inner,tx,ty,s,durationMs){
      inner.style.transition='transform '+durationMs+'ms cubic-bezier(.4,0,.2,1)';
      inner.style.transform='translate('+tx.toFixed(2)+'px,'+ty.toFixed(2)+'px) scale('+s.toFixed(4)+')';
    }

    /* ── ANIMATION HELPERS ────────────────────────────────────────── */
    /* Animate from current transform to target via rAF */
    function animateToStop(inner,fromTx,fromTy,fromS,toTx,toTy,toS,durationMs,abortSignal){
      return new Promise(resolve=>{
        if(abortSignal&&abortSignal.aborted){resolve('aborted');return;}
        const t0=performance.now();
        function frame(now){
          if(abortSignal&&abortSignal.aborted){resolve('aborted');return;}
          const p=Math.min((now-t0)/durationMs,1);
          /* ease-in-out cubic */
          const e=p<0.5?4*p*p*p:(1-Math.pow(-2*p+2,3)/2);
          const tx=fromTx+(toTx-fromTx)*e;
          const ty=fromTy+(toTy-fromTy)*e;
          const s=fromS+(toS-fromS)*e;
          inner.style.transition='none';
          inner.style.transform='translate('+tx.toFixed(2)+'px,'+ty.toFixed(2)+'px) scale('+s.toFixed(4)+')';
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

    async function waitUnpaused(abortSignal){
      while(panPaused){
        const r=await delay(120,abortSignal);
        if(r==='aborted') return false;
      }
      return true;
    }

    /* ── CHIP MANAGEMENT ─────────────────────────────────────────── */
    function showChips(indices){
      const chips=getChips();
      chips.forEach((c,i)=>{
        if(indices.includes(i)) c.classList.add('chip-shown');
        else c.classList.remove('chip-shown');
      });
    }

    function hideAllChips(){
      getChips().forEach(c=>c.classList.remove('chip-shown'));
    }

    /* ── MAIN SEQUENCE ────────────────────────────────────────────── */
    async function runPanSequence(){
      const {wrap,inner,img}=getPanEls();
      if(!wrap||!inner||!img) return;

      /* Wait for image load */
      if(!img.complete){
        await new Promise(r=>img.addEventListener('load',r,{once:true}));
      }

      const geo=computeGeometry();
      if(!geo) return;

      const abortCtrl=new AbortController();
      panAbort=abortCtrl;
      const sig=abortCtrl.signal;

      /* Set transform-origin once */
      inner.style.transformOrigin='0 0';

      /* Start: show top of image fully (scale=1, no translate) */
      applyTransformInstant(inner,0,0,1);
      hideAllChips();

      const r=await delay(HOLD_MS*0.7,sig);
      if(r==='aborted') return;

      /* Current transform state for interpolation */
      let curTx=0, curTy=0, curS=1;

      /* Visit each stop */
      for(let i=0;i<STOPS.length;i++){
        const stop=STOPS[i];

        if(!await waitUnpaused(sig)) return;
        if(sig.aborted) return;

        const {tx:toTx,ty:toTy}=stopTransform(stop,ZOOM_AT_HOLD,geo);
        const toS=ZOOM_AT_HOLD;

        /* Travel distance in screen pixels (approximate) */
        const dist=Math.sqrt(Math.pow(toTx-curTx,2)+Math.pow(toTy-curTy,2));
        const dur=Math.max(700,dist/PAN_SPEED);

        /* Animate to this stop */
        const res=await animateToStop(inner,curTx,curTy,curS,toTx,toTy,toS,dur,sig);
        if(res==='aborted') return;
        curTx=toTx; curTy=toTy; curS=toS;

        if(!await waitUnpaused(sig)) return;
        if(sig.aborted) return;

        /* Show chips for this stop */
        showChips(stop.chips);

        /* Hold */
        const hr=await delay(HOLD_MS,sig);
        if(hr==='aborted'){ hideAllChips(); return; }

        /* Hide chips */
        hideAllChips();
        /* brief pause after chips out */
        const gr=await delay(CHIP_FADE_MS+80,sig);
        if(gr==='aborted') return;
      }

      /* After last stop: ease back to full-fit overview */
      if(!await waitUnpaused(sig)) return;
      if(sig.aborted) return;

      const ov=overviewTransform(geo);
      const overviewDur=1000;
      const res2=await animateToStop(inner,curTx,curTy,curS,ov.tx,ov.ty,ov.s,overviewDur,sig);
      if(res2==='aborted') return;

      /* Rest — P restarts */
      panRunning=false;
    }

    /* ── START / STOP ─────────────────────────────────────────────── */
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

    /* ── deck.pan.toggle — MUST keep this registration shape
       (pan-s3b.js captures origPanToggle = deck.pan.toggle and calls it for non-s3b slides) */
    deck.pan.toggle=function(){
      if(!panRunning){
        startPan();
      } else if(panPaused){
        panPaused=false;
      } else {
        panPaused=true;
      }
    };

    /* ── Lifecycle hooks ──────────────────────────────────────────── */
    registerHook('s2c',{
      onEnter(){ startPan(); },
      onLeave(){
        stopPan();
        hideAllChips();
        const {inner}=getPanEls();
        if(inner){ inner.style.transform=''; inner.style.transition=''; inner.style.transformOrigin=''; }
      }
    });
  })();
