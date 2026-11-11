import test,{after} from 'node:test';
import assert from 'node:assert/strict';

// Reproduce the platform moving the document during native dialog autofocus.
const original=Object.fromEntries(['window','document','requestAnimationFrame','getComputedStyle'].map(key=>[key,globalThis[key]]));
const frames=[];
globalThis.window={scrollX:0,scrollY:0,scrollTo({left,top}){this.scrollX=left;this.scrollY=top;}};
const documentListeners=new Map();
globalThis.document={addEventListener(type,handler){documentListeners.set(type,handler);},removeEventListener(type){documentListeners.delete(type);},querySelector(){return null;}};
globalThis.requestAnimationFrame=callback=>frames.push(callback);
let styleReads=0;
globalThis.getComputedStyle=node=>{styleReads++;return {overflowY:node.overflowY||'visible'};};
const {openModal}=await import('../public/modal.js');
after(()=>{for(const [key,value] of Object.entries(original))if(value===undefined)delete globalThis[key];else globalThis[key]=value;});
class NativeDialog extends EventTarget{
 open=false;
 style={};children=[];
 querySelectorAll(){return this.children;}
 getBoundingClientRect(){return {left:0,right:100,top:0,bottom:100};}
 showModal(){this.open=true;window.scrollTo({left:0,top:0});}
 close(){this.open=false;window.scrollTo({left:0,top:0});this.dispatchEvent(new Event('close'));}
}
const flush=()=>{while(frames.length)frames.shift()();};

test('native autofocus and focus restoration do not jump a scrolled document',()=>{
 window.scrollTo({left:12,top:650});
 const dialog=new NativeDialog();let focusOptions;
 openModal(dialog,{focus(options){focusOptions=options;window.scrollTo({left:0,top:0});}});
 flush();assert.equal(window.scrollY,650);assert.equal(window.scrollX,12);assert.deepEqual(focusOptions,{preventScroll:true});
 dialog.close();assert.equal(window.scrollY,650);assert.equal(window.scrollX,12);
});
test('wheel scrolling uses cached scroll ports without layout reads and blocks backdrop gestures',()=>{
 const dialog=new NativeDialog(),scroller={overflowY:'auto',style:{}};
 dialog.children=[scroller];openModal(dialog);flush();const reads=styleReads;
 const wheel=(path,x=50)=>{const event=new Event('wheel',{cancelable:true});Object.defineProperties(event,{clientX:{value:x},clientY:{value:50},composedPath:{value:()=>path}});dialog.dispatchEvent(event);return event;};
 for(let i=0;i<100;i++)assert.equal(wheel([scroller,dialog]).defaultPrevented,false);
 assert.equal(styleReads,reads);assert.equal(scroller.style.overscrollBehavior,'contain');
 assert.equal(wheel([dialog],150).defaultPrevented,true);
 assert.equal(wheel([dialog]).defaultPrevented,true);
 const backdrop=new Event('wheel',{cancelable:true});documentListeners.get('wheel')(backdrop);assert.equal(backdrop.defaultPrevented,true);
 dialog.close();assert.equal(documentListeners.size,0);
});
test('nested history dialogs preserve the parent position and closed frames cannot move the page',()=>{
 window.scrollTo({left:0,top:900});const stations=new NativeDialog(),history=new NativeDialog();
 openModal(stations);flush();openModal(history);flush();history.close();
 assert.equal(stations.open,true);assert.equal(window.scrollY,900);
 stations.close();assert.equal(window.scrollY,900);
 openModal(stations);stations.close();window.scrollTo({left:0,top:1200});flush();assert.equal(window.scrollY,1200);
});
