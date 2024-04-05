import { Slot, component$ } from '@builder.io/qwik';

interface Timestamp {
    text?: string;
    noheading?: boolean;
}

export default component$((props: Timestamp) => {
    let stamp;
    if (props.noheading) {
        stamp = <div class="time">
                    <span class="data">{props.text}</span>                
                </div>
    }
    else {
        stamp = <h5 class="time">
                    <span class="data">{props.text}</span>                
                </h5>
        }

    return (
        <div class="timestamp">
            {stamp}
        </div>
    );
});
