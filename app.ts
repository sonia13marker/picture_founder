import express from "express"
import { ConnectDB } from "./db"
import api from "./api"
import { env } from "./env"
import cors from "cors"
import getImageFromLink from "./api/ShareImage/controller/GetsharedImageController"

const app = express()
app.use(express.json())

app.use(cors());

app.use("/api", api)
app.use("/share",  getImageFromLink)

app.listen( env.PORT, env.HOST_IP, async ()=>{
    await ConnectDB(env.DB_IP);
    
    console.log("server start");
})
