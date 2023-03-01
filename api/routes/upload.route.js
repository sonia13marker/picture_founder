const { Router, static } = require("express");
const fs = require('fs');
const path = require("path")
const getData = require("../middleware/dataTest")

const route = Router();
let picFolder = path.join(path.resolve("./public/pic/"), "/")
route.use(static(picFolder))


//путь до каждой отдельной картинки
route.get("/pictures/:picName", function (request, response) {
  if (request.url.endsWith(".jpg")) {
    response.setHeader("Content-Type", "image/jpg");
    console.log("load jpg", request.params.picName);
  }
  else if (request.url.endsWith(".png")) {
    response.setHeader("Content-Type", "image/png");
    console.log("load png", request.params.picName);
  }
  fs.readFile(picFolder + request.params.picName, (err, image) => {
    if (err) {
      response.statusCode = 502;
      response.statusMessage = "cannot read file";
      console.log("image load error \n", err);
    } else {
      console.log("send image end");
      response.end(image);
    }
  });
});

//получение массива всех картинок
route.get("/pictures", function (request, response) {
  console.log("get pictures");
  try {
    response.statusCode = 200;
    console.log("pics send");

    response.send(getData());
  } catch (error) {
    response.sendStatus(404);
    console.log(error);
  }
});

module.exports = route
