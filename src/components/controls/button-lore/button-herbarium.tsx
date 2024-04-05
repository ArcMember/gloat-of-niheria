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

    poisonous?: number;
    healing?: number;
    sedative?: number;
    hallucinogenic?: number;
    combustible?: number;
    industrial?: number;
    edible?: number;
    researchable?: number;
}

export default component$((props: Bestiary) => {
    return (
        <ButtonLore href={props.href} src={props.src} title={props.title} scale={props.scale} x={props.x} y={props.y} contain={props.contain}>
            <div q:slot="mod" class="icons">
                { props.poisonous != undefined &&
                    <i class={"fa fa-exclamation-triangle lvl" + props.poisonous} />
                }                
                { props.healing != undefined &&
                    <i class={"fa fa-heart lvl" + props.healing} />
                }
                { props.sedative != undefined &&
                    <i class={"fa fa-bed lvl" + props.sedative} />
                }
                { props.hallucinogenic != undefined &&
                    <i class={"fa fa-eye lvl" + props.hallucinogenic} />
                }
                { props.combustible != undefined &&
                    <i class={"fa fa-bomb lvl" + props.combustible} />
                }
                { props.industrial != undefined &&
                    <i class={"fa fa-industry lvl" + props.industrial} />
                }
                { props.edible != undefined &&
                    <i class={"fa fa-cutlery lvl" + props.edible} />
                }
                { props.researchable != undefined &&
                    <i class={"fa fa-search lvl" + props.researchable} />
                }
            </div>
        </ButtonLore>
    );
});
