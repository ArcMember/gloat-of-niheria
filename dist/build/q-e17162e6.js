import{u,i as x,V as P,Y as n,q as a,a9 as _,d as O,ab as j,ac as F,h as c,O as b}from"./q-1df74882.js";import{C as k}from"./q-baeddcd9.js";import{c as h,h as E,g as S,w as p}from"./q-7231fb36.js";const w=()=>{const[t,l]=u();return l(t,4)},z=Object.freeze(Object.defineProperty({__proto__:null,s_xTkQ1zLPwhA:w},Symbol.toStringTag,{value:"Module"})),L=()=>{const[t,l]=u();return l(t,1)},T=Object.freeze(Object.defineProperty({__proto__:null,s_037veLcofhw:L},Symbol.toStringTag,{value:"Module"})),A=()=>{const[t,l]=u();return l(t,5)},D=Object.freeze(Object.defineProperty({__proto__:null,s_dV2X2XEUJEc:A},Symbol.toStringTag,{value:"Module"})),$=(t,l)=>{const[r]=u();if(l==0||l==4||l==1)l==0&&(r.sex=r.sex==t?"":t),l==4&&(r.letter=r.letter==t?"":t),l==1&&(r.class=r.class==t?"":t);else{const s=(o,f)=>{const d=f.split(" "),g=d.indexOf(o);return g!==-1?d.splice(g,1):d.push(o),d.join(" ")};l==2&&(r.state=s(t,r.state)),l==3&&(r.nation=s(t,r.nation)),l==5&&(r.guild=s(t,r.guild))}},M=Object.freeze(Object.defineProperty({__proto__:null,_hW:b,s_RgtGPCOHSlA:$},Symbol.toStringTag,{value:"Module"})),R=()=>{const[t,l]=u();typeof t.sexFilter=="string"&&l(t.sexFilter,0),typeof t.classFilter=="string"&&l(t.classFilter,1),typeof t.stateFilter=="string"&&l(t.stateFilter,2),typeof t.nationFilter=="string"&&l(t.nationFilter,3),typeof t.guildFilter=="string"&&l(t.guildFilter,3),typeof t.letterFilter=="string"&&l(t.letterFilter,4)},C=Object.freeze(Object.defineProperty({__proto__:null,_hW:b,s_VVgdYfUR9Vg:R},Symbol.toStringTag,{value:"Module"})),V=()=>{const[t,l]=u();return l(t,3)},I=Object.freeze(Object.defineProperty({__proto__:null,s_4z6xETpL7nA:V},Symbol.toStringTag,{value:"Module"})),H=t=>{let l=h,r="canons";t.data=="heroes"?(l=E,r="heroes"):t.data=="grave"?(l=S,r="heroes"):t.data=="wanted"&&(r="heroes",l=p),t.wanted==!0&&(l=l.filter(e=>e.wanted!=null&&e.wanted!="")),t.dead==!0?l=l.filter(e=>e.dead==!0):l=l.filter(e=>e.dead!=!0);const s=x({sex:"",class:"",state:"",nation:"",letter:"",guild:""}),o=a(()=>c(()=>Promise.resolve().then(()=>M),void 0),"s_RgtGPCOHSlA",[s]);P(a(()=>c(()=>Promise.resolve().then(()=>C),void 0),"s_VVgdYfUR9Vg",[t,o]));const f=["Мужчина","Женщина"],d=["Воин","Разбойник","Маг","Мирный"],g=["Реабор-Тхаес","Тейель","Афитра","Луат","Коркафт","Мордвин","Флатрия","Сикстинна","Секри","Кланы","Хельгеран"],v=["Бестиец","Дворф","Кхарфир","Редрехан","Человек","Мерия","Ламах-виден","Ламах-ибэ","Полукровка","Бестиарный","Проклятый"],m=["А","Б","В","Г","Д","Е","Ё","Ж","З","И","Й","К","Л","М","Н","О","П","Р","С","Т","У","Ф","Х","Ц","Ч","Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я"],y=["Искра","Железнодорожники","Бюро","Ассоциация","Адмиралтейство"];return n("div",null,{class:"character-list-container"},[n("div",null,{class:"filter-container"},typeof t.classFilter=="boolean"&&n("div",null,{class:"filter-list class-filter"},d.map(e=>n("span",{class:"filter-key class-key"+(s.class==e?" sel":""),id:e,onClick$:a(()=>c(()=>Promise.resolve().then(()=>T),void 0),"s_037veLcofhw",[e,o])},null,e,0,e)),1,"bi_0"),1,null),n("div",null,{class:"filter-container"},[typeof t.sexFilter=="boolean"&&n("div",null,{class:"filter-list sex-filter"},f.map(e=>n("span",{class:"filter-key sex-key"+(s.sex==e?" sel":""),id:e,onClick$:a(()=>c(()=>Promise.resolve().then(()=>X),void 0),"s_zTVFLjwkecc",[e,o])},null,e,0,e)),1,"bi_1"),typeof t.stateFilter=="boolean"&&n("div",null,{class:"filter-list state-filter"},g.map(e=>n("span",{class:"filter-key state-key"+(s.state.includes(e)?" sel":""),id:e,onClick$:a(()=>c(()=>Promise.resolve().then(()=>Q),void 0),"s_JPXrZ5UMxO0",[e,o])},null,e,0,e)),1,"bi_2"),typeof t.stateFilter=="boolean"&&n("div",null,{class:"filter-list guild-filter"},y.map(e=>n("span",{class:"filter-key guild-key"+(s.guild.includes(e)?" sel":""),id:e,onClick$:a(()=>c(()=>Promise.resolve().then(()=>D),void 0),"s_dV2X2XEUJEc",[e,o])},null,e,0,e)),1,"bi_3"),typeof t.nationFilter=="boolean"&&n("div",null,{class:"filter-list race-filter"},v.map(e=>n("span",{class:"filter-key nation-key"+(s.nation.includes(e)?" sel":""),id:e,onClick$:a(()=>c(()=>Promise.resolve().then(()=>I),void 0),"s_4z6xETpL7nA",[e,o])},null,e,0,e)),1,"bi_4")],1,null),typeof t.letterFilter=="boolean"&&n("div",null,null,[n("hr",null,null,null,3,null),n("div",null,{class:"filter-list letter-filter"},m.map(e=>n("span",{class:"filter-key letter-key"+(s.letter==e?" sel":""),id:e,onClick$:a(()=>c(()=>Promise.resolve().then(()=>z),void 0),"s_xTkQ1zLPwhA",[e,o])},null,e,0,e)),1,null)],1,"bi_5"),t.sexFilter&&t.stateFilter&&t.nationFilter&&n("hr",null,null,null,3,"bi_6"),n("div",null,{class:_(e=>"character-list "+(e.columns!=null?" board"+e.columns:" board3"),[t]),id:"character-list"},l.map(e=>O(k,{get name(){return e.name},get subtitle(){return e.subtitle},get filter(){return e.filter},href:"/menu/characters/"+r+"/"+e.href,src:e.src!=null&&e.src!=""?"/menu/characters/"+r+"/"+e.src:"/menu/characters/character.jpg",info:t.wanted?e.wanted:t.dead?e.dead:"",get sexFilter(){return s.sex},get classFilter(){return s.class},get stateFilter(){return s.state},get nationFilter(){return s.nation},get letterFilter(){return s.letter},get guildFilter(){return s.guild},[j]:{name:F(e,"name"),subtitle:F(e,"subtitle"),filter:F(e,"filter"),sexFilter:_(i=>i.sex,[s]),classFilter:_(i=>i.class,[s]),stateFilter:_(i=>i.state,[s]),nationFilter:_(i=>i.nation,[s]),letterFilter:_(i=>i.letter,[s]),guildFilter:_(i=>i.guild,[s])}},3,e.name)),1,null)],1,"bi_7")},U=()=>{const[t,l]=u();return l(t,0)},X=Object.freeze(Object.defineProperty({__proto__:null,s_zTVFLjwkecc:U},Symbol.toStringTag,{value:"Module"})),J=()=>{const[t,l]=u();return l(t,2)},Q=Object.freeze(Object.defineProperty({__proto__:null,s_JPXrZ5UMxO0:J},Symbol.toStringTag,{value:"Module"}));export{A as a,$ as b,R as c,V as d,H as e,U as f,J as g,L as s,w as s_xTkQ1zLPwhA};