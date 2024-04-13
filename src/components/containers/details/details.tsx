import { component$, Slot } from '@builder.io/qwik';

interface Details {
    summary?: string,
    border?: boolean,
    open?: boolean,
}

export default component$((props: Details) => {
    return (
        <details open={props.open} class={ props.border == undefined || props.border == true ? "border" : ""}>
            <summary dangerouslySetInnerHTML={props.summary}></summary>
            <Slot/>
        </details>
    );
});
