import{u as m,g as p,b as d,I as _,K as c,_ as r,c as s,F as u,k as f}from"./q-faf0087e.js";import{s as v}from"./q-0338ab04.js";import{SidebarContext as E}from"./q-2ce4426f.js";import"./q-01d224c5.js";const y=async l=>{const[n]=m(),a=l.srcElement.parentElement.parentElement,t=l.srcElement.parentElement.parentElement.children[1],e=n.value/19;if(a.classList.contains("paused")){t.volume=0,t.play();for(let o=0;o<20;o++)await v(1),t.volume=Math.floor((t.volume+e)*100)/100;a.classList.remove("paused"),a.classList.add("playing")}else if(a.classList.contains("playing")){for(let o=0;o<20;o++)await v(1),t.volume=Math.ceil((t.volume-e)*100)/100;t.pause(),a.classList.remove("playing"),a.classList.add("paused")}},g=l=>{const n=decodeURI(l.src).split("/").slice(-1)[0].replace(".mp3",""),a=p(.5),t=d(E);return _(c(()=>r(()=>Promise.resolve().then(()=>i),void 0),"s_w8XUqGrS0Ek",[a])),s("div",null,{class:u(e=>"player-container paused"+(e.fixed?" fixed":" static")+(e.compact?" compact":""),[l]),id:u(e=>e.fixed?"audio-fixed":"",[l]),"offset-menu":u(e=>e.value,[t])},[s("div",null,{class:"player"},s("div",null,{class:"controls",onClick$:c(()=>r(()=>Promise.resolve().then(()=>i),void 0),"s_0QNOfV6cTiM",[a])},[s("div",null,{class:"space"},null,3,null),s("div",null,{class:"container"},[s("button",null,{class:"play-button"},[s("i",null,{class:"fa fa-pause"},null,3,null),s("i",null,{class:"fa fa-play"},null,3,null)],3,null),s("span",null,{class:"track-name"},n,1,null)],1,null),s("span",null,{class:"volume"},s("input",null,{class:"slider",type:"range",min:"0",max:"100",value:u(e=>e.value*100,[a]),onInput$:c(()=>r(()=>Promise.resolve().then(()=>i),void 0),"s_0HmqAsJk7sc",[a])},null,3,null),3,null)],1,null),1,null),s("audio",null,{class:"actual-player",src:u(e=>e.src,[l])},null,3,null)],1,"18_0")},I=async()=>{const[l]=m();localStorage.getItem("volume")!=null?l.value=parseFloat(localStorage.getItem("volume")):l.value=.5},h=l=>{const[n]=m();n.value=l.target.value/100,localStorage.setItem("volume",n.value.toString()),l.target.parentElement.parentElement.parentElement.parentElement.children[1].volume=n.value},i=Object.freeze(Object.defineProperty({__proto__:null,_hW:f,s_0HmqAsJk7sc:h,s_0QNOfV6cTiM:y,s_jROooPQh9jI:g,s_w8XUqGrS0Ek:I},Symbol.toStringTag,{value:"Module"}));export{f as _hW,h as s_0HmqAsJk7sc,y as s_0QNOfV6cTiM,g as s_jROooPQh9jI,I as s_w8XUqGrS0Ek};
