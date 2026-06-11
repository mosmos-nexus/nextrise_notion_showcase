  /* === WP2: STARFIELD CANVAS + MOUSE PARALLAX === */
  (function initStarfield(){
    if(reduced) return; /* fully disabled under reduced-motion */
    const canvas=$('#starfield');
    if(!canvas) return;
    const ctx=canvas.getContext('2d');
    const W=1920, H=1080;
    canvas.width=W; canvas.height=H;

    /* Star colors from design system */
    const COLORS=['#9CBDE9','#B79CF1','#F7F8F9','#9CBDE9','#F7F8F9'];

    /* Max 140 stars at dpr<=1.5, scale for dpr */
    const dpr=Math.min(devicePixelRatio||1, 1.5);
    const MAX_STARS=Math.round(140*Math.min(dpr,1));

    function mkStar(){
      return {
        x:Math.random()*W, y:Math.random()*H,
        r:0.5+Math.random()*1.0, /* radius 0.5–1.5 (so dia 1–3px visually) */
        vx:(Math.random()-.5)*0.12,
        vy:(Math.random()-.5)*0.08,
        twinkle:Math.random()*Math.PI*2,
        twinkleSpeed:0.02+Math.random()*0.03,
        color:COLORS[Math.floor(Math.random()*COLORS.length)]
      };
    }

    const stars=Array.from({length:MAX_STARS},mkStar);

    /* Current bloom value (0–1) tweened toward target */
    let bloomCur=0, bloomTarget=0;

    function updateStarBloomInternal(val){
      bloomTarget=Math.max(0,Math.min(1,val));
    }

    /* Read --bloom from active slide; called by show() */
    function readBloom(slide){
      if(!slide) return 0;
      const v=parseFloat(getComputedStyle(slide).getPropertyValue('--bloom'))||0;
      return Math.max(0,Math.min(1,v));
    }

    /* Expose to outer scope */
    window._starfieldSetBloom=function(slide){ updateStarBloomInternal(readBloom(slide)); };

    /* Mouse parallax state */
    let mouseX=W/2, mouseY=H/2, parX=0, parY=0;
    let lastParX='', lastParY=''; /* M-fix: 마지막 기록값 — 동일값 setProperty 스킵용 */
    let wasDrawn=false; /* B3-fix: 직전 프레임에 별을 그렸는지 — 불필요한 clearRect 스킵 */
    const PAR_MAX=10; /* max ±10px */
    addEventListener('mousemove',e=>{
      /* Convert to stage space via inverse of fit() transform */
      const f=Math.min(innerWidth/W,innerHeight/H);
      const ox=(innerWidth-W*f)/2, oy=(innerHeight-H*f)/2;
      mouseX=(e.clientX-ox)/f;
      mouseY=(e.clientY-oy)/f;
    });

    let rafRunning=false;
    function drawFrame(){
      if(document.hidden){ rafRunning=false; return; }

      /* Tween bloom */
      bloomCur+=(bloomTarget-bloomCur)*0.04;

      /* Tween parallax offset (lerp toward target) */
      const targetParX=((mouseX/W)-.5)*2*PAR_MAX;
      const targetParY=((mouseY/H)-.5)*2*PAR_MAX;
      parX+=(targetParX-parX)*0.06;
      parY+=(targetParY-parY)*0.06;

      /* Apply parallax to midground .bg glows/blk via CSS vars on deck-stage.
         M-fix: 0.1px 양자화 + 동일값 스킵 — 매 프레임 커스텀 프로퍼티를 갱신하면
         var() 소비 서브트리 전체가 스타일 무효화되어 큰 DOM에서 프레임을 깎는다.
         마우스가 멈추면 ~1초 내 수렴해 기록이 완전히 멈춘다. */
      const pxs=parX.toFixed(1)+'px', pys=parY.toFixed(1)+'px';
      if(pxs!==lastParX||pys!==lastParY){
        stage.style.setProperty('--par-x',pxs);
        stage.style.setProperty('--par-y',pys);
        lastParX=pxs; lastParY=pys;
      }

      /* B3-fix: 아무것도 그리지 않는 프레임의 전체 캔버스 clear 스킵 */
      if(bloomCur>0.05) ctx.clearRect(0,0,W,H);
      else if(wasDrawn){ ctx.clearRect(0,0,W,H); wasDrawn=false; }

      /* Only draw stars when bloom > 0.05 */
      if(bloomCur>0.05){
        wasDrawn=true;
        const globalAlpha=bloomCur*0.85;
        for(let i=0;i<stars.length;i++){
          const s=stars[i];
          /* drift */
          s.x+=s.vx; s.y+=s.vy;
          if(s.x<-2) s.x=W+2;
          if(s.x>W+2) s.x=-2;
          if(s.y<-2) s.y=H+2;
          if(s.y>H+2) s.y=-2;
          /* twinkle */
          s.twinkle+=s.twinkleSpeed;
          const tw=0.55+0.45*Math.sin(s.twinkle);
          const a=globalAlpha*tw;
          ctx.globalAlpha=a;
          ctx.fillStyle=s.color;
          ctx.beginPath();
          /* Parallax offset on stars: slight drift based on position for depth */
          const px=s.x+parX*0.5;
          const py=s.y+parY*0.5;
          ctx.arc(px,py,s.r,0,Math.PI*2);
          ctx.fill();
        }
        ctx.globalAlpha=1;
      }

      rafRunning=true;
      requestAnimationFrame(drawFrame);
    }

    /* Pause on hidden tab, resume on visible */
    document.addEventListener('visibilitychange',()=>{
      if(!document.hidden && !rafRunning){ rafRunning=true; requestAnimationFrame(drawFrame); }
    });

    /* Start loop */
    rafRunning=true;
    requestAnimationFrame(drawFrame);
  })();

  /* Called by show() to update starfield bloom for the current slide */
  function updateStarBloom(slide){
    if(window._starfieldSetBloom) window._starfieldSetBloom(slide);
  }

  /* Apply parallax to .bg .glow/.blk elements via CSS var on deck-stage */
  /* The CSS vars --par-x/--par-y are set in the rAF loop above */
  /* Add translate to .bg elements via a global rule injected once */
  (function addParallaxCSS(){
    if(reduced) return;
    const style=document.createElement('style');
    style.textContent=`
      /* WP2: mouse micro-parallax on midground elements
         M-fix: html.force-motion(?motion=on)에서도 동일 적용 — reduce 환경 발표자 오버라이드
         B2-fix: 'transition: transform .1s' 제거 — transition 숏핸드가 base.css의
         .bg .glow/.blk bloom 페이드(opacity/filter .9s)를 캐스케이드로 통째 대체해
         페이드가 즉시 스냅됐고, 매 프레임 var 갱신마다 transition이 재시작되며
         거대한 blur 레이어에 churn을 만들었다. rAF lerp가 이미 움직임을 부드럽게 한다. */
      @media (prefers-reduced-motion: no-preference){
        #deckStage .bg .glow,
        #deckStage .bg .blk {
          transform: translate(var(--par-x,0px), var(--par-y,0px));
          will-change: transform;
        }
      }
      html.force-motion #deckStage .bg .glow,
      html.force-motion #deckStage .bg .blk {
        transform: translate(var(--par-x,0px), var(--par-y,0px));
        will-change: transform;
      }
    `;
    document.head.appendChild(style);
  })();
