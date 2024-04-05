import { component$, useContext,  } from '@builder.io/qwik';
import CopyBox from "~/components/containers/copy-box/copy-box";
import Board from "~/components/containers/board/board";

import {getRuneList} from "~/routes/menu/magic/runesList.jsx";
const runeList = getRuneList()

interface SpellDuration {
    name?: string;
    spell: object;
}

export default component$((props: SpellDuration) => {
    let duration: number = 0;
    let spellBase = ""
    let runesCount: number = 0

    const accentBranch = props.spell.accent != undefined ? props.spell.runes[props.spell.accent].split(' ')[0] : undefined;
    const actions = []
    
    let accentedBase = false
    let i = 0
    for (const rune of props.spell.runes) {        
        const glyphBranch = rune.split(' ')[0]
        const glyphType = rune.split(' ')[1]
        const associated = (spellBase === glyphBranch) ? true : false; // of the spell base
        const accented = (accentBranch === glyphBranch) ? true : false;

        if (glyphType === "И") runesCount += 2;
        if (glyphType === "Р") runesCount += 1;

        let power = 0
        if (i == 0) {
            spellBase = glyphBranch
            if (glyphType === "И") power += accented ? 40 : 20;
            if (glyphType === "Р") {
                power += 10;
                accentedBase = true
            }
        }
        else {            
            if (glyphType === "И") {
                if (associated) power += accented ? 40 : 20; 
                else power -= 20; 
            }
            if (glyphType === "Р" && i != props.spell.accent) {
                if (accentedBase && props.spell.runes.length < 3) {
                    power -= 0;
                }
                else {
                    power -= accented ? 5 : 10;
                }
            }
        }
        actions.push(power)
        duration += power
        i++
    }

    const maxRunes = 5
    let penaltyActive = false
    let extendedSpellPenalty = 1
    if (runesCount > maxRunes) {
        penaltyActive = true
        extendedSpellPenalty = parseFloat((maxRunes/runesCount).toFixed(2))
        actions.push(extendedSpellPenalty)        
    }
/*     actions.push(duration*extendedSpellPenalty) */
    duration = duration*extendedSpellPenalty

    let type = "Не определен"
    if (runesCount == 1) type = "Одиночная руна";
    if (runesCount > 1) type = "Сложное заклинание";
    if (runesCount > 5) type = "Расширенное заклятие";

    let power = "Не определена"
    if (runesCount == 1) power = "Условные 20%";
    if (runesCount > 1) power = "Условные 30-50%";
    if (runesCount > 3) power = "Условные 50-80%";
    if (runesCount > 5) power = "Условные 100% и больше";

    let range = "Не определена"
    if (runesCount == 1) range = "3-10 метров";
    if (runesCount > 1) range = "до 50 метров";
    if (runesCount > 3) range = "до 100 метров";
    if (runesCount > 5) range = "до 500 метров";

    let difficulty = "Не определена"
    if (runesCount == 1) difficulty = "Новичок";
    if (runesCount > 1) difficulty = "Ученик";
    if (runesCount > 3) difficulty = "Умелец";
    if (runesCount > 5) difficulty = "Мастер";

    let cast = "Не определен"
    if (runesCount == 1) cast = "Быстрый";
    if (runesCount > 1) cast = "Недолгий";
    if (runesCount > 3) cast = "Долгий";
    if (runesCount > 5) cast = "Очень долгий";

    return (
        <Board columns={2} mobileColumns={1}>
            <div class={"spell-duration"}>
                <span class="accent-warning" center>
                { (props.spell.accent == undefined && (props.spell.runes.length > 1 && !noRunesInSpell(props.spell))) &&
                    <span>Добавьте акценты!<br/></span>
                }                
                </span>
                { penaltyActive &&
                    <span><b>Коэффициент потерь:</b> {extendedSpellPenalty}<br/></span>
                }
                <b>Длительность:</b> {Math.floor(duration)} секунд <br/>                
                <br/>
                
                <b>Тип заклинания:</b> {type}<br/>
                <b>Сила:</b> {power}<br/>
                <b>Дальность:</b> {range}<br/>
                <b>Сложность:</b> {difficulty}<br/>
                <b>Каст:</b> {cast}<br/>            
            </div>
            <CopyBox>
                <div>{type}<br/><b>«{props.spell.name}»</b></div>
                {props.spell.runes.map((item, id) => (
                    <div key={Math.random()}>
                        - {getRuneName(item)}{id == props.spell.accent ? " ✨" : ""}{" (" + actions[id] + ")"}
                        </div>
                ))}
                { penaltyActive &&
                    <span><b>Коэффициент потерь:</b> {extendedSpellPenalty}<br/></span>
                }       
                <b>Длительность:</b> {Math.floor(duration)} секунд <br/>         
            </CopyBox>
        </Board>
    );
});


function noRunesInSpell(spell) {
    let result = true;
    for (const rune of spell.runes) {
        if (rune.includes(" Р ")) result = false;
    }
    return result;
}

function getRuneName(baseName: string): string | null {
    let runeName;
    runeList.forEach(rune => {
        if (rune.baseName == baseName) {
            runeName = rune.name;
        }
    });
    return runeName != undefined ? runeName : null;
}