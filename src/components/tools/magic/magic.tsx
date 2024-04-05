import { component$, createContextId, useContext, useContextProvider, useSignal, useStore, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import ClipboardJS from "clipboard";

import {getRuneList} from "~/routes/menu/magic/runesList.jsx";
const runeList = getRuneList()
import spellsList from "~/routes/menu/magic/spellsList.json";

import MagicRune from './magic-rune';
import MagicSpell from './magic-spell';
import SpellDuration from './spell-duration';

export const SpellContext = createContextId<object>('spell-context');

export const stringToSpell = (string: string, name = undefined) => {
    const spellName = (name == undefined) ? "Новое заклинание" : name;
    const arr = string.split('|')[0].split(',');
    let accent = undefined;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes('+')) accent = i;
        arr[i] = arr[i].replace('+', "")
    }
    return {"runes": arr, "accent": accent, "name": spellName}
}

export default component$(() => {    
    const defaultSpell = stringToSpell("Ч И Черной Магии,Ч Р Хаоса+,В Р Роста", "Мерзкая опухоль")
    const spell = useStore({runes: defaultSpell.runes, accent: defaultSpell.accent, name: defaultSpell.name});

    const openRunebook = useSignal(false);
    const runes = []
    for (const rune of runeList) {
        runes.push(
            <div onClick$={(e) => { spell.runes = spell.runes.concat([e.target.id]) }}>
                <MagicRune name={rune.name} src={rune.src} basename={rune.baseName}/>
            </div>)
    }
    const openSpellbook = useSignal(false);
    const spells = []
    for (const listSpell of spellsList) {
        spells.push(
            <div onClick$={() => {
                    const newSpell = stringToSpell(listSpell.runes, listSpell.name)
                    spell.runes = newSpell.runes;
                    spell.accent = newSpell.accent;
                    spell.name = newSpell.name;
                    openSpellbook.value = false;
                }}>
                <MagicSpell spell={stringToSpell(listSpell.runes)} name={listSpell.name} list/>
            </div>
        )
    }    
    
    return (
        <div class="magic" id="magic">
            <div class="spell">                
                <div class="spell-runes" id="spell-runes">
                    <MagicSpell spell={spell} name={spell.name} editing/>
                </div>
                <div class="spell-duration-container">
                    <SpellDuration spell={spell}/>
                </div>                
            </div>
            <div class={"menu runes " + (openRunebook.value ? "opened" : "")} id="runes">
                {runes}
            </div>
            <div class={"menu spellbook " + (openSpellbook.value ? "opened" : "")} id="spellbook">
                <div class="spellbook-container">
                    {spells}
                </div>
            </div>
            <div class="controls">
                <div class="menu-left">
                    <button class="runesButton" onClick$={ (e) => {
                        openRunebook.value = !openRunebook.value;
                        openSpellbook.value = false;
                    }}><i class="fa fa-bars"/><span>Руны</span></button>
                </div>
                <div class="menu-right">
                    <button class="spellbookButton" onClick$={() => {
                        spell.runes = [];
                        spell.accent = undefined;
                        spell.name = "Новое заклинание"
                    }}><i class="fa fa-trash"/></button>
                    <button class="spellbookButton" onClick$={(e) => {
                        openSpellbook.value = !openSpellbook.value;
                        openRunebook.value = false;
                    }}><i class="fa fa-book"/><span>Заклинания</span></button>
                </div>
            </div>
        </div>
    );
});
