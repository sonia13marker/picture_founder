const {Router} = require("express");
const fs = require("fs");
const path = require("path")
const { updateData } = require("../middleware/data")

const route = Router()
let picFolder = path.join(path.resolve("./public/pic/"), "/")


route.post("/picture/:name/:tags", async function(request, response){

    let picName = request.params.name;
    let tags = request.params.tags.split("&");
    console.log(request.params.tags);

    const buffers = []; // буфер для получаемых данных
 
        for await (const chunk of request) {
            buffers.push(chunk);        // добавляем в буфер все полученные данные
        }
 
        const data = Buffer.concat(buffers);
        
        // console.log(data)
        fs.writeFileSync(picFolder + "/" + picName, data)

        updateData(picName, tags)
    response.end()
})



module.exports = route