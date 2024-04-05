import { component$, Slot } from '@builder.io/qwik';

export const ThreeBoard = component$(() => {
    return (
        <div class="three-board">
            <Slot/>
        </div>
    );
});
