import { component$ } from '@builder.io/qwik';

import {months, ages} from '~/routes/menu/history/months.js';
import { useLocation, type RequestEvent } from '@builder.io/qwik-city';

interface BoardProps {
    year?: number;
    month?: string;
    stage?: string;
    age?: string;

    old?: boolean;
}
 
export default component$((props: BoardProps) => {
    const freshNews = useLocation().url.search == "?fresh";

    return (
        <div class="news-title">
            { (props.old == undefined || freshNews) &&
                <div class="news">Свежие новости</div>
            }
            <div class="timestamp">{props.year} {ages[props.age]} – {props.stage}</div>
            <div class="comment">{props.month}, {months[props.month]}</div>
        </div>
    );
});