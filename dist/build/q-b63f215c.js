import{i,m as t,c as e,K as u,_ as c,F as s,U as o,S as g,u as _}from"./q-faf0087e.js";import{N as h}from"./q-32293715.js";import{T as m}from"./q-de64aa38.js";import{y as a}from"./q-f3f2f623.js";const v=()=>{const l=i({rangeMin:0,rangeMax:0,birthYear:a-25,heroAge:25});return t(g,{children:[e("div",null,{class:"age-tool-description"},"Этот инструмент позволит вам узнать, какие события пришлись на время с момента рождения вашего персонажа и по сей день.",1,null),t(h,null,3,"N1_0"),e("div",null,{class:"age-tool"},[e("div",null,{class:"age-controls"},[e("div",null,{class:"age-input"},[e("label",null,null,"Возраст: ",3,null),e("input",null,{type:"text",value:25,onInput$:u(()=>c(()=>Promise.resolve().then(()=>d),void 0),"s_unuS6CluVvE",[l])},null,3,null)],3,null),e("div",null,{class:"time-now"},["Сейчас ",a," гИЭ"],1,null),e("div",null,{class:"time-born"},["Ваш персонаж родился в ",s(r=>r.birthYear,[l])," гИЭ"],3,null)],1,null),e("div",null,{class:"age-data"},t(m,{get rangeMin(){return l.birthYear},rangeMax:a,[o]:{rangeMin:s(r=>r.birthYear,[l]),rangeMax:o}},3,"N1_1"),1,null)],1,null)]},1,"N1_2")},b=(l,r)=>{const[n]=_();n.heroAge=parseInt(r.value),a-n.heroAge>0?n.birthYear=a-n.heroAge:n.birthYear=0},d=Object.freeze(Object.defineProperty({__proto__:null,s_e3JP1BHNJbg:v,s_unuS6CluVvE:b},Symbol.toStringTag,{value:"Module"}));export{v as s_e3JP1BHNJbg,b as s_unuS6CluVvE};