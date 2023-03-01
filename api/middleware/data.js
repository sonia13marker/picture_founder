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

    for ( let i of data ) {
        // console.log(i);
        objData.push({
            id: data.indexOf(i),
            name: i.name,
            tags: i.tags
        })
    }
    // console.log(objData);
    return JSON.stringify(objData);
}

//доделать
//пока схематично
function updateData(newData, image){
    // let newData = JSON.parse(newData);
    let oldData = JSON.parse(fs.readFileSync(dataPath + "data.json"));
    // let files = fs.readdirSync(picFolder, (err) => {console.log("read dir error",err)});
    
    oldData.push([...newData])

    // console.log(objData);
    writeData(image, picFolder)
    writeData(oldData, dataPath + "data.json");

}

function writeData(data, path){
    // let files = fs.readdirSync(picFolder, (err) => {console.log("read dir error",err)});

    console.log("writed data", data);
    fs.writeFile(path, JSON.stringify(data), "utf-8" ,(err)=>{console.log("write file error",err)})

}

// getPicData()
module.exports = getData