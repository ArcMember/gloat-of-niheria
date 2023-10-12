import{c as i,R as c,w as h,d as u,a as t,M as l,m as _,i as s,g,_ as n,h as b}from"./q-0a61ba82.js";const m=()=>{const[e]=i();return e.value++},o=[{message:"<b>Ready</b> to make some changes?<br />Press and hold the <b>ALT</b> key"},{message:"Select the title of this page while keeping the <b>ALT</b> key pressed",hint:'Edit the title and save the changes. If your editor does not open, have a look at <a href="https://github.com/yyx990803/launch-editor#supported-editors" target="_blank">this page</a> to set the correct <code>LAUNCH_EDITOR</code> value.'},{message:"<b>Update</b> now the <code>routeLoader$</code> defined in the <code>src/routes/layout.tsx</code> file",hint:"Instead of returning the current date, you could return any possible string.<br />The output is displayed in the footer."},{message:"Create a <b>new Route</b> called <code>/me</code>",hint:'Create a new directory called <code>me</code> in <code>src/routes</code>. Within this directory create a <code>index.tsx</code> file or copy the <code>src/routes/index.tsx</code> file. Your new route is now accessible <a href="/me" target="_blank">here</a> ✨'},{message:"Time to have a look at <b>Forms</b>",hint:'Open <a href="/demo/todolist" target="_blank">the TODO list App</a> and add some items to the list. Try the same with disabled JavaScript 🐰'},{message:"<b>Congratulations!</b> You are now familiar with the basics! 🎉",hint:"If you need further info on how to use qwik, have a look at <a href='https://qwik.builder.io' target='_blank'>qwik.builder.io</a> or join the <a href='https://qwik.builder.io/chat' target='_blank'>Discord channel</a>."}],p="_gettingstarted_327y7_1",y="_hint_327y7_10",d={gettingstarted:p,hint:y},v=()=>{const e=c(0);return h("keydown",s(()=>n(()=>Promise.resolve().then(()=>r),void 0),"s_KhvNFSL9r0Q",[e])),u(g,{children:[t("div",null,{class:d.gettingstarted},[t("div",{dangerouslySetInnerHTML:l(o[e.value],"message")},null,null,3,null),t("span",{dangerouslySetInnerHTML:l(o[e.value],"hint")},{class:d.hint},null,3,null)],1,null),e.value+1<o.length?t("button",null,{class:"gray small",onClick$:s(()=>n(()=>Promise.resolve().then(()=>r),void 0),"s_AmlRjUjz7So",[e])},["Continue with Step ",_(a=>a.value+2,[e])," of ",o.length],3,"aM_0"):t("button",null,{class:"gray small",onClick$:s(()=>n(()=>Promise.resolve().then(()=>r),void 0),"s_K31DIo2c4JU",[e])},"Re-Start",3,null)]},1,"aM_1")},S=()=>{const[e]=i();return e.value=0},f=e=>{const[a]=i();e.key==="Alt"&&(a.value=1)},r=Object.freeze(Object.defineProperty({__proto__:null,_hW:b,s_5N3b6HlxHi8:v,s_AmlRjUjz7So:m,s_K31DIo2c4JU:S,s_KhvNFSL9r0Q:f},Symbol.toStringTag,{value:"Module"}));export{b as _hW,v as s_5N3b6HlxHi8,m as s_AmlRjUjz7So,S as s_K31DIo2c4JU,f as s_KhvNFSL9r0Q};