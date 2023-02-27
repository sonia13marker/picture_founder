const { Router } = require('express')

const route = Router();

route.use("/upload", function(request, response){
    try {
        console.log(request);
        response.send("<h2>work</h2>")
    } catch (error) {
        console.log(__filename, error);
    }
})

exports.module = route;