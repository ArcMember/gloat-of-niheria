import { component$ } from '@builder.io/qwik';
import { routeAction$ } from '@builder.io/qwik-city';
// import { useCreateCanon, } from '~/routes/layout';

interface CanonsEditorProps {
    editorData: any,
}

export default component$((props: CanonsEditorProps) => {
    return <></>
    // const canons = props.editorData
    // console.log(canons)

    // const createCanonAction = useCreateCanon();

    // return <div>
    //     {canons.map((character) => (
    //         <div key={character.id}>{character.name}</div>
    //     ))}
    //     <button onClick$={async () => {createCanonAction.submit({name: "12"})}}>Добавить</button>
    // </div>
})

