const express = require("express");
const fs = require("fs");
const path = require("path");

const route = express.Router();

const app = express();

const port = 3000;
const picFolder = path.join(__dirname, "/src/pic/");
// route.use("/picture",express.static(__dirname+"/src/pic"))

route.get("/pictures/:picName", function (request, response) {
  if (request.url.endsWith(".jpg")) {
    response.setHeader("Content-Type", "image/jpg");
    console.log("jpg");
  } else if (request.url.endsWith(".png")) {
    response.setHeader("Content-Type", "image/png");
    console.log("png");
  }
  fs.readFile(picFolder + request.params.picName, (err, image) => {
    if (err) {
      response.statusCode = 502;
      response.statusMessage = "cannot read file";
    } else {
      console.log("end");
      response.end(image);
    }
  });
});

route.get("/pictures", function (request, response) {
  console.log("get pictures");
  fs.readdir(picFolder, (err, files) => {
    if (err) {
      response.sendStatus(404);
      console.log(err);
    } else {
      console.log("pic send");
      response.json(files);
    }
  });
});

app.use("/api", route);

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/public/index.html");
});

app.listen(port);
