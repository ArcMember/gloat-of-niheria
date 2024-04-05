import { Composer, Context, Format, Telegraf, Telegram, session } from 'telegraf';
import { message } from 'telegraf/filters';
import { Prisma, PrismaClient } from '@prisma/client';
import { Markup } from "telegraf";
import { Scenes } from 'telegraf';
import { WizardScene } from 'telegraf/typings/scenes';
import { inlineKeyboard } from 'telegraf/typings/markup';
import { Stage } from 'telegraf/typings/scenes';
import { callback } from 'telegraf/typings/button';
import { InlineKeyboardButton, InlineKeyboardMarkup, Message } from 'telegraf/typings/core/types/typegram';
import { FmtString, code, fmt } from 'telegraf/format';
import { stringify } from 'querystring';

const SPECIAL_CHARS = [
    '\\',
    '_',
    '[',
    ']',
    '(',
    ')',
    '~',
    '`',
    '>',
    '<',
    '&',
    '#',
    '+',
    '-',
    '=',
    '|',
    '{',
    '}',
    '.',
    '!'
]
const escapeMarkdown = (text: string) => {
    SPECIAL_CHARS.forEach(char => (text = text.replaceAll(char, `\\${char}`)))
    // console.log(text)
    return text
}

enum CommandType {
    Hears, Command
}

enum InventoryAction {
    Add, Remove, Update
}

interface SessionData extends Scenes.WizardSessionData {
	commandText: string;
    commandType: CommandType;

    inventoryAction: InventoryAction;
    inventoryMessage: Message;
    itemRequestMessage: Message;

    heroName: string;
    sessionTimer: number;
}


interface InventoryContext extends Context {
    // declare scene type
	scene: Scenes.SceneContextScene<InventoryContext, SessionData>;
	// declare wizard type
	wizard: Scenes.WizardContextWizard<InventoryContext>;
}

export async function initBot() {
    const prisma = new PrismaClient();
    // await prisma.hero.upsert({
    //     where: {            name: "Мэйв Тинкера"            },
    //     update: {            name: "Мэйв Тинкера"        },
    //     create: {            name: "Мэйв Тинкера",            userId: 227693870,        },
    // })
    // await prisma.hero.upsert({
    //     where: {            name: "Тэхстейн"            },
    //     update: {            name: "Тэхстейн"        },
    //     create: {            name: "Тэхстейн",            userId: 227693870,        },
    // })    

    // console.log(await prisma.hero.findMany({}))



    // ______                      ________       __  __    __                         
    // |      \                    |        \     |  \|  \  |  \                        
    //  \$$$$$$ _______  __     __ | $$$$$$$$ ____| $$ \$$ _| $$_     ______    ______  
    //   | $$  |       \|  \   /  \| $$__    /      $$|  \|   $$ \   /      \  /      \ 
    //   | $$  | $$$$$$$\\$$\ /  $$| $$  \  |  $$$$$$$| $$ \$$$$$$  |  $$$$$$\|  $$$$$$\
    //   | $$  | $$  | $$ \$$\  $$ | $$$$$  | $$  | $$| $$  | $$ __ | $$  | $$| $$   \$$
    //  _| $$_ | $$  | $$  \$$ $$  | $$_____| $$__| $$| $$  | $$|  \| $$__/ $$| $$      
    // |   $$ \| $$  | $$   \$$$   | $$     \\$$    $$| $$   \$$  $$ \$$    $$| $$      
    //  \$$$$$$ \$$   \$$    \$     \$$$$$$$$ \$$$$$$$ \$$    \$$$$   \$$$$$$  \$$      
                                                                                                                                                                   


    const selectCharacterStep = new Composer<InventoryContext>();
    selectCharacterStep.action(/hero (.*$)/, async (ctx) => {
        // ctx.reply("asdas", Markup.removeKeyboard())
        // console.log("Found name: " + ctx.match[1]);
        ctx.scene.session.heroName = ctx.match[1];
        updateInventoryMessage(ctx)
        return ctx.wizard.next();
    })

    const inventoryControlsStep = new Composer<InventoryContext>();
    const addCancelButton = async (ctx: InventoryContext) => {
        const keyboard = Markup.inlineKeyboard(
            [Markup.button.callback("× Отменить изменение", "cancel")]
        ,).reply_markup
        ctx.telegram.editMessageReplyMarkup(
            ctx.scene.session.inventoryMessage.chat.id,
            ctx.scene.session.inventoryMessage.message_id,
            undefined,
            {inline_keyboard: keyboard.inline_keyboard}
        )
    }
    inventoryControlsStep.action("add", async (ctx) => {
        resetSessionTimer(ctx);
        ctx.scene.session.inventoryAction = InventoryAction.Add;
        ctx.scene.session.itemRequestMessage = await ctx.replyWithMarkdownV2(`Напишите название предмета и через двоеточие, если необходимо, его качества\\.\n\nНапример\\:\n\`Название Предмета: описание, количество, стоимость\``, 
        {
            parse_mode: "MarkdownV2",
            reply_markup: {
                force_reply: true,
                input_field_placeholder: "Название предмета", 
            }
        });
        await addCancelButton(ctx);
        return ctx.wizard.next();
    })
    inventoryControlsStep.action("remove", async (ctx) => {
        resetSessionTimer(ctx);
        ctx.scene.session.inventoryAction = InventoryAction.Remove;
        ctx.scene.session.itemRequestMessage = await ctx.sendMessage("Напишите точное название предмета, который необходимо удалить.", {
            reply_markup: {
                force_reply: true,
                input_field_placeholder: "Название предмета", 
            }
        });
        await addCancelButton(ctx);
        return ctx.wizard.next();
    })
    inventoryControlsStep.action("update", async (ctx) => {
        resetSessionTimer(ctx);
        ctx.scene.session.inventoryAction = InventoryAction.Update;
        ctx.scene.session.itemRequestMessage = await ctx.replyWithMarkdownV2(`Напишите название предмета и через двоеточие его новые качества\\.\n\nНапример\\:\n\`Название Предмета: описание, количество, стоимость\``, {
            reply_markup: {
                force_reply: true, 
                input_field_placeholder: "Название предмета", 
            }
        });
        await addCancelButton(ctx);
        return ctx.wizard.next();
    })

    const itemStep = new Composer<InventoryContext>();
    itemStep.action("cancel", async (ctx) => {
        ctx.telegram.deleteMessage(
            ctx.scene.session.itemRequestMessage.chat.id,
            ctx.scene.session.itemRequestMessage.message_id,
        ).catch((e) => console.log(e))
        updateInventoryMessage(ctx);
        return ctx.wizard.selectStep(2);
    })
    itemStep.on(message("text"), async (ctx) => {
        resetSessionTimer(ctx);
        
        const itemString = ctx.message.text
        const itemParts = itemString.split(": ")
        const itemName = itemParts[0];
        // const itemDescription = itemString[1];

        await ctx.deleteMessage()

        // Add item 
        if (ctx.scene.session.inventoryAction == InventoryAction.Add) {
            const result = await addToInventory(ctx.scene.session.heroName, itemString)
            if (result == AddToInventoryResult.Success) {
                await updateInventoryMessage(ctx)
                .then(async () => { 
                    ctx.telegram.deleteMessage(
                        ctx.scene.session.itemRequestMessage.chat.id,
                        ctx.scene.session.itemRequestMessage.message_id,
                    ).catch((e) => console.log(e))
                })
            }
            else {
                await ctx.telegram.deleteMessage(
                    ctx.scene.session.itemRequestMessage.chat.id,
                    ctx.scene.session.itemRequestMessage.message_id,
                ).catch((e) => console.log(e))
                .then(async () => {
                    const message = `Дубликат предмета\\! Лучше измените количество с помощью \\"⟳ Изменить\\"\\. 💣`
                    const replyMessage = await ctx.replyWithMarkdownV2(message);
                    destroy(ctx, replyMessage, message);

                })
            }
            return ctx.wizard.selectStep(2);
        }
        // Remove item
        if (ctx.scene.session.inventoryAction == InventoryAction.Remove) {
            await removeFromInventory(ctx.scene.session.heroName, itemName)
            .then(async () => {
                updateInventoryMessage(ctx);
            })
            .then(async () => { 
                ctx.telegram.deleteMessage(
                    ctx.scene.session.itemRequestMessage.chat.id,
                    ctx.scene.session.itemRequestMessage.message_id,
                ).catch((e) => console.log(e))
            })
            return ctx.wizard.selectStep(2);
        }
        // Update item
        if (ctx.scene.session.inventoryAction == InventoryAction.Update) {
            await updateInInventory(ctx.scene.session.heroName, itemString)
            .then(async () => {
                updateInventoryMessage(ctx);
            })
            .then(async () => { 
                ctx.telegram.deleteMessage(
                    ctx.scene.session.itemRequestMessage.chat.id,
                    ctx.scene.session.itemRequestMessage.message_id,
                ).catch((e) => console.log(e))
            })
            return ctx.wizard.selectStep(2);
        }

    })

    inventoryControlsStep.action("remove", async (ctx) => {
        return ctx.wizard.selectStep(2);
    })

    const inventoryWizard = new Scenes.WizardScene<InventoryContext>(
        'INVENTORY_SCENE',
        // step 0
        async (ctx) => {
            if (ctx.chat?.type === "private") {
                const userId = ctx.from?.id
                const heroes = await prisma.hero.findMany({ where: {userId: userId} })
                if (heroes.length > 0) {
                    const mainMessage = await ctx.replyWithMarkdownV2("Выберите персонажа: ", 
                        Markup.inlineKeyboard(heroes.map((hero) => {
                            return Markup.button.callback(hero.name, "hero " + hero.name);
                        }))
                    );
                    ctx.scene.session.inventoryMessage = mainMessage
                }
                else {
                    const mainMessage = await ctx.reply("Нет персонажей :(");
                    ctx.scene.session.inventoryMessage = mainMessage
                }
                // ctx.replyWithMarkdownV2("asdas", Markup.removeKeyboard())
                // ctx.deleteMessage();
            }
            return ctx.wizard.next();
        },
        // step 1
        selectCharacterStep,
        // step 2
        inventoryControlsStep,
        // step 3
        itemStep,
        // step 4
        async ctx => { 
            return ctx.wizard.selectStep(2)
        }

    )


    const updateInventoryMessage = async (ctx: InventoryContext) => {
        const keyboard = Markup.inlineKeyboard([
            Markup.button.callback("+ Добавить", "add"),
            Markup.button.callback("- Удалить", "remove"),
            Markup.button.callback("⟳ Изменить", "update"),
        ]).reply_markup
        ctx.telegram.editMessageText(
            ctx.scene.session.inventoryMessage.chat.id,
            ctx.scene.session.inventoryMessage.message_id,
            undefined,
            escapeMarkdown(await getInv(ctx.scene.session.heroName)),
            {parse_mode: "MarkdownV2"}
        ).then(() => {
            ctx.telegram.editMessageReplyMarkup(
                ctx.scene.session.inventoryMessage.chat.id,
                ctx.scene.session.inventoryMessage.message_id,
                undefined,
                {inline_keyboard: keyboard.inline_keyboard}
            )
        })
    }

    // ______                      __                           __       
    // |      \                    |  \                         |  \      
    //  \$$$$$$ _______  __     __ | $$       ______    ______  | $$   __ 
    //   | $$  |       \|  \   /  \| $$      /      \  /      \ | $$  /  \
    //   | $$  | $$$$$$$\\$$\ /  $$| $$     |  $$$$$$\|  $$$$$$\| $$_/  $$
    //   | $$  | $$  | $$ \$$\  $$ | $$     | $$  | $$| $$  | $$| $$   $$ 
    //  _| $$_ | $$  | $$  \$$ $$  | $$_____| $$__/ $$| $$__/ $$| $$$$$$\ 
    // |   $$ \| $$  | $$   \$$$   | $$     \\$$    $$ \$$    $$| $$  \$$\
    //  \$$$$$$ \$$   \$$    \$     \$$$$$$$$ \$$$$$$   \$$$$$$  \$$   \$$
                    
    
    const inventoryLookWizard = new Scenes.WizardScene<InventoryContext>(
        'INVENTORY_LOOK',
        // step 0
        async (ctx) => {            
            let heroName = undefined
            if (ctx.scene.session.commandType == CommandType.Hears)
                heroName = ctx.scene.session.commandText.split("Инвентарь ")[1]
            else if (ctx.scene.session.commandType == CommandType.Command)
                heroName = ctx.scene.session.commandText.split("/inv ")[1]

            // const heroes = await prisma.hero.findMany({ where: {userId: userId} })
            if (heroName != undefined && heroName != "") {
                const messageText = escapeMarkdown(await getInv(heroName));
                const replyMessage = await ctx.replyWithMarkdownV2(messageText)
                if (messageText.includes("💣"))
                    destroy(ctx, replyMessage, messageText);
            }
            else {
                ctx.deleteMessage().catch((e) => console.log(e));
                const messageText = "Неправильный запрос\\. 💣"
                const replyMessage = await ctx.replyWithMarkdownV2(messageText)
                destroy(ctx, replyMessage, messageText);
            }
            return ctx.scene.leave();
        },
        // step 2
        // async ctx => { 
        //     return ctx.scene.leave();
        // }

    )



    // ______                    ________                    __           
    // |      \                  |        \                  |  \          
    //  \$$$$$$ _______  __     __\$$$$$$$$______    ______  | $$  _______ 
    //   | $$  |       \|  \   /  \ | $$  /      \  /      \ | $$ /       \
    //   | $$  | $$$$$$$\\$$\ /  $$ | $$ |  $$$$$$\|  $$$$$$\| $$|  $$$$$$$
    //   | $$  | $$  | $$ \$$\  $$  | $$ | $$  | $$| $$  | $$| $$ \$$    \ 
    //  _| $$_ | $$  | $$  \$$ $$   | $$ | $$__/ $$| $$__/ $$| $$ _\$$$$$$\
    // |   $$ \| $$  | $$   \$$$    | $$  \$$    $$ \$$    $$| $$|       $$
    //  \$$$$$$ \$$   \$$    \$      \$$   \$$$$$$   \$$$$$$  \$$ \$$$$$$$ 
                                                                        
                                                                        
    const getInv = async (heroName: string): Promise<string> => {
        const hero = await prisma.hero.findUnique({ where: {name: heroName}});
        if (hero?.inventory != "" && hero?.inventory != undefined) {
            const inv: string[] = hero?.inventory.split("||") ?? [];
            inv.forEach((invItem, index) => {
                const itemParts = invItem.split(": ");
                const name = itemParts[0];
                const desc = itemParts[1] != undefined ? `: ${itemParts[1]}` : "";
                inv[index] = `• *${name}*${desc}`;
            })
            return `${heroName}, инвентарь:\n\n${inv.join('\n')}`;
        }
        else if (hero?.inventory == undefined) {
            return `${heroName} — нет такого персонажа\\. 💣`;
        }
        else {
            return `${heroName}, инвентарь:\n\nПусто!`;
        }
    }

    enum AddToInventoryResult {
        Success, Duplicate
    }
    const addToInventory = async (heroName: string, item: string): Promise<AddToInventoryResult> => {
        const hero = await prisma.hero.findUnique({ where: {name: heroName}});
        const rawInv = hero?.inventory.split("||") ?? []
        const inv: string[] = (rawInv.length > 0 && rawInv[0] != "") ? rawInv : [];
        const oldInv = [...inv]

        //  Add item
        let noDuplicates: boolean = true;
        inv.forEach((invItem) => {
            const itemParts = item.split(": ");
            const itemName = itemParts[0];

            const invItemParts = invItem.split(": ");
            const invItemName = invItemParts[0];
            if (invItemName == itemName) {
                noDuplicates = false;
                return;
            }
        })

        if (!noDuplicates) return AddToInventoryResult.Duplicate
        inv.push(item)

        const newInv: string = inv.join("||");
        await prisma.hero.update({ 
            where: {name: heroName}, 
            data: {inventory: newInv}
        }).then(() => {
            addInventoryLog(
                heroName, 
                `Предмет добавлен:: ${item}`,
                oldInv
            )
        })
        return AddToInventoryResult.Success;
    }
    const removeFromInventory = async (heroName: string, itemName: string) => {
        const hero = await prisma.hero.findUnique({ where: {name: heroName}});
        const inv: string[] = hero?.inventory.split("||") ?? [];
        let deletedItem: string = ""
        const newInvArray = inv.filter((invItem) => {
            const invItemParts = invItem.split(": ");
            const invItemName = invItemParts[0];
            const condition = invItemName != undefined 
                && invItemName !== itemName 
                && invItemName != "" 
                && invItemName != " ";

            if (condition) deletedItem = invItem;
            return condition
        })
        const newInv: string = newInvArray.join("||");
        await prisma.hero.update({ 
            where: {name: heroName}, 
            data: {inventory: newInv}
        }).then(() => {
            addInventoryLog(
                heroName, 
                `Предмет удалён:: ${deletedItem}`,
                inv
            )
        })
    }
    const updateInInventory = async (heroName: string, item: string) => {
        const hero = await prisma.hero.findUnique({ where: {name: heroName}});
        const inv: string[] = hero?.inventory.split("||") ?? [];
        const newInv = [...inv]

        const itemParts = item.split(": ");
        const itemName = itemParts[0];
        const itemDescription = itemParts[1];

        let oldItem: string = ""

        newInv.forEach((invItem, index) => {
            const invItemParts = invItem.split(": ");
            const invItemName = invItemParts[0];
            let invItemDescription = invItemParts[1];

            // console.log(invItemName, " - ", itemName, " - ", invItemName == itemName)
            if (invItemName == itemName) {
                oldItem = invItem;
                invItemDescription = itemDescription;
                newInv[index] = [invItemName, invItemDescription].join(": ");
            }
        })
        await prisma.hero.update({ 
            where: {name: heroName}, 
            data: {inventory: newInv.join("||")}
        }).then(() => {
            addInventoryLog(
                heroName, 
                `Предмет обновлён:: from ${oldItem} → to ${item}`,
                inv
            )
        })
    }


// ██       ██████   ██████   ██████  ██ ███    ██  ██████  
// ██      ██    ██ ██       ██       ██ ████   ██ ██       
// ██      ██    ██ ██   ███ ██   ███ ██ ██ ██  ██ ██   ███ 
// ██      ██    ██ ██    ██ ██    ██ ██ ██  ██ ██ ██    ██ 
// ███████  ██████   ██████   ██████  ██ ██   ████  ██████  

    type Log = {
        info: string,
        oldInventory: string,
        date: string,
    }
    class Logs {
        logs: Log[]
        constructor(logsObjeect: any) {
            this.logs = logsObjeect.logs as Log[];
        }
    }
    
    const addInventoryLog = async (heroName: string, log: string, oldInventory: string[]) => {
        const hero = await prisma.hero.findUnique({ where: {name: heroName}});
        // const rawLog = hero?.invLog ?? "{logs: []}"
        let logObject: Logs 
        try {
            const jsonObject = JSON.parse(hero?.invLog ?? "{logs: []}")
            logObject = new Logs(jsonObject)
        } catch (error) {
            logObject = {logs: []}
        }

        const newLog: Log = {
            info: log,
            oldInventory: oldInventory.join("; "),
            date: new Date().toString()
        }
        logObject.logs.push(newLog)
        const newLogs = JSON.stringify(logObject, null, 2)
        // console.log(newLogs)
        await prisma.hero.update({
            where: {name: heroName}, 
            data: {invLog: newLogs}
        })
    }

// ██████  ███████ ███████ ████████ ██████   ██████  ██    ██ 
// ██   ██ ██      ██         ██    ██   ██ ██    ██  ██  ██  
// ██   ██ █████   ███████    ██    ██████  ██    ██   ████   
// ██   ██ ██           ██    ██    ██   ██ ██    ██    ██    
// ██████  ███████ ███████    ██    ██   ██  ██████     ██    
                                                            
    // Destroy with timer
    const destroy = async (ctx: InventoryContext, replyMessage: Message.TextMessage, message: string): Promise<void> => {
        const setMessageText = async (value: number) => {
            await ctx.telegram.editMessageText(
                ctx.chat?.id,
                replyMessage.message_id,
                undefined,
                message + value,
                {parse_mode: "MarkdownV2"}
            )
        }
        const messages = [3, 2, 1]; // Adjust the messages as needed

        async function processMessages(): Promise<void> {
            for (const message of messages) {
                await setMessageText(message);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            // After the loop, delete the message
            ctx.deleteMessage(replyMessage.message_id).catch((e) => console.log(e));
        }

        // Call the function
        processMessages();
    }




    // ______            __    __     
    // |      \          |  \  |  \    
    //  \$$$$$$ _______   \$$ _| $$_   
    //   | $$  |       \ |  \|   $$ \  
    //   | $$  | $$$$$$$\| $$ \$$$$$$  
    //   | $$  | $$  | $$| $$  | $$ __ 
    //  _| $$_ | $$  | $$| $$  | $$|  \
    // |   $$ \| $$  | $$| $$   \$$  $$
    //  \$$$$$$ \$$   \$$ \$$    \$$$$ 
                                    
    const bot = new Telegraf<InventoryContext>("6028430964:AAGhWnvKJlI6qG3xfLQ8hngsEtEoG0n_7kA")
    const stage = new Scenes.Stage<InventoryContext>([inventoryWizard, inventoryLookWizard]);
    
    bot.use(session())
    bot.use(stage.middleware())
    bot.launch()

    bot.start((ctx) => ctx.reply('Бот подключен'))

    // InvEditor command
    bot.command('i', async (ctx) => {
        // Stop previous session if there is one
        endSession(ctx);
        ctx.scene.reset();
        ctx.deleteMessage().catch((e) => console.log(e));
        // Init new session
        sessionTimerInit(ctx);
        ctx.scene.enter("INVENTORY_SCENE");
    })

    // InvLook command
    const specialChars = /[_*[\]()~`>#+=|{}.!]/g;
    bot.command('inv', (ctx) => {
        ctx.scene.session.commandType = CommandType.Command;
        ctx.scene.session.commandText = ctx.message.text.replace(specialChars, "\\$&")
        ctx.scene.enter("INVENTORY_LOOK");
    })
    bot.hears(/Инвентарь .*$/, async (ctx) => {
        ctx.scene.session.commandType = CommandType.Hears;
        ctx.scene.session.commandText = ctx.message.text.replace(specialChars, "\\$&")
        ctx.scene.enter("INVENTORY_LOOK");
    })

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))






    // ███████ ███████ ███████ ███████ ██  ██████  ███    ██ 
    // ██      ██      ██      ██      ██ ██    ██ ████   ██ 
    // ███████ █████   ███████ ███████ ██ ██    ██ ██ ██  ██ 
    //      ██ ██           ██      ██ ██ ██    ██ ██  ██ ██ 
    // ███████ ███████ ███████ ███████ ██  ██████  ██   ████ 
    // ██ ███    ██ ██████  ██    ██ ████████                
    // ██ ████   ██ ██   ██ ██    ██    ██                   
    // ██ ██ ██  ██ ██████  ██    ██    ██                   
    // ██ ██  ██ ██ ██      ██    ██    ██                   
    // ██ ██   ████ ██       ██████     ██                   
                                                          

    const sessionTimerInit = (ctx: InventoryContext) => {
        endSession(ctx);
        resetSessionTimer(ctx);
        sessionTimerStep(ctx);
    }
    // In seconds
    const SESSION_TIMER_LENGTH = 60 * 10;
    const resetSessionTimer = (ctx: InventoryContext) => {
        ctx.scene.session.sessionTimer = SESSION_TIMER_LENGTH;
    }
    const sessionTimerStep = async (ctx: InventoryContext): Promise<void> => {
        const timerInterval = setInterval(() => {
            ctx.scene.session.sessionTimer--;
        
            // console.log(`Current value: ${ctx.scene.session.sessionTimer}`);
        
            if (isNaN(ctx.scene.session.sessionTimer) || ctx.scene.session.sessionTimer <= 0 ) {
                clearInterval(timerInterval); // Stop the timer when the counter reaches 0 or below
                endSession(ctx);
            }
        }, 1000); // Run the interval every 1000 milliseconds (1 second)
    }
    const endSession = (ctx: InventoryContext) => {
        // console.log("Session ended");
        if (ctx.scene.session.inventoryMessage != undefined) {
            ctx.telegram.deleteMessage(
                ctx.scene.session.inventoryMessage.chat.id,
                ctx.scene.session.inventoryMessage.message_id,
            ).catch((e) => console.log(e))
        }
    }
}

initBot();