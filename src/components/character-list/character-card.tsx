import { component$, useSignal, $, useStore, useVisibleTask$, useTask$ } from '@builder.io/qwik';
import Details from "~/components/containers/details/details";

import { canons } from '~/routes/menu/characters/canons/canons';
import { heroes } from '~/routes/menu/characters/heroes/heroes';
import { grave } from '~/routes/menu/characters/graveyard/grave';
import { wanted } from '~/routes/menu/characters/wanted/wanted';
import NiheriaRuler from '../visuals/niheria-ruler/niheria-ruler';

enum CharListType {
    Canons = "canons",
    Heroes = "heroes",
    Grave = "grave",
    Wanted = "wanted",
}

interface CharacterData {
    data?: string,
    name?: string,
}

export default component$((props: CharacterData) => {
    let data = canons
    let selectedData = CharListType.Canons
    if (props.data == CharListType.Heroes) {
        data = heroes;
        selectedData = CharListType.Heroes;
    }
    // Individual lists of Grave and Wanted aren't implemented
    // Instead, there are fields in 'heroes' and 'canons' of the same names
    else if (props.data == CharListType.Grave) {
        data = grave;
        selectedData = CharListType.Heroes;
    }
    else if (props.data == CharListType.Wanted) {
        data = wanted;
        selectedData = CharListType.Heroes;
    }

    const charData = data.find(item => item.name === props.name);
    const getFaction = (id: string) => {
        const key = charData.data.factions[id]
        if (key == "gud")
            return <span><i class="fa fa-check"/> добродушно</span>
        if (key == "neu")
            return <span><i class="fa fa-meh-o"/> нейтрально</span>
        if (key == "sus")
            return <span><i class="fa fa-exclamation-triangle"/> подозрительно</span>
        if (key == "neg")
            return <span><i class="fa fa-ban"/> негативно</span>
    }

    const charSrcSplit = charData?.src.split("/")
    const charSrc = charSrcSplit[charSrcSplit?.length-1]

    if (selectedData == CharListType.Heroes)
    return  <div class="character-card">
                <div class="data">
                    <div class="name-container">
                        <div class="char-name">{charData.name}</div>
                        { (charData.subname != undefined && charData.subname != "") &&
                            <div class="char-subname">{charData.subname}</div>
                        }
                    </div>
                    { (charData.subtitle != undefined && charData.subtitle != "") &&
                        <div class="char-subtitle">{charData.subtitle}</div>
                    }
                    <div class="char-property"><b>Возраст: </b><span dangerouslySetInnerHTML={charData.data.age}/></div>
                    <div class="char-property"><b>Народ:</b> {charData.data.nation}</div>
                    <div class="char-property"><b>Класс:</b> {charData.data.class}</div>
                    <div class="char-property"><b>Игрок:</b> <a href={charData.data.player.split("|")[1]}>{charData.data.player.split("|")[0]}</a></div>
                    <h4>Деятельность</h4>
                    <div class="char-property">{charData.data.occupation}</div>
                    {charData.data.quests !== "" &&
                    <div class="char-property"><br/><b>Завершены глобальные квесты:</b><br/>{charData.data.quests}</div>
                    }
                    <br/>
                    <Details summary="Отношение фракций">
                    <table class="char-factions">
                        <tbody>
                            <tr><td class="state">Реабор-Тхаес</td><td>{getFaction("RT")} </td></tr>
                            <tr><td class="state">Вече Тейель</td><td>{getFaction("TY")} </td></tr>
                            <tr><td class="state">Великая Афитра</td><td>{getFaction("AF")} </td></tr>
                            <tr><td class="state">Луат</td><td>{getFaction("LT")} </td></tr>
                            <tr><td class="state">Коркафт</td><td>{getFaction("KF")} </td></tr>
                            <tr><td class="state">Мордвин</td><td>{getFaction("MW")} </td></tr>                                
                            <tr><td class="state">Флатрия</td><td>{getFaction("FL")} </td></tr>
                            <tr><td class="state">Сикстинна</td><td>{getFaction("SX")} </td></tr>
                            <tr><td class="state">Секри</td><td>{getFaction("SK")} </td></tr>
                            <tr><td class="state">Кланы</td><td>{getFaction("KL")} </td></tr>
                            <tr><td class="state">Хельгеран</td><td>{getFaction("HL")} </td></tr>
                        </tbody>
                    </table>
                    </Details>
                </div>
                <div class="pic"><img src={charSrc}/></div>
            </div>
    else if (selectedData == CharListType.Canons)
    return  <>
                <div class="character-card">
                    <div class="data">
                        <div class="name-container">
                            <div class="char-name">{charData.name}</div>
                            { (charData.subtitle != undefined && charData.subtitle != "") &&
                                <div class="char-subtitle">{charData.subtitle}</div>
                            }
                        </div>
                        <div class="char-property"><span dangerouslySetInnerHTML={charData.data.age}/></div>
                        <br/>
                        <div class="char-property"><span dangerouslySetInnerHTML={charData.data.nation}/></div>
                        { (charData.data.class != undefined && charData.data.class != "") && 
                            <>
                                <br/>                    
                                <div class="char-property"><span dangerouslySetInnerHTML={charData.data.class}/></div>
                            </>
                        }
                        <br/>
                        <div class="char-property"><span dangerouslySetInnerHTML={charData.data.occupation}/></div>
                        {charData.data.quests !== "" &&
                        <div class="char-property"><b>Участвует в квестах:</b>{charData.data.quests}</div>
                        }
                    </div>
                    <div class="pic">
                        <img src={charSrc}/>
                        { charData.author != undefined &&
                        <a style="display: block; text-align: right;" href={charData.author[1]}>Автор арта - {charData.author[0]}</a>
                        }
                    </div>                    
                </div>                
            </>

})