import {Model, Schema, model} from "mongoose"
import { userData, userStatData } from "../../dto/userDataDto";

const statScheme = new Schema<userStatData>({
    name: {type: String, require: true},
    count: {type: Number, require: true},
    description: {type: String, require: false}
})
//on future

const UserScheme = new Schema<userData>({
    userEmail: {type: String, require: true},
    userImages: [{type: Schema.ObjectId, ref: "Image"}],
    userPassword: {type: String, require: true},
    userStat: [{type: Schema.ObjectId, ref: "Stat"}]
}, {timestamps: true});


const User: Model<userData> = model("User", UserScheme);
const Stat: Model<userStatData> = model("Stat", statScheme);
export default User