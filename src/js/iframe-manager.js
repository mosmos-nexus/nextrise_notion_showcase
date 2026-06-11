
  /* ================================================================
     WP4/WP5 — IFRAME MANAGER FACTORY (SD2-A)
     makeIframeManager({slideId, iframeId, src, preloadDelay})
     Instantiated for s2b (Oopy, 4500ms) and s3b (Proact0, 12000ms).
     deck.iframe.reload / forceCapture dispatch to the ACTIVE slide's manager.
     Rules:
       - capture base always rendered (never hidden)
       - NO loading="lazy" — src set lazily by manager
       - onload → no-cors fetch reachability probe → live or capture
       - 8s LOAD_TIMEOUT → capture (late onload still upgrades if not F-pinned)
       - F pins capture (userForced), R re-arms
     ================================================================ */
  function makeIframeManager({slideId, iframeId, src, preloadDelay}){
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
      iframe.classList.remove('hidden');
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

    /* Hook: ensure loading on enter; leave iframe mounted (don't destroy) */
    registerHook(slideId,{
      onEnter(){ loadIframe(); },
      onLeave(){}
    });

    /* Preload: warm the embed after boot so slide arrives already-live.
       setTimeout (not later()) — must survive slide changes.
       s3b staggered to 12s so the two embeds don't compete. */
    setTimeout(loadIframe, preloadDelay);

    /* Return reload/forceCapture interface */
    return {
      reload(){ userForced=false; reloadIframe(); },
      forceCapture(){ userForced=true; setCapture(); }
    };
  }

  /* Instantiate managers */
  const mgr_s2b=makeIframeManager({
    slideId:'s2b', iframeId:'s2b-iframe',
    src:'https://www.hon2yt2ch.kr/',
    preloadDelay:4500
  });
  const mgr_s3b=makeIframeManager({
    slideId:'s3b', iframeId:'s3b-iframe',
    src:'https://www.proact0.org/',
    preloadDelay:12000
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