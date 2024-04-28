import { component$, useStore } from '@builder.io/qwik';
import { timeline, timelineState } from '~/routes/menu/history/timeline/timeline';

interface TimelineStateProps {
    state: string
}

export default component$((props: TimelineStateProps) => {
    const stateInfo = timelineState.find(state => state.nameShort == props.state);
    const timelineLength = stateInfo?.names.length;
    return <>
        <div class="timeline-container">
            <table class="timeline-state">
                <tbody>
                <tr  class="top-row">
                    {stateInfo?.names.map((item, ind) => (
                        <td key={ind} class={item[2] == 1 ? "used" : ""}>
                            <div class="stamp">
                                <span class="name">{item[2] == 1 ? item[0] : ""}</span>
                                <span class="year">{item[2] == 1 ? item[1] +" гИЭ" : ""}</span>
                            </div>
                        </td>
                    ))}
                </tr>
                <tr  class="bottom-row">
                    {stateInfo?.names.map((item, ind) => (
                        <td key={ind} class={item[2] == -1 ? "used" : ""}>
                            <div class="stamp">
                                <span class="name">{item[2] == -1 ? item[0] : ""}</span>
                                <span class="year">{item[2] == -1 ? item[1] +" гИЭ" : ""}</span>
                            </div>
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    </>
});