import{c as i,a as e,m as o,i as a,_ as c}from"./q-0a61ba82.js";import{s as n,c as u}from"./q-42a83ab4.js";import{s as r}from"./q-b55cb587.js";import"./q-1d659ccd.js";import"./q-6031e702.js";const d=l=>{const[t]=i();navigator.clipboard.writeText(n(t)).then(()=>{const s=document.getElementById("copy-spell-button");s.classList.remove("success"),s.offsetWidth,s.classList.add("success")})},m=l=>{let t=l.spell;return typeof l.spell=="string"&&(t=r(l.spell)),e("div",{class:"magic-spell "+(l.list?"list ":"")+(l.editing?"":"presenting ")+(l.float==null||l.float?"float ":"")+t.runes},null,[e("div",null,{class:"spell-formula",id:"spell-formula"},n(t),1,null),e("div",null,{class:"spell-name"},[l.editing!=!0&&e("div",null,null,o(s=>s.name,[l]),3,"h0_0"),e("button",{onClick$:a(()=>c(()=>Promise.resolve().then(()=>f),void 0),"s_qSbUTTR60GA",[t])},{class:"copy-spell-button flat",id:"copy-spell-button"},[e("i",null,{class:"fa fa-clipboard"},null,3,null),"скопировать формулу",e("i",null,{class:"fa fa-check"},null,3,null)],2,null)],1,null),e("div",null,{class:"spell-runes"},u(l,t),1,null)],1,"h0_1")},f=Object.freeze(Object.defineProperty({__proto__:null,s_qSbUTTR60GA:d,s_w7gBnrGOuro:m},Symbol.toStringTag,{value:"Module"}));export{d as s_qSbUTTR60GA,m as s_w7gBnrGOuro};
