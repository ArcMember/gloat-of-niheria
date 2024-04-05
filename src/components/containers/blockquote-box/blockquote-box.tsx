import { component$, Slot } from '@builder.io/qwik';

interface Blockquote {
    attention?: boolean;
    warning?: boolean;
    mystery?: boolean;

    text?: boolean;
    center?: boolean;
    left?: boolean;
    right?: boolean;
    overflow?: boolean;

    author?: string;
    realAuthor?: string;
}

export default component$((props: Blockquote) => {
    return (
        <blockquote class={`blockquote`       
                    + `${props.attention ? " attention" : ""}`             
                    + `${props.warning ? " warning" : ""}`
                    + `${props.mystery ? " mystery" : ""}`
                    + `${props.text ? " text" : ""}`
                    + `${props.center ? " center" : ""}`
                    + `${props.left ? " left" : ""}`
                    + `${props.right ? " right" : ""}`
                    + `${props.overflow ? " overflow" : ""}`
                    }>
            <Slot/>
            { props.author != undefined &&
            <div class="author">{props.author}</div>
            }
            { props.realAuthor != undefined &&
            <div class="realAuthor">{props.realAuthor}</div>
            }
        </blockquote>
    );
});
