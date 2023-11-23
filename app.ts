import express from "express"
import { ConnectDB } from "./db"
import api from "./api"
import { env } from "./env"

const app = express()
app.use(express.json())

app.use("/api",api)

app.listen( env.PORT, async ()=>{
    await ConnectDB(env.DB_IP);
    console.log("server start");
})