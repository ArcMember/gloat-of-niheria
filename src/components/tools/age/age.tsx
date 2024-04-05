import { component$, useSignal, useStore, useTask$ } from '@builder.io/qwik';

import { timeline, yearNow } from '~/routes/menu/history/timeline/timeline';
import Timeline from '../timeline/timeline';
import NiheriaRuler from '~/components/visuals/niheria-ruler/niheria-ruler';

export default component$(() => {
    const store = useStore({
        rangeMin: 0,
        rangeMax: 0,
        birthYear: yearNow-25,
        heroAge: 25,
    });

    return (
        <>
            <div class="age-tool-description">
                Этот инструмент позволит вам узнать, какие события пришлись на время с момента рождения вашего персонажа и по сей день.
            </div>
            <NiheriaRuler/>
            <div class="age-tool">
                <div class="age-controls">   
                    <div class="age-input">
                        <label>Возраст: </label>
                        <input type="text" value={25} onInput$={(_, el) => {
                            store.heroAge = parseInt(el.value);
                            const birthYear = yearNow-store.heroAge;
                            if (birthYear > 0)  store.birthYear = yearNow-store.heroAge;
                            else                store.birthYear = 0;
                        }}/>
                    </div>             
                    <div class="time-now">Сейчас {yearNow} гИЭ</div>                    
                    <div class="time-born">Ваш персонаж родился в {store.birthYear} гИЭ</div>
                </div>
                <div class="age-data">
                    <Timeline rangeMin={store.birthYear} rangeMax={yearNow}/>
                </div>            
            </div>
        </>
    );
});