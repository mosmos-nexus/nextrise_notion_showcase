
  /* ================================================================
     WP-MAG — S2c 돋보기(Magnifier) CONTROLLER
     자동 카메라 크롭줌 투어를 제거하고, 풀샷 위에서 커서를 따라다니는
     돋보기 렌즈로 교체. 클릭 없이 hover만으로 커서 아래 영역을 확대한다.
     Asset: homepage_with_yellow_annotation.svg (1474×1218, contain 풀샷).

     deck-stage가 transform:scale(k)로 축소돼 있어도 정확히 동작하도록:
       - offsetWidth/Left = 로컬(미스케일) px,  getBoundingClientRect = 화면 px
       - k = boundingWidth / offsetWidth 로 환산
     reduced-motion과 무관하게 동작(애니메이션이 아니라 상호작용이다).

     deck.pan.toggle은 no-op로 등록 — pan-s3b.js가 이를 origPanToggle로
     캡처하므로 등록 형태(shape)는 반드시 유지한다.
     ================================================================ */
  (function initS2cMagnifier(){
    /* 패닝 폐지 — P 키 토글은 더 이상 동작 안 함. 단, pan-s3b 위임 체인 보존 위해 등록은 유지 */
    deck.pan.toggle=function(){};

    const ZOOM=2.8;                 /* 표시 크기 대비 배율 (SVG라 벡터로 선명) */
    const LENS_W=380, LENS_H=280;   /* CSS .zoom-lens와 동일 (로컬 px) */

    let img=null, lens=null, wrap=null, bound=false;

    function getEls(){
      wrap=document.querySelector('#s2c .pan-wrap');
      img=document.getElementById('s2c-pan-img');
      lens=document.getElementById('s2c-lens');
      return !!(wrap&&img&&lens);
    }

    function ensureLensBg(){
      if(!lens.style.backgroundImage){
        lens.style.backgroundImage='url("'+img.getAttribute('src')+'")';
      }
    }

    function hideLens(){ if(lens) lens.style.opacity='0'; }

    function onMove(e){
      if(!img||!lens) return;
      const r=img.getBoundingClientRect();            /* 스케일된 화면 px */
      const ow=img.offsetWidth, oh=img.offsetHeight;  /* 로컬(미스케일) px */
      if(ow===0||oh===0){ hideLens(); return; }
      const k=r.width/ow;                             /* deck-stage 누적 스케일 */
      const cx=(e.clientX-r.left)/k;                  /* 이미지 좌상단 기준 로컬 px */
      const cy=(e.clientY-r.top)/k;
      if(cx<0||cy<0||cx>ow||cy>oh){ hideLens(); return; }
      ensureLensBg();
      lens.style.opacity='1';
      /* 렌즈를 커서 중심에 두되 이미지 경계 안으로 클램프 */
      let lx=cx-LENS_W/2, ly=cy-LENS_H/2;
      lx=Math.max(0,Math.min(Math.max(0,ow-LENS_W),lx));
      ly=Math.max(0,Math.min(Math.max(0,oh-LENS_H),ly));
      /* 렌즈 위치는 pan-wrap(=offsetParent) 기준 = 이미지 오프셋 + 이미지내 위치 */
      lens.style.left=(img.offsetLeft+lx)+'px';
      lens.style.top=(img.offsetTop+ly)+'px';
      /* 배경: 표시 크기의 ZOOM배로 키워, 렌즈가 덮은 영역이 그대로 확대돼 보이게 */
      lens.style.backgroundSize=(ow*ZOOM)+'px '+(oh*ZOOM)+'px';
      lens.style.backgroundPosition='-'+(lx*ZOOM).toFixed(1)+'px -'+(ly*ZOOM).toFixed(1)+'px';
    }

    function bind(){
      if(bound||!getEls()) return;
      img.addEventListener('mousemove',onMove);
      img.addEventListener('mouseleave',hideLens);
      bound=true;
    }

    registerHook('s2c',{
      onEnter(){ bind(); hideLens(); },
      onLeave(){ hideLens(); }
    });
  })();
