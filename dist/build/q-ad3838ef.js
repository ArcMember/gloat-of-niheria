import{a4 as h,q as r,h as l,u as g,j as d,i as m,X as p,a8 as S,d as u,Y as _,a9 as n,ab as b,ac as c,Z as j,O as E}from"./q-1df74882.js";import{S as P}from"./q-0036ea71.js";const A=h(r(()=>l(()=>Promise.resolve().then(()=>Q),void 0),"s_ISfeu9rV90o")),T=h(r(()=>l(()=>import("./q-9f6ca01c.js"),[]),"s_652E8a0g3YQ")),y=()=>{const[t]=g();t.value=t.value==="true"?"false":"true",localStorage.setItem("toc-hidden",t.value)},I=Object.freeze(Object.defineProperty({__proto__:null,s_oyE0jXjsQgs:y},Symbol.toStringTag,{value:"Module"})),O=()=>{const[t,o,a]=g();if(o.value=localStorage.getItem("toc-hidden"),document.getElementsByClassName("disable-toc").length<1){a.items=[];const e=document.getElementById("content").querySelectorAll("h1, h2, h3, h4, h5, h6");t.value="true";for(const s of e){const f=s.innerHTML,v=parseInt(s.tagName.toUpperCase().split("H")[1]);f!=null&&(s.id=s.innerText,s.id!=""&&s.id!="Назад"&&s.id!="Меню"&&s.id!="Footnotes"&&(a.items.push({tag:s.tagName,href:s.id,lvl:v}),t.value="false"))}}else t.value="true"},x=Object.freeze(Object.defineProperty({__proto__:null,_hW:E,s_oeXteZRDP5Y:O},Symbol.toStringTag,{value:"Module"})),L=()=>{const t=d("false"),o=d("true"),a=m({items:[]}),i=p(P);return S(r(()=>l(()=>Promise.resolve().then(()=>x),void 0),"s_oeXteZRDP5Y",[t,o,a])),u(j,{children:[" ",t.value==="false"&&_("div",null,{class:n(e=>"show-toc "+(e.value==="true"?"hidden ":""),[o]),opened:n(e=>e.value,[i]),onClick$:r(()=>l(()=>Promise.resolve().then(()=>I),void 0),"s_oyE0jXjsQgs",[o])},null,3,"QN_0"),_("div",null,{class:n(e=>"side-toc "+(e.value==="true"?"hidden ":""),[o]),opened:n(e=>e.value,[i]),id:"side-toc"},a.items.map(e=>u(T,{get tag(){return e.tag},get href(){return e.href},[b]:{tag:c(e,"tag"),href:c(e,"href")}},3,e.href)),1,null)]},1,"QN_1")},Q=Object.freeze(Object.defineProperty({__proto__:null,s_ISfeu9rV90o:L},Symbol.toStringTag,{value:"Module"}));export{A as S,L as a,O as s,y as s_oyE0jXjsQgs};
