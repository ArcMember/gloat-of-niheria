import { component$ } from '@builder.io/qwik';

interface NiheriaRuler {
    decorated?: boolean;
    short?: boolean;
}

export default component$((props: NiheriaRuler) => {
    return (
        <div class={"niheria-ruler " 
                + ((props.decorated || !props.short) ? "decorated " : "")            
            }>
            { (props.decorated || !props.short) &&
            <div class="hr-start"></div>
            }
            { (props.decorated || !props.short) &&
            <div class="hr-end"></div>
            }
            { !props.decorated && props.short &&
            <div class={"hr " + (props.short ? "short" : "")}></div>
            }
        </div>
    );
});
