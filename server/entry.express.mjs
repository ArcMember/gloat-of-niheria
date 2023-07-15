import{setServerPlatform as de}from"@builder.io/qwik/server";import{getNotFound as ue}from"./@qwik-city-not-found-paths.js";import{q as pe}from"./assets/@qwik-city-plan-690e175a.mjs";import{isStaticPath as me}from"./@qwik-city-static-paths.js";import{createReadStream as he}from"fs";import{join as U,extname as ge}from"path";import{fileURLToPath as ye}from"url";import{Http2ServerRequest as we}from"http2";import{TextEncoderStream as be,TextDecoderStream as Se,WritableStream as xe,ReadableStream as ve}from"stream/web";import{fetch as Re,Headers as Te,Request as ke,Response as Ae,FormData as _e}from"undici";import Pe from"crypto";import{_deserializeData as De,_serializeData as We,_verifySerializable as Me}from"@builder.io/qwik";import{r as He,m as Oe}from"./assets/entry.ssr-3f10120f.mjs";import C from"express";import{fileURLToPath as je}from"node:url";import{join as X}from"node:path";import"@builder.io/qwik/jsx-runtime";var V=class extends Error{constructor(e,t){super(t),this.status=e}};function $e(e,t){let a="Server Error";return t!=null&&(typeof t.message=="string"?a=t.message:a=String(t)),"<html>"+Z(e,a)+"</html>"}function Z(e,t){typeof e!="number"&&(e=500),typeof t=="string"?t=Le(t):t="";const a=typeof t=="string"?"600px":"300px",r=e>=500?ze:Ie;return`
<head>
  <meta charset="utf-8">
  <meta http-equiv="Status" content="${e}">
  <title>${e} ${t}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { color: ${r}; background-color: #fafafa; padding: 30px; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif; }
    p { max-width: ${a}; margin: 60px auto 30px auto; background: white; border-radius: 4px; box-shadow: 0px 0px 50px -20px ${r}; overflow: hidden; }
    strong { display: inline-block; padding: 15px; background: ${r}; color: white; }
    span { display: inline-block; padding: 15px; }
  </style>
</head>
<body><p><strong>${e}</strong> <span>${t}</span></p></body>
`}var Ce=/[&<>]/g,Le=e=>e.replace(Ce,t=>{switch(t){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";default:return""}}),Ie="#006ce9",ze="#713fc2",F={lax:"Lax",none:"None",strict:"Strict"},Ue={seconds:1,minutes:1*60,hours:1*60*60,days:1*60*60*24,weeks:1*60*60*24*7},Fe=(e,t,a)=>{const r=[`${e}=${t}`];return typeof a.domain=="string"&&r.push(`Domain=${a.domain}`),typeof a.maxAge=="number"?r.push(`Max-Age=${a.maxAge}`):Array.isArray(a.maxAge)?r.push(`Max-Age=${a.maxAge[0]*Ue[a.maxAge[1]]}`):typeof a.expires=="number"||typeof a.expires=="string"?r.push(`Expires=${a.expires}`):a.expires instanceof Date&&r.push(`Expires=${a.expires.toUTCString()}`),a.httpOnly&&r.push("HttpOnly"),typeof a.path=="string"&&r.push(`Path=${a.path}`),a.sameSite&&F[a.sameSite]&&r.push(`SameSite=${F[a.sameSite]}`),a.secure&&r.push("Secure"),r.join("; ")},Ne=e=>{const t={};if(typeof e=="string"&&e!==""){const a=e.split(";");for(const r of a){const i=r.split("=");i.length>1&&(t[decodeURIComponent(i[0].trim())]=decodeURIComponent(i[1].trim()))}}return t},_=Symbol("request-cookies"),$=Symbol("response-cookies"),ee,Qe=class{constructor(e){this[ee]={},this[_]=Ne(e)}get(e){const t=this[_][e];return t?{value:t,json(){return JSON.parse(t)},number(){return Number(t)}}:null}getAll(){return Object.keys(this[_]).reduce((e,t)=>(e[t]=this.get(t),e),{})}has(e){return!!this[_][e]}set(e,t,a={}){const r=typeof t=="string"?t:encodeURIComponent(JSON.stringify(t));this[$][e]=Fe(e,r,a)}delete(e,t){this.set(e,"deleted",{...t,maxAge:0})}headers(){return Object.values(this[$])}};ee=$;var P=class{},D=class extends P{},N=new WeakMap,qe="qaction",Ee="qfunc";function Be(e){const{url:t,params:a,request:r,status:i,locale:c}=e,n={};r.headers.forEach((o,l)=>n[l]=o);const s=e.sharedMap.get(M),f=e.sharedMap.get(se),u=e.sharedMap.get(rt);return{url:new URL(t.pathname+t.search,t).href,requestHeaders:n,locale:c(),nonce:u,qwikcity:{params:{...a},loadedRoute:it(e),response:{status:i(),loaders:H(e),action:s,formData:f}}}}var Ge=(e,t,a,r)=>{const i=[],c=[],n=[],s=!!(t&&Xe(t[1]));return e&&Q(i,c,n,e,s,a),t&&(s&&(a==="POST"&&(n.unshift(Ve),n.push(Je)),n.push(Ke),n.push(et)),Q(i,c,n,t[1],s,a),s&&(i.length+E.length>0&&n.push(E(i,c)),n.push(r))),n},Q=(e,t,a,r,i,c)=>{for(const n of r){typeof n.onRequest=="function"?a.push(n.onRequest):Array.isArray(n.onRequest)&&a.push(...n.onRequest);let s;switch(c){case"GET":{s=n.onGet;break}case"POST":{s=n.onPost;break}case"PUT":{s=n.onPut;break}case"PATCH":{s=n.onPatch;break}case"DELETE":{s=n.onDelete;break}case"OPTIONS":{s=n.onOptions;break}case"HEAD":{s=n.onHead;break}}if(typeof s=="function"?a.push(s):Array.isArray(s)&&a.push(...s),i){const f=Object.values(n).filter(o=>q(o,"server_loader"));e.push(...f);const u=Object.values(n).filter(o=>q(o,"server_action"));t.push(...u)}}},q=(e,t)=>e&&typeof e=="function"&&e.__brand===t;function E(e,t){return async a=>{if(a.headersSent){a.exit();return}const{method:r}=a,i=H(a),c=a[W];if(r==="POST"){const n=a.query.get(qe);if(n){const s=globalThis._qwikActionsMap,f=t.find(u=>u.__id===n)??(s==null?void 0:s.get(n));if(f){a.sharedMap.set(M,n);const u=await a.parseBody();if(!u||typeof u!="object")throw new Error("Expected request data to be an object");const o=await B(a,f.__validators,u);if(!o.success)i[n]=a.fail(o.status??500,o.error);else{const l=await f.__qrl(o.data,a);f.__qrl,i[n]=l}}}}e.length>0&&await Promise.all(e.map(n=>{const s=n.__id;return i[s]=B(a,n.__validators,void 0).then(f=>f.success?n.__qrl(a):a.fail(f.status??500,f.error)).then(f=>(typeof f=="function"?i[s]=f():(n.__qrl,i[s]=f),f))}))}}async function B(e,t,a){let r={success:!0,data:a};if(t)for(const i of t)if(r=await i.validate(e,a),r.success)a=r.data;else return r;return r}async function Je(e){const t=e.query.get(Ee);if(t&&e.request.headers.get("X-QRL")===t&&e.request.headers.get("Content-Type")==="application/qwik-json"){e.exit();const a=e[W],r=await e.parseBody();if(Array.isArray(r)){const[i,...c]=r;if(Ye(i)&&i.getHash()===t){const n=await i.apply(e,c);e.headers.set("Content-Type","application/qwik-json"),e.send(200,await a._serializeData(n,!0));return}}throw e.error(500,"Invalid request")}}function Ke(e){const t=I(e),{basePathname:a,pathname:r,url:i}=e;if(!ce(r)&&r!==a&&!r.endsWith(".html")){if(t){if(!r.endsWith("/"))throw e.redirect(302,r+"/"+i.search)}else if(r.endsWith("/"))throw e.redirect(302,r.slice(0,r.length-1)+i.search)}}var Ye=e=>typeof e=="function"&&typeof e.getSymbol=="function";function Xe(e){const t=e[e.length-1];return t&&typeof t.default=="function"}function te(e,t){return e.pathname.endsWith(S)?e.pathname.slice(0,-S.length+(t?1:0))+e.search:e.pathname}var L=new TextEncoder;function Ve({url:e,request:t,error:a}){let r=t.headers.get("origin"),i=e.origin;if(r!==i)throw a(403,`Cross-site ${t.method} form submissions are forbidden`)}function Ze(e){return async t=>{if(t.headersSent||t.pathname.endsWith(S))return;t.request.headers.forEach((l,m)=>l);const r=t.headers;r.has("Content-Type")||r.set("Content-Type","text/html; charset=utf-8");const i=I(t),{readable:c,writable:n}=new TextEncoderStream,s=t.getWritableStream(),f=c.pipeTo(s,{preventClose:!0}),u=n.getWriter(),o=t.status();try{const l=oe(t)==="static",m=await e({base:t.basePathname+"build/",stream:u,serverData:Be(t),containerAttributes:{["q:render"]:l?"static":""}}),p={loaders:H(t),action:t.sharedMap.get(M),status:o!==200?o:200,href:te(t.url,i)};(typeof m).html==="string"&&await u.write(m.html),t.sharedMap.set("qData",p)}finally{await u.ready,await u.close(),await f}await s.close()}}async function et(e){if(ce(e.pathname)){try{await e.next()}catch(o){if(!(o instanceof D))throw o}if(e.headersSent||e.exited)return;const a=e.status(),r=e.headers.get("Location"),i=I(e);if(a>=301&&a<=308&&r){const o=tt(r);if(o){e.headers.set("Location",o),e.getWritableStream().close();return}else e.status(200),e.headers.delete("Location")}e.request.headers.forEach((o,l)=>o),e.headers.set("Content-Type","application/json; charset=utf-8");const n={loaders:H(e),action:e.sharedMap.get(M),status:a!==200?a:200,href:te(e.url,i),redirect:r??void 0},s=e.getWritableStream().getWriter(),u=await e[W]._serializeData(n,!0);s.write(L.encode(u)),e.sharedMap.set("qData",n),s.close()}}function tt(e){if(e.startsWith("/")){const t=S,a=new URL(e,"http://localhost");return(a.pathname.endsWith("/")?a.pathname.slice(0,-1):a.pathname)+(t.startsWith("/")?"":"/")+t+a.search}else return}function at(e){const t=[];return e==="day"?e=60*60*24:e==="week"?e=60*60*24*7:e==="month"?e=60*60*24*30:e==="year"?e=60*60*24*365:e==="private"?e={private:!0,noCache:!0}:e==="immutable"?e={public:!0,immutable:!0,maxAge:60*60*24*365,staleWhileRevalidate:60*60*24*365}:e==="no-cache"&&(e={noCache:!0}),typeof e=="number"&&(e={maxAge:e,sMaxAge:e,staleWhileRevalidate:e}),e.immutable&&t.push("immutable"),e.maxAge&&t.push(`max-age=${e.maxAge}`),e.sMaxAge&&t.push(`s-maxage=${e.sMaxAge}`),e.noStore&&t.push("no-store"),e.noCache&&t.push("no-cache"),e.private&&t.push("private"),e.public&&t.push("public"),e.staleWhileRevalidate&&t.push(`stale-while-revalidate=${e.staleWhileRevalidate}`),t.join(", ")}var ae=Symbol("RequestEvLoaders"),re=Symbol("RequestEvMode"),ne=Symbol("RequestEvRoute"),W=Symbol("RequestEvQwikSerializer"),ie=Symbol("RequestEvTrailingSlash"),M="@actionId",se="@actionFormData",rt="@nonce";function nt(e,t,a,r=!0,i="/",c,n){const{request:s,platform:f,env:u}=e,o=new Qe(s.headers.get("cookie")),l=new Headers,m=new URL(s.url);let p=-1,y=null,g,R=e.locale,w=200;const fe=async()=>{for(p++;p<a.length;){const d=a[p],h=d(b);h instanceof Promise&&await h,p++}},x=()=>{if(y!==null)throw new Error("Response already sent")},T=(d,h)=>{if(x(),typeof d=="number"){w=d;const A=b.getWritableStream().getWriter();A.write(typeof h=="string"?L.encode(h):h),A.close()}else if(w=d.status,d.headers.forEach((k,A)=>{l.append(A,k)}),d.body){const k=b.getWritableStream();d.body.pipeTo(k)}else{if(w>=300&&w<400)return new D;b.getWritableStream().getWriter().close()}return new P},O={},z=new Map,b={[ae]:O,[re]:e.mode,[ie]:r,[ne]:t,[W]:c,cookie:o,headers:l,env:u,method:s.method,params:(t==null?void 0:t[0])??{},pathname:m.pathname,platform:f,query:m.searchParams,request:s,url:m,basePathname:i,sharedMap:z,get headersSent(){return y!==null},get exited(){return p>=G},next:fe,exit:()=>(p=G,new P),cacheControl:d=>{x(),l.set("Cache-Control",at(d))},resolveValue:async d=>{const h=d.__id;if(d.__brand==="server_loader"&&!(h in O))throw new Error("You can not get the returned data of a loader that has not been executed for this request.");return O[h]},status:d=>typeof d=="number"?(x(),w=d,d):w,locale:d=>(typeof d=="string"&&(R=d),R||""),error:(d,h)=>(w=d,l.delete("Cache-Control"),new V(d,h)),redirect:(d,h)=>(x(),w=d,l.set("Location",h),l.delete("Cache-Control"),d>301&&l.set("Cache-Control","no-store"),new D),defer:d=>typeof d=="function"?d:()=>d,fail:(d,h)=>(x(),w=d,l.delete("Cache-Control"),{failed:!0,...h}),text:(d,h)=>(l.set("Content-Type","text/plain; charset=utf-8"),T(d,h)),html:(d,h)=>(l.set("Content-Type","text/html; charset=utf-8"),T(d,h)),parseBody:async()=>g!==void 0?g:g=st(b.request,z,c),json:(d,h)=>(l.set("Content-Type","application/json; charset=utf-8"),T(d,JSON.stringify(h))),send:T,isDirty:()=>y!==null,getWritableStream:()=>(y===null&&(y=e.getWritableStream(w,l,o,n,b)),y)};return Object.freeze(b)}function H(e){return e[ae]}function I(e){return e[ie]}function it(e){return e[ne]}function oe(e){return e[re]}var G=999999999,st=async(e,t,a)=>{var r;const i=e.clone(),c=((r=e.headers.get("content-type"))==null?void 0:r.split(/[;,]/,1)[0].trim())??"";if(c==="application/x-www-form-urlencoded"||c==="multipart/form-data"){const n=await i.formData();return t.set(se,n),ot(n)}else{if(c==="application/json")return await i.json();if(c==="application/qwik-json")return a._deserializeData(await i.text())}},ot=e=>{const t={};return e.forEach((a,r)=>{const i=r.split(".").filter(n=>n);let c=t;for(let n=0;n<i.length;n++){let s=i[n];n===i.length-1?s.endsWith("[]")?(s=s.slice(0,-2),c[s]=c[s]||[],c[s].push(a)):c[s]=a:c=c[s]={}}}),t};function ct(e,t,a,r=!0,i="/",c){let n;const s=new Promise(u=>n=u),f=nt(e,t,a,r,i,c,n);return{response:s,requestEv:f,completion:lt(f,n)}}async function lt(e,t){try{await e.next()}catch(a){if(a instanceof D)await e.getWritableStream().close();else if(a instanceof V){if(console.error(a),!e.headersSent){const r=$e(a.status,a);e.html(a.status,r)}}else if(!(a instanceof P)){if(oe(e)!=="dev")try{e.headersSent||(e.headers.set("content-type","text/html; charset=utf-8"),e.cacheControl({noCache:!0}),e.status(500));const r=e.getWritableStream();if(!r.locked){const i=r.getWriter();await i.write(L.encode(Z(500,"Internal Server Error"))),await i.close()}}catch{console.error("Unable to render error page")}return a}}finally{e.isDirty()||t(null)}}function ft(e,t){if(e.endsWith(S)){const a=e.length-dt+(t?1:0);e=e.slice(0,a),e===""&&(e="/")}return e}var ce=e=>e.endsWith(S),S="/q-data.json",dt=S.length,ut=async(e,t,a,r)=>{if(Array.isArray(e))for(const i of e){const c=i[0].exec(r);if(c){const n=i[1],s=mt(i[2],c),f=i[4],u=new Array(n.length),o=[],l=pt(t,r);let m;return n.forEach((p,y)=>{J(p,o,g=>u[y]=g,a)}),J(l,o,p=>m=p==null?void 0:p.default,a),o.length>0&&await Promise.all(o),[s,u,m,f]}}return null},J=(e,t,a,r)=>{if(typeof e=="function"){const i=N.get(e);if(i)a(i);else{const c=e();typeof c.then=="function"?t.push(c.then(n=>{r!==!1&&N.set(e,n),a(n)})):c&&a(c)}}},pt=(e,t)=>{if(e){t=t.endsWith("/")?t:t+"/";const a=e.find(r=>r[0]===t||t.startsWith(r[0]+(t.endsWith("/")?"":"/")));if(a)return a[1]}},mt=(e,t)=>{const a={};if(e)for(let r=0;r<e.length;r++){const i=(t==null?void 0:t[r+1])??"",c=i.endsWith("/")?i.slice(0,-1):i;a[e[r]]=decodeURIComponent(c)}return a};async function ht(e,t,a){const{render:r,qwikCityPlan:i}=t,{routes:c,serverPlugins:n,menus:s,cacheModules:f,trailingSlash:u,basePathname:o}=i,l=e.url.pathname,m=ft(l,u),p=await gt(n,c,s,f,m,e.request.method,r);return p?ct(e,p[0],p[1],u,o,a):null}async function gt(e,t,a,r,i,c,n){const s=await ut(t,a,r,i),f=Ge(e,s,c,Ze(n));return f.length>0?[s,f]:null}var{ORIGIN:yt,PROTOCOL_HEADER:K,HOST_HEADER:wt}=process.env;function bt(e){const t=e.headers,a=K&&t[K]||(e.socket.encrypted||e.connection.encrypted?"https":"http"),r=wt??(e instanceof we?":authority":"host"),i=t[r];return`${a}://${i}`}function j(e){const t=yt??bt(e);return new URL(e.originalUrl||e.url||"/",t)}async function St(e,t,a,r){const i=new Headers,c=t.headers;for(const o in c){const l=c[o];if(typeof l=="string")i.set(o,l);else if(Array.isArray(l))for(const m of l)i.append(o,m)}const n=async function*(){for await(const o of t)yield o},s=t.method==="HEAD"||t.method==="GET"?void 0:n(),f={method:t.method,headers:i,body:s,duplex:"half"};return{mode:r,url:e,request:new Request(e.href,f),env:{get(o){return process.env[o]}},getWritableStream:(o,l,m)=>{a.statusCode=o,l.forEach((g,R)=>a.setHeader(R,g));const p=m.headers();return p.length>0&&a.setHeader("Set-Cookie",p),new WritableStream({write(g){a.write(g)},close(){a.end()}})},platform:{ssr:!0,incomingMessage:t,node:process.versions.node},locale:void 0}}var xt={"3gp":"video/3gpp","3gpp":"video/3gpp",asf:"video/x-ms-asf",asx:"video/x-ms-asf",avi:"video/x-msvideo",avif:"image/avif",bmp:"image/x-ms-bmp",css:"text/css",flv:"video/x-flv",gif:"image/gif",htm:"text/html",html:"text/html",ico:"image/x-icon",jng:"image/x-jng",jpeg:"image/jpeg",jpg:"image/jpeg",js:"application/javascript",json:"application/json",kar:"audio/midi",m4a:"audio/x-m4a",m4v:"video/x-m4v",mid:"audio/midi",midi:"audio/midi",mng:"video/x-mng",mov:"video/quicktime",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",mpg:"video/mpeg",ogg:"audio/ogg",pdf:"application/pdf",png:"image/png",rar:"application/x-rar-compressed",shtml:"text/html",svg:"image/svg+xml",svgz:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",txt:"text/plain",wbmp:"image/vnd.wap.wbmp",webm:"video/webm",webp:"image/webp",wmv:"video/x-ms-wmv",woff:"font/woff",woff2:"font/woff2",xml:"text/xml",zip:"application/zip"};function vt(){typeof global<"u"&&typeof globalThis.fetch!="function"&&typeof process<"u"&&process.versions.node&&(globalThis.fetch=Re,globalThis.Headers=Te,globalThis.Request=ke,globalThis.Response=Ae,globalThis.FormData=_e),typeof globalThis.TextEncoderStream>"u"&&(globalThis.TextEncoderStream=be,globalThis.TextDecoderStream=Se),typeof globalThis.WritableStream>"u"&&(globalThis.WritableStream=xe,globalThis.ReadableStream=ve),typeof globalThis.crypto>"u"&&(globalThis.crypto=Pe.webcrypto)}function Rt(e){var t;vt();const a={_deserializeData:De,_serializeData:We,_verifySerializable:Me};e.manifest&&de(e.manifest);const r=((t=e.static)==null?void 0:t.root)??U(ye(import.meta.url),"..","..","dist");return{router:async(s,f,u)=>{try{const o=await St(j(s),s,f,"server"),l=await ht(o,e,a);if(l){const m=await l.completion;if(m)throw m;if(l.requestEv.headersSent)return}u()}catch(o){console.error(o),u(o)}},notFound:async(s,f,u)=>{try{if(!f.headersSent){const o=j(s),l=ue(o.pathname);f.writeHead(404,{"Content-Type":"text/html; charset=utf-8","X-Not-Found":o.pathname}),f.end(l)}}catch(o){console.error(o),u(o)}},staticFile:async(s,f,u)=>{var o;try{const l=j(s);if(me(s.method||"GET",l)){const m=U(r,l.pathname),p=he(m),y=ge(l.pathname).replace(/^\./,""),g=xt[y];g&&f.setHeader("Content-Type",g),(o=e.static)!=null&&o.cacheControl&&f.setHeader("Cache-Control",e.static.cacheControl),p.on("error",u),p.pipe(f);return}return u()}catch(l){console.error(l),u(l)}}}}const le=X(je(import.meta.url),"..","..","dist"),Tt=X(le,"build"),Y=process.env.PORT??80,{router:kt,notFound:At}=Rt({render:He,qwikCityPlan:pe,manifest:Oe}),v=C();v.use("/build",C.static(Tt,{immutable:!0,maxAge:"1y"}));v.use(C.static(le,{redirect:!1}));v.use(kt);v.use(At);v.listen(Y,()=>{console.log(`Server starter: http://localhost:${Y}/`)});
