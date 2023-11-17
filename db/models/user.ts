import {Schema, model} from "mongoose"

const UserScheme = new Schema({
    userName: String,
    email: String,
    images: [{type: Schema.ObjectId, ref: "Image"}]
})


const User = model("User", UserScheme)
export default User