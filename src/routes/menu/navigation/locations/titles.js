const fs = require('fs')
const path = require('path')

const locationsDirectory = "src/routes/menu/navigation/locations"

writeTitles()

function writeTitles() {
    fs.readdir(locationsDirectory, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            const dirPath = path.join(locationsDirectory, file)
            if (fs.lstatSync(dirPath).isDirectory()) {
                const filePath = path.join(dirPath, "index.mdx")
                fs.readFile(filePath, 'utf8', (err, data) => {
                    const regex = /[^# ](.*)/
                    const title = "---\n" + "title: " + data.match(regex)[0] + "\n---\n"
                    const headerRegex = /(?<=---.*: )\n*.*(?=---)/gi
                    const pageHeader = data.match(headerRegex)
                    if (pageHeader != null) {
                        fs.writeFile(filePath, title + data, err => {
                            if (err) {
                                console.error(err);
                            }
                            console.log("[Writing] " + filePath)
                            // file written successfully
                        });
                    }
                })
            }
        })
    })
}