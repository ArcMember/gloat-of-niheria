import{R as d,Y as _,O as f,a,i as c,m as u,_ as i,c as m,h as y}from"./q-0a61ba82.js";import{SidebarContext as E}from"./q-ec811e49.js";import{s as p}from"./q-51bee478.js";import"./q-9f0f295b.js";const g=e=>{const n=decodeURI(e.src).split("/").slice(-1)[0].replace(".mp3",""),t=d(.5),s=_(E);return f(c(()=>i(()=>Promise.resolve().then(()=>r),void 0),"s_Ook6l8SDYkI",[t])),a("div",null,{class:u(l=>"player-container paused"+(l.fixed?" fixed":" static")+(l.compact?" compact":""),[e]),id:u(l=>l.fixed?"audio-fixed":"",[e]),"offset-menu":u(l=>l.value,[s])},[a("div",null,{class:"player"},a("div",null,{class:"controls",onClick$:c(()=>i(()=>Promise.resolve().then(()=>r),void 0),"s_LtkDK1J2lfg",[t])},[a("div",null,{class:"space"},null,3,null),a("div",null,{class:"container"},[a("button",null,{class:"play-button"},[a("i",null,{class:"fa fa-pause"},null,3,null),a("i",null,{class:"fa fa-play"},null,3,null)],3,null),a("span",null,{class:"track-name"},n,1,null)],1,null),a("span",null,{class:"volume"},a("input",null,{class:"slider",max:"100",min:"0",onInput$:c(()=>i(()=>Promise.resolve().then(()=>r),void 0),"s_8bt26EU8yW0",[t]),type:"range",value:u(l=>l.value*100,[t])},null,3,null),3,null)],1,null),1,null),a("audio",null,{class:"actual-player",src:u(l=>l.src,[e])},null,3,null)],1,"bM_0")},h=async()=>{const[e]=m();localStorage.getItem("volume")!=null?e.value=Math.min(Math.max(parseFloat(localStorage.getItem("volume")),0),1):e.value=.5},L=e=>{const[n]=m();n.value=e.target.value/100,localStorage.setItem("volume",n.value.toString()),e.target.parentElement.parentElement.parentElement.parentElement.children[1].volume=n.value},b=async e=>{const[n]=m(),t=e.srcElement.parentElement.parentElement,s=e.srcElement.parentElement.parentElement.children[1],l=20,v=n.value/(l-1);if(t.classList.contains("paused")){s.volume=0,s.play();for(let o=0;o<l;o++)await p(1),s.volume=Math.floor((s.volume+v)*100)/100;t.classList.remove("paused"),t.classList.add("playing")}else if(t.classList.contains("playing")){for(let o=0;o<l;o++)await p(1),s.volume=Math.ceil((s.volume-v)*100)/100;s.pause(),t.classList.remove("playing"),t.classList.add("paused")}},r=Object.freeze(Object.defineProperty({__proto__:null,_hW:y,s_8bt26EU8yW0:L,s_LtkDK1J2lfg:b,s_Ook6l8SDYkI:h,s_vEy93aPm8AQ:g},Symbol.toStringTag,{value:"Module"}));export{y as _hW,L as s_8bt26EU8yW0,b as s_LtkDK1J2lfg,h as s_Ook6l8SDYkI,g as s_vEy93aPm8AQ};
