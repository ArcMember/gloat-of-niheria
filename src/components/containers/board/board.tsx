import { component$, Slot } from '@builder.io/qwik';

interface BoardProps {
    columns?: number;
    mobileColumns?: number;
    gap?: string;
}

export default component$((props: BoardProps) => {
    return (
        <div    class={"board board" 
                    + ((props.columns == undefined) ? 2 : props.columns) 
                    + (props.mobileColumns == undefined ? (" mobileColumns" + props.columns) : (" mobileColumns" + props.mobileColumns))
                } 
                style={ (props.gap != undefined) ? ("gap: " + props.gap + ";") : ""}>
            <Slot/>            
        </div>
    );
});