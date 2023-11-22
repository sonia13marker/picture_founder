import express from "express"
import { ConnectDB } from "./db"
import api from "./api"

const app = express()

app.use(express.json())

app.use("/api",api)

app.listen( 4500, async ()=>{
    await ConnectDB("192.168.5.53");
    console.log("server start");
})