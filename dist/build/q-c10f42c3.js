import{u as v,B as P,K as c,_ as m,c as s,m as p,U as i,F as o,P as h,i as S,h as T,g as k}from"./q-faf0087e.js";import{s as b,S as O,r as L}from"./q-14e58415.js";import{M as g}from"./q-fe92d18e.js";import{g as R}from"./q-b66eb9af.js";const N=()=>{const[l]=v();l.runes=[],l.accent=void 0,l.name="Новое заклинание"},A=()=>{const[l,n,e]=v(),r=b(l.runes,l.name);e.runes=r.runes,e.accent=r.accent,e.name=r.name,n.value=!1},I=l=>{const[n,e]=v();n.value=!n.value,e.value=!1},B=l=>{const[n]=v();n.runes=n.runes.concat([l.target.id])},D=R(),E=P(c(()=>m(()=>import("./q-2c5f211d.js"),["build/q-2c5f211d.js","build/q-5cc99f8a.js","build/q-faf0087e.js","build/q-14e58415.js","build/q-b66eb9af.js","build/q-fe92d18e.js"]),"s_o0IU2gWy190"));function w(l,n){const e=[];l.spell.runes.length==0&&e.push(s("i",null,null,"Добавьте руны в заклинание",3,"iT_1"));let r=0;for(const f of l.spell.runes){for(const u of D)f==u.baseName&&(l.editing?e.push(s("div",null,{class:o(t=>"spell-rune "+t.baseName,[u])},[s("div",{onClick$:c(()=>m(()=>import("./q-5793e165.js"),["build/q-5793e165.js","build/q-faf0087e.js"]),"s_gYNp2iMJBTY",[n])},{class:"remove-rune"},s("i",null,{class:"fa fa-times"},null,3,null),2,null),s("div",{class:"spell-rune-container "+(l.spell.accent!=null&&l.spell.accent==r?"accent":""),onClick$:c(()=>m(()=>import("./q-5793e165.js"),["build/q-5793e165.js","build/q-faf0087e.js"]),"s_MWFFafAZuSA",[r,u,l,n])},null,p(g,{get name(){return u.name},get basename(){return u.baseName},get src(){return u.src},[i]:{name:o(t=>t.name,[u]),basename:o(t=>t.baseName,[u]),src:o(t=>t.src,[u])}},3,"iT_2"),0,null)],1,Math.random())):e.push(p(g,{inactive:!0,get name(){return u.name},get basename(){return u.baseName},get src(){return u.src},[i]:{inactive:i,name:o(t=>t.name,[u]),basename:o(t=>t.baseName,[u]),src:o(t=>t.src,[u])}},3,"iT_3")));r++}return e}function K(l){const n=[...l.runes];return n[l.accent]+="+",n.join(",")}const F=R(),M=P(c(()=>m(()=>import("./q-e63ba6f1.js"),["build/q-e63ba6f1.js","build/q-76b613cf.js","build/q-faf0087e.js","build/q-6ec087fd.js","build/q-14e58415.js","build/q-b66eb9af.js","build/q-fe92d18e.js"]),"s_n4GRrVEBwI4"));function y(l){let n=!0;for(const e of l.runes)e.includes(" Р ")&&(n=!1);return n}function Z(l){let n;return F.forEach(e=>{e.baseName==l&&(n=e.name)}),n??null}const V=[{name:"Мерзкая опухоль",description:"Неуправляемо растущая опухоль на теле жертвы, состоящая из тут же возникающих жира, хрящей и вкраплений зубов.",runes:"Ч И Черной Магии,Ч Р Хаоса+,В Р Роста"},{name:"Сильное исцеление",runes:"Б И Белой Магии,Б Р Исцеления+,Б Р Исцеления,Б Р Исцеления"},{name:"Заклятие кошмарной гибели",description:"Кошмарная моментальная гибель.",runes:"Ч И Смерти,Ч Р Несчастья+,С И Силы"},{name:"Заклятие деликатного сокрытия магии",description:"Накладывается строго по поверхности, скрывает присутствие магии группы целей.",runes:"В И Единства,В И Внимания,В Р Притока+,В Р Фокуса"}],$=l=>{h();const n=b("Ч И Черной Магии,Ч Р Хаоса+,В Р Роста","Мерзкая опухоль"),e=S({runes:n.runes,accent:n.accent,name:n.name});T(O,e);const r=k(!1),f=[];for(const a of L)f.push(s("div",null,{onClick$:c(()=>m(()=>Promise.resolve().then(()=>d),void 0),"s_P0xFjdFs0GA",[e])},p(g,{get name(){return a.name},get src(){return a.src},get basename(){return a.baseName},[i]:{name:o(_=>_.name,[a]),src:o(_=>_.src,[a]),basename:o(_=>_.baseName,[a])}},3,"md_0"),1,"md_1"));const u=k(!1),t=[];for(const a of V)t.push(s("div",null,{onClick$:c(()=>m(()=>Promise.resolve().then(()=>d),void 0),"s_xjFhMJOUxj4",[a,u,e])},p(E,{spell:b(a.runes),get name(){return a.name},list:!0,[i]:{name:o(_=>_.name,[a]),list:i}},3,"md_2"),1,"md_3"));return s("div",null,{class:"magic",id:"magic"},[s("div",null,{class:"spell"},[s("div",null,{class:"spell-runes",id:"spell-runes"},p(E,{spell:e,get name(){return e.name},editing:!0,[i]:{spell:i,name:o(a=>a.name,[e]),editing:i}},3,"md_4"),1,null),s("div",null,{class:"spell-duration-container"},p(M,{spell:e,[i]:{spell:i}},3,"md_5"),1,null)],1,null),s("div",null,{class:o(a=>"menu runes "+(a.value?"opened":""),[r]),id:"runes"},f,1,null),s("div",null,{class:o(a=>"menu spellbook "+(a.value?"opened":""),[u]),id:"spellbook"},s("div",null,{class:"spellbook-container"},t,1,null),1,null),s("div",null,{class:"controls"},[s("div",null,{class:"menu-left"},s("button",null,{class:"runesButton",onClick$:c(()=>m(()=>Promise.resolve().then(()=>d),void 0),"s_Ec2KbO6Qw0Y",[r,u])},[s("i",null,{class:"fa fa-bars"},null,3,null),s("span",null,null,"Руны",3,null)],3,null),3,null),s("div",null,{class:"menu-right"},[s("button",null,{class:"spellbookButton",onClick$:c(()=>m(()=>Promise.resolve().then(()=>d),void 0),"s_boKH9Z6x0BY",[e])},s("i",null,{class:"fa fa-trash"},null,3,null),3,null),s("button",null,{class:"spellbookButton",onClick$:c(()=>m(()=>Promise.resolve().then(()=>d),void 0),"s_UksgrkdNX9k",[r,u])},[s("i",null,{class:"fa fa-book"},null,3,null),s("span",null,null,"Заклинания",3,null)],3,null)],3,null)],3,null)],1,"md_6")},j=l=>{const[n,e]=v();e.value=!e.value,n.value=!1},d=Object.freeze(Object.defineProperty({__proto__:null,s_Ec2KbO6Qw0Y:I,s_P0xFjdFs0GA:B,s_RMB0Ez3ZXsw:$,s_UksgrkdNX9k:j,s_boKH9Z6x0BY:N,s_xjFhMJOUxj4:A},Symbol.toStringTag,{value:"Module"}));export{w as c,d as e,Z as g,y as n,K as s};