import{u as a}from"./q-1df74882.js";const i=t=>{const[e,n,r,c]=a();if(r.editing&&!n.baseName.includes(" И ")){const l=[...t.target.parentElement.parentElement.parentElement.children].indexOf(t.target.parentElement.parentElement);c.accent==null||c.accent!=e?c.accent=l:c.accent=void 0}},o=Object.freeze(Object.defineProperty({__proto__:null,s_0vWA1CcTeVI:i},Symbol.toStringTag,{value:"Module"})),p=t=>{const[e]=a(),n=[...t.target.parentElement.parentElement.parentElement.children].indexOf(t.target.parentElement.parentElement);e.accent==n&&(e.accent=void 0),e.accent>n&&(e.accent=e.accent-1),e.runes=e.runes.toSpliced(n,1)};export{o as a,p as s,i as s_0vWA1CcTeVI};
