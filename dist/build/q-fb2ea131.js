import{L as i,d as t,a as e,i as u,m as s,p as o,g,_ as c,c as _}from"./q-0a61ba82.js";import{N as b}from"./q-f1617c30.js";import{T as d}from"./q-77063f70.js";import{y as n}from"./q-f3f2f623.js";const p=()=>{const l=i({rangeMin:0,rangeMax:0,birthYear:n-25,heroAge:25});return t(g,{children:[e("div",null,{class:"age-tool-description"},"Этот инструмент позволит вам узнать, какие события пришлись на время с момента рождения вашего персонажа и по сей день.",3,null),t(b,null,3,"I4_0"),e("div",null,{class:"age-tool"},[e("div",null,{class:"age-controls"},[e("div",null,{class:"age-input"},[e("label",null,null,"Возраст: ",3,null),e("input",null,{onInput$:u(()=>c(()=>Promise.resolve().then(()=>m),void 0),"s_jswbwW4620E",[l]),type:"text",value:25},null,3,null)],3,null),e("div",null,{class:"time-now"},["Сейчас ",n," гИЭ"],3,null),e("div",null,{class:"time-born"},["Ваш персонаж родился в ",s(r=>r.birthYear,[l])," гИЭ"],3,null)],3,null),e("div",null,{class:"age-data"},t(d,{get rangeMin(){return l.birthYear},rangeMax:n,[o]:{rangeMax:o,rangeMin:s(r=>r.birthYear,[l])}},3,"I4_1"),1,null)],1,null)]},1,"I4_2")},h=(l,r)=>{const[a]=_();a.heroAge=parseInt(r.value),n-a.heroAge>0?a.birthYear=n-a.heroAge:a.birthYear=0},m=Object.freeze(Object.defineProperty({__proto__:null,s_aAqbpV9wM8k:p,s_jswbwW4620E:h},Symbol.toStringTag,{value:"Module"}));export{p as s_aAqbpV9wM8k,h as s_jswbwW4620E};