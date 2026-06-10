/* ============================================================
   SLIDE PRESENTATION CONTROLLER — v2
   WP1: Step engine · HOLD · localStorage resume · dynamic orbit-progress
   WP2: Starfield canvas · mouse parallax
   - 고정 1920×1080 스테이지 균일 스케일 (레터박스)
   - 키보드(←/→/Space/PgUp/PgDn/Home/End/P/R/F) · 휠 · 터치 스와이프
   - 섹션 진행 = Mon 궤도 인디케이터 (data-sec → 첫 슬라이드 동적 해석)
   - S0: 첫 입력에 bloom + 타이프 (registered hook)
   - S5: zoom-in 핸드오프 (registered hook) + HOLD(s5b)
   - count-up · 타이프라이터 · prefers-reduced-motion 대응
   ============================================================ */
(function(){
  'use strict';
  const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
  const slides=$$('.slide'), stage=$('#deckStage'), pager=$('#pager');
  const pnodes=$$('.pnode');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur=0, busy=false;
  const timers=new Set();
  const later=(fn,ms)=>{const t=setTimeout(()=>{timers.delete(t);fn()},ms);timers.add(t);return t};
  const clearTimers=()=>{timers.forEach(clearTimeout);timers.clear()};

  /* === STEP ENGINE === */
  /* Per-slide step index. Cleared on show(). */
  const stepMap=new Map(); /* slideIndex -> current stepIndex (1-based, 0=none) */

  /* Hook registry: keyed by slide id.
     Shape: { onEnter(slide), onLeave(slide),
               onStep(slide, stepIndex) -> boolean handled,
               onBeforeAdvance(slide) -> 'block'|'advance'|{goto:n} } */
  const hooks={};
  /* COMPOSE duplicate registrations instead of overwriting — a slide may have
     several independent behaviors (e.g. s3b: iframe manager + pan controller).
     Same-key handlers run in registration order; onBeforeAdvance keeps the
     LAST non-undefined verdict. */
  function registerHook(id, h){
    const ex=hooks[id]||(hooks[id]={});
    for(const k in h){
      const prev=ex[k], fn=h[k];
      ex[k]=prev?function(...a){ const r1=prev.apply(this,a); const r2=fn.apply(this,a);
        return r2!==undefined?r2:r1; }:fn;
    }
  }

  /* Reveal a step item on a slide (for data-steps slides) */
  function revealStep(slide, stepIdx){
    const items=slide.querySelectorAll('.step-item');
    if(stepIdx-1<items.length){
      items[stepIdx-1].classList.add('step-shown');
      return true;
    }
    return false;
  }
  function hideStepsFrom(slide, stepIdx){
    slide.querySelectorAll('.step-item').forEach((el,i)=>{
      if(i>=stepIdx) el.classList.remove('step-shown');
    });
  }

  /* —— S0 bloom hook (EN2: registered, not data-steps) —— */
  registerHook('s0',{
    onBeforeAdvance(slide){
      if(!slide.classList.contains('played')){ playCover(); return 'block'; }
      return 'advance';
    },
    onLeave(){ resetCover(); }
  });

  /* —— S5a zoom → land on s5b hook (WP7 C3: renamed s5→s5a) —— */
  /* s5b is now in the DOM immediately after s5a; zoom into it via cur+1. */
  registerHook('s5a',{
    onBeforeAdvance(slide){
      if(!slide.classList.contains('zooming') && !reduced){
        slide.classList.add('zooming');
        busy=true;
        /* WP1 A4: apply no-fade to suppress crossfade on the landing slide (s5b) */
        document.body.classList.add('no-fade');
        later(()=>{
          busy=false;
          show(cur+1);
          /* clear no-fade after the (now-suppressed) transition */
          requestAnimationFrame(()=>requestAnimationFrame(()=>{
            document.body.classList.remove('no-fade');
          }));
        },980);
        return 'block';
      }
      return 'advance';
    },
    onLeave(slide){
      /* WP7 C3: restore s5a to pre-zoom state on back-nav (s5b→s5a) */
      slide.classList.remove('zooming');
      document.body.classList.remove('no-fade');
    }
  });

  /* —— HOLD mechanism (WP1 sub-task 4) —— */
  /* Set on enter of any slide with data-hold attr; cleared on leave. */
  let holdActive=false;
  function armHold(slide){ holdActive=!!slide.dataset.hold; }

  /* === DYNAMIC ORBIT-PROGRESS (DEVIATION) ===
     data-sec on .pnode holds the section number;
     at boot we resolve the first slide DOM index for each section. */
  function buildSectionMap(){
    /* Map from section number -> first DOM index with that section */
    const map={};
    slides.forEach((s,i)=>{
      const sec=s.dataset.section;
      if(sec!==undefined && !(sec in map)) map[sec]=i;
    });
    return map;
  }
  const sectionFirstSlide=buildSectionMap();

  /* —— 스테이지 균일 스케일 —— */
  function fit(){
    const f=Math.min(innerWidth/1920,innerHeight/1080);
    const x=(innerWidth-1920*f)/2, y=(innerHeight-1080*f)/2;
    stage.style.transform=`translate(${x}px,${y}px) scale(${f})`;
  }
  fit(); addEventListener('resize',fit);

  /* —— 타이프라이터 —— */
  function typeInto(el,done){
    const txt=(el.dataset.text||'').replace(/\\n/g,'\n');
    el.textContent='';
    const caret=document.createElement('span'); caret.className='caret'; el.appendChild(caret);
    if(reduced){ caret.remove(); el.innerHTML=txt.replace(/\n/g,'<br>'); done&&done(); return; }
    let i=0;
    (function step(){
      if(i>=txt.length){ later(()=>caret.remove(),1200); done&&done(); return; }
      const ch=txt[i++];
      caret.before(ch==='\n'?document.createElement('br'):document.createTextNode(ch));
      later(step, ch==='\n'?260:62);
    })();
  }

  /* —— count-up —— */
  function runCounters(slide){
    slide.querySelectorAll('.count').forEach(el=>{
      const to=+el.dataset.to, sfx=el.dataset.suffix||'';
      if(reduced){ el.textContent=to.toLocaleString()+sfx; return; }
      later(()=>{
        const t0=performance.now(), dur=1500;
        (function tick(){
          if(!slide.classList.contains('active'))return;
          const p=Math.min((performance.now()-t0)/dur,1);
          const e=1-Math.pow(1-p,3);
          el.textContent=Math.round(to*e).toLocaleString()+sfx;
          if(p<1) requestAnimationFrame(tick);
        })();
      },600);
    });
  }

  /* —— S0 bloom 시퀀스 (첫 입력에 발화) —— */
  function playCover(){
    const s0=$('#s0'); if(s0.classList.contains('played'))return;
    s0.classList.add('played');
    later(()=>typeInto(s0.querySelector('.s0-title')), 420);
  }
  function resetCover(){
    const s0=$('#s0'); s0.classList.remove('played');
    const t=s0.querySelector('.s0-title'); t.innerHTML='<span class="caret"></span>';
  }

  /* —— S6d 태그라인 타이프 (keyed to slide id s6d — WP8 remap) —— */
  function playClosing(){
    const el=$('#s6d .type2'); if(!el)return;
    later(()=>{ typeInto(el); }, reduced?0:2100);
  }

  /* === SLIDE TRANSITION === */
  /* WP1: localStorage resume key (separate from edit key) */
  const LS_POS='nextrise2026-deck-pos';
  const LS_EDIT='nextrise2026-deck-edits';

  function show(n,instant){
    n=Math.max(0,Math.min(n,slides.length-1));
    clearTimers();
    const prev=slides[cur];
    cur=n;
    /* WP1: write position on every show() */
    try{ localStorage.setItem(LS_POS,JSON.stringify({slide:n})); }catch(e){}
    slides.forEach((s,i)=>{ s.classList.toggle('active',i===n); s.classList.toggle('visible',i===n); });
    const sl=slides[n];

    /* 떠난 슬라이드 상태 리셋 (WP1 sub-task 6: remapped to correct ids) */
    if(prev&&prev!==sl){
      /* fire onLeave hook */
      if(hooks[prev.id]&&hooks[prev.id].onLeave) hooks[prev.id].onLeave(prev);
      /* WP1 sub-task 6: reset hooks keyed by slide id */
      if(prev.id==='s0') resetCover();
      if(prev.id==='s5a'||prev.id==='s5b'){
        prev.classList.remove('zooming');
        document.body.classList.remove('no-fade');
        holdActive=false;
      }
      if(prev.id==='s6d'){ const t=prev.querySelector('.type2'); if(t)t.textContent=''; }
      prev.classList.remove('explore'); /* E1: 탐색 모드는 슬라이드 이탈 시 해제 */
      prev.querySelectorAll('.count').forEach(el=>el.textContent='0');
      /* clear step state for departing slide */
      stepMap.delete(slides.indexOf(prev));
      /* clear step-item shown state */
      prev.querySelectorAll('.step-item').forEach(el=>el.classList.remove('step-shown'));
    }

    /* 진입 훅: fire onEnter */
    if(hooks[sl.id]&&hooks[sl.id].onEnter) hooks[sl.id].onEnter(sl);

    /* WP1 sub-task 4: arm HOLD from data-hold attr (re-entrant by construction) */
    armHold(sl);

    if(sl.querySelector('.count')) runCounters(sl);
    /* WP1 sub-task 6: 마침 타이프라이터는 s6d 진입 시 */
    if(sl.id==='s6d') playClosing();

    /* 크롬 갱신 */
    pager.textContent=String(n+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
    const sec=+sl.dataset.section;
    pnodes.forEach(p=>{
      /* DEVIATION: use data-sec to look up first slide of that section */
      const psec=+p.dataset.sec;
      const firstIdx=sectionFirstSlide[psec];
      const nodeSection=(firstIdx!==undefined)?+slides[firstIdx].dataset.section:psec;
      p.classList.toggle('done',nodeSection<=sec);
      p.classList.toggle('cur',nodeSection===sec);
    });
    if(history.replaceState) history.replaceState(null,'','#'+(n+1));

    /* WP2: update starfield bloom on slide change */
    updateStarBloom(sl);
  }

  /* === STEP ENGINE: next() / prevSlide() === */
  function next(){
    if(busy)return;
    const sl=slides[cur];

    /* 1. Check slide hooks onBeforeAdvance */
    if(hooks[sl.id]&&hooks[sl.id].onBeforeAdvance){
      const result=hooks[sl.id].onBeforeAdvance(sl);
      if(result==='block') return;
      if(result&&typeof result==='object'&&'goto' in result){ show(result.goto); return; }
      /* 'advance' falls through */
    }

    /* 2. Check data-steps — advance one step before sliding */
    const totalSteps=+sl.dataset.steps||0;
    if(totalSteps>0){
      const idx=stepMap.get(cur)||0;
      /* fire per-step hook if registered */
      if(hooks[sl.id]&&hooks[sl.id].onStep){
        const handled=hooks[sl.id].onStep(sl,idx+1);
        if(handled){ stepMap.set(cur,idx+1); return; }
      }
      if(idx<totalSteps){
        revealStep(sl,idx+1);
        stepMap.set(cur,idx+1);
        return;
      }
      /* all steps consumed — fall through to slide advance */
    }

    show(cur+1);
  }

  function prevSlide(){
    if(busy)return;
    const sl=slides[cur];
    /* Back-step: if we have steps shown, hide last one first */
    const totalSteps=+sl.dataset.steps||0;
    if(totalSteps>0){
      const idx=stepMap.get(cur)||0;
      if(idx>0){
        hideStepsFrom(sl,idx-1);
        stepMap.set(cur,idx-1);
        return;
      }
    }
    show(cur-1);
  }

  /* === INPUT BINDINGS (WP1 EN1) === */
  addEventListener('keydown',e=>{
    /* Edit-mode early return — ALL new keys P/R/F are inert while editing */
    if(document.body.classList.contains('editing')){
      if(e.key==='Escape') toggleEdit(false);
      if((e.ctrlKey||e.metaKey)&&e.key==='s'){ e.preventDefault(); saveFile(); }
      return;
    }
    if((e.ctrlKey||e.metaKey)&&e.key==='s'){ e.preventDefault(); saveFile(); return; }

    /* EN1: New non-nav keys — placed AFTER edit-mode early-return, NEVER consume step/nav */
    switch(e.key){
      case 'p': case 'P':
        /* Pan pause/resume — toggles global pan flag; panning controller registers via deck.pan */
        e.preventDefault();
        if(deck.pan&&deck.pan.toggle) deck.pan.toggle();
        return; /* non-nav: return, do not fall through to nav */
      case 'r': case 'R':
        /* iframe reload embed — TODO: iframe manager registers handler here */
        e.preventDefault();
        if(deck.iframe&&deck.iframe.reload) deck.iframe.reload();
        return;
      case 'f': case 'F':
        /* force-capture — TODO: iframe manager pins capture layer */
        e.preventDefault();
        if(deck.iframe&&deck.iframe.forceCapture) deck.iframe.forceCapture();
        return;
      /* E1: 라이브 탐색 서브페이지 — data-explore 슬라이드에서 ↓ 확장, ↑ 복귀 (비내비) */
      case 'ArrowDown':{
        const sl=slides[cur];
        if(sl&&sl.dataset.explore!==undefined){ e.preventDefault(); sl.classList.add('explore'); }
        return;}
      case 'ArrowUp':{
        const sl=slides[cur];
        if(sl&&sl.classList.contains('explore')){ e.preventDefault(); sl.classList.remove('explore'); }
        return;}
    }

    /* Nav keys */
    switch(e.key){
      case 'ArrowRight': case ' ': case 'PageDown': e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'PageUp': e.preventDefault(); prevSlide(); break;
      case 'Home': e.preventDefault(); show(0); break;
      case 'End': e.preventDefault(); show(slides.length-1); break;
      case 'e': case 'E': if(!e.target.isContentEditable) toggleEdit(); break;
    }
  });

  /* WP1 sub-task 4: wheel — early-return on HOLD slides */
  let wheelLock=0;
  addEventListener('wheel',e=>{
    if(document.body.classList.contains('editing'))return;
    /* HOLD: wheel ignored entirely on hold slides */
    if(holdActive)return;
    const now=Date.now();
    if(now-wheelLock<900||Math.abs(e.deltaY)<28)return;
    wheelLock=now; e.deltaY>0?next():prevSlide();
  },{passive:true});

  /* WP1 sub-task 4: touch — early-return on HOLD slides */
  let tx=null;
  addEventListener('touchstart',e=>{tx=e.touches[0].clientX},{passive:true});
  addEventListener('touchend',e=>{
    if(tx===null)return;
    /* HOLD: touch ignored entirely on hold slides */
    if(holdActive){ tx=null; return; }
    const dx=e.changedTouches[0].clientX-tx;
    if(Math.abs(dx)>56) dx<0?next():prevSlide();
    tx=null;
  },{passive:true});

  /* orbit-progress clicks: resolve section->first-slide-index via sectionFirstSlide */
  pnodes.forEach(p=>p.addEventListener('click',()=>{
    const psec=+p.dataset.sec;
    const idx=sectionFirstSlide[psec];
    if(idx!==undefined) show(idx);
  }));

  addEventListener('hashchange',()=>{ const h=parseInt(location.hash.slice(1),10);
    if(!isNaN(h)&&h-1!==cur) show(h-1); });
