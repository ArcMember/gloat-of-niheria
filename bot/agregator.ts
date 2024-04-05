import { Prisma, PrismaClient } from '@prisma/client';
import { Composer, Context, Format, Markup, Scenes, Telegraf, Telegram, session} from 'telegraf';
import { InlineKeyboardButton, Message } from 'telegraf/types';
import tagTable from "./tagTableFormatted.json" assert { type: "json" };
import { bold, fmt, underline } from 'telegraf/format';

interface SessionData extends Scenes.WizardSessionData {
    // initialMessage: Message,
    // selectedGroup: string,
    // sortingTags: string[]
}

interface MySession extends Scenes.SceneSession<SessionData> {
	// will be available under `ctx.session.mySessionProp`
    sortingTags: string[];
    selectedGroup: string,
    initialMessage?: Message,
    searchMessage?: Message,
}

interface AgregatorContext extends Context {
    session: MySession,
    // declare scene type
	scene: Scenes.SceneContextScene<AgregatorContext, SessionData>;
	// declare wizard type
	wizard: Scenes.WizardContextWizard<AgregatorContext>;
}

type TagGroup = {
    title: string,
    tags: string[][]
}

export async function initBot() {
    const stageNumber = (ctx: AgregatorContext) => `[Scene ${ctx.scene.current?.id}]`
    const sortingTags = (ctx: AgregatorContext) => {
        console.log(`${stageNumber(ctx)} Selected tags: ${ctx.session.sortingTags.length < 1 ? ctx.session.sortingTags.join(', ') : "No selected tags"}`)
        return ctx.session.sortingTags
    };
    const selectedGroup = (ctx: AgregatorContext) => {
        console.log(`${stageNumber(ctx)} Selected group: ${ctx.session.selectedGroup}`)
        return ctx.session.selectedGroup;
    }
    const tagGroupActionName = "tagGroup";
    const tagActionName = "tagAction";
    const backActionName = "backAction";

    const selectGroupControlsStep = new Composer<AgregatorContext>();
    const selectTagControlsStep = new Composer<AgregatorContext>();
    const searchControlsStep = new Composer<AgregatorContext>();
    // const createTagActions = (groupIndex: number) => {
    //     console.log(`Creating actions for ${tagTable[groupIndex].title}`)
    //     const group = tagTable[groupIndex];
    //     group.tags.forEach((tag, index) => {
    //         bot.action(`${tagActionName}_${index}`, async (ctx) => {
    //             console.log(`${stageNumber(ctx)} «${group.tags[index][0]}» tag pressed`)
    //             if (!ctx.sortingTags.includes(group.tags[index][0])) 
    //                 ctx.sortingTags.push(group.tags[index][0]);
    //             console.log(`${stageNumber(ctx)} Selected tags: ${ctx.sortingTags}`)
    //             return ctx.wizard.selectStep(1);
    //             // drawTags(ctx, group);
    //         })
    //     })

    //     bot.action(backActionName, async (ctx) => {
    //         console.log(`${stageNumber(ctx)} Return to group selection`)
    //         const keyboard = stringsToButtons(tagTable.map((element) => element.title), tagGroupActionName)
    //         // const msg = ctx.initialMessage;
    //         ctx.editMessageReplyMarkup(
    //             Markup.inlineKeyboard(keyboard).reply_markup
    //         )
    //         return ctx.wizard.selectStep(1).next();
    //     })
    // }

    const selectGroupInitWizard = new Scenes.WizardScene<AgregatorContext>(
        'SELECT_GROUP_INIT_SCENE',
        // 0 — Tag groups
        async (ctx) => {
            console.log(`${stageNumber(ctx)}`)
            if (ctx.chat?.type === "private") {
                if (ctx.session.searchMessage != undefined) ctx.deleteMessage(ctx.session.searchMessage.message_id);
                ctx.session.sortingTags = []
                // const keyboard = gridButtonsGroup(ctx, stringsToGrid(tagTable.map((element) => element.title)))
                const keyboard = buttonsGroups(ctx, tagTable.map((element) => element.title))
                ctx.session.initialMessage = await ctx.replyWithMarkdownV2(
                    "Выберите группу тэгов:",
                    Markup.inlineKeyboard(keyboard, {columns: 2})
                )
            }
            return ctx.wizard.next();
        },
        selectGroupControlsStep,
    )
    const selectGroupWizard = new Scenes.WizardScene<AgregatorContext>(
        'SELECT_GROUP_SCENE',
        async (ctx) => {
            console.log(`${stageNumber(ctx)}`)
            const keyboard = buttonsGroups(ctx, tagTable.map((element) => element.title))
            // const msg = ctx.initialMessage;
            ctx.editMessageReplyMarkup(
                Markup.inlineKeyboard(keyboard, {columns: 2}).reply_markup
            )
            return ctx.wizard.next();
        },
        selectGroupControlsStep,
    )
    const selectTagWizard = new Scenes.WizardScene<AgregatorContext>(
        'SELECT_TAG_SCENE',
        async (ctx) => {
            console.log(`${stageNumber(ctx)}`)
            const selectedGroupTags = tagTable.find(group => group.title === selectedGroup(ctx))?.tags.map(arr => arr[0]);
            const keyboard = buttonsTag(ctx, selectedGroupTags ?? [])
            // const msg = ctx.initialMessage;
            ctx.editMessageReplyMarkup(
                Markup.inlineKeyboard(keyboard, {columns: 2}).reply_markup
            )
            return ctx.wizard.next();
        },
        selectTagControlsStep
    )
    const searchWizard = new Scenes.WizardScene<AgregatorContext>(
        'SEARCH_SCENE',
        async (ctx) => {
            console.log(`${stageNumber(ctx)}`)
            const keyboard = [
                [`⬅️ Предыдущий`, `🎲 Случайный`, `Следующий ➡️`],
                [`Вернуться к тэгам`]
            ]
            const searchResult = await prisma.adRegistryEntry.findMany({
                where: {
                    tags: {
                        contains: ctx.session.sortingTags.sort().join(",")
                    }
                }
            });
            ctx.deleteMessage(ctx.session.initialMessage?.message_id);
            ctx.session.searchMessage = await ctx.reply(
                `Выбранные тэги: ${ctx.session.sortingTags.join(", ")}\n` +
                `Найдено рекламных постов: ${searchResult.length}\n\n`+
                (searchResult[0] !== undefined ? searchResult[0].message : "Постов не найдено"),
                Markup.keyboard(keyboard).resize()
            )

            return ctx.wizard.next();
        },
        searchControlsStep
    )

    function buttonsTag(ctx: AgregatorContext, strings: string[]): InlineKeyboardButton[] {
        const grid: InlineKeyboardButton[] = []
        const tags = sortingTags(ctx);
        strings.forEach((tag) => {
            if (!tags.includes(tag)) {
                grid.push(
                    Markup.button.callback(`${tag}`, `add_${shortHash(tag)}`), 
                )
            }
            else {
                grid.push(
                    Markup.button.callback(`× ${tag}`, `remove_${shortHash(tag)}`), 
                )
            }
        })
        grid.push(
            Markup.button.callback("⬅️ Назад", `back_groups`), 
        )
        return grid;
    }
    function buttonsGroups(ctx: AgregatorContext, strings: string[]): InlineKeyboardButton[] {
        const grid: InlineKeyboardButton[] = []
        strings.forEach((group) => {
            grid.push(
                Markup.button.callback(group, `select_${shortHash(group)}`), 
            )
        })
        grid.push(
            Markup.button.callback("Искать 🔎", `search_action`), 
        )
        return grid;
    }

    const prisma = new PrismaClient();
    const bot = new Telegraf<AgregatorContext>("6310763994:AAHDQmMX0_vhBs4tvMHipOS6pSaatCfoAuo")
    const stage = new Scenes.Stage<AgregatorContext>(
        [selectGroupInitWizard, selectGroupWizard, selectTagWizard, searchWizard],
        {default: "SELECT_GROUP_INIT_SCENE"}
        );

    bot.use(session())
    bot.use(stage.middleware())
    bot.use((ctx, next) => {
        // we now have access to the the fields defined above
        ctx.session.initialMessage ??= undefined;
        ctx.session.selectedGroup ??= "";
        ctx.session.sortingTags ??= [];
        return next();
    });
    bot.launch()
    bot.start((ctx) => ctx.reply('Бот подключен'))

    // Prepare all the actions for tags
    tagTable.forEach((group) => {
        const groupTitle = group.title

        // Prepare group actions
        selectGroupControlsStep.action(`select_${shortHash(groupTitle)}`, async (ctx) => {
            ctx.session.selectedGroup = groupTitle
            console.log(`${stageNumber(ctx)} group selected — ${groupTitle}`)
            ctx.scene.enter("SELECT_TAG_SCENE");
        })

        // Prepare hashtag actions
        group.tags.forEach((groupTags) => {
            const tag = groupTags[0]
            selectTagControlsStep.action(`add_${shortHash(tag)}`, async (ctx) => {
                if (!ctx.session.sortingTags.includes(tag)) {
                    ctx.session.sortingTags.push(tag);
                }
                console.log(`${stageNumber(ctx)} — [${tag}] tag selected — ${ctx.session.sortingTags}`)
                updateText(ctx);
                return ctx.wizard.selectStep(1);
            })
            selectTagControlsStep.action(`remove_${shortHash(tag)}`, async (ctx) => {
                if (ctx.session.sortingTags.includes(tag)) {
                    ctx.session.sortingTags = ctx.session.sortingTags.filter(item => item !== tag);
                }
                console.log(`${stageNumber(ctx)} tag removed`);
                updateText(ctx);
                return ctx.wizard.selectStep(1);
            })
        })
    })

    function updateText(ctx: AgregatorContext) {
        if (ctx.session.initialMessage == undefined) throw new Error("Initial message non-existent")
        const selectedGroupTags = tagTable.find(group => group.title === selectedGroup(ctx))?.tags.map(arr => arr[0]);
        const keyboard = buttonsTag(ctx, selectedGroupTags ?? [])
        // ctx.telegram.editMessageCaption(
        //     ctx.session.initialMessage.chat.id,
        //     ctx.session.initialMessage.message_id,
        //     undefined,
        //     `Выбранные тэги: ${ctx.session.sortingTags.join(", ")}`
        // )
        ctx.editMessageText(`Выбранные тэги: ${ctx.session.sortingTags.join(", ")}`, 
            {reply_markup: Markup.inlineKeyboard(keyboard, {columns: 2}).reply_markup});
    }

    selectTagControlsStep.action(`back_groups`, async (ctx) => {
        console.log(`${stageNumber(ctx)} back_groups`)
        ctx.scene.enter("SELECT_GROUP_SCENE");
        // return ctx.wizard.selectStep(3);
    })
    searchControlsStep.action(`back_groups`, async (ctx) => {
        console.log(`${stageNumber(ctx)} back_groups`)
        ctx.scene.enter("SELECT_GROUP_SCENE");
        // return ctx.wizard.selectStep(3);
    })
    bot.hears(`Вернуться к тэгам`, async (ctx) => {
        console.log(`${stageNumber(ctx)} back_groups`)
        ctx.deleteMessage(ctx.session.searchMessage?.message_id)
        const deletion = await ctx.reply("Удаляю", Markup.removeKeyboard())
        ctx.deleteMessage(deletion.message_id)
        ctx.session.searchMessage = undefined;
        ctx.scene.enter("SELECT_GROUP_INIT_SCENE");
        // return ctx.wizard.selectStep(3);
    })

    // [`⬅️ Предыдущий`, `🎲 Случайный`, `Следующий ➡️`],
    searchControlsStep.hears(`⬅️ Предыдущий`, async (ctx) => {

    })
    searchControlsStep.hears(`🎲 Случайный`, async (ctx) => {
        
    })
    searchControlsStep.hears(`Следующий ➡️`, async (ctx) => {
        
    })

    selectGroupControlsStep.action('search_action', async (ctx) => {
        console.log(`${stageNumber(ctx)} Search →`)
        ctx.scene.enter("SEARCH_SCENE");

    })
    bot.command("search", async (ctx) => {
        ctx.scene.reset();
        ctx.scene.enter("SELECT_GROUP_INIT_SCENE");
    })

}

const shortHash = (word: string) => {
    return String(word.split('').reduce((acc, char) => (acc * 31) + char.charCodeAt(0), 0));
};

initBot();