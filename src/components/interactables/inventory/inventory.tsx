import { component$, useResource$, useSignal, useStore, useTask$ } from '@builder.io/qwik';
import { RequestHandler } from '@builder.io/qwik-city';
import { useGetHeroes } from '~/routes/menu/characters/layout';

interface InventoryProps {
    name?: string,
}

export const onGet: RequestHandler = async ({cookie}) => {
    console.log(cookie)
};

export default component$((props: InventoryProps) => {
    const heroes = useGetHeroes().value

    const heroInv: (string | undefined)[] | undefined = heroes.find(hero => hero.name === props.name)?.inventory.split("||");
    let heroHistoryJSON;
    try {
        heroHistoryJSON = JSON.parse(heroes.find(hero => hero.name === props.name)?.invLog || "{}")
    } catch (error) {
        heroHistoryJSON = {};
    }

    const heroHistory = heroHistoryJSON.logs;
    const showHistory = useSignal(false);

    // Check if inventory is empty, including '', ' ' and other likely exclusions
    const inventoryIsEmpty = heroInv?.every(item => item === '' || item === ' ' || item === undefined);

    const items = heroInv?.map(item => {
            const newItem = item.split(": ");
            return [newItem[0], newItem[1]];
        });
    // console.log(heroInv)
    return ( 
        <>
            { !inventoryIsEmpty && <>
                <h2>Инвентарь </h2>
                <div class={["inventory"]}>
                    {items?.map(([item, description], i) => (
                        <div class={"inventory-row" + (description != undefined ? " item-long" : " item-short")} key={i} onClick$={(event) => {
                            const targetChildren = (event.target as HTMLElement).children
                            // console.log(targetChildren[0].children)
                            const text = 
                                targetChildren[0].children[0].textContent
                                + " "
                                + targetChildren[0].children[2].textContent;
                            
                            navigator.clipboard.writeText(text)
                                .then(() => {
                                    (event.target as HTMLElement).classList.add("copied");
                                    setTimeout(() => {
                                        (event.target as HTMLElement).classList.remove("copied")
                                    }, 300)
                                })
                                .catch(err => {
                                    console.error('failed to copy', err)
                                })
                        }}>
                            {description != undefined && 
                                <div><b>{item}:</b><br/><span>{description}</span></div>
                            }
                            {description == undefined && 
                                <div><b>{item}</b><br/><span>{description}</span></div>
                            }
                            {/* <div></div> */}
                        </div>
                    ))}
                </div>
                { (Symbol.iterator in Object(heroHistory)) &&
                <div class={["inventory-history-button"]} onClick$={(event) => {
                    const et = event.target as HTMLElement;
                    if (et.classList.contains("show")) {
                        et.classList.remove("show")
                        showHistory.value = false;
                    }
                    else {
                        et.classList.add("show");
                        showHistory.value = true;
                    }
                }}>
                    <i class="fa fa-history"><span>История</span></i>
                    { showHistory.value &&
                    <div class="inventory-history-content">
                        {[...heroHistory].reverse().slice(0, 10).map((item, i) => (
                            <div class={["inventory-history-row"]} key={i}>
                                <div>{item.info}</div>
                                <em>{new Date(item.date).toLocaleString('ru',{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</em>
                            </div>
                        ))}
                    </div>
                    }
                </div>
                }
            </> 
            }
        </>
    )
})