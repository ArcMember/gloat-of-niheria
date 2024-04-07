import { component$, } from '@builder.io/qwik';

import {runeList} from "~/routes/menu/magic/runesList.jsx";

export enum Heading {
    Top,
    Bottom
}

interface Rune {
    name?: string;
    basename?: string;
    src?: string;

    inactive?: boolean;
    heading?: Heading;
}

export default component$((props: Rune) => {
    let rune = null;
    if ((props.name == null || props.src == null) && props.basename != null) {
        rune = runeList.find(obj => obj["baseName"] == props.basename)
    }

    const width = props.basename?.includes(" И ") ? 112 : 68;

    return (
        <div class={"magic-rune " 
            + (props.inactive ? "inactive " : "")
            } id={props.basename}>
            { props.heading == Heading.Top && <>
                <div>
                    {rune == null ? props.name : rune.name}
                </div>
                <img src={rune == null ? props.src : rune.src} width={width} height={width}/>
            </>}
            { (props.heading == Heading.Bottom || props.heading == undefined) && <>
                <img src={rune == null ? props.src : rune.src} width={width} height={width} />
                <div>
                    {rune == null ? props.name : rune.name}
                </div>
            </>}
            
        </div>
    );
});
