import { component$  } from '@builder.io/qwik';

import {runeList, branches} from "~/routes/menu/magic/runesList.jsx";
import MagicRune from '~/components/tools/magic/magic-rune';
import {Heading} from '~/components/tools/magic/magic-rune';
import NiheriaRuler from "~/components/visuals/niheria-ruler/niheria-ruler";

interface InlfuencesProps {
    branch?: string | number;
}

export default component$((props: InlfuencesProps) => {
    const branch = (typeof(props.branch) === "number") ? branches[props.branch] : props.branch;
    return (
        <div class={"rune-list"}>            
            {runeList.map((rune, index) => {
                if (branch == undefined || rune.branch == branch) {
                    return  <>
                                { branch == undefined && (runeList[index-1] == undefined || runeList[index-1].branch != runeList[index].branch) &&
                                    <h2 key={rune.branch}>{runeList[index].branch}</h2>
                                }
                                <div class={"rune-object "  + (rune.baseName.includes(" И ") ? "ideogram " : "rune ")} key={rune.baseName}>
                                    <MagicRune inactive name={rune.name} basename={rune.baseName} src={rune.src} heading={Heading.Top}/>
                                    <div class="side-effects">
                                        {rune.sideEffects && rune.sideEffects[0] != "" && <li><span dangerouslySetInnerHTML={rune.sideEffects[0]}></span></li>}
                                        {rune.sideEffects && rune.sideEffects[1] != "" && <li><span dangerouslySetInnerHTML={rune.sideEffects[1]}></span></li>}
                                        {rune.sideEffects && rune.sideEffects[2] != "" && <li><span dangerouslySetInnerHTML={rune.sideEffects[2]}></span></li>}
                                    </div>
                                </div>
                            </>
                }
            })}
        </div>
    );
})