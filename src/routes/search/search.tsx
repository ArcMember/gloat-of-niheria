import { $, component$, useSignal } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { search } from "@orama/orama";
import { type Page, oramaDb, createOramaDb } from "~/orama";

createOramaDb();

export default component$(() => {
	const termSignal = useSignal("");
	const databaseSignal = useSignal<Page[]>([]);

	const onSearch = $(async (term: string) => {
		const response = await execSearch(term);
		databaseSignal.value = (response.hits || []).map(
			(hit) => hit.document as unknown as Page,
		);
	});

	return (
		<div class="search-container">
			<input 
				class="search-field"
				placeholder="например, Синоб Фелинвард или Хельгеран"
				bind:value={termSignal}
				onKeyDown$={(e) => {
					onSearch(termSignal.value);
				}}
			/>
			<div class="search-list">
				{databaseSignal.value.map(({ title, url, content, mtime }) => (
					<a class="search-result" key={url} href={"/" + url}>
						<div style="font-weight: 700; font-size: 1.5rem;">{title}</div>
						<p>{content}</p>
					</a>
				))}
			</div>
		</div>
	)
})

export const execSearch = server$(async (term: string) => {
	const response = await search(oramaDb, {
		term,
		properties: "*",
		boost: { name: 1.5 },
	});
	return response;
});
  