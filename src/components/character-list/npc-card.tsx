import { component$, Slot, useSignal } from '@builder.io/qwik';
import ButtonRect from '../controls/button-rect/button-rect';
import NiheriaRuler from "~/components/visuals/niheria-ruler/niheria-ruler";
import Board from "~/components/containers/board/board";

interface NPCCardProps {

}

export default component$((props: NPCCardProps) => {
    const expanded = useSignal(false);

    return  <div class={"npc-card " + (expanded.value ? "open" : "")} onClick$={() => {expanded.value = !expanded.value}}>
                <div class="card-summary">
                    <div class="slot-name">
                        <Slot name="name"></Slot>
                    </div>
                    <Slot name="appearance"></Slot>
                    <Board columns={2} mobileColumns={1}>
                        <Slot name="inventory"></Slot>
                        <Slot name="skills"></Slot>
                    </Board>
                </div>
                <div class="card-content">
                    <div class="content-curtain"></div>
                    <Slot name="character"></Slot>
                    <Slot name="biography"></Slot>
                </div>
                <hr/>
            </div>
})