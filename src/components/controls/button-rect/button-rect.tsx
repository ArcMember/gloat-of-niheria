import { component$ } from '@builder.io/qwik';
import ImgPic from "~/media/menu/loading/pic.jpg?jsx";

interface NiheriaButton {
    href?: string;
    src?: string;
    title: string;
    subtitle?: string;
    blur?: boolean;
    disabled?: boolean;
}

export default component$((props: NiheriaButton) => {
    return (        
        <a class={"button-rect " + (props.disabled ? "disabled" : "")} href={props.href}>
            { props.blur && 
                <img width="1500" height="2000" src={props.src} class={"blur"}></img>   
                }
                { props.src != undefined &&
                <img width="1500" height="2000" src={props.src} class={props.blur ? "contain" : ""}></img>                
                }
                { props.src == undefined &&
                <ImgPic/>
                }
                { ((props.title != undefined) || (props.subtitle != undefined)) &&
                <div class="title-container" style="">
                    <div class={"button-title"
                                + (props.title?.length > 10 ? " smaller" : "")
                                + (props.title?.length > 20 ? " smallest" : "")
                                }
                    style={ props.title == undefined ? "height: 0; padding: 0;" : ""}>{props.title}</div>
                    { props.subtitle == undefined &&
                    <div class="button-subtitle"></div>
                    }
                    { props.subtitle != undefined &&
                    <div class="button-subtitle filled">{props.subtitle}</div>
                    }                
                </div>            
            }
        </a>
    );
});
