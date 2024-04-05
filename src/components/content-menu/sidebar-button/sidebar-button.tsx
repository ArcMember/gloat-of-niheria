import { component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { SidebarContext } from '~/routes/layout';

export default component$(() => {
	const sidebarState = useContext(SidebarContext);

    return (
        <>			
            <button id="sidebar-button" class="flat" 
				onClick$={(e) => {
					const audio = document.getElementById("audio-fixed");
					const sidebar = document.getElementById("sidebar");
					
					if (sidebarState.value === "true") {
						sidebarState.value = "false";
						document.cookie = `sidebar=false;path=/`
						if (audio != null) audio.setAttribute("offset-menu", false);
					}
					else {						
						sidebarState.value = "true";
						document.cookie = `sidebar=true;path=/`
						if (audio != null) audio.setAttribute("offset-menu", true);
					}
				}}>
				<i class="fa fa-bars"/>
			</button>
        </>
    );
});