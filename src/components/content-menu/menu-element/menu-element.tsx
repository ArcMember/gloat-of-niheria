import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

interface Props {
    menu?: any;
    url?: any;
    root?: any;
    level?: any;
}

export const MenuElement = component$((props: Props) => {
    useVisibleTask$(() => {
        if (window.innerWidth < 600) {
            document.cookie = `sidebar=false;path=/`;
        }    
    })

    if (props.menu?.items?.length > 0)
        return (
            <details class={"menu-element " + ((props.url?.pathname === props.menu.items[0]?.href) ? "is-active" : "") + ` level${props.level}`} 
                open={ +props.level == 0 || props.url?.pathname.includes(props.menu.items[0].href)}>
                <summary>
                    <a href={props.menu.items[0].href}>{props.menu?.text}</a>
                    { props.menu?.items?.length > 1 &&
                        <span class="arrow">❱</span>
                    }                    
                </summary>                
                {props.menu?.items?.map((item: any) => ( (props.menu.text != item.text) ?
                    <>
                        <MenuElement menu={item} url={props.url} level={+props.level + 1}></MenuElement>
                    </>
                    : undefined
                ))}
            </details>
        )
    else {
        return (
            <div class={"menu-element link " + ((props.url?.pathname === props.menu?.href) ? "is-active" : "") + ` level${props.level}`}>
                <a href={props.menu?.href}>
                    {props.menu?.text}
                </a>
                </div>
        )
    }
});
