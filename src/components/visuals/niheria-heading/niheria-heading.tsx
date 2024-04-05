import { component$, Slot } from '@builder.io/qwik';

interface NiheriaHeading {
    size?: number;
    center?: boolean;
    caps?: boolean;
    underlined?: boolean;
    title?: string;
    nogradient?: boolean;
}

export default component$((props: NiheriaHeading) => {
    return (        
        <span class={`niheria-heading niheria-h${props.size}` +
                    (props.center ? " center" : "") +
                    (props.caps ? " caps" : "") +
                    (props.underlined ? " underlined" : "") +
                    (props.nogradient ? " nogradient" : "")
                    }>
            { (props.title == undefined) &&
            <>
                { props.size == 1 && 
                    <h1><Slot/></h1>
                }
                { props.size == 2 && 
                    <h2><Slot/></h2>
                }
                { props.size == 3 && 
                    <h3><Slot/></h3>
                }
                { props.size == 4 && 
                    <h4><Slot/></h4>
                }
            </>
            }
            { (props.title != undefined) &&
            props.title
            }
        </span>
    );
});
