import { component$ } from '@builder.io/qwik';

interface NiheriaHeader {
    topSubtitle?: string;
    title?: string;
    subtitle?: string;
    bottomSubtitle?: string;

    center?: boolean;
}

export default component$((props: NiheriaHeader) => {
    return (
        <div class="cover-heading">
            {props.topSubtitle != undefined &&
            <h2 class={"subheader" + (props.center ? " center" : "")}>{props.topSubtitle}</h2> }
            <h1 class={"header" + (props.center ? " center" : "")}>{props.title}</h1>
            {props.subtitle != undefined &&
            <h4 class={"header-subtitle" + (props.center ? " center" : "")}>{props.subtitle}</h4> }
            {props.bottomSubtitle != undefined &&
            <h2 class={"subheader" + (props.center ? " center" : "")}>{props.bottomSubtitle}</h2> }
        </div>     
    );
});
