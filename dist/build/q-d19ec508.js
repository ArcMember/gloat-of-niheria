import{u as f,z as u,a1 as d,a2 as m,a3 as w}from"./q-1df74882.js";const p=async function(...o){const[a]=f(),n=o.length>0&&o[0]instanceof AbortSignal?o.shift():void 0;{const i=u(),l=o.map(t=>t instanceof SubmitEvent&&t.target instanceof HTMLFormElement?new FormData(t.target):t instanceof Event||t instanceof Node?null:t),s=a.getHash(),e=await fetch(`?qfunc=${s}`,{method:"POST",headers:{"Content-Type":"application/qwik-json","X-QRL":s},signal:n,body:await d([a,...l])}),c=e.headers.get("Content-Type");if(e.ok&&c==="text/qwik-json-stream"&&e.body)return async function*(){try{for await(const t of m(e.body,i??document.documentElement,n))yield t}finally{n!=null&&n.aborted||await e.body.cancel()}}();if(c==="application/qwik-json"){const t=await e.text(),r=await w(t,i??document.documentElement);if(e.status===500)throw r;return r}}};export{p as s_wOIPfiQ04l4};
