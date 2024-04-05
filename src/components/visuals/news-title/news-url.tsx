import { component$, Slot } from '@builder.io/qwik';
import { useContent } from '@builder.io/qwik-city';

interface NewsUrlProps {
    href?: string;
}

export default component$((props: NewsUrlProps) => {

    return (
        <a class="news-url" href={props.href}>
            <Slot/>
            <span class="line"></span>
        </a>
    );
});