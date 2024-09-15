import { component$, $, useStore, useVisibleTask$, useTask$ } from '@builder.io/qwik';
import ButtonRect from '../controls/button-rect/button-rect';

import { canons } from '~/routes/menu/characters/canons/canons';
import { heroes } from '~/routes/menu/characters/heroes/heroes';
import { grave } from '~/routes/menu/characters/graveyard/grave';
import { wanted } from '~/routes/menu/characters/wanted/wanted';

enum CharListType {
    Canons = "canons",
    Heroes = "heroes",
    Grave = "grave",
    Wanted = "wanted",
}

enum FilterType {
    Sex, 
    Class,
    State, 
    Nation, 
    Letter,
    Guild,
}

interface CharacterList {
    columns?: number,
    data?: string,
    wanted?: boolean,
    dead: boolean,

    sexFilter?: boolean | string,
    classFilter?: boolean | string,
    stateFilter?: boolean | string,
    nationFilter?: boolean | string,
    letterFilter?: boolean | string,
    guildFilter?: boolean | string,
}

export default component$((props: CharacterList) => {
    let data = canons
    let selectedData = CharListType.Canons
    if (props.data == CharListType.Heroes) {
        data = heroes
        selectedData = CharListType.Heroes
    }
    // Individual lists of Grave and Wanted aren't implemented
    // Instead, there are fields in 'heroes' and 'canons' of the same names
    else if (props.data == CharListType.Grave) {
        data = grave
        selectedData = CharListType.Heroes
    }
    else if (props.data == CharListType.Wanted) {
        selectedData = CharListType.Heroes
        data = wanted
    }

    if (props.wanted == true)
        data = data.filter(char => char.wanted != undefined && char.wanted != "")

    if (props.dead == true)
        data = data.filter(char => char.dead == true)
    else
        data = data.filter(char => char.dead != true)

    const filtersStore = useStore({
        sex: "",
        class: "",
        state: "",
        nation: "",
        letter: "",
        guild: "",
    })

    const toggleFilter$ = $((filterValue: string, filterType: FilterType) => {
        if (filterType == FilterType.Sex || filterType == FilterType.Letter || filterType == FilterType.Class) {
            if (filterType == FilterType.Sex) filtersStore.sex = filtersStore.sex == filterValue ? "" : filterValue;
            if (filterType == FilterType.Letter) filtersStore.letter = filtersStore.letter == filterValue ? "" : filterValue;
            if (filterType == FilterType.Class) filtersStore.class = filtersStore.class == filterValue ? "" : filterValue;
        }
        else {
            const toggleFilter = ((filterValue: string, filterString: string) => {
                const arr = filterString.split(" ")
                const index = arr.indexOf(filterValue);
                if (index !== -1) 
                    arr.splice(index, 1); // Remove the element from the array
                else 
                    arr.push(filterValue); // Add the element to the array
                return arr.join(" ")
            })
            if (filterType == FilterType.State) 
                filtersStore.state = toggleFilter(filterValue, filtersStore.state)
            if (filterType == FilterType.Nation) 
                filtersStore.nation = toggleFilter(filterValue, filtersStore.nation)
            if (filterType == FilterType.Guild) 
                filtersStore.guild = toggleFilter(filterValue, filtersStore.guild)
        }
    })

    useTask$(() => {
        if (typeof props.sexFilter == "string")
        toggleFilter$(props.sexFilter, FilterType.Sex)
        if (typeof props.classFilter == "string")
            toggleFilter$(props.classFilter, FilterType.Class)
        if (typeof props.stateFilter == "string")
            toggleFilter$(props.stateFilter, FilterType.State)
        if (typeof props.nationFilter == "string") 
            toggleFilter$(props.nationFilter, FilterType.Nation)
        if (typeof props.guildFilter == "string") 
            toggleFilter$(props.guildFilter, FilterType.Nation)
        if (typeof props.letterFilter == "string") 
            toggleFilter$(props.letterFilter, FilterType.Letter)  
    })
      

    const sexDefaultFilter = ["Мужчина", "Женщина"]
    const classDefaultFilter = ["Воин", "Разбойник", "Маг", "Мирный"]
    const stateDefaultFilter = ["Реабор-Тхаес", "Тейель", "Афитра", "Луат", "Коркафт", "Мордвин", "Флатрия", "Сикстинна", "Секри", "Кланы", "Хельгеран"];
    const nationDefaultFilter = ["Бестиец", "Дворф", "Кхарфир", "Редрехан", "Человек", "Мерия", "Ламах-виден", "Ламах-ибэ", "Полукровка", "Бестиарный", "Проклятый"];
    const letterDefaultFilter = ["А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П",
                                "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я"];
    const guildDefaultFilter = ["Искра", "Железнодорожники", "Бюро", "Ассоциация", "Адмиралтейство"];

    return (
        <div class="character-list-container">
            <div class="filter-container">
            { typeof props.classFilter == "boolean" && <div class={"filter-list class-filter"}>{
                classDefaultFilter.map((filter) => {
                    return <span 
                        key={filter} 
                        class={"filter-key class-key" + (filtersStore.class == filter ? " sel" : "")}
                        onClick$={() => toggleFilter$(filter, FilterType.Class)} 
                        id={filter}>{filter}</span>
                })}
            </div>}
            </div>            
            <div class="filter-container">                
                { typeof props.sexFilter == "boolean" && <div class={"filter-list sex-filter"}>{
                    sexDefaultFilter.map((filter) => {
                        return <span 
                            key={filter} 
                            class={"filter-key sex-key" + (filtersStore.sex == filter ? " sel" : "")}
                            onClick$={() => toggleFilter$(filter, FilterType.Sex)} 
                            id={filter}>{filter}</span>
                    })}
                </div>}
                { typeof props.stateFilter == "boolean" && <div class={"filter-list state-filter"}>{
                    stateDefaultFilter.map((filter) => {
                        return <span 
                            key={filter} 
                            class={"filter-key state-key" + (filtersStore.state.includes(filter) ? " sel" : "")}
                            onClick$={() => toggleFilter$(filter, FilterType.State)} 
                            id={filter}>{filter}</span>
                    })}
                </div>}
                { typeof props.stateFilter == "boolean" && <div class={"filter-list guild-filter"}>{
                    guildDefaultFilter.map((filter) => {
                        return <span 
                            key={filter} 
                            class={"filter-key guild-key" + (filtersStore.guild.includes(filter) ? " sel" : "")}
                            onClick$={() => toggleFilter$(filter, FilterType.Guild)} 
                            id={filter}>{filter}</span>
                    })}
                </div>}
                { typeof props.nationFilter == "boolean"    && <div class={"filter-list race-filter"}>{
                    nationDefaultFilter.map((filter) => {
                        return <span 
                            key={filter} 
                            class={"filter-key nation-key" + (filtersStore.nation.includes(filter) ? " sel" : "")}
                            onClick$={() => toggleFilter$(filter, FilterType.Nation)} 
                            id={filter}>{filter}</span>
                    })}
                </div>}
            </div>
            { typeof props.letterFilter == "boolean" &&
                <div>
                    <hr/>
                    <div class={"filter-list letter-filter"}>{
                        letterDefaultFilter.map((filter) => {
                            return <span 
                                key={filter} 
                                class={"filter-key letter-key" + (filtersStore.letter == filter ? " sel" : "")}
                                onClick$={() => toggleFilter$(filter, FilterType.Letter)} 
                                id={filter}>{filter}</span>
                            })}
                    </div>
                </div>
            }
            { props.sexFilter && props.stateFilter && props.nationFilter && <hr/> }            
            <div class={"character-list " + (props.columns != undefined ? " board" + props.columns : " board3")} id="character-list">
                { data.map((char) => {
                    return <Character 
                        key={char.name} 
                        name={char.name} 
                        subtitle={char.subtitle} 
                        filter={char.filter}
                        href={"/menu/characters/" + selectedData + "/" + char.href} 
                        src={(char.src != undefined && char.src != "") ? "/menu/characters/" + selectedData + "/" + char.src : "/menu/characters/character.jpg"} 
                        info={(props.wanted) ? char.wanted : (props.dead) ? char.dead : ""}

                        sexFilter={filtersStore.sex}
                        classFilter={filtersStore.class}
                        stateFilter={filtersStore.state}
                        nationFilter={filtersStore.nation}
                        letterFilter={filtersStore.letter}
                        guildFilter={filtersStore.guild}
                    />
                })}
            </div>
        </div>
    );
});

function includesAny(str: string, filters: string) {
    if (filters.split(' ').length > 1)
        return filters.split(' ').some(item => item != "" ? str.includes(item) : false );
    else 
        return true
}
function includesAll(str: string, filters: string) {
    return filters.split(' ').every(item => str.includes(item));
}


interface Character {
    name: string;
    subtitle?: string;
    filter: string;
    href?: string;
    src?: string;
    info?: string;

    sexFilter?: string;
    classFilter?: string;
    stateFilter?: string;
    nationFilter?: string;
    letterFilter?: string;
    guildFilter?: string;
}

export const Character = component$((props: Character) => {
    const charFilter = props.filter;

    const sexFilter = props.sexFilter === undefined ? "" : props.sexFilter
    const classFilter = props.classFilter === undefined ? "" : props.classFilter
    const stateFilter = props.stateFilter === undefined ? "" : props.stateFilter
    const nationFilter = props.nationFilter === undefined ? "" : props.nationFilter
    const letterFilter = props.letterFilter === undefined ? "" : props.letterFilter
    const guildFilter = props.guildFilter === undefined ? "" : props.guildFilter

    let filteredIn = false
    if (charFilter.includes(sexFilter) && 
        (letterFilter == "" || charFilter.includes(letterFilter + " ")) && 
        charFilter.includes(classFilter) && 
        includesAny(charFilter, stateFilter) && 
        includesAny(charFilter, guildFilter) && 
        includesAny(charFilter, nationFilter)) 
    {
        filteredIn = true
    }

    return (
        <div class={"character"} style={`display: ${filteredIn ? "auto" : "none"}`}>
            <ButtonRect href={props.href} src={props.src} title={props.name} subtitle={props.subtitle}/>
            <div class="character-info">{props.info}</div>
        </div>
    );
});
