const fs = require("fs")
const path = require("path")

const dataPath = path.join(path.resolve('.'), "/db/");
let picFolder = path.join(path.resolve("./public/pic/"), "/")

function getData() {
    let data = getPicData()

    // setTimeout(()=>{ потом подумаю надо ли
    //     fs.writeFile(dataPath + "data.json", data, "utf-8" ,(err)=>{console.log("write file error",err)})
    // },1000)

    return data;
}

function getPicData() {
    let objData = []

    let data = JSON.parse(fs.readFileSync(dataPath + "data.json"));

    for (let i of data) {
        // console.log(i);
        objData.push({
            id: data.indexOf(i),
            name: i.name,
            tags: i.tags
        })
    }
    console.log(objData);
    return JSON.stringify(objData);
}

//доделать

function updateData(imageName, tags) {
    // let newData = JSON.parse(newData);
    let newData = {}
    let oldData = JSON.parse(fs.readFileSync(dataPath + "data.json"));
    let lastId = oldData.length
    // let files = fs.readdirSync(picFolder, (err) => {console.log("read dir error",err)});

    allImg = oldData.map((i) => {allImg.push(i.name)})

    if (allImg.includes(imageName)) {
        
        return false;
    }
    else {
        newData["id"] = lastId
        newData["name"] = imageName
        newData["tags"] = [...tags]
        oldData.push(newData)

        writeData(oldData, dataPath + "data.json");
    }

    // writeData(image, picFolder)


    console.log(oldData);

}

function writeData(data, path) {
    // let files = fs.readdirSync(picFolder, (err) => {console.log("read dir error",err)});

    console.log("writed data", data);
    fs.writeFile(path, JSON.stringify(data), "utf-8", (err) => { if (err) console.log("write file error", err) })

}

// updateData("galaxy.png", [])
module.exports = {getData, updateData}