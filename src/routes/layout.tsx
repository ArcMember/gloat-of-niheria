import { component$, createContextId, Signal, Slot, useContextProvider, useSignal, useVisibleTask$, } from '@builder.io/qwik';
import { routeLoader$, useLocation, } from '@builder.io/qwik-city';
import { PrismaClient } from '@prisma/client';
import { URLSearchParams } from 'url';
// import { PrismaClient } from '@prisma/client';

import ContentMenu from '~/components/content-menu/content-menu';
import SideToc from '~/components/side-toc/side-toc';
import Footer from '~/components/starter/footer/footer';
import Header from '~/components/starter/header/header';
import PageHeader from '~/components/starter/page-header/page-header';

export const SidebarContext = createContextId<Signal<string>>(
    'niheria.sidebar-context'
);
export const useSidebarCookie = routeLoader$(async ({ cookie }) => {
    let cook = "false";
    if (cookie.get("sidebar") == null) {
        cookie.set("sidebar", "false", { path: "/" });
    }
    else {
        cook = cookie.get("sidebar").value;
        if (cook == undefined) {
            cookie.set("sidebar", "false", { path: "/" });
            cook = "false";
        }
    }
    return {
        sidebarCookie: cook, // replace with your own function to check cookie
    };
});

export const useGetHeroes = routeLoader$(async () => {
    const prisma = new PrismaClient();
    const heroes = await prisma.hero.findMany({});
    return heroes;
});


export default component$(() => {
    const sidebarStore = useSignal(useSidebarCookie().value.sidebarCookie);
    useContextProvider(SidebarContext, sidebarStore);

    const titleUrl: URLSearchParams = useLocation().url.searchParams;
    const heading: string = titleUrl.values().next().value;

    useVisibleTask$(() => {
        console.log(heading)
        if (heading != undefined) {
            const content = document.getElementById("content");
			const headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6");
            if (headings.length > 0) {
                headings.forEach((h: Element) => {
                    console.log(h.id)
                    if (h.id === heading.toLowerCase()) {
                        h.scrollIntoView()
                    }
                })
            }
        }
    })

    return (
        <div class="wrapper" id="wrapper"
            window:onKeyDown$={(e) => {
                if (e.key === "/" && e.ctrlKey) {
                    window.location.href = "/search"
                }
            }}>
            <ContentMenu />
            <div class="page" id="page">
                <Header />
                <div class="content" id="content">
                    <div class="content-wrapper">
                        <PageHeader />
                        <Slot />
                        <SideToc />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
});


// export const useGetUsers = routeLoader$(async () => {
//   const prisma = new PrismaClient();
//   const users = await prisma.user.findMany({});
//   return users;
// });
