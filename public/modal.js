// Native autofocus and root overflow changes must not move the document.
const positions=new WeakMap(),bound=new WeakSet(),scrollAreas=new WeakMap();
const openDialogs=new Set();
function containBackdrop(event){
 const dialog=[...openDialogs].at(-1);
 if(dialog&&!event.composedPath().includes(dialog))event.preventDefault();
}
export function openModal(dialog,focus){
 const position={left:window.scrollX,top:window.scrollY};positions.set(dialog,position);
 if(!bound.has(dialog)){
  dialog.addEventListener('close',()=>{
   openDialogs.delete(dialog);
   if(!openDialogs.size){
    document.removeEventListener('wheel',containBackdrop);
    document.removeEventListener('touchmove',containBackdrop);
   }
   const saved=positions.get(dialog);if(saved)window.scrollTo({...saved,behavior:'instant'});
  });
  dialog.addEventListener('wheel',containScroll,{passive:false});
  dialog.addEventListener('touchmove',containScroll,{passive:false});
  bound.add(dialog);
 }
 dialog.showModal();
 if(!openDialogs.size){
  document.addEventListener('wheel',containBackdrop,{passive:false});
  document.addEventListener('touchmove',containBackdrop,{passive:false});
 }
 openDialogs.add(dialog);
 // Discover scroll ports once per opening, never during wheel/touch handling.
 const areas=new Set();
 for(const node of [dialog,...dialog.querySelectorAll('*')]){
  if(/auto|scroll/.test(getComputedStyle(node).overflowY)){
   areas.add(node);node.style.overscrollBehavior='contain';
  }
 }
 scrollAreas.set(dialog,areas);
 focus?.focus({preventScroll:true});
 window.scrollTo({...position,behavior:'instant'});
 requestAnimationFrame(()=>{if(dialog.open&&positions.get(dialog)===position)window.scrollTo({...position,behavior:'instant'});});
}

// Listeners live on each dialog instead of blocking wheel input on the document.
// Native scrolling consumes the gesture; CSS contains it at scroll boundaries.
function containScroll(event){
 const dialog=event.currentTarget;
 if(!dialog.open)return;
 if(event.target===dialog){
  const point=event.touches?.[0]||event,r=dialog.getBoundingClientRect();
  if(point.clientX<r.left||point.clientX>r.right||point.clientY<r.top||point.clientY>r.bottom){event.preventDefault();return;}
 }
 const areas=scrollAreas.get(dialog);
 if(event.composedPath().some(node=>areas?.has(node)))return;
 event.preventDefault();
}
