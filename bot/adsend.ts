import { channel } from "diagnostics_channel";
import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { message } from "telegraf/filters";
const input = require("input");
import { PrismaClient } from "@prisma/client";
import fs from 'fs';
import { Telegram } from "telegraf";

const apiId = 24636622;
const apiHash = "061e236ee07c9f7124b50e568e5d5441";
const stringSession = new StringSession("1AgAOMTQ5LjE1NC4xNjcuNTEBu0oqwb/C56+o9zrI1AzC1VJZjb/kSlay30IobDq2/0Lxz6uOVX0IWaeQ9Da8ngArdl44me7CHCCpOnnExBfszv+ztx23VoGS8eGkBbm1SG00JkH+GC+JgkVnE+ZXlYT6p2trlSTqVR+KzRAluLmLSbtO4DlBFbTV9/pF0M8KAs8ZIQW7vfJkb3vtSu5OiEO7GvURYHVqxdnik93cQID4Jq+0kTYmaD2hMMygJMrE/DdKqdiHY0Z6LrQMm4o/JlG+1G5+rtJ9sI2iliYUcc+t6FAtyv5Hq7WJLj1L72m0OVNJwoNLPHx66hcQK03ajE6EeBlCBvaz99GgcpEpSV5fDSg="); // fill this later with the value from session.save()

type AdRule = {
    name: string,
    id: string,
    rule: (lastDate: Date, ind: number) => boolean,
    textAdditions: {prefix: string | null, postfix: string | null},
    photoForbidden: boolean,
};


function differenceInDays(date1: Date, date2: Date): number {
    const oneDayInMillis = 24 * 60 * 60 * 1000; // milliseconds in a day
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const daysDiff = Math.floor(timeDiff / oneDayInMillis);

    return daysDiff;
}

const adRules: AdRule[] = [
    // NihTest
    {
        name: "NihTest",
        id: "-4190657711", 
        rule: (lastDate: Date, ind: number): boolean => {
            const currentDate = new Date();
            if (differenceInDays(lastDate, currentDate) <= 1) {
                console.log(`[${ind}] It must be 1 days between sends, currently it is ${differenceInDays(lastDate, currentDate)}`)
                return false;
            }
            // if (currentDate.getHours() < 9 || currentDate.getHours() > 19) {
            //     console.log("Hours must be between 9 and 19")
            //     return false;
            // }
            return true;
        },
        textAdditions: {
            prefix: null,
            postfix: `**Ссылка на ролевую:**  https://t.me/niheria\n**Ссылка на сайт:** http://www.niheria.ru/\n\nТэги:\n#ролевая #фэнтези #магия #стимпанк #ориджинал #средневековье #NC21 #NC_21 #приключения\n#среднестрочник #многострочник`
        },
        photoForbidden: false
    },
    {
        name: "Пиар ролевых (беседа)",
        id: "-1001188741685",
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        rule: (lastDate: Date): boolean => {
            return true;
        },
        textAdditions: {prefix: null, postfix: `**Ссылка на ролевую:**  https://t.me/niheria\n**Ссылка на сайт:** http://www.niheria.ru/\n\nТэги:\n#ролевая #фэнтези #магия #стимпанк #ориджинал #средневековье #NC21 #NC_21 #приключения\n#среднестрочник #многострочник`},
        photoForbidden: true
    },
    // {
    //     name:  "Поиск ролевых. (бот)",
    //     id: "@piarrolokk_bot", //"5158977580",
    //     rule: (lastDate: Date, ind: number): boolean => {
    //         const currentDate = new Date();
    //         if (differenceInDays(lastDate, currentDate) < 30) {
    //             console.log("It must be 30 days between sends")
    //             return false;
    //         }
    //         return true;
    //     },
    //     textAdditions: {
    //         prefix: `✦ **Злорадство Нихерии**\n\n✉️:: #f_original #o_original #ориджинал #фэнтези #магия #стимпанк #средневековье  #приключения #среднестрочник #многострочник #NC21 #NC_21 #ролевая_18`,
    //         postfix: "📃**Контакты:**\n**Ссылка на ролевую:** https://t.me/niheria\n**Ссылка на сайт:** http://www.niheria.ru/",
    //     },
    //     photoForbidden: false
    // },
    {
        name: "Поиск ролевых ('Ray.)",
        id: "@mikdxx",
        rule: (lastDate: Date, ind: number): boolean => {
            const currentDate = new Date();
            if (differenceInDays(lastDate, currentDate) > 1) {
                console.log(`[${ind}] It must be 1 days between sends, currently it is ${differenceInDays(lastDate, currentDate)}`)
                return false;
            }
            return true;
        },
        textAdditions: {
            prefix: null,
            postfix: `**Ссылка на ролевую:**  https://t.me/niheria\n**Ссылка на сайт:** http://www.niheria.ru/\n\nТэги:\n#ролевая #фэнтези #магия #стимпанк #ориджинал #средневековье #NC21 #NC_21 #приключения\n#среднестрочник #многострочник`
        },
        photoForbidden: false
    }

];

(async () => {
    const prisma = new PrismaClient();

    console.log("Loading interactive example...");
    const client = new TelegramClient(stringSession, apiId, apiHash, {
       connectionRetries: 5,
    });
    await client.start({
        phoneNumber: async () => await input.text("Please enter your number: "),
        password: async () => await input.text("Please enter your password: "),
        phoneCode: async () =>
            await input.text("Please enter the code you received: "),
        onError: (err) => console.log(err),
    });
    console.log("You should now be connected.");
    // console.log(client.session.save());
    client.setParseMode("markdownv2");

    // Load ad text
    const filePath = "./bot/adText.txt"
    const imagePath = "./bot/title.jpg"
    const fileContent = fs.readFileSync(filePath, "utf-8");
    let sentSuccessfully = false

    adRules.forEach(async (adRule: AdRule, id) => {
        let adDistributor = await prisma.adDistributor.findUnique({where: { id: adRule.id}})

        if (adDistributor == null) {
            await prisma.adDistributor.create({
                data: {
                    name: adRule.name,
                    id: adRule.id,
                    lastSendTime: new Date(0)
                }
            })
            adDistributor = await prisma.adDistributor.findUnique({where: { id: adRule.id}})
        }
        
        if (adDistributor != null) {
            const condition = adRule.rule(adDistributor.lastSendTime, id);
            console.log(`[${id}] ${adRule.name} — condition ${condition}`)
            const prefix = adRule.textAdditions.prefix ?? "";
            const postfix = adRule.textAdditions.postfix ?? "";
            const message = prefix + "\n" + fileContent + "\n" + postfix;

            const channelEntity = await client.getEntity(adDistributor.id);
            console.log(`[${id}] Sending message to ${adRule.name}`)
            try {
                if (adRule.photoForbidden) {
                    await client.sendMessage(channelEntity, 
                        {message: message, linkPreview: false}
                    )
                }
                else {
                    await client.sendMessage(channelEntity, 
                        {message: message, file: imagePath, linkPreview: false}
                    )
                }
            } catch (error) {
                console.log(`[${id}] ${error}`)
            }
            sentSuccessfully = true;
        }

        if (sentSuccessfully) {
            await prisma.adDistributor.update({
                where: {
                    id: adRule.id,
                },
                data: {
                    lastSendTime: new Date(),
                },
            })
        }
    })
})();