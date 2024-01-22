import {Model, Schema, model} from "mongoose"
import { userData, userStatData } from "../dto";

// const statScheme = new Schema({
//     name: {type: String, require: true},
//     count: {type: Number, require: true},
//     description: {type: String, require: false}
// })
//on future

const UserScheme = new Schema<userData>({
    userEmail: {type: String, require: true},
    userImages: [{type: Schema.ObjectId, ref: "Image"}],
    userPassword: {type: String, require: true},
    userStat: [{type: Object, require: true}]
}, {timestamps: true});


const User: Model<userData> = model("User", UserScheme);
export default User