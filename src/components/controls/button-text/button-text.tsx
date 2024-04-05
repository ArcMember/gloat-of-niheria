import { Component, JSXNode, Slot, component$, noSerialize, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { JSX } from '@builder.io/qwik/jsx-runtime';

interface NiheriaButton {
    href?: string;
    src?: string;
    title: string;
    disabled?: boolean;
}

export default component$((props: NiheriaButton) => {
    return (        
        <a class={"button-text " + (props.disabled ? "disabled " : "")} href={props.href}>
            <div class="background">
            { props.src != undefined &&
                <img class="background-img" src={props.src}></img>                
            }
            { props.src == undefined &&
                <img class="background-img" src="/menu/loading/pic.jpg"/>
            }
            { (props.title != undefined) &&
                <div class="button-container">
                    <div class="title">{props.title}</div>
                    <div class="text"><Slot/></div>
                </div>
            }
            </div>
        </a>
    );
});
