import { $, component$, useSignal, useStore, useTask$ } from '@builder.io/qwik';

import { tokenPrices } from './economy';
import DisableToc from '~/components/side-toc/disable-toc';
import NiheriaHeading from '~/components/visuals/niheria-heading/niheria-heading';
import NiheriaRuler from '~/components/visuals/niheria-ruler/niheria-ruler';

export default component$(() => {
    const bankingMode = useSignal(0);
    const coins = useStore({
        wallets: [
            [0, 0, 0],
            [0, 0, 0]
        ],
        tokens: [0, 0, 0, 0],
        years: 0,
        months: 0,
    },
    { deep: true });

    const calcCoins$ = $((side: number, bills = false) => {
        const target = 1 - side;

        coins.wallets[target] = [0, 0, 0]
        // total
        coins.wallets[target][0] = coins.wallets[side][0] + coins.wallets[side][1] * 100 + coins.wallets[side][2] * 100 * 100;

        if (!bills || (bills && target == 1)) {
            coins.wallets[target][1] += Math.floor(coins.wallets[target][0] / 100);
            coins.wallets[target][0] = coins.wallets[target][0] % 100;

            coins.wallets[target][2] += Math.floor(coins.wallets[target][1] / 100);
            coins.wallets[target][1] = coins.wallets[target][1] % 100;
        }
    })

    const calcTokens$ = $((side: number) => {
        const target = 1 - side;
        if (target == 1) {
            coins.wallets[target] = [0, 0, 0]
            coins.wallets[target][0] = coins.tokens[0]*tokenPrices[0] + coins.tokens[1] * tokenPrices[0] * tokenPrices[1] 
                                        + coins.tokens[2] * tokenPrices[0] * tokenPrices[1] * tokenPrices[2] 
                                        + coins.tokens[3] * tokenPrices[0] * tokenPrices[1] * tokenPrices[2] * tokenPrices[3];

            coins.wallets[target][1] += Math.floor(coins.wallets[target][0] / 100);
            coins.wallets[target][0] = coins.wallets[target][0] % 100;

            coins.wallets[target][2] += Math.floor(coins.wallets[target][1] / 100);
            coins.wallets[target][1] = coins.wallets[target][1] % 100;
        }
        else {
            coins.tokens = [0, 0, 0, 0]
            coins.tokens[0] = Math.floor((coins.wallets[1][0] + coins.wallets[1][1] * 100 + coins.wallets[1][2] * 100 * 100) / tokenPrices[0]);

            coins.tokens[1] += Math.floor(coins.tokens[0] / tokenPrices[1]);
            coins.tokens[0] = coins.tokens[0] % 100;

            coins.tokens[2] += Math.floor(coins.tokens[1] / tokenPrices[2]);
            coins.tokens[1] = coins.tokens[1] % 100;

            coins.tokens[3] += Math.floor(coins.tokens[2] / tokenPrices[3]);
            coins.tokens[2] = coins.tokens[2] % 100;
        }         
    })

    const PERCENT = 1.015;
    const calcDeposit$ = $(() => {
        coins.wallets[1] = [0, 0, 0]
        // total
        coins.wallets[1][0] = coins.wallets[0][0] + coins.wallets[0][1] * 100 + coins.wallets[0][2] * 100 * 100;
        const time = coins.years*12 + coins.months;

        for (let i = 0; i < time; i++) {
            coins.wallets[1][0] = Math.floor(coins.wallets[1][0] * PERCENT);
        }

        coins.wallets[1][1] += Math.floor(coins.wallets[1][0] / 100);
        coins.wallets[1][0] = coins.wallets[1][0] % 100;

        coins.wallets[1][2] += Math.floor(coins.wallets[1][1] / 100);
        coins.wallets[1][1] = coins.wallets[1][1] % 100;
    })

    let activeMode;
    if (bankingMode.value == 0)
        activeMode = 
            <div class="bank-mode mode-coins">
                <hr/>
                <NiheriaHeading size={2} center>Монеты</NiheriaHeading>
                <div center>Риафы, иры и акхиры</div>
                <hr/>
                <div class="mode-control">
                    <div>
                        <div class="coin-input-container">
                            <div class="coin copper"/>
                            <input value={coins.wallets[0][0]} class="coin-input" 
                                onInput$={(_, el) => {coins.wallets[0][0] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcCoins$(0);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                        <div class="coin-input-container">
                            <div class="coin silver"/>
                            <input value={coins.wallets[0][1]} class="coin-input" 
                                onInput$={(_, el) => {coins.wallets[0][1] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcCoins$(0);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                        <div class="coin-input-container">
                            <div class="coin gold"/>
                            <input value={coins.wallets[0][2]} class="coin-input" 
                                onInput$={(_, el) => {coins.wallets[0][2] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcCoins$(0);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                    </div>
                    <i class="fa fa-balance-scale" aria-hidden="true"/>
                    <div>
                        <div class="coin-input-container">
                            <div class="coin copper"/>
                            <input value={coins.wallets[1][0]} class="coin-input" 
                                onInput$={(_, el) => {coins.wallets[1][0] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcCoins$(1);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                        <div class="coin-input-container">
                            <div class="coin silver"/>
                            <input value={coins.wallets[1][1]} class="coin-input" 
                                onInput$={(_, el) => {coins.wallets[1][1] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcCoins$(1);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                        <div class="coin-input-container">
                            <div class="coin gold"/>
                            <input value={coins.wallets[1][2]} class="coin-input" 
                                onInput$={(_, el) => {coins.wallets[1][2] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcCoins$(1);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                    </div>
                </div>
                {/* <div class="tip">В поля можно вводить математические операции.</div> */}
            </div>


    else if (bankingMode.value == 1)
        activeMode = 
            <div class="bank-mode mode-bills">                   
                <hr/>
                <NiheriaHeading size={2} center>Менный Билль</NiheriaHeading>
                <div center>Последней Республики Луат</div>
                <hr/>
                <div class="mode-control">
                    <div>
                        <div class="coin-input-container">
                            <div class="coin bill"/>
                            <input value={coins.wallets[0][0]} class="coin-input" 
                                onInput$={(_, el) => {coins.wallets[0][0] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcCoins$(0, true);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                    </div>
                    <i class="fa fa-balance-scale" aria-hidden="true"/>
                    <div>
                        <div class="coin-input-container">
                            <div class="coin copper"/>
                            <input value={coins.wallets[1][0]} class="coin-input" 
                                onInput$={(_, el) => {coins.wallets[1][0] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcCoins$(1, true);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                        <div class="coin-input-container">
                            <div class="coin silver"/>
                            <input value={coins.wallets[1][1]} class="coin-input" 
                                onInput$={(_, el) => {coins.wallets[1][1] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcCoins$(1, true);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                        <div class="coin-input-container">
                            <div class="coin gold"/>
                            <input value={coins.wallets[1][2]} class="coin-input" 
                                onInput$={(_, el) => {coins.wallets[1][2] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcCoins$(1, true);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                    </div>
                </div>
            </div>


    else if (bankingMode.value == 2)
        activeMode = 
            <div class="bank-mode mode-tokens">                
                <hr/>
                <NiheriaHeading size={2} center>Жетоны Наат</NiheriaHeading>
                <hr/>
                <div class="mode-control">
                    <div>
                        <div class="coin-input-container">
                            <label class="frat">Фраты</label>
                            <div class="coin token frat"/>
                            <input value={coins.tokens[0]} class="coin-input" 
                                onInput$={(_, el) => {coins.tokens[0] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcTokens$(0);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                        <div class="coin-input-container">
                            <label class="nrakt">Нракты</label>
                            <div class="coin token nrakt"/>
                            <input value={coins.tokens[1]} class="coin-input" 
                                onInput$={(_, el) => {coins.tokens[1] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcTokens$(0);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                        <div class="coin-input-container">
                            <label class="diverg">Диверги</label>
                            <div class="coin token diverg"/>
                            <input value={coins.tokens[2]} class="coin-input" 
                                onInput$={(_, el) => {coins.tokens[2] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcTokens$(0);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                        <div class="coin-input-container">
                            <label class="adrekt">Адректы</label>
                            <div class="coin token adrekt"/>
                            <input value={coins.tokens[3]} class="coin-input" 
                                onInput$={(_, el) => {coins.tokens[3] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcTokens$(0);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                    </div>
                    <i class="fa fa-balance-scale" aria-hidden="true"/>
                    <div>
                        <div class="coin-input-container">
                            <div class="coin copper"/>
                            <input value={coins.wallets[1][0]} class="coin-input" 
                                onInput$={(_, el) => {coins.wallets[1][0] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcTokens$(1);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                        <div class="coin-input-container">
                            <div class="coin silver"/>
                            <input value={coins.wallets[1][1]} class="coin-input" 
                                onInput$={(_, el) => {coins.wallets[1][1] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcTokens$(1);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                        <div class="coin-input-container">
                            <div class="coin gold"/>
                            <input value={coins.wallets[1][2]} class="coin-input" 
                                onInput$={(_, el) => {coins.wallets[1][2] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcTokens$(1);}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                    </div>
                </div>
            </div>

            
    else if (bankingMode.value == 3)
        activeMode = 
            <div class="bank-mode mode-deposit">
                <hr/>
                <NiheriaHeading size={2} center>Банковский вклад</NiheriaHeading>
                <hr/>
                <div class="mode-control">
                    <div>
                        <div class="coin-input-container">
                            <div class="coin copper"/>
                            <input value={coins.wallets[0][0]} class="coin-input" 
                                onInput$={(_, el) => {coins.wallets[0][0] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcDeposit$();}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                        <div class="coin-input-container">
                            <div class="coin silver"/>
                            <input value={coins.wallets[0][1]} class="coin-input" 
                                onInput$={(_, el) => {coins.wallets[0][1] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcDeposit$();}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                        <div class="coin-input-container">
                            <div class="coin gold"/>
                            <input value={coins.wallets[0][2]} class="coin-input" 
                                onInput$={(_, el) => {coins.wallets[0][2] = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcDeposit$();}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                    </div>
                    <div>
                        <div>Годы</div>
                        <div class="coin-input-container">                            
                            <input value={coins.years} class="coin-input" 
                                onInput$={(_, el) => {coins.years = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcDeposit$();}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                        <div>Месяцы</div>
                        <div class="coin-input-container">
                            <input value={coins.months} class="coin-input" 
                                onInput$={(_, el) => {coins.months = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value); calcDeposit$();}}
                                onClick$={(_, el) => {el.value = el.value == "0" ? "" : el.value}}
                                onFocusout$={(_, el) => {el.value = el.value == "" ? "0" : el.value}}
                            />
                        </div>
                        <div center>Под 1.5%</div>
                        <div center>в месяц</div>
                    </div>
                    <div>
                        <div class="coin-input-container">
                            <div class="coin copper"/>
                            <input readOnly value={coins.wallets[1][0]} class="coin-input" />
                        </div>
                        <div class="coin-input-container">
                            <div class="coin silver"/>
                            <input readOnly value={coins.wallets[1][1]} class="coin-input" />
                        </div>
                        <div class="coin-input-container">
                            <div class="coin gold"/>
                            <input readOnly value={coins.wallets[1][2]} class="coin-input" />
                        </div>
                    </div>
                </div>
                {/* <div class="tip">В поля можно вводить математические операции.</div> */}
            </div>

    return (
        <>
        <div style="margin: 30px 50px; text-align: center;">
            <i>Этот инструмент позволит вам в конвертации валют и рассчетах банковских вкладов.</i>
        </div>
        <NiheriaRuler/>
        <div class="banking-tool">
            <DisableToc/>            
            <div class="mode-selection">
                {/* <label>Режим:</label> */}
                <div class="banking-mode">
                    <button class={"" + (bankingMode.value == 0 ? "selected " : "")} onClick$={() => {bankingMode.value = 0}}>Монеты</button>
                    <button class={"" + (bankingMode.value == 1 ? "selected " : "")} onClick$={() => {bankingMode.value = 1}}>Менный билль</button>
                    <button class={"" + (bankingMode.value == 2 ? "selected " : "")} onClick$={() => {bankingMode.value = 2}}>Жетоны Наат</button>
                    <button class={"" + (bankingMode.value == 3 ? "selected " : "")} onClick$={() => {bankingMode.value = 3}}>Вклад</button>
                </div>
            </div>
            
            <div class="banking-controls">{activeMode}</div>
        </div>
        </>
    );
});