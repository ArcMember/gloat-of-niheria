import { component$ } from '@builder.io/qwik';

interface GlitchyTextProps {
    length: number,
}

export default component$((props: GlitchyTextProps) => {
    return <>
        {[...Array(props.length)].map((x, i) => {
            return <span key={i} class={"arcane-text " + "t" + Math.floor(Math.random() * 10)}></span>
        })}
    </>
})