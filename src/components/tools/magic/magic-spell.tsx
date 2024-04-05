import {component$, useContext, } from '@builder.io/qwik';

import {getRuneList} from "~/routes/menu/magic/runesList.jsx";
const runeList = getRuneList()

import MagicRune from './magic-rune';
import ClipboardJS from "clipboard";
import { stringToSpell } from './magic';
import { ObjectEncodingOptions } from 'node:fs';

interface Spell {
    name?: string;
    spell: object | string;
    editing?: boolean;
    list?: boolean;
}


export default component$((props: Spell) => { 
    let spellContext = props.spell
    if (typeof props.spell === "string")
        spellContext = stringToSpell(props.spell);

    return (
        <div class={"magic-spell " + (props.list ? "list " : "") + (!props.editing ? "presenting " : "") + spellContext.runes}>
            <div class="spell-formula" id="spell-formula">{spellToString(spellContext)}</div>
            <div class="spell-name">
                <div>{props.name}</div>
                <button class="copy-spell-button flat" id="copy-spell-button" data-clipboard-target={"#spell-formula"} onClick$={(ev) => {
                    const clipboard = new ClipboardJS('.copy-spell-button');

                    clipboard.on('success', function(e) {
                        console.info('Action:', e.action);
                        console.info('Text:', e.text);
                        console.info('Trigger:', e.trigger);   

                        const successEl = e.trigger
                        successEl.classList.remove("success");
                        void successEl.offsetWidth;
                        successEl.classList.add("success");

                        e.clearSelection();
                        clipboard.destroy();
                    });
                    
                    clipboard.on('error', function(e) {
                        console.error('Action:', e.action);
                        console.error('Trigger:', e.trigger);
                    });                    
                }}>
                    <i class="fa fa-clipboard"></i> 
                     скопировать формулу 
                    <i class="fa fa-check"></i></button>
                </div>
            <div class="spell-runes">
                {constructRunes(props, spellContext)}
            </div>
            
        </div>
    );
});

function constructRunes(props, spellContext) {
    const runes = []
    if (spellContext.runes.length == 0) {
        runes.push(<i>Добавьте руны в заклинание</i>)
    }
    let i = 0;
    for (const rune of spellContext.runes) {        
        for (const listRune of runeList) {            
            if (rune == listRune.baseName) {
                if (props.editing) {
                    runes.push(
                        <div key={Math.random()} class={"spell-rune " + listRune.baseName}>

                            <div class="remove-rune" onClick$={(e) => { 
                                const index = [...e.target.parentElement.parentElement.parentElement.children].indexOf(e.target.parentElement.parentElement)                                
                                if (spellContext.accent == index) spellContext.accent = undefined;
                                if (spellContext.accent > index) spellContext.accent = spellContext.accent-1;
                                spellContext.runes = spellContext.runes.toSpliced(index, 1);
                            }}><i class="fa fa-times"></i></div>

                            <div class={"spell-rune-container " + ((spellContext.accent != undefined && spellContext.accent == i) ? "accent" : "")} onClick$={(e) => {
                                if (props.editing && !listRune.baseName.includes(" И ")) {
                                    const index = [...e.target.parentElement.parentElement.parentElement.children].indexOf(e.target.parentElement.parentElement)                                    
                                    if (spellContext.accent == undefined || spellContext.accent != i) {
                                        spellContext.accent = index
                                    }
                                    else {
                                        spellContext.accent = undefined
                                    }
                                }
                            }}>                                
                                <MagicRune name={listRune.name} basename={listRune.baseName} src={listRune.src}/>
                            </div>                            
                        </div>
                    )
                }
                else {
                    runes.push(
                        <div key={Math.random()} class={"spell-rune " + listRune.baseName}>
                            <div class={"spell-rune-container " + ((spellContext.accent != undefined && spellContext.accent == i) ? "accent" : "")}>
                                <MagicRune inactive name={listRune.name} basename={listRune.baseName} src={listRune.src}/>
                            </div>
                        </div>)
                }
            }
        } 
        i++;
    }
    return runes;
}

function spellToString(spell: object) {
    const arr = [...spell.runes];
    arr[spell.accent] += "+";
    return arr.join(',');
}