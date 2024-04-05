import { component$ } from '@builder.io/qwik';
import Timestamp from '~/components/containers/timestamp/timestamp';

import { timeline } from '~/routes/menu/history/timeline/timeline';

interface BGPics {
    width?: number;
    src1?: string;
    src2?: string;
    rangeMin?: number;
    rangeMax?: number;
}

export default component$((props: BGPics) => {
    if (props.rangeMin == undefined || props.rangeMax == undefined)
        return (
            <div class="timeline">
                {timeline.map((event, ind) => (
                    <>
                        { (timeline[ind-1] == undefined) &&
                            <h2 key={ind}>{event.age}</h2>
                        }
                        { (timeline[ind-1] != undefined && timeline[ind-1].age != timeline[ind].age) &&
                            <h2 key={ind}>{event.age}</h2>
                        }      
                        <div key={ind} class="timeline-event">
                            <Timestamp noheading text={event.time + " гИЭ"}/>
                            <div class="event-description" dangerouslySetInnerHTML={event.description}/>
                        </div>                 
                    </>                
                ))}
            </div>
        );
    else 
        return (
            <div class="timeline">
                {timeline.map((event, ind) => {
                    if (event.time > props.rangeMin && event.time < props.rangeMax) {
                        return <div key={ind} class="timeline-event">
                                    <Timestamp noheading text={event.time + " гИЭ"}/>
                                    <div class="event-description" dangerouslySetInnerHTML={event.description}/>
                                </div>
                    }
                })}
            </div>
        )
});