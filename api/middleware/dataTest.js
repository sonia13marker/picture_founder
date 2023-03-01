const fs = require("fs")
const path = require("path")

const dataPath = path.join(path.resolve('.'), "/db/");
let picFolder = path.join(path.resolve("./public/pic/"), "/")

function getData() {
    let data = complitedTest()
    // fs.writeFile(dataPath + "data.json", data, (err)=>{console.log("write file error",err);});
    return data;
}

function complitedTest() {
    let objData = []

    let files = fs.readdirSync(picFolder, (err) => {console.log("read dir error",err);});;
    
    for (let i = 0; i < files.length; i++) {
        // console.log(i);
        objData.push({
            id: i,
            name: files[i],
            tags: []
        })
    }
    // console.log(objData);
    return JSON.stringify(objData);
}

// console.log(getData());
// getData()
module.exports = getData