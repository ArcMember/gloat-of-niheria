import{B as i,K as a,_ as o,b as u,c as e,m as d,U as n,F as s}from"./q-b1c41f58.js";import{SidebarContext as b}from"./q-d0cdd5b7.js";import{n as c,k as m}from"./q-c0397962.js";const _=i(a(()=>o(()=>import("./q-19a2860f.js"),["build/q-19a2860f.js","build/q-b1c41f58.js","build/q-d0cdd5b7.js","build/q-c0397962.js"]),"s_0GMi02DRjzk")),f=()=>{const l=c(),r=m();return u(b),e("div",null,{class:"sidebar",id:"sidebar"},[e("div",null,{class:"sidebar-scrollbox"},d(_,{get menu(){return l.menu},get url(){return r.url},level:"0",[n]:{menu:s(t=>t.menu,[l]),url:s(t=>t.url,[r]),level:n}},3,"4s_0"),1,null),e("div",null,{class:"sidebar-filler",id:"sidebar-filler"},null,3,null),e("div",null,{class:"sidebar-resize-handle"},null,3,null),e("script",null,{dangerouslySetInnerHTML:`
            let sb = document.getElementById("sidebar");

			let sidebarData = localStorage.getItem("sidebar");
			sb.setAttribute("opened", sidebarData)

			let filler = document.getElementById("sidebar-filler");
			filler.addEventListener("click", (e) => {
				localStorage.setItem("sidebar", !(sb.getAttribute("opened") === 'true'));
				sb.setAttribute("opened", !(sb.getAttribute("opened") === 'true'))
			})

			let audio = document.getElementById("audio-fixed");
			if (audio != null) {
				audio.setAttribute("offset-menu", sidebarData)
			}
		`},null,3,null)],1,"4s_1")},E=Object.freeze(Object.defineProperty({__proto__:null,s_5ShkEvrIS4c:f},Symbol.toStringTag,{value:"Module"}));export{_ as M,E as e};
