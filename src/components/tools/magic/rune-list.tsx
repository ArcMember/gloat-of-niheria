import { component$, } from '@builder.io/qwik';

/* import runeList from "~/routes/menu/magic/runesList.json"; */
import {runeList, branches} from "~/routes/menu/magic/runesList.jsx";
import MagicRune from './magic-rune';
import {Heading} from './magic-rune';
import NiheriaRuler from "~/components/visuals/niheria-ruler/niheria-ruler";

interface RuneList {
    branch?: string | number;
}

export default component$((props: RuneList) => {
    const branch = (typeof(props.branch) === "number") ? branches[props.branch] : props.branch;
    return (
        <div class={"rune-list"}>            
            {runeList.map((rune, index) => {
                if (branch == undefined || rune.branch == branch) {
                    return  <>
                                { rune.baseName.includes(" И ") &&
                                    <NiheriaRuler decorated/>
                                }
                                { branch == undefined && (runeList[index-1] == undefined || runeList[index-1].branch != runeList[index].branch) &&
                                    <h2 key={rune.branch}>{runeList[index].branch}</h2>
                                }
                                <div class={"rune-object "  + (rune.baseName.includes(" И ") ? "ideogram " : "rune ")} key={rune.baseName}>
                                    <MagicRune inactive name={rune.name} basename={rune.baseName} src={rune.src} heading={Heading.Top}/>
                                    <div class="rune-description">
                                        <div class="main">
                                            {rune.description}
                                        </div>
                                        {rune.advancedDescription}
                                    </div>
                                </div>
                            </>
                }
            })}
        </div>
    );
});
