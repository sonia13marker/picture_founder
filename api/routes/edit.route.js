const { Router, json } = require("express");
const fs = require('fs');
const path = require("path")
const jsonParser = json()
const route = Router();

const db = path.join(path.resolve(), "/db/data.json")
const pictures = path.join(path.resolve(), "/public/pic/")

route.put("/", jsonParser, function(req, res){
       
    if(!req.body) return res.sendStatus(400);
    
    const newImageId = req.body.id;
    const newImageName = req.body.name;
    const newImageTags = req.body.tags;
    console.log("\n get data \n", req.body);
      
    let data = fs.readFileSync(db, "utf8");
    let oldData = JSON.parse(data);

    console.log("\n read data");

    for(let i=0; i<oldData.length; i++){
        if(oldData[i].id===newImageId){

            fs.renameSync(pictures+oldData[i].name, pictures+newImageName, (err)=>{console.log(err);})
            oldData[i].name = newImageName;
            oldData[i].tags = newImageTags;

            fs.writeFileSync(db, JSON.stringify(oldData));
            res.send(JSON.stringify(oldData[i]));
            break;
        }
    }
    res.status(404);
});


module.exports = route;