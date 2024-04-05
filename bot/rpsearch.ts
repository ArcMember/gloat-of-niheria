import { channel } from "diagnostics_channel";
import ApiClient from "telegraf/typings/core/network/client";
import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import fs from 'fs';
import { message } from "telegraf/filters";
import { PrismaClient } from "@prisma/client";
import tagsTable from "./tagTable.json";
const input = require("input");

const apiId = 26528554;
const apiHash = "4d897a0dc8d9c5d35493e63d21424ef8";
const stringSession = new StringSession("1AgAOMTQ5LjE1NC4xNjcuNTEBuzNdJEvjnALqU4BnXOKmK+q0X45uaBYkLa+dfXqxD037inozuH1HeKMfXwLVArnf1ZnLq66ELOWGqy5DUM/1vs6UIuVEeUsMjy4o4HPr7wbWXKC1FakX85XNxJEO5JB5Zg7Y4K62CsEdmeVgQQMq5k6BnMhjNL3l9MlRBRQNgGSpCGLPvFcCLaqesbd74hE3nFhuPDlvzNRmO9nZRwG7/Q9eW1PqXhxesbBCSOsl15VgkF6ynkgDa/XUQmuZ44YqkmhSEKNwH+t8BLJaq8mPtbRZ2fJjnBs7jSinalOxBlU//wL9jrDcpKcKhO15akl3dPakHZOhSasLSpxNHcU6PLo="); // fill this later with the value from session.save()

const rpChannels = [
    "-1001188741685",
    "-1001663579001",
    "-1001548614967",
    "-1001656715331",
    "-1001832354201",
    "-1001170701172",
    "-1001570307437",
    "-1001382242599",
    "-1001486836178",
    "-1001507147560",
];

(async () => {
	const prisma = new PrismaClient();

	console.log("Deleting");
	await prisma.adRegistryEntry.deleteMany({})
	console.log("Deleted");

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
	// console.log(client.session.save()); // Save this string to avoid logging in again

	const hashtagsRegex = /#[a-zA-Zа-яА-ЯёЁ0-9_]+/g;
	rpChannels.forEach(async (channelId) => {
			console.log(`Getting messages for ${channelId}`);
			const channelEntity = await client.getEntity(channelId);
			const messages = await client.getMessages(channelEntity, {minId: 0, maxId: 10000000});
			console.log(`Formatting messages for ${channelId}`);
			const usefulMessages = messages.map(({ id, message, date }) => ({ id: `${channelId}_${id}`, message, date }))
			usefulMessages.forEach(async (message) => {
				console.log(`Adding message ${message.id} to database from ${channelId}`);

				if (message.message === undefined 
					|| message.message === null 
					|| message.message.length < 2) return;
				// console.log(`tags: ${message.message.match(hashtagsRegex)}`)
				const primeTags: string = findPrimeTags(message.message.match(hashtagsRegex) ?? []).sort().join(",");
				if (primeTags.length < 1) return;
				
				// console.log(`prime tags: ${messageTags}`)
				await prisma.adRegistryEntry.create({
					data: {
						id: message.id,
						message: message.message,
						date: message.date.toString(),
						tags: primeTags,
					}
				});
			})
			// fs.writeFileSync(`bot/messages_${channelId}.json`, JSON.stringify(usefulMessages), 'utf8');
	})

	// let hashtags: string[] = []
	// rpChannels.forEach((channelId, ind) => {
	//     console.log(`[${ind}/${rpChannels.length-1}] Generating tags for ${channelId}`);
	//     const text = fs.readFileSync(`bot/messages_${channelId}.json`, {encoding: 'utf-8'});
	//     const messageTags = text.match(hashtagsRegex);
	//     hashtags = hashtags.concat(messageTags != null ? messageTags : [])
	//     console.log(`[${ind}/${rpChannels.length-1}] finished.`);
	// })
	// console.log("Filtering hashtags")
	// const sortedHashtags = removeDuplicatesAndSortByOccurrence(hashtags);
	// console.log("Filtering finished")

	// console.log("Writing file")
	// fs.writeFileSync('bot/tags_vip.json', JSON.stringify(sortedHashtags, null, "\t"), {encoding: 'utf-8'});
	// console.log("Writing finished")

	// const tags: string[] = extractStrings(JSON.parse(fs.readFileSync(`bot/tags.json`, {encoding: 'utf-8'})));
	// const tagsGrouped = groupStringsByCommonPart(tags);
	// // const sortedArray = tagsGrouped.sort((a, b) => b.length - a.length);
	// const sortedArray = tagsGrouped.sort(sortArraysByLongestAverageString);
	// fs.writeFileSync('bot/tagsGrouped_vip (length).json', JSON.stringify(sortedArray, null, "\t"), {encoding: 'utf-8'});

	// const tags: string[][] = JSON.parse(fs.readFileSync(`bot/tagTable.json`, {encoding: 'utf-8'}));
	// const mainTags: string[] = []
	// tags.forEach((tagsList) => {
	//     mainTags.push(tagsList[0]);
	// })
	// fs.writeFileSync('bot/tagTableMain.json', mainTags.join("\n#"), {encoding: 'utf-8'});
})();

function findPrimeTags(tags: string[]): string[] {
	if (tags.length < 1) return [];

	const primeTags: string[] = []
	tags.forEach((tag: string) => {
		// Search for similarities within tagTable
		for (const tagList of tagsTable) {
			for (const tg of tagList) {
				// If tag is no more than 1 symbol different — assume it's correct group
				if (levenshteinDistance(tag, "#" + tg) < 2) {
					// Get first one of group (the prime one)
					const primeTag = tagList[0];
					if (!primeTags.includes(primeTag)) primeTags.push(primeTag);
				}
			}
		}
	})
	return primeTags;
}

function averageLongestStringLength(arr: any[]): number {
    const lengths = arr.map((item) => (typeof item === 'string' ? item.length : 0));
    const longestString = Math.max(...lengths);
    return lengths.length > 0 ? lengths.reduce((sum, length) => sum + length, 0) / lengths.length : 0;
}
function sortArraysByLongestAverageString(a: string[], b: string[]) {
    const avgLengthA = averageLongestStringLength(a);
    const avgLengthB = averageLongestStringLength(b);
    return avgLengthB - avgLengthA;
}

function extractStrings(tupleArray: [string, number][]): string[] {
    return tupleArray.map(([str]) => str);
  }

function levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];
  
    for (let i = 0; i <= b.length; i++) {
		matrix[i] = [i];
    }
  
    for (let j = 0; j <= a.length; j++) {
		matrix[0][j] = j;
    }
  
    for (let i = 1; i <= b.length; i++) {
		for (let j = 1; j <= a.length; j++) {
			const cost = a[j - 1] === b[i - 1] ? 0 : 1;
			matrix[i][j] = Math.min(
				matrix[i - 1][j] + 1,
				matrix[i][j - 1] + 1,
				matrix[i - 1][j - 1] + cost
			);
		}
    }
  
    return matrix[b.length][a.length];
  }

function groupStringsByCommonPart(strings: string[]): string[][] {
    const groups: string[][] = [];

    strings.forEach((arrayString, index) => {
        console.log(`[${index}/${strings.length-1}] Processing`)
        let matchedGroupIndex: number | undefined;
  
        for (let i = 0; i < groups.length; i++) {
            if (
                !matchedGroupIndex ||
                levenshteinDistance(arrayString, groups[i][0]) < levenshteinDistance(arrayString, groups[matchedGroupIndex][0])
            ) {
                matchedGroupIndex = i;
            }
        }
    
        if (matchedGroupIndex !== undefined && levenshteinDistance(arrayString, groups[matchedGroupIndex][0]) <= 2) {
            groups[matchedGroupIndex].push(arrayString);
        } 
        else {
            groups.push([arrayString]);
        }
    })
  
    return groups;
}

function removeDuplicatesAndSortByOccurrence(strings: string[]): [string, number][] {
    const occurrencesMap: Map<string, number> = new Map();
  
    // Count occurrences of each string
    strings.forEach((arrayString, index) => {
        console.log(`[${index}/${strings.length-1}] Counting occurencies`);
        occurrencesMap.set(arrayString, (occurrencesMap.get(arrayString) || 0) + 1);
    })
  
    // Sort unique strings by occurrence
    const sortedUniqueStrings = Array.from(occurrencesMap.keys()).sort(
      (a, b) => occurrencesMap.get(b)! - occurrencesMap.get(a)!
    );
  
    // Create result array [string, occurrences]
    const result: [string, number][] = sortedUniqueStrings.map((str) => [str, occurrencesMap.get(str)!]);
  
    return result;
  }