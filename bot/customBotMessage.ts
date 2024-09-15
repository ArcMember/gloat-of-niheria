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

const partnersPost = {
    text: `📢 Благодарим за рекламу наших партнёров:`,
    buttons: [
        [Markup.button.url("Сорол, Где Пост?", "t.me/RolePlay_RP_Info")],
        [
            Markup.button.url("Role Play for You ⚔️", "t.me/RolePlay_Games"), 
            Markup.button.url("Ролевой союз", "t.me/rolevoy_souz"), 
        ],
        [Markup.button.url("🦎 твои текстовые ролевые🦎", "t.me/rolevaya1")],
        [
            Markup.button.url("Ouroboros", "t.me/ouroborosrp"),
            Markup.button.url("postchat // поиск ролевиков", "t.me/postchatrp")
        ],
        [
            Markup.button.url("Поиск ролевых", "t.me/rolevye"), 
            Markup.button.url("Реклама ролевых игр", "t.me/rpaadss")
        ],
        [
            Markup.button.url("ПИАР-КАНАЛ.", "t.me/darkprxs"), 
            Markup.button.url("Пиар-канал.", "t.me/pppiarr_h ")
        ],
    ]
}

const post = partnersPost;

export async function initBot() {
    // Niherposter token
    const bot = new Telegraf("7052487795:AAHpl86iW5JQiHagOwEVAWZ8Iin5xWDTykw")
    const adminId = 227693870;
    const niheriaTest = {
        id: -1002069580941,
        title: 'НихерияТест',
        is_forum: true,
        type: 'supergroup'
    };
    const niheria = {
        id: -1001695230255,
        title: 'Нихерия',
        username: 'niheria',
        is_forum: true,
        type: 'supergroup'
    };

    bot.use(session())
    bot.launch()

    bot.start((ctx) => ctx.reply('Бот подключен'))

    // InvEditor command
    bot.hears('Нихерпостер!', async (ctx) => {
        // console.log(ctx.message)
        if (ctx.message.from.id == adminId /* && !ctx.message.from.is_bot */) {
            // const thread = ctx.message.message_thread_id;
            // const chat = ctx.message.chat.id;
            ctx.deleteMessage();
            if (post.buttons.length > 0) {
                ctx.replyWithMarkdownV2(post.text, {
                    disable_notification: true,    
                    allow_sending_without_reply: true,
                    disable_web_page_preview: true,
                    
                    reply_markup: Markup.inlineKeyboard(post.buttons).reply_markup
                });
            }
        }
    })

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

initBot();