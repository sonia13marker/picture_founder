const {Router} = require("express");
const fs = require("fs");
const path = require("path")
const { updateData } = require("../middleware/data")

const route = Router()
let picFolder = path.join(path.resolve("./public/pic/"), "/")


route.post("/picture/:name/:tags", async function(request, response){

    let picName = request.params.name;
    let tags = request.params.tags === "none" ? " " : request.params.tags.split("&")

    const buffers = []; // буфер для получаемых данных
 
        for await (const chunk of request) {
            buffers.push(chunk);        // добавляем в буфер все полученные данные
        }
 
        const data = Buffer.concat(buffers);
        
        // console.log(data)
        fs.writeFileSync(picFolder + "/" + picName, data)

        if (updateData(picName, tags)){
            response.end();
        }
        else {
            response.statusCode = 400
            response.statusMessage = "picture exist"
            response.end()
            console.log("try download exist picture");
        }
})



module.exports = route