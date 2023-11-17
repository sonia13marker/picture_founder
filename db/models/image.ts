import {Schema, model} from "mongoose"

const ImageSchema = new Schema({
    imageOrgName: String,
    imageSetName: String,
    imageSize: Number,
    imageHash: String,
    ownerID: {type: Schema.ObjectId, ref: "User"}
})

const Image = model("image", ImageSchema)
export default Image