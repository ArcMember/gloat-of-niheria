import{W as a,Y as s,q as c,d as o,S as r,a9 as i,h as u,u as _}from"./q-1df74882.js";const d=e=>(a(),s("div",null,{class:"copy-box"},[s("button",null,{class:"copy-button",onClick$:c(()=>u(()=>Promise.resolve().then(()=>f),void 0),"s_VWA0GcseDa8",[e])},[s("i",null,{class:"fa fa-copy"},null,3,null),s("div",null,{class:"success"},"Скопировано",3,null)],3,null),s("div",null,{class:"copy-content"},[e.text==null&&o(r,null,3,"0Q_0"),i(l=>l.text,[e])],1,null)],1,"0Q_1")),p=Object.freeze(Object.defineProperty({__proto__:null,s_NlYYANX0jzE:d},Symbol.toStringTag,{value:"Module"})),x=async e=>{const[l]=_(),n=l.text==null?e.srcElement.parentElement.children[1].innerText:l.text;navigator.clipboard.writeText(n).then(()=>{const t=e.srcElement.children[1];t.classList.remove("anim"),t.offsetWidth,t.classList.add("anim")})},f=Object.freeze(Object.defineProperty({__proto__:null,s_VWA0GcseDa8:x},Symbol.toStringTag,{value:"Module"}));export{p as a,x as s,d as s_NlYYANX0jzE};