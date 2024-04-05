import { component$ } from '@builder.io/qwik';

interface BGPics {
    width?: number;
    src1?: string;
    src2?: string;
}

export default component$((props: BGPics) => {
    return (
        <div class="background-pictures">
            <img class="background-picture1" src={props.src1} style={`max-width: ${props.width}px; min-width: ${props.width}px;`}/>
            <img class="background-picture2" src={props.src2} style={`max-width: ${props.width}px; min-width: ${props.width}px;`}/>
        </div>
    );
});