import {Model, Schema, model} from "mongoose"
import { userData, userStatData } from "../../dto/UserDataDto";
import { DBUserData } from "../dto/UserDto";

const statScheme = new Schema<userStatData>({
    name: {type: String, require: true},
    count: {type: Number, require: true},
    description: {type: String, require: false}
})
//on future

const UserScheme = new Schema<DBUserData>({
    userEmail: {type: String, require: true},
    userImages: [{type: Schema.ObjectId, ref: "Image"}],
    userPassword: {type: String, require: true},
    userStat: [{type: Schema.ObjectId, ref: "Stat"}],
    lastLogin: { type : Date, default: Date.now }
}, {timestamps: true});


const User: Model<DBUserData> = model("User", UserScheme);
// const Stat: Model<userStatData> = model("Stat", statScheme);
export default User