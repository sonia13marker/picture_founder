import express from "express"
import { TestConnect } from "./db"
import api from "./api"

const app = express()

app.use("api/", api)
app.get("/", (req: express.Request, resp: express.Response)=>{
    resp.send("<h1>Uiui</h1>");
})


app.listen( 4500, async ()=>{
    await TestConnect();
    console.log("server start");
})