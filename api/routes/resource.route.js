const { Router, static } = require("express");
const fs = require('fs');
const path = require("path")

const route = Router();
let srcFolder = path.join(path.resolve("./public/src"), "/")
route.use(static(srcFolder))

route.get("/:path/:file", function( request, response ){
    let data = request.params;
    let ContentType = request.url.split()[-1]
    console.log("enter request file", data);
    fs.readFile(srcFolder + data.path + data.file, function( err, file ){
        if ( err ){
            response.sendStatus(404)
            response.statusMessage = "not script"
            console.log(err);
        }
        else{
            response.contentType(response.type(ContentType))
            response.statusCode = 200
            response.end(file)
        }
    })
})


// route.get("/scripts/:script", function( request, response ){
//     console.log("enter request js");
//     fs.readFile(srcFolder + "scripts/" + request.params.script, function( err, file ){
//         if ( err ){
//             response.sendStatus(404)
//             response.statusMessage = "not script"
//             console.log(err);
//         }
//         else{
//             response.contentType(response.type(".js"))
//             response.statusCode = 200
//             response.end(file)
//         }
//     })
// })

// route.get("/style/:st", function( request, response ){
//     console.log("enter request css");
//     fs.readFile(srcFolder + "style/" + request.params.st, function( err, file ){
//         if ( err ){
//             response.sendStatus(404)
//             response.statusMessage = "not script"
//         }
//         else{
//             response.contentType(response.type(".css"))
//             response.statusCode = 200
//             response.end(file)
//         }
//     })
// })

module.exports = route