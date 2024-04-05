import { component$, Slot } from '@builder.io/qwik';

export const TwoBoard = component$(() => {
    return (
        <div class="three-board">
            <Slot/>
        </div>
    );
});
