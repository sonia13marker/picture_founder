const express = require("express");
const routeApi = require("./api/routes/upload.route");
const routeRes = require("./api/routes/resource.route")

const app = express();
const port = 3000;

app.use("/api", routeApi);
app.use("/src", routeRes);

app.get("/", function (request, response) {

  response.sendFile(__dirname + "/public/index.html");
});

app.listen(port);
