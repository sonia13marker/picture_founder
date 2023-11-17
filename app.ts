import express from "express"

const app = express()


app.get("/", (req: express.Request, resp: express.Response)=>{
    resp.send("<h1>Uiui</h1>")
})


app.listen( 4500, ()=>{
    console.log("server start");
    
})