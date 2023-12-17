import { string } from "joi"
import {Schema, model} from "mongoose"

const ImageSchema = new Schema({
    imageOrgName: String,
    imageName: String,
    imageSize: Number,
    imageHash: String,
    ownerId: {type: Schema.ObjectId, ref: "User"},
    imageTags: [String],
    isFavorite: Boolean,
    extend: String
}, {timestamps: true})

const Image = model("Image", ImageSchema)
export default Image