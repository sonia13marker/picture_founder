import {Schema, model} from "mongoose"

const UserScheme = new Schema({
    UserName: String,
    UserEmail: String,
    UserImages: [{type: Schema.ObjectId, ref: "Image"}]
})


const User = model("User", UserScheme)
export default User