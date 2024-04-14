import { component$, Slot, useSignal } from '@builder.io/qwik';
import ButtonRect from '../controls/button-rect/button-rect';
import NiheriaRuler from "~/components/visuals/niheria-ruler/niheria-ruler";
import Board from "~/components/containers/board/board";

interface NPCCardProps {
    vertical?: boolean
}

export default component$((props: NPCCardProps) => {
    const expanded = useSignal(false);

    return  <div class={"npc-card" + (expanded.value ? " open" : "") + (props.vertical ? " vertical" : "")} onClick$={() => {expanded.value = !expanded.value}}>
                <div class="card-summary">
                    <div class="slot-name">
                        <Slot name="name"></Slot>
                    </div>
                    <Slot name="appearance"></Slot>
                    {props.vertical != true && <Board columns={2} mobileColumns={1}>
                        <Slot name="inventory"></Slot>
                        <Slot name="skills"></Slot>
                    </Board>}
                    {props.vertical == true && <>
                        <Slot name="inventory"></Slot>
                        <Slot name="skills"></Slot>
                    </>}
                </div>
                <div class="card-content">
                    <div class="content-curtain"></div>
                    <Slot name="character"></Slot>
                    <Slot name="biography"></Slot>
                </div>
                <hr/>
            </div>
})