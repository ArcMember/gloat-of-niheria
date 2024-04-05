import { component$, } from '@builder.io/qwik';

import {runeList} from "~/routes/menu/magic/runesList.jsx";

interface Rune {
    name?: string;
    basename?: string;
    src?: string;

    inactive?: boolean;
}

export default component$((props: Rune) => {
    let rune = null;
    if ((props.name == null || props.src == null) && props.basename != null) {
        rune = runeList.find(obj => obj["baseName"] == props.basename)
    }

    return (
        <div class={"magic-rune " 
            + (props.inactive ? "inactive " : "")
            } id={props.basename}>
            <img src={rune == null ? props.src : rune.src}/>
            <div>
                {rune == null ? props.name : rune.name}
            </div>
        </div>
    );
});
