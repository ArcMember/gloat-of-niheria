import { component$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';

export default component$(() => {
	const disableToc = useSignal("false");
	const hidden = useSignal("true");
	const store = useStore({
		items: []
	});

	useVisibleTask$(() => {
		hidden.value = localStorage.getItem("toc-hidden");

		if (document.getElementsByClassName("disable-toc").length < 1) {
			store.items = []
			const content = document.getElementById("content");
			const headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6");
			const headingsData = {};
			disableToc.value = "true";
			for (const heading of headings) {
				const html = heading.innerHTML;
				const tagLvl = parseInt(heading.tagName.toUpperCase().split('H')[1])
				if (html != undefined) {
					heading.id = heading.innerText
					if (heading.id != "" && heading.id != "Назад" && heading.id != "Меню" && heading.id != "Footnotes") {
						store.items.push({"tag": heading.tagName, "href": heading.id, "lvl": tagLvl});
						disableToc.value = "false";	
					}
				}
			}
		}
		else disableToc.value = "true";
	})

	return (
		<>	{ disableToc.value === "false" && 
			<div class={"show-toc " + (hidden.value === "true" ? "hidden " : "")} 
				onClick$={() => { 
					hidden.value = (hidden.value === "true") ? "false" : "true";
					localStorage.setItem("toc-hidden", hidden.value);
				}}></div>
			}
			<div class={"side-toc " + (hidden.value === "true" ? "hidden " : "")} id="side-toc">
				{store.items.map((item) => (
					<Child key={item.href} tag={item.tag} href={item.href}/>
				))}
			</div>
		</>   
	);
});

interface TocHeading {
    tag: string;
	href: string;
}

export const Child = component$((props: TocHeading) => {
	const el = document.getElementById(props.href);
	return <span 
		style="cursor: pointer;" 
		class={"toc-element " + props.tag.toLowerCase()} 
		onClick$={() => {
				el?.scrollIntoView({behavior: "smooth"})
				// location.hash = "#" + props.href
			}}>
			{props.href}
	</span>;
  });
