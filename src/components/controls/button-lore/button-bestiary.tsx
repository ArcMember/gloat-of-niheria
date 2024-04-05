import { component$ } from '@builder.io/qwik';
import ButtonLore from './button-lore';

interface Bestiary {
    href?: string;
    src?: string;
    title: string;

    scale: string;
    x: string;
    y: string;

    contain?: boolean;

    playable?: boolean;
    tameable?: boolean;
    tameableN?: boolean;
    dangerous?: boolean;
}

export default component$((props: Bestiary) => {
    return (
        <ButtonLore href={props.href} src={props.src} title={props.title} scale={props.scale} x={props.x} y={props.y} contain={props.contain}>
            <div q:slot="mod" class="icons">
                { props.playable &&
                <div>🧍</div>
                }                
                { props.dangerous &&
                <div>🍖</div>
                }
                { props.tameable &&
                <div>🐶</div>
                }
                { props.tameableN &&
                <div>🐶ɴ</div>
                }
            </div>
        </ButtonLore>
    );
});
