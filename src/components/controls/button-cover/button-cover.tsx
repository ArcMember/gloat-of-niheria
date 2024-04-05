import { component$ } from '@builder.io/qwik';
import ImgPic from "~/media/menu/loading/pic.jpg?jsx";

interface NiheriaButton {
    href?: string;
    src?: string;
    title: string;
    subtitle?: string;
    author?: string;
    authorHref?: string;

    short?: boolean;
    shorter?: boolean;
    cover?: boolean;
    noZoom?: boolean;
}

export default component$((props: NiheriaButton) => {
    return (        
        <div class="button-cover-container">
            <a class={"button-cover " 
                + (props.short != undefined ? "short " : "")
                + (props.shorter != undefined ? "shorter " : "")
                + (props.cover != undefined ? "cover " : "")
                + (props.noZoom != undefined ? "noZoom " : "")
            } href={props.href}>
                { props.src != undefined &&
                    <img 
                        width={props.short == undefined ? "2182" : "700"}
                        height={props.short == undefined ? "1227" : "200"} 
                        class="blurred" 
                        src={props.src}
                    />     
                }
                { props.src != undefined &&
                    <img 
                        width={props.short == undefined ? "2182" : "700"}
                        height={props.short == undefined ? "1227" : "200"}
                        class="main"
                        src={props.src}
                    />
                }
                { props.src == undefined &&
                    <ImgPic/>
                }
                { ((props.title != undefined) || (props.subtitle != undefined)) &&
                    <div class="title-container">
                        <div class={`button-title 
                                    ${props.title?.length > 10 ? "smaller" : ""}
                                    ${props.title?.length > 20 ? "smallest" : ""}
                                    `}
                            style={ props.title == undefined ? "height: 0; padding: 0;" : ""}>{props.title}</div>
                        { props.subtitle == undefined &&
                        <div class="button-subtitle"></div>
                        }
                        { props.subtitle != undefined &&
                        <div class={`button-subtitle filled ${props.subtitle?.length > 10 && props.subtitle?.length <= 20 ? "smaller" : ""} ${props.subtitle?.length > 20 ? "smallest" : ""}
                                    `}>{props.subtitle}</div>
                        }
                    </div>
                }                
            </a>
            { (props.author != undefined) &&
            <a class="author" href={props.authorHref}>Автор — {props.author}</a>
            }
        </div>
    );
});
