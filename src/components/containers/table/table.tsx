import { Slot, component$ } from '@builder.io/qwik';

interface Table {
    content: string[][],
    center?: boolean,
}

export default component$((props: Table) => {
    const head = []
    for (let i = 0; i < props.content[0].length; i++) {
        head.push(<th>{props.content[0][i]}</th>)
    }

    const body = []
    for (let i = 1; i < props.content.length; i++) {
        const bodyElement = []
        for (let j = 0; j < props.content[i].length; j++) {
            bodyElement.push(<td dangerouslySetInnerHTML={props.content[i][j]}></td>);
        }
        body.push(<tr>{bodyElement}</tr>)
    }

    return (
        <div class={[
            props.content[0].length < 3 ? "two-columns" : "", 
            props.center != undefined ? "center" : ""
            ]}>
            <table>
                <thead>{head}</thead>
                <tbody>{body}</tbody>
            </table>
        </div>
    );
});
