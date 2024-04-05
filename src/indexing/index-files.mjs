import fs from 'fs'
import path from 'path'
import removeMd from 'remove-markdown'

const indexDirectory = "src/routes"
const urls = []

const titleRegex = /(?<=---\ntitle: )(.+)(?=\n---)/gm
const titleRemoveRegex = /---\n.*\n---\n/gm
const importRegex = /(import).*("|;)/gm
const HTMLRegex = /<\/?[^>]+(>|$)/gm
const Tags1Regex = /<(\w+)\s+[^>]*\/>|<(\w+)>|<(\/\w+)>/gm
const CommentsRegex = /{\/\*[^*]*\*+([^/*][^*]*\*+)*\/}/gm

const galleryDirectory = "public/menu/guidebook/races/gallery"
const galleryUrl = "menu/guidebook/races/gallery/"

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

indexFiles()

export async function indexFiles() {
    //await prisma.user.deleteMany({})
    // await prisma.user.upsert({
    //     where: {
    //         login: "ixniy",
    //     },
    //     create: {
    //         login: "ixniy",
    //         password: "e77226965b9917b9d08d9144f16425fd31ef8aaa86e51719d2c64543cd9c08c8",
    //         role: "admin"
    //     },
    //     update: {
    //         login: "ixniy",
    //         password: "e77226965b9917b9d08d9144f16425fd31ef8aaa86e51719d2c64543cd9c08c8",
    //         role: "admin"
    //     }
    // })
    // await prisma.characterCanon.upsert({
    //     where: {
    //         name: "test",
    //     },
    //     create: {
    //         name: "test",
    //     },
    //     update: {
    //         name: "test",
    //     }
    // })
    //console.log(await prisma.page.findMany({}))

    await indexGallery(galleryDirectory)
    await readDirectory(indexDirectory)
    clearDB()
}

async function indexGallery(galleryDirectory) {
    const filesArray = { images: [] }
    fs.readdir(galleryDirectory, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            filesArray.images.push(galleryUrl + file)
        });
        const json = JSON.stringify(filesArray, null, 4)
        fs.writeFile("src/routes/menu/guidebook/races/gallery/gallery.json", json, "utf-8", () => {

        })
    });
    
}

async function readDirectory(dirPath) {
    fs.readdir(dirPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            listFiles(dirPath, file)
        });
    });    
}

async function listFiles(dirPath, file) {
    const filePath = path.join(dirPath, file)
    if (fs.lstatSync(filePath).isFile()) {
        if (file.includes(".mdx")) {
            // Prepare url
            const url = filePath.replaceAll("\\","/").replaceAll("src/routes/", "").replace("index.mdx", "")
            urls.push(url)
            // Get modifying time
            const mtime = fs.statSync(filePath).mtime
            
            // Check if entry exists
            const dbEntry = await prisma.page.findUnique({ where: {url: url}})
            if (dbEntry != null) {
                if (mtime.getTime() !== new Date(dbEntry.mtime).getTime()) {
                    console.warn("\x1b[33m[Attention] Raw document is newer than indexed " + filePath + "\x1b[0m")
                    readPageFile(filePath, url, mtime)                
                }
            }
            else {
                readPageFile(filePath, url, mtime)                
            }         
        }
    }
    else if (fs.lstatSync(filePath).isDirectory()) {
        readDirectory(path.join(dirPath, file))
    }
}

async function readPageFile(filePath, url, mtime) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }                            
        console.log("[Read] " + filePath)
        const title = data.match(titleRegex)
        if (title != null) {
            data = prepareData(data)
            dbEntryUpsert(filePath, title[0], url, data, mtime)
        }
        else {
            console.warn("\x1b[33m[Warning] No title for " + filePath + "\x1b[0m")
        }
    })
}

function prepareData(data) {
    // Remove comments
    data = data.replaceAll(CommentsRegex, "")  
    // Remove titles
    data = data.replaceAll(titleRemoveRegex, '')                                
    // Remove imports
    data = data.replaceAll(importRegex, '')                                   
    // Remove HTML
    data = data.replaceAll(HTMLRegex, "")                                   
    // Remove remaining tags
    data = data.replaceAll(Tags1Regex, "")  
    // Replace quotes                               
    data = data.replaceAll('"', "'")                                 
    // Remove markdown
    data = removeMd(data)

    return data
}

async function dbEntryUpsert(filePath, title, url, data, mtime) {
    console.log("[Write DB] " + filePath)
    await prisma.page.upsert({
        where: {
            url: url
        },
        create: {
            title: title,
            url: url,
            content: data,
            mtime: mtime,
        },
        update: {
            title: title,
            content: data,
            mtime: mtime,
        }
    })
}

async function clearDB() {
    const prismaPages = await prisma.page.findMany({})
    prismaPages.forEach((page) => {
        const formatURL = page.url.replaceAll("\\", "/")
        if (!urls.includes(formatURL)) {
            prisma.page.delete({where: {url: formatURL}})
        }
    })
}