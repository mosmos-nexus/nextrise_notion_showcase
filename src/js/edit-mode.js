  /* === INLINE EDIT MODE === */
  /* WP1: LS key for edits is separate from position key */
  const LS=LS_EDIT;
  const toggleBtn=$('#editToggle'), hotzone=$('#editHotzone');
  let hideT=null;
  function toggleEdit(force){
    const on=force!==undefined?force:!document.body.classList.contains('editing');
    document.body.classList.toggle('editing',on);
    toggleBtn.classList.toggle('active',on);
    slides.forEach(s=>s.contentEditable=on?'true':'false');
    if(!on){ persist(); toggleBtn.classList.remove('show'); }
  }
  function persist(){
    try{
      const data={};
      slides.forEach(s=>data[s.id]=s.innerHTML);
      localStorage.setItem(LS,JSON.stringify(data));
    }catch(e){}
  }
  function restore(){
    try{
      const d=JSON.parse(localStorage.getItem(LS)||'null'); if(!d)return;
      slides.forEach(s=>{ if(d[s.id]) s.innerHTML=d[s.id]; });
    }catch(e){}
  }
  function saveFile(){
    persist();
    const blob=new Blob(['<!DOCTYPE html>\n'+document.documentElement.outerHTML],{type:'text/html'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob); a.download='nextrise2026-mosmos-deck.html'; a.click();
    URL.revokeObjectURL(a.href);
  }
  toggleBtn.addEventListener('click',()=>toggleEdit());
  hotzone.addEventListener('mouseenter',()=>{clearTimeout(hideT);toggleBtn.classList.add('show')});
  hotzone.addEventListener('mouseleave',()=>{hideT=setTimeout(()=>{if(!document.body.classList.contains('editing'))toggleBtn.classList.remove('show')},400)});
  toggleBtn.addEventListener('mouseenter',()=>clearTimeout(hideT));
  toggleBtn.addEventListener('mouseleave',()=>{hideT=setTimeout(()=>{if(!document.body.classList.contains('editing'))toggleBtn.classList.remove('show')},400)});

  /* === MODULE REGISTRY (EN1: P/R/F key targets) === */
  /* Populated by panning controller (WP4) and iframe manager (WP4) below */
  window.deck={ pan:{}, iframe:{} };