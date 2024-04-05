import { component$, useSignal, $, useStore, useVisibleTask$, useTask$ } from '@builder.io/qwik';
import CanonsEditor from '~/routes/auth/editors/canons-editor';
import CharacterEditor from '~/routes/auth/editors/characters-editor';
import RunesEditor from '~/routes/auth/editors/runes-editor';
// import { useGetCanons } from '../layout';

interface ControlPanelProps {
    username: string,
    role: string,
    editorMode: EditorModes,
    editorData: Object,
}

enum EditorModes {
    Canons,
    Characters,
    Runes
}

export default component$((props: ControlPanelProps) => {
    return <></>
    // const stringKeys = Object
    //     .keys(EditorModes)
    //     .filter((v) => isNaN(Number(v)))

    // const selectedMode = useSignal("Canons");

    

    // return <>
    //     <div class="editor-mode">
    //         {stringKeys.map((key, index) => (
    //             <button key={index} onClick$={() => {selectedMode.value = key; }}>{key}</button>
    //         ))}
    //     </div>
    //     <div>
    //         {selectedMode.value == EditorModes[EditorModes.Canons] && 
    //             <CanonsEditor editorData={props.editorData.canons.value}/>}
    //         {selectedMode.value == EditorModes[EditorModes.Characters] && <CharacterEditor/>}
    //         {selectedMode.value == EditorModes[EditorModes.Runes] && <RunesEditor/>}
    //     </div>
    // </>
})