const express = require("express");
const routeApiGet = require("./api/routes/upload.route");
const routeApiPost = require("./api/routes/download.route");
const routeApiDelete = require("./api/routes/delete.route");
const routeRes = require("./api/routes/resource.route")

const app = express();
const port = 3000;

app.use("/api/get", routeApiGet);
app.use("/api/post", routeApiPost);
app.use("/api/delete", routeApiDelete);
app.use("/src", routeRes);

app.get("/", function (request, response) {

  response.sendFile(__dirname + "/public/index.html");
});

app.listen(port);
