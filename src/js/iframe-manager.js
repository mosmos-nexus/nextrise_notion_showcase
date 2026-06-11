
  /* ================================================================
     WP4/WP5 — IFRAME MANAGER FACTORY (SD2-A, E1-fix capture-first)
     makeIframeManager({slideId, iframeId, src})
     Instantiated for s2b (Oopy) and s3b (Proact0).
     deck.iframe.reload / forceCapture / goLive / standby dispatch to the
     ACTIVE slide's manager.
     Rules:
       - capture base always rendered (never hidden)
       - NO loading="lazy" — src set lazily by manager
       - E1-fix: NO boot preload, NO auto-load on slide enter — the live
         embed loads ONLY on explicit explore entry (↓ / hint click).
         Rationale: an auto-shown cross-origin iframe steals keyboard focus
         (nav keys die) and its background JS causes visible flicker.
       - setLive reveals the iframe only while the slide is in explore mode
       - onload → no-cors fetch reachability probe → live or capture
       - 8s LOAD_TIMEOUT → capture (late onload still upgrades if not F-pinned)
       - standby (↑ / hint click / slide leave) hides AND unloads the embed
       - F pins capture (userForced), R re-arms
     ================================================================ */
  function makeIframeManager({slideId, iframeId, src}){
    const LOAD_TIMEOUT=8000;
    let iframeState='idle'; /* idle | loading | live | capture */
    let userForced=false;
    let loadTimer=null;

    function getEls(){
      const iframe=document.getElementById(iframeId);
      const capture=iframe&&iframe.closest('.shot')&&iframe.closest('.shot').querySelector('.capture-base');
      return {iframe,capture};
    }

    function setLive(){
      iframeState='live';
      const {iframe}=getEls();
      if(!iframe) return;
      /* E1-fix: reveal only while exploring — if the presenter already left
         explore mode (or the slide), keep the loaded iframe hidden. */
      const slide=document.getElementById(slideId);
      if(slide&&slide.classList.contains('explore')) iframe.classList.remove('hidden');
    }

    function setCapture(){
      iframeState='capture';
      const {iframe}=getEls();
      if(!iframe) return;
      iframe.classList.add('hidden');
      if(loadTimer){ clearTimeout(loadTimer); loadTimer=null; }
    }

    function loadIframe(){
      if(iframeState==='live'||iframeState==='loading') return;
      const {iframe}=getEls();
      if(!iframe) return;
      iframeState='loading';
      iframe.onload=()=>{
        if(userForced) return;
        /* aborted/blocked navs also fire load (error page / about:blank,
           contentDocument indistinguishable cross-origin). Decide via no-cors
           fetch reachability probe: resolves → live; rejects → capture. */
        const ac=('AbortController' in window)?new AbortController():null;
        const guard=setTimeout(()=>{ ac&&ac.abort(); },3000);
        fetch(src,{mode:'no-cors',cache:'no-store',signal:ac&&ac.signal})
          .then(()=>{
            clearTimeout(guard);
            if(userForced) return;
            if(iframeState==='loading'||iframeState==='capture'){
              if(loadTimer){ clearTimeout(loadTimer); loadTimer=null; }
              setLive();
            }
          })
          .catch(()=>{ clearTimeout(guard); if(!userForced) setCapture(); });
      };
      iframe.onerror=()=>{ if(iframeState==='loading') setCapture(); };
      iframe.src=src;
      loadTimer=setTimeout(()=>{ if(iframeState==='loading') setCapture(); }, LOAD_TIMEOUT);
    }

    function reloadIframe(){
      const {iframe}=getEls();
      if(!iframe) return;
      iframeState='idle';
      iframe.classList.add('hidden');
      iframe.src='';
      if(loadTimer){ clearTimeout(loadTimer); loadTimer=null; }
      loadIframe();
    }

    /* E1-fix: goLive — explicit presenter action (↓ / hint click).
       Already-loaded iframe is just revealed; otherwise start the load
       (capture base keeps showing underneath until the probe passes). */
    function goLive(){
      userForced=false;
      if(iframeState==='live'){ setLive(); return; }
      loadIframe();
    }

    /* E1-fix: standby — hide the live layer AND unload the embed so its
       background JS fully stops (about:blank). Capture base remains. */
    function standby(){
      if(loadTimer){ clearTimeout(loadTimer); loadTimer=null; }
      iframeState='idle';
      const {iframe}=getEls();
      if(!iframe) return;
      iframe.classList.add('hidden');
      if(iframe.src) iframe.src='about:blank';
    }

    /* Hook: E1-fix — no auto-load on enter (capture is the default face);
       leaving the slide always unloads the embed. */
    registerHook(slideId,{
      onEnter(){},
      onLeave(){ standby(); }
    });

    /* Return presenter-action interface */
    return {
      reload(){ userForced=false; reloadIframe(); },
      forceCapture(){ userForced=true; setCapture(); },
      goLive, standby
    };
  }

  /* Instantiate managers */
  const mgr_s2b=makeIframeManager({
    slideId:'s2b', iframeId:'s2b-iframe',
    src:'https://www.hon2yt2ch.kr/'
  });
  const mgr_s3b=makeIframeManager({
    slideId:'s3b', iframeId:'s3b-iframe',
    src:'https://www.proact0.org/'
  });

  /* deck.iframe.reload / forceCapture — dispatch to ACTIVE slide's manager */
  deck.iframe.reload=function(){
    const id=slides[cur]&&slides[cur].id;
    if(id==='s2b') mgr_s2b.reload();
    else if(id==='s3b') mgr_s3b.reload();
  };
  deck.iframe.forceCapture=function(){
    const id=slides[cur]&&slides[cur].id;
    if(id==='s2b') mgr_s2b.forceCapture();
    else if(id==='s3b') mgr_s3b.forceCapture();
  };
  /* E1-fix: explore entry/exit dispatch (engine ↓/↑ + hint click) */
  deck.iframe.goLive=function(){
    const id=slides[cur]&&slides[cur].id;
    if(id==='s2b') mgr_s2b.goLive();
    else if(id==='s3b') mgr_s3b.goLive();
  };
  deck.iframe.standby=function(){
    const id=slides[cur]&&slides[cur].id;
    if(id==='s2b') mgr_s2b.standby();
    else if(id==='s3b') mgr_s3b.standby();
  };