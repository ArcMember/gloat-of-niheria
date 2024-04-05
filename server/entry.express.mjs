import{s as _e,r as ke,m as Ce}from"./assets/entry.ssr-625d1853.mjs";import{getNotFound as De}from"./@qwik-city-not-found-paths.js";import{isStaticPath as Pe}from"./@qwik-city-static-paths.js";import{createReadStream as Me}from"fs";import{join as O,basename as Oe,extname as We}from"path";import{fileURLToPath as $e}from"url";import{Http2ServerRequest as He}from"http2";import{TextEncoderStream as Ne,TextDecoderStream as Le,WritableStream as je,ReadableStream as Ue}from"stream/web";import{fetch as Ie,Headers as ze,Request as Fe,Response as Qe,FormData as Ge}from"undici";import Be from"crypto";import{_ as Je,a as Ke,v as Xe,q as Ye}from"./assets/@qwik-city-plan-8dfee6d4.mjs";import K from"express";import{fileURLToPath as Ve}from"node:url";import{join as le}from"node:path";import"@orama/orama";import"@prisma/client";var fe=class extends Error{constructor(e,t){super(t),this.status=e}};function qe(e,t){let n="Server Error";return t!=null&&(typeof t.message=="string"?n=t.message:n=String(t)),"<html>"+ue(e,n)+"</html>"}function ue(e,t){typeof e!="number"&&(e=500),typeof t=="string"?t=Ze(t):t="";const n=typeof t=="string"?"600px":"300px",r=e>=500?tt:et;return`
<head>
  <meta charset="utf-8">
  <meta http-equiv="Status" content="${e}">
  <title>${e} ${t}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { color: ${r}; background-color: #fafafa; padding: 30px; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif; }
    p { max-width: ${n}; margin: 60px auto 30px auto; background: white; border-radius: 4px; box-shadow: 0px 0px 50px -20px ${r}; overflow: hidden; }
    strong { display: inline-block; padding: 15px; background: ${r}; color: white; }
    span { display: inline-block; padding: 15px; }
  </style>
</head>
<body><p><strong>${e}</strong> <span>${t}</span></p></body>
`}var Ee=/[&<>]/g,Ze=e=>e.replace(Ee,t=>{switch(t){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";default:return""}}),et="#006ce9",tt="#713fc2",nt={lax:"Lax",none:"None",strict:"Strict"},rt={seconds:1,minutes:1*60,hours:1*60*60,days:1*60*60*24,weeks:1*60*60*24*7},at=(e,t,n)=>{const r=[`${e}=${t}`];typeof n.domain=="string"&&r.push(`Domain=${n.domain}`),typeof n.maxAge=="number"?r.push(`Max-Age=${n.maxAge}`):Array.isArray(n.maxAge)?r.push(`Max-Age=${n.maxAge[0]*rt[n.maxAge[1]]}`):typeof n.expires=="number"||typeof n.expires=="string"?r.push(`Expires=${n.expires}`):n.expires instanceof Date&&r.push(`Expires=${n.expires.toUTCString()}`),n.httpOnly&&r.push("HttpOnly"),typeof n.path=="string"&&r.push(`Path=${n.path}`);const i=st(n.sameSite);return i&&r.push(`SameSite=${i}`),n.secure&&r.push("Secure"),r.join("; ")};function V(e){try{return decodeURIComponent(e)}catch{return e}}var it=e=>{const t={};if(typeof e=="string"&&e!==""){const n=e.split(";");for(const r of n){const i=r.indexOf("=");i!==-1&&(t[V(r.slice(0,i).trim())]=V(r.slice(i+1).trim()))}}return t};function st(e){if(e===!0)return"Strict";if(e===!1)return"None";if(e)return nt[e]}var k=Symbol("request-cookies"),J=Symbol("response-cookies"),R=Symbol("live-cookies"),de,me,ot=class{constructor(e){this[de]={},this[me]={},this[k]=it(e),this[R]={...this[k]}}get(e,t=!0){const n=this[t?R:k][e];return n?{value:n,json(){return JSON.parse(n)},number(){return Number(n)}}:null}getAll(e=!0){return Object.keys(this[e?R:k]).reduce((t,n)=>(t[n]=this.get(n),t),{})}has(e,t=!0){return!!this[t?R:k][e]}set(e,t,n={}){this[R][e]=typeof t=="string"?t:JSON.stringify(t);const r=typeof t=="string"?t:encodeURIComponent(JSON.stringify(t));this[J][e]=at(e,r,n)}delete(e,t){this.set(e,"deleted",{...t,maxAge:0}),this[R][e]=null}headers(){return Object.values(this[J])}};de=J,me=R;var X=class{},W=class extends X{},q=new WeakMap,E="qaction",ct="qfunc";function lt(e){const{url:t,params:n,request:r,status:i,locale:a}=e,o={};r.headers.forEach((y,w)=>o[w]=y);const s=e.sharedMap.get(j),l=e.sharedMap.get(Se),c=e.sharedMap.get(be),f=e.sharedMap.get(At),d=e.request.headers,u=new URL(t.pathname+t.search,t),m=d.get("X-Forwarded-Host"),p=d.get("X-Forwarded-Proto");return m&&(u.port="",u.host=m),p&&(u.protocol=p),{url:u.href,requestHeaders:o,locale:a(),nonce:f,containerAttributes:{"q:route":c},qwikcity:{routeName:c,ev:e,params:{...n},loadedRoute:kt(e),response:{status:i(),loaders:U(e),action:s,formData:l}}}}var ft=(e,t,n,r,i)=>{const a=[],o=[],s=[],l=!!(t&&gt(t[2]));if(e&&Z(a,o,s,e,l,n),t){const c=t[0];r&&(n==="POST"||n==="PUT"||n==="PATCH"||n==="DELETE")&&s.unshift(yt),l&&(n==="POST"&&s.push(mt),s.push(ht),s.push(St)),s.push(bt),Z(a,o,s,t[2],l,n),l&&(s.push(f=>{f.sharedMap.set(be,c)}),s.push(ut(a,o)),s.push(i))}return s},Z=(e,t,n,r,i,a)=>{for(const o of r){typeof o.onRequest=="function"?n.push(o.onRequest):Array.isArray(o.onRequest)&&n.push(...o.onRequest);let s;switch(a){case"GET":{s=o.onGet;break}case"POST":{s=o.onPost;break}case"PUT":{s=o.onPut;break}case"PATCH":{s=o.onPatch;break}case"DELETE":{s=o.onDelete;break}case"OPTIONS":{s=o.onOptions;break}case"HEAD":{s=o.onHead;break}}if(typeof s=="function"?n.push(s):Array.isArray(s)&&n.push(...s),i){const l=Object.values(o).filter(f=>ee(f,"server_loader"));e.push(...l);const c=Object.values(o).filter(f=>ee(f,"server_action"));t.push(...c)}}},ee=(e,t)=>e&&typeof e=="function"&&e.__brand===t;function ut(e,t){return async n=>{if(n.headersSent){n.exit();return}const{method:r}=n,i=U(n),a=I(n)==="dev",o=n[L];if(a&&r==="GET"&&n.query.has(E)&&console.warn(`Seems like you are submitting a Qwik Action via GET request. Qwik Actions should be submitted via POST request.
Make sure your <form> has method="POST" attribute, like this: <form method="POST">`),r==="POST"){const s=n.query.get(E);if(s){const l=globalThis._qwikActionsMap,c=t.find(f=>f.__id===s)??(l==null?void 0:l.get(s));if(c){n.sharedMap.set(j,s);const f=await n.parseBody();if(!f||typeof f!="object")throw new Error("Expected request data to be an object");const d=await te(n,c.__validators,f,a);if(!d.success)i[s]=n.fail(d.status??500,d.error);else{const u=a?await H(n,c.__qrl.getSymbol().split("_",1)[0],()=>c.__qrl.call(n,d.data,n)):await c.__qrl.call(n,d.data,n);a&&$(o,u,c.__qrl),i[s]=u}}}}e.length>0&&await Promise.all(e.map(s=>{const l=s.__id;return i[l]=te(n,s.__validators,void 0,a).then(c=>c.success?a?H(n,s.__qrl.getSymbol().split("_",1)[0],()=>s.__qrl.call(n,n)):s.__qrl.call(n,n):n.fail(c.status??500,c.error)).then(c=>(typeof c=="function"?i[l]=c():(a&&$(o,c,s.__qrl),i[l]=c),c))}))}}async function te(e,t,n,r){let i={success:!0,data:n};if(t)for(const a of t)if(r?i=await H(e,"validator$",()=>a.validate(e,n)):i=await a.validate(e,n),i.success)n=i.data;else return i;return i}function dt(e){return e&&typeof e=="object"&&Symbol.asyncIterator in e}async function mt(e){const t=e.query.get(ct);if(t&&e.request.headers.get("X-QRL")===t&&e.request.headers.get("Content-Type")==="application/qwik-json"){e.exit();const n=I(e)==="dev",r=e[L],i=await e.parseBody();if(Array.isArray(i)){const[a,...o]=i;if(pt(a)&&a.getHash()===t){let s;try{n?s=await H(e,`server_${a.getSymbol()}`,()=>a.apply(e,o)):s=await a.apply(e,o)}catch(l){e.headers.set("Content-Type","application/qwik-json"),e.send(500,await r._serializeData(l,!0));return}if(dt(s)){e.headers.set("Content-Type","text/qwik-json-stream");const c=e.getWritableStream().getWriter();for await(const f of s){n&&$(r,f,a);const d=await r._serializeData(f,!0);if(e.signal.aborted)break;await c.write(N.encode(`${d}
`))}c.close()}else{$(r,s,a),e.headers.set("Content-Type","application/qwik-json");const l=await r._serializeData(s,!0);e.send(200,l)}return}}throw e.error(500,"Invalid request")}}function ht(e){const t=Y(e),{basePathname:n,pathname:r,url:i,sharedMap:a}=e;if(!a.has(C)&&r!==n&&!r.endsWith(".html")){if(t){if(!r.endsWith("/"))throw e.redirect(302,r+"/"+i.search)}else if(r.endsWith("/"))throw e.redirect(302,r.slice(0,r.length-1)+i.search)}}function $(e,t,n){try{e._verifySerializable(t,void 0)}catch(r){throw r instanceof Error&&n.dev&&(r.loc=n.dev),r}}var pt=e=>typeof e=="function"&&typeof e.getSymbol=="function";function gt(e){const t=e[e.length-1];return t&&typeof t.default=="function"}function he(e,t){return e.pathname.endsWith(v)?e.pathname.slice(0,-v.length+(t?1:0))+e.search:e.pathname}var N=new TextEncoder;function yt(e){if(xt(e.request.headers,"application/x-www-form-urlencoded","multipart/form-data","text/plain")){const n=e.request.headers.get("origin"),r=e.url.origin;if(n!==r)throw e.error(403,`CSRF check failed. Cross-site ${e.method} form submissions are forbidden.
The request origin "${n}" does not match the server origin "${r}".`)}}function wt(e){return async t=>{if(t.headersSent||t.sharedMap.has(C))return;t.request.headers.forEach((d,u)=>d);const r=t.headers;r.has("Content-Type")||r.set("Content-Type","text/html; charset=utf-8");const i=Y(t),{readable:a,writable:o}=new TextEncoderStream,s=t.getWritableStream(),l=a.pipeTo(s,{preventClose:!0}),c=o.getWriter(),f=t.status();try{const d=I(t)==="static",u=lt(t),m=await e({base:t.basePathname+"build/",stream:c,serverData:u,containerAttributes:{"q:render":d?"static":"",...u.containerAttributes}}),p={loaders:U(t),action:t.sharedMap.get(j),status:f!==200?f:200,href:he(t.url,i)};typeof m.html=="string"&&await c.write(m.html),t.sharedMap.set("qData",p)}finally{await c.ready,await c.close(),await l}await s.close()}}async function bt(e){if(e.sharedMap.has(C)){try{await e.next()}catch(a){if(!(a instanceof W))throw a}if(e.headersSent)return;const n=e.status(),r=e.headers.get("Location");if(n>=301&&n<=308&&r){const a=Tt(r);if(a){e.headers.set("Location",a),e.getWritableStream().close();return}else e.status(200),e.headers.delete("Location")}}}async function St(e){if(e.sharedMap.has(C)){if(await e.next(),e.headersSent||e.exited)return;const n=e.status(),r=e.headers.get("Location"),i=Y(e);e.request.headers.forEach((c,f)=>c),e.headers.set("Content-Type","application/json; charset=utf-8");const a={loaders:U(e),action:e.sharedMap.get(j),status:n!==200?n:200,href:he(e.url,i),redirect:r??void 0},o=e.getWritableStream().getWriter(),l=await e[L]._serializeData(a,!0);o.write(N.encode(l)),e.sharedMap.set("qData",a),o.close()}}function Tt(e){if(e.startsWith("/")){const t=v,n=new URL(e,"http://localhost");return(n.pathname.endsWith("/")?n.pathname.slice(0,-1):n.pathname)+(t.startsWith("/")?"":"/")+t+n.search}else return}function ne(){return typeof performance<"u"?performance.now():0}async function H(e,t,n){const r=ne();try{return await n()}finally{const i=ne()-r;let a=e.sharedMap.get("@serverTiming");a||e.sharedMap.set("@serverTiming",a=[]),a.push([t,i])}}function xt(e,...t){var n;const r=((n=e.get("content-type"))==null?void 0:n.split(/;,/,1)[0].trim())??"";return t.includes(r)}function Rt(e){const t=[];return e==="day"?e=60*60*24:e==="week"?e=60*60*24*7:e==="month"?e=60*60*24*30:e==="year"?e=60*60*24*365:e==="private"?e={private:!0,noCache:!0}:e==="immutable"?e={public:!0,immutable:!0,maxAge:60*60*24*365,staleWhileRevalidate:60*60*24*365}:e==="no-cache"&&(e={noCache:!0}),typeof e=="number"&&(e={maxAge:e,sMaxAge:e,staleWhileRevalidate:e}),e.immutable&&t.push("immutable"),e.maxAge&&t.push(`max-age=${e.maxAge}`),e.sMaxAge&&t.push(`s-maxage=${e.sMaxAge}`),e.noStore&&t.push("no-store"),e.noCache&&t.push("no-cache"),e.private&&t.push("private"),e.public&&t.push("public"),e.staleWhileRevalidate&&t.push(`stale-while-revalidate=${e.staleWhileRevalidate}`),e.staleIfError&&t.push(`stale-if-error=${e.staleIfError}`),t.join(", ")}var vt=e=>e&&typeof e.then=="function",pe=Symbol("RequestEvLoaders"),ge=Symbol("RequestEvMode"),ye=Symbol("RequestEvRoute"),L=Symbol("RequestEvQwikSerializer"),we=Symbol("RequestEvTrailingSlash"),be="@routeName",j="@actionId",Se="@actionFormData",At="@nonce";function _t(e,t,n,r,i,a,o,s){const{request:l,platform:c,env:f}=e,d=new Map,u=new ot(l.headers.get("cookie")),m=new Headers,p=new URL(l.url);p.pathname.endsWith(v)&&(p.pathname=p.pathname.slice(0,-Te),i&&!p.pathname.endsWith("/")&&(p.pathname+="/"),d.set(C,!0)),d.set("@manifest",r);let y=-1,w=null,b,A=e.locale,S=200;const Ae=async()=>{for(y++;y<n.length;){const h=n[y],g=h(x);vt(g)&&await g,y++}},_=()=>{if(w!==null)throw new Error("Response already sent")},P=(h,g)=>{if(_(),typeof h=="number"){S=h;const M=x.getWritableStream().getWriter();M.write(typeof g=="string"?N.encode(g):g),M.close()}else if(S=h.status,h.headers.forEach((T,M)=>{m.append(M,T)}),h.body){const T=x.getWritableStream();h.body.pipeTo(T)}else{if(S>=300&&S<400)return new W;x.getWritableStream().getWriter().close()}return z()},z=()=>(y=re,new X),F={},x={[pe]:F,[ge]:e.mode,[we]:i,[ye]:t,[L]:o,cookie:u,headers:m,env:f,method:l.method,signal:l.signal,params:(t==null?void 0:t[1])??{},pathname:p.pathname,platform:c,query:p.searchParams,request:l,url:p,basePathname:a,sharedMap:d,get headersSent(){return w!==null},get exited(){return y>=re},get clientConn(){return e.getClientConn()},next:Ae,exit:z,cacheControl:h=>{_(),m.set("Cache-Control",Rt(h))},resolveValue:async h=>{const g=h.__id;if(h.__brand==="server_loader"&&!(g in F))throw new Error("You can not get the returned data of a loader that has not been executed for this request.");return F[g]},status:h=>typeof h=="number"?(_(),S=h,h):S,locale:h=>(typeof h=="string"&&(A=h),A||""),error:(h,g)=>(S=h,m.delete("Cache-Control"),new fe(h,g)),redirect:(h,g)=>{if(_(),S=h,g){const T=g.replace(/([^:])\/{2,}/g,"$1/");g!==T&&console.warn(`Redirect URL ${g} is invalid, fixing to ${T}`),m.set("Location",T)}return m.delete("Cache-Control"),h>301&&m.set("Cache-Control","no-store"),z(),new W},defer:h=>typeof h=="function"?h:()=>h,fail:(h,g)=>(_(),S=h,m.delete("Cache-Control"),{failed:!0,...g}),text:(h,g)=>(m.set("Content-Type","text/plain; charset=utf-8"),P(h,g)),html:(h,g)=>(m.set("Content-Type","text/html; charset=utf-8"),P(h,g)),parseBody:async()=>b!==void 0?b:b=Ct(x.request,d,o),json:(h,g)=>(m.set("Content-Type","application/json; charset=utf-8"),P(h,JSON.stringify(g))),send:P,isDirty:()=>w!==null,getWritableStream:()=>{if(w===null){if(e.mode==="dev"){const h=d.get("@serverTiming");h&&m.set("Server-Timing",h.map(g=>`${g[0]};dur=${g[1]}`).join(","))}w=e.getWritableStream(S,m,u,s,x)}return w}};return Object.freeze(x)}function U(e){return e[pe]}function Y(e){return e[we]}function kt(e){return e[ye]}function I(e){return e[ge]}var re=Number.MAX_SAFE_INTEGER,Ct=async(e,t,n)=>{var r;const i=e.clone(),a=((r=e.headers.get("content-type"))==null?void 0:r.split(/[;,]/,1)[0].trim())??"";if(a==="application/x-www-form-urlencoded"||a==="multipart/form-data"){const o=await i.formData();return t.set(Se,o),Dt(o)}else{if(a==="application/json")return await i.json();if(a==="application/qwik-json")return n._deserializeData(await i.text())}},Dt=e=>[...e.entries()].reduce((n,[r,i])=>(r.split(".").reduce((a,o,s,l)=>{if(o.endsWith("[]")){const c=o.slice(0,-2);return a[c]=a[c]||[],a[c]=[...a[c],i]}return s<l.length-1?a[o]=a[o]||(Number.isNaN(+l[s+1])?{}:[]):a[o]=i},n),n),{});function Pt(e,t,n,r,i=!0,a="/",o){let s;const l=new Promise(f=>s=f),c=_t(e,t,n,r,i,a,o,s);return{response:l,requestEv:c,completion:Mt(c,s)}}async function Mt(e,t){try{await e.next()}catch(n){if(n instanceof W)await e.getWritableStream().close();else if(n instanceof fe){if(console.error(n),!e.headersSent){const r=qe(n.status,n),i=n.status;e.html(i,r)}}else if(!(n instanceof X)){if(I(e)!=="dev")try{e.headersSent||(e.headers.set("content-type","text/html; charset=utf-8"),e.cacheControl({noCache:!0}),e.status(500));const r=e.getWritableStream();if(!r.locked){const i=r.getWriter();await i.write(N.encode(ue(500,"Internal Server Error"))),await i.close()}}catch{console.error("Unable to render error page")}return n}}finally{e.isDirty()||t(null)}}function Ot(e,t){if(e.endsWith(v)){const n=e.length-Te+(t?1:0);e=e.slice(0,n),e===""&&(e="/")}return e}var C="@isQData",v="/q-data.json",Te=v.length;function Wt(e,t){const n=se(e),r=ae(e),i=se(t),a=ae(t);return xe(e,n,r,t,i,a)}function xe(e,t,n,r,i,a){let o=null;for(;t<n;){const s=e.charCodeAt(t++),l=r.charCodeAt(i++);if(s===91){const c=Re(e,t),f=t+(c?3:0),d=Q(e,f,n,93),u=e.substring(f,d),m=Q(e,d+1,n,47),p=e.substring(d+1,m);t=d+1;const y=i-1;if(c){const A=Ht(u,p,r,y,a,e,t+p.length+1,n);if(A)return Object.assign(o||(o={}),A)}const w=Q(r,y,a,47,p);if(w==-1)return null;const b=r.substring(y,w);if(!c&&!p&&!b)return null;i=w,(o||(o={}))[u]=decodeURIComponent(b)}else if(s!==l&&!(isNaN(l)&&$t(e,t)))return null}return ie(e,t)&&ie(r,i)?o||{}:null}function $t(e,t){return e.charCodeAt(t)===91&&Re(e,t+1)}function ae(e){const t=e.length;return t>1&&e.charCodeAt(t-1)===47?t-1:t}function ie(e,t){const n=e.length;return t>=n||t==n-1&&e.charCodeAt(t)===47}function se(e){return e.charCodeAt(0)===47?1:0}function Re(e,t){return e.charCodeAt(t)===46&&e.charCodeAt(t+1)===46&&e.charCodeAt(t+2)===46}function Q(e,t,n,r,i=""){for(;t<n&&e.charCodeAt(t)!==r;)t++;const a=i.length;for(let o=0;o<a;o++)if(e.charCodeAt(t-a+o)!==i.charCodeAt(o))return-1;return t-a}function Ht(e,t,n,r,i,a,o,s){n.charCodeAt(r)===47&&r++;let l=i;const c=t+"/";let f=5;for(;l>=r&&f--;){const d=xe(a,o,s,n,l,i);if(d){let u=n.substring(r,Math.min(l,i));return u.endsWith(c)&&(u=u.substring(0,u.length-c.length)),d[e]=decodeURIComponent(u),d}l=Nt(n,r,c,l,r-1)+c.length}return null}function Nt(e,t,n,r,i){let a=e.lastIndexOf(n,r);return a==r-n.length&&(a=e.lastIndexOf(n,r-n.length-1)),a>t?a:i}var Lt=async(e,t,n,r)=>{if(Array.isArray(e))for(const i of e){const a=i[0],o=Wt(a,r);if(o){const s=i[1],l=i[3],c=new Array(s.length),f=[],d=jt(t,r);let u;return s.forEach((m,p)=>{oe(m,f,y=>c[p]=y,n)}),oe(d,f,m=>u=m==null?void 0:m.default,n),f.length>0&&await Promise.all(f),[a,o,c,u,l]}}return null},oe=(e,t,n,r)=>{if(typeof e=="function"){const i=q.get(e);if(i)n(i);else{const a=e();typeof a.then=="function"?t.push(a.then(o=>{r!==!1&&q.set(e,o),n(o)})):a&&n(a)}}},jt=(e,t)=>{if(e){t=t.endsWith("/")?t:t+"/";const n=e.find(r=>r[0]===t||t.startsWith(r[0]+(t.endsWith("/")?"":"/")));if(n)return n[1]}};async function Ut(e,t,n){const{render:r,qwikCityPlan:i,manifest:a,checkOrigin:o}=t,s=e.url.pathname,l=Ot(s,i.trailingSlash),c=await It(i,l,e.request.method,o??!0,r);return c?Pt(e,c[0],c[1],a,i.trailingSlash,i.basePathname,n):null}async function It(e,t,n,r,i){const{routes:a,serverPlugins:o,menus:s,cacheModules:l}=e,c=await Lt(a,s,l,t),f=ft(o,c,n,r,wt(i));return f.length>0?[c,f]:null}function G(e,t){var n;return((n=t==null?void 0:t.getOrigin)==null?void 0:n.call(t,e))??(t==null?void 0:t.origin)??process.env.ORIGIN??zt(e)}function zt(e){const{PROTOCOL_HEADER:t,HOST_HEADER:n}=process.env,r=e.headers,i=t&&r[t]||(e.socket.encrypted||e.connection.encrypted?"https":"http"),a=n??(e instanceof He?":authority":"host"),o=r[a];return`${i}://${o}`}function B(e,t){return Qt(e.originalUrl||e.url||"/",t)}var Ft=/\/\/|\\\\/g;function Qt(e,t){return new URL(e.replace(Ft,"/"),t)}async function Gt(e,t,n,r,i){const a=new Headers,o=t.headers;for(const u in o){const m=o[u];if(typeof m=="string")a.set(u,m);else if(Array.isArray(m))for(const p of m)a.append(u,p)}const s=async function*(){for await(const u of t)yield u},l=t.method==="HEAD"||t.method==="GET"?void 0:s(),c=new AbortController,f={method:t.method,headers:a,body:l,signal:c.signal,duplex:"half"};return n.on("close",()=>{c.abort()}),{mode:r,url:e,request:new Request(e.href,f),env:{get(u){return process.env[u]}},getWritableStream:(u,m,p)=>{n.statusCode=u,m.forEach((w,b)=>n.setHeader(b,w));const y=p.headers();return y.length>0&&n.setHeader("Set-Cookie",y),new WritableStream({write(w){n.closed||n.write(w,b=>{b&&console.error(b)})},close(){n.end()}})},getClientConn:()=>i?i(t):{ip:t.socket.remoteAddress},platform:{ssr:!0,incomingMessage:t,node:process.versions.node},locale:void 0}}var Bt={"3gp":"video/3gpp","3gpp":"video/3gpp",asf:"video/x-ms-asf",asx:"video/x-ms-asf",avi:"video/x-msvideo",avif:"image/avif",bmp:"image/x-ms-bmp",css:"text/css",flv:"video/x-flv",gif:"image/gif",htm:"text/html",html:"text/html",ico:"image/x-icon",jng:"image/x-jng",jpeg:"image/jpeg",jpg:"image/jpeg",js:"application/javascript",json:"application/json",kar:"audio/midi",m4a:"audio/x-m4a",m4v:"video/x-m4v",mid:"audio/midi",midi:"audio/midi",mng:"video/x-mng",mov:"video/quicktime",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",mpg:"video/mpeg",ogg:"audio/ogg",pdf:"application/pdf",png:"image/png",rar:"application/x-rar-compressed",shtml:"text/html",svg:"image/svg+xml",svgz:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",txt:"text/plain",wbmp:"image/vnd.wap.wbmp",webm:"video/webm",webp:"image/webp",wmv:"video/x-ms-wmv",woff:"font/woff",woff2:"font/woff2",xml:"text/xml",zip:"application/zip"};function Jt(){typeof global<"u"&&typeof globalThis.fetch!="function"&&typeof process<"u"&&process.versions.node&&(globalThis.fetch=Ie,globalThis.Headers=ze,globalThis.Request=Fe,globalThis.Response=Qe,globalThis.FormData=Ge),typeof globalThis.TextEncoderStream>"u"&&(globalThis.TextEncoderStream=Ne,globalThis.TextDecoderStream=Le),typeof globalThis.WritableStream>"u"&&(globalThis.WritableStream=je,globalThis.ReadableStream=Ue),typeof globalThis.crypto>"u"&&(globalThis.crypto=Be.webcrypto)}function Kt(e){var t;Jt();const n={_deserializeData:Je,_serializeData:Ke,_verifySerializable:Xe};e.manifest&&_e(e.manifest);const r=((t=e.static)==null?void 0:t.root)??O($e(import.meta.url),"..","..","dist");return{router:async(s,l,c)=>{try{const f=G(s,e),d=await Gt(B(s,f),s,l,"server",e.getClientConn),u=await Ut(d,e,n);if(u){const m=await u.completion;if(m)throw m;if(u.requestEv.headersSent)return}c()}catch(f){console.error(f),c(f)}},notFound:async(s,l,c)=>{try{if(!l.headersSent){const f=G(s,e),d=B(s,f),u=De(d.pathname);l.writeHead(404,{"Content-Type":"text/html; charset=utf-8","X-Not-Found":d.pathname}),l.end(u)}}catch(f){console.error(f),c(f)}},staticFile:async(s,l,c)=>{var f;try{const d=G(s,e),u=B(s,d);if(Pe(s.method||"GET",u)){const m=u.pathname;let p;Oe(m).includes(".")?p=O(r,m):e.qwikCityPlan.trailingSlash?p=O(r,m+"index.html"):p=O(r,m,"index.html");const y=Me(p),w=We(p).replace(/^\./,""),b=Bt[w];b&&l.setHeader("Content-Type",b),(f=e.static)!=null&&f.cacheControl&&l.setHeader("Cache-Control",e.static.cacheControl),y.on("error",c),y.pipe(l);return}return c()}catch(d){console.error(d),c(d)}}}}const ve=le(Ve(import.meta.url),"..","..","dist"),Xt=le(ve,"build"),ce=process.env.PORT??80,{router:Yt,notFound:Vt}=Kt({render:ke,qwikCityPlan:Ye,manifest:Ce}),D=K();D.use("/build",K.static(Xt,{immutable:!0,maxAge:"1y"}));D.use(K.static(ve,{redirect:!1}));D.use(Yt);D.use(Vt);D.listen(ce,()=>{console.log(`Server started: http://localhost:${ce}/`)});
