import { component$, Slot } from '@builder.io/qwik';
import ClipboardJS from "clipboard";

interface CopyBoxProps {
    readonly?: boolean;
    text?: string;
}

export default component$((props: CopyBoxProps) => {
    const id = Math.floor(Math.random()*10);

    return (
        <div class={"copy-box"}>
            <button class="copy-button" onClick$={ async (ev) => {
                const text = (props.text == undefined )
                    ? (ev.srcElement.parentElement.children[1] as HTMLDivElement).innerText
                    : props.text;
                navigator.clipboard.writeText(text)
                .then(() => {
                    const successEl = ev.srcElement.children[1] as HTMLDivElement
                    successEl.classList.remove("anim");
                    void successEl.offsetWidth;
                    successEl.classList.add("anim");
                })
                
            }}><i class="fa fa-copy"></i><div class="success">Скопировано</div></button>
            <div class="copy-content">
                { (props.text == undefined ) &&
                <Slot/>
                }
                {props.text}
            </div>            
        </div>
    );
});
