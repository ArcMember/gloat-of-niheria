import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { prismaClient } from "~/prisma";

export const useGetHeroes = routeLoader$(async () => {
    const heroes = await prismaClient.hero.findMany({});
    return heroes;
});

export default component$(() => {
    return (<>
        <Slot />
    </>);
});