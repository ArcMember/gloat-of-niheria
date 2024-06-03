import { component$, useContext, useContextProvider, useSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import type { RequestHandler, } from '@builder.io/qwik-city';
import { useLocation, useContent, routeLoader$, } from '@builder.io/qwik-city';
import { MenuElement } from './menu-element/menu-element';
import { SidebarContext } from '~/routes/layout';

export default component$(() => {
	const { menu } = useContent();
	const { url } = useLocation();

	const sidebarState = useContext(SidebarContext);

	/* useVisibleTask$(() => {
		sidebarState.value = localStorage.getItem("sidebar");
		const audio = document.getElementById("audio-fixed");
		if (audio != null) {
				audio.setAttribute("offset-menu", sidebarState.value)
		}		
	}) */

	return (
		<div class="sidebar" id="sidebar" opened={sidebarState.value}>
				<div class="sidebar-scrollbox"> 
					<MenuElement menu={menu} url={url} level="0" />
				</div>
				<div class="sidebar-filler" onClick$={ () => {
					sidebarState.value = "false";
					document.cookie = `sidebar=false;path=/`
					document.body.classList.remove("menu-opened")
					const audio = document.getElementById("audio-fixed");
					if (audio != null) audio.setAttribute("offset-menu", "false");
				}} 
				id="sidebar-filler"/>
			<div class="sidebar-resize-handle"/>
		</div>
  );
});