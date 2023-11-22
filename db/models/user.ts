import {Schema, model} from "mongoose"

const UserScheme = new Schema({
    UserName: {type: String, require: true},
    UserEmail: {type: String, require: true},
    UserImages: [{type: Schema.ObjectId, ref: "Image"}]
}, {timestamps: true})


const User = model("User", UserScheme)
export default User