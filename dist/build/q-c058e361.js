import{C as s}from"./q-5cc99f8a.js";import{P as r,c as n,K as l,_ as i,m as a,t as u,F as d}from"./q-b1c41f58.js";const _=e=>{const t=new s(".copy-button");t.on("success",function(o){console.info("Action:",o.action),console.info("Text:",o.text),console.info("Trigger:",o.trigger);const c=o.trigger.children[1];c.classList.remove("anim"),c.offsetWidth,c.classList.add("anim"),o.clearSelection(),t.destroy()}),t.on("error",function(o){console.error("Action:",o.action),console.error("Trigger:",o.trigger),o.clearSelection(),t.destroy()})},f=e=>{r();const t=Math.floor(Math.random()*10);return n("div",null,{class:"copy-box"},[n("button",{"data-clipboard-target":"#copy-content-"+t},{class:"copy-button",onClick$:l(()=>i(()=>Promise.resolve().then(()=>p),void 0),"s_2v6MeLD910M")},[n("i",null,{class:"fa fa-copy"},null,3,null),n("div",null,{class:"success"},"Скопировано",3,null)],3,null),n("div",{id:"copy-content-"+t},{class:"copy-content"},[e.text==null&&a(u,null,3,"GJ_0"),d(o=>o.text,[e])],1,null)],1,"GJ_1")},p=Object.freeze(Object.defineProperty({__proto__:null,s_2v6MeLD910M:_,s_tiOuaZ8D28A:f},Symbol.toStringTag,{value:"Module"}));export{_ as s_2v6MeLD910M,f as s_tiOuaZ8D28A};
