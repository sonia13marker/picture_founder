import { string } from "joi"
import {Schema, model} from "mongoose"
import { ImageDataDB } from "../../dto/ImageDataDto"


const ImageSchema = new Schema<ImageDataDB>({
    imageOrgName: String,
    imageName: String,
    imageSize: Number,
    imageHash: String,
    ownerId: {type: Schema.ObjectId, ref: "User"},
    imageTags: [String],
    isFavorite: Boolean
}, {timestamps: true})

const Image = model("Image", ImageSchema)
export default Image