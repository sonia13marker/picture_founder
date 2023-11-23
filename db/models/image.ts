import { string } from "joi"
import {Schema, model} from "mongoose"

const ImageSchema = new Schema({
    imageOrgName: String,
    imageSetName: String,
    imageSize: Number,
    imageHash: String,
    ownerId: {type: Schema.ObjectId, ref: "User"},
    imageTags: [String],
    isFavotite: Boolean,
    extend: String
}, {timestamps: true})

const Image = model("Image", ImageSchema)
export default Image