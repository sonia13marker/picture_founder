import goose from "mongoose"
import user from "./models/user"
import image from "./models/image"

async function ConnectDB(db_ip: String): Promise<void> {
    try{
        console.log("try to connect to db");
        let conn = await goose.connect(`mongodb://${db_ip}:27017/picture_founder`);
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

export {ConnectDB, db_models}