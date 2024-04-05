import { component$ } from '@builder.io/qwik';

interface NiheriaHeader {
    size?: number;
    title?: string;
    subtitle?: string;
    href?: string;

    center?: boolean;
    caps?: boolean;
    noUnderline?: boolean;
}

export default component$((props: NiheriaHeader) => {
    return (
        <a class={"button-niheria " + (props.center ? " center" : "") + (props.caps ? " caps" : "") + (props.noUnderline || props.subtitle != undefined ? " no-underline" : "")} href={props.href}>
        { props.size == 1 && 
            <h1>{props.title}</h1>
        }
        { props.size == 2 && 
            <h2>{props.title}</h2>
        }
        { props.size == 3 && 
            <h3>{props.title}</h3>
        }
        { props.size == 4 && 
            <h4>{props.title}</h4>
        }
        { props.subtitle != undefined &&
            <div class="subtitle">{props.subtitle}</div>
        }
        </a>        
    );
});
