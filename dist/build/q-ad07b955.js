import{c as l,F as s,n}from"./q-faf0087e.js";const a=e=>{const r=[{src:"/book-assets/1.jpg",style:["filter: none;","filter: hue-rotate(143deg);","filter: hue-rotate(307deg) brightness(0.5);","filter: hue-rotate(322deg);"]},{src:"/book-assets/2.jpg",style:["filter: none;","filter: hue-rotate(36deg) brightness(0.7);","filter: hue-rotate(178deg) saturate(0.2);","filter: hue-rotate(350deg) brightness(0.6);"]},{src:"/book-assets/3.jpg",style:["filter: none;","filter: hue-rotate(180deg);","filter: hue-rotate(116deg) brightness(0.7);","filter: hue-rotate(300deg) saturate(0.5);"]},{src:"/book-assets/4.jpg",style:["filter: none;","filter: saturate(0.4) brightness(0.8);","filter: hue-rotate(180deg) saturate(0.5);","filter: hue-rotate(260deg) brightness(0.8);"]},{src:"/book-assets/5.jpg",style:["filter: none;","filter: none;","filter: none;","filter: none;"]}];return l("a",null,{class:"book-a",href:s(t=>t.href,[e])},l("div",null,{class:s(t=>"book"+(t.chapter?" chapter":""),[e])},[!e.chapter&&l("img",{src:n(r[e.picNum],"src"),style:r[e.picNum].style[e.styleNum]},null,null,3,"zP_0"),e.chapter&&l("img",null,{src:"/book-assets/chapter.jpg"},null,3,"zP_1"),l("div",null,{class:"book-spine"},[e.title!=null&&l("div",null,{class:"book-title"},s(t=>t.title,[e]),3,"zP_2"),e.subtitle!=null&&l("div",null,{class:"book-subtitle"},s(t=>t.subtitle,[e]),3,"zP_3")],1,null),e.author!=null&&l("div",null,{class:"book-author"},s(t=>t.author,[e]),3,"zP_4")],1,null),1,"zP_5")};export{a as s_C0628t0nWCU};