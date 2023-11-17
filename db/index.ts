import goose from "mongoose"
import user from "./models/user"
import image from "./models/image"

async function TestConnect(): Promise<void> {
    try{
        console.log("try to connect to db");
        let conn = await goose.connect("mongodb://192.168.5.65:27017/picture_founder");
        let connStatus = conn.connection.readyState

        if ( connStatus ){
            console.log("DB is connected");
        }
    }
    catch (e){
        console.log("error on connetc to db");
    }
}

const db_models = {
    UserModel: user,
    ImageModel: image
}

export {TestConnect, db_models}