const express = require("express");
const {routes} = require("./api/routes")

const app = express();
const port = 4500;

app.use("/api/get", routes.get);
app.use("/api/post", routes.post);
app.use("/api/delete", routes.del);
app.use("/api/edit", routes.put);
app.use("/src", routes.res);

app.get("/", function (request, response) {

  response.sendFile(__dirname + "/public/index.html");
});

app.listen(port);
