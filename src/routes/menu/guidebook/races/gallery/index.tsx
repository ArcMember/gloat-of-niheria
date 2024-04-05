import { component$, useSignal } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { images } from "~/routes/menu/guidebook/races/gallery/gallery.json"

const Nations = {
    "bestie": "Бестийцы",
    "dwarf": "Дворфы",
    "kharfir": "Кхарфиры",
    "redrehan": "Редрехан",
    "human": "Люди",
    "merie": "Мерии",
    "lamahIbe": "Ламах-Ибэ",
    "lamahViden": "Ламах-Виден",
    "halfblood": "Полукровки",
    "vampire": "Вампиры",
    "werewolf": "Вервольфы",
}
export const head: DocumentHead = {
    // This will used to resolve the <title> of the page
    title: 'Галерея',
}

const splitSymbol = "+";

export default component$(() => {
    const selectedFilter = useSignal("");

    const files = images;

    const GalleryArt = (m: string) => {
        return  <div key={m} class="gallery-art">
                    <a href={"/" + m}>
                        <img src={"/" + m}/>
                    </a>
                    { m.includes(splitSymbol) &&
                        <div right class="author">Автор - {m.split(".")[0].split(splitSymbol)[1].replace("_", " ")}</div>
                    }
                </div>
    } 


    return ( <>
        <div class="gallery-sorting">
            { Object.values(Nations).map((val, key) => (
                <span   onClick$={() => { 
                            if (selectedFilter.value != Object.keys(Nations)[key]) selectedFilter.value = Object.keys(Nations)[key]; 
                            else selectedFilter.value = ""
                        }} 
                        class={"filter-key" + (selectedFilter.value === Object.keys(Nations)[key] ? " selected" : "")} 
                        key={val}>{val}
                </span>
            ))
            }
        </div>
        <div class="gallery">
            <div class="gallery-column">
            {files.filter((el, ind) => ind % 3 === 0 && el.includes(selectedFilter.value)).map((imageUrl) => (
                GalleryArt(imageUrl)
            ))}
            </div>
            <div class="gallery-column">
            {files.filter((el, ind) => ind % 3 === 1 && el.includes(selectedFilter.value)).map((imageUrl) => (
                GalleryArt(imageUrl)
            ))}
            </div>
            <div class="gallery-column">
            {files.filter((el, ind) => ind % 3 === 2 && el.includes(selectedFilter.value)).map((imageUrl) => (
                GalleryArt(imageUrl)
            ))}
            </div>        
        </div> 
    </>);
});