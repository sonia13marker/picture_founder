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

function removeData(id){
    let Data = JSON.parse(fs.readFileSync(dataPath + "data.json", (err)=>{if(err)console.log(err);}))
    let imageName = Data.splice(id, 1)[0]["name"];

    Data.map( (i, index) => {
        i.id = index;
    })

    writeData(Data, dataPath + "data.json");
    console.log("remove " + imageName);
    fs.unlink(picFolder + "/" + imageName, (err)=>{if(err)console.log(err);})
    console.log("all complete");
}

function updateData(imageName, tags = []) {
    // let newData = JSON.parse(newData);
    let newData = {}
    let oldData = JSON.parse(fs.readFileSync(dataPath + "data.json"));
    let lastId = oldData.length
    // let files = fs.readdirSync(picFolder, (err) => {console.log("read dir error",err)});

    let allImg = oldData.map((i) => {return i.name})

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


    // console.log(oldData);
    return true;

}

function writeData(data, path) {
    // let files = fs.readdirSync(picFolder, (err) => {console.log("read dir error",err)});

    // console.log("writed data", data);
    fs.writeFile(path, JSON.stringify(data), "utf-8", (err) => { if (err) console.log("write file error", err) })

}

// removeData(10)
module.exports = {getData, updateData, removeData}