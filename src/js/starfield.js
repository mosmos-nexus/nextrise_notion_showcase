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

      /* Apply parallax to midground .bg glows/blk via CSS vars on deck-stage */
      stage.style.setProperty('--par-x',parX.toFixed(2)+'px');
      stage.style.setProperty('--par-y',parY.toFixed(2)+'px');

      ctx.clearRect(0,0,W,H);

      /* Only draw stars when bloom > 0.05 */
      if(bloomCur>0.05){
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
      /* WP2: mouse micro-parallax on midground elements */
      @media (prefers-reduced-motion: no-preference){
        #deckStage .bg .glow,
        #deckStage .bg .blk {
          transform: translate(var(--par-x,0px), var(--par-y,0px));
          transition: transform 0.1s linear;
          will-change: transform;
        }
      }
    `;
    document.head.appendChild(style);
  })();
