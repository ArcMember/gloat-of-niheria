import{c as _,R as n,L as v,O as p,d as l,a as r,m as i,i as d,p as D,t as c,g as P,_ as u,h as I}from"./q-0a61ba82.js";import{C as T}from"./q-26168cfe.js";const b=()=>{const[e]=_();e.value=e.value==="true"?"false":"true",localStorage.setItem("toc-hidden",e.value)},y=()=>{const[e,o,a]=_();if(o.value=localStorage.getItem("toc-hidden"),document.getElementsByClassName("disable-toc").length<1){a.items=[];const g=document.getElementById("content").querySelectorAll("h1, h2, h3, h4, h5, h6");e.value="true";for(const s of g){const f=s.innerHTML,m=parseInt(s.tagName.toUpperCase().split("H")[1]);f!=null&&(s.id=s.innerText,s.id!=""&&s.id!="Назад"&&s.id!="Меню"&&s.id!="Footnotes"&&(a.items.push({tag:s.tagName,href:s.id,lvl:m}),e.value="false"))}}else e.value="true"},C=()=>{const e=n("false"),o=n("true"),a=v({items:[]});return p(d(()=>u(()=>Promise.resolve().then(()=>h),void 0),"s_oeXteZRDP5Y",[e,o,a])),l(P,{children:[" ",e.value==="false"&&r("div",null,{class:i(t=>"show-toc "+(t.value==="true"?"hidden ":""),[o]),onClick$:d(()=>u(()=>Promise.resolve().then(()=>h),void 0),"s_DBDr5HG2MDA",[o])},null,3,"QN_0"),r("div",null,{class:i(t=>"side-toc "+(t.value==="true"?"hidden ":""),[o]),id:"side-toc"},a.items.map(t=>l(T,{get tag(){return t.tag},get href(){return t.href},[D]:{href:c(t,"href"),tag:c(t,"tag")}},3,t.href)),1,null)]},1,"QN_1")},h=Object.freeze(Object.defineProperty({__proto__:null,_hW:I,s_DBDr5HG2MDA:b,s_ISfeu9rV90o:C,s_oeXteZRDP5Y:y},Symbol.toStringTag,{value:"Module"}));export{I as _hW,b as s_DBDr5HG2MDA,C as s_ISfeu9rV90o,y as s_oeXteZRDP5Y};
