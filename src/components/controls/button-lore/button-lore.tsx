import { Slot, component$ } from '@builder.io/qwik';
import ImgPic from "~/media/menu/loading/pic.jpg?jsx";

interface Lore {
    href?: string;
    src?: string;
    title: string;

    scale: string;
    x: string;
    y: string;

    contain?: boolean;
}

export default component$((props: Lore) => {
    return (        
        <a class={"button-lore" + (props.contain ? " contain" : "")} href={props.href}>
            { props.src == undefined &&
                <ImgPic/>
            }
            { props.src != undefined &&
                <img width="175" height="175" src={props.src} style={`transform: scale(${props.scale}); transform-origin: ${props.x} ${props.y};`}/>
            }
            { (props.title != undefined) &&
                <div class="title-container">
                    <div class={"button-title" + (props.title?.length > 10 ? " smaller" : "") + (props.title?.length > 20 ? " smallest" : "")}>
                        {props.title}
                    </div>
                </div>
            }
            <Slot name="mod"/>
        </a>
    );
});
