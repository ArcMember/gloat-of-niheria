import { component$ } from '@builder.io/qwik';
import Board from '~/components/containers/board/board';

const monthsReal = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ]
const monthsNiheria = ["Снегомес", "Хлебосол", "Солнцеворот", "Любицвет", "Вороватка", "Шейландарр", "Сердце Леса", "Фестиваль", "Хмельной", "Искры", "Пусторечье", "Скорбь" ]

export default component$(() => {
    return <Board columns={4} mobileColumns={2}>
        {monthsReal.map((month, i) => {
            return  <div key={month} class="calendar-month">
                        <div class="month-niheria">{monthsReal[i]}</div>
                        <div class="month-real">{monthsNiheria[i]}</div>
                    </div>
        })}
    </Board>
})