const {Router} = require("express");
const { deleteData, removeData } = require("../middleware/data")

const route = Router()

route.delete("/picture/:id", function(request, response){
    let imageId = +request.params.id
    console.log("try delete image", imageId);
    
    try {
        removeData(imageId)
        console.log( "delete data id: " + imageId );
        response.end();
        
    } catch (error) {
        response.statusCode = 404;
        response.statusMessage = error;
        response.end()
    }

})

module.exports = route