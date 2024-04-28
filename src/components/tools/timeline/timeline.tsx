import { component$, useStore } from '@builder.io/qwik';
import Timestamp from '~/components/containers/timestamp/timestamp';

import { timeline } from '~/routes/menu/history/timeline/timeline';
import TimelineState from './timeline-state';

interface BGPics {
    width?: number;
    src1?: string;
    src2?: string;
    rangeMin?: number;
    rangeMax?: number;
}

export default component$((props: BGPics) => {
    const states = Array.from(new Set(timeline.map(item => item.state)));
    const statesSelected = useStore({states: []});
    const timelineSorted = timeline.filter(item => statesSelected.states.length == 0 || (statesSelected.states as string[]).includes(item.state));

    let timelineList = undefined;
    if (props.rangeMin == undefined || props.rangeMax == undefined)
        timelineList = 
        <div class="timeline">
            {timelineSorted.map((event, ind) => (
                <>
                    { (timelineSorted[ind-1] == undefined) &&
                        <h2 key={ind}>{event.age}</h2>
                    }
                    { (timelineSorted[ind-1] != undefined && timelineSorted[ind-1].age != timelineSorted[ind].age) &&
                        <h2 key={ind}>{event.age}</h2>
                    }      
                    <div key={ind} class="timeline-event">
                        <Timestamp noheading text={event.time + " гИЭ"}/>
                        <div class="event-description" dangerouslySetInnerHTML={event.description}/>
                    </div>                 
                </>                
            ))}
        </div>
    else 
        timelineList =  
        <div class="timeline">
            {timelineSorted.map((event, ind) => {
                if (event.time > props.rangeMin && event.time < props.rangeMax) {
                    return <div key={ind} class="timeline-event">
                                <Timestamp noheading text={event.time + " гИЭ"}/>
                                <div class="event-description" dangerouslySetInnerHTML={event.description}/>
                            </div>
                }
            })}
        </div>

    return <>
        <div class="filter-list">
        {states.map((state, ind) => (
            <span class="filter-key" key={ind} onClick$={(e) => {
                if ((statesSelected.states as string[]).includes(state)) {
                    (statesSelected.states as string[]).splice((statesSelected.states as string[]).indexOf(state), 1);
                }
                else if (!(statesSelected.states as string[]).includes(state)) {
                    (statesSelected.states as string[]).push(state);
                }
                (e.target as HTMLElement).classList.toggle("sel")
                // console.log(statesSelected.states)
            }}>{state}</span>
        ))}
        </div>
        {statesSelected.states.length == 1 &&
        <TimelineState state={statesSelected.states[0]}/>
        }

        {timelineList}
    </>
});