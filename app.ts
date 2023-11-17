import express from "express"
import { TestConnect } from "./db"

const app = express()

app.get("/", (req: express.Request, resp: express.Response)=>{
    resp.send("<h1>Uiui</h1>");
})


app.listen( 4500, async ()=>{
    await TestConnect();
    console.log("server start");
})