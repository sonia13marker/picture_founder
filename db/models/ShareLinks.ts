import {Schema, Types, model} from "mongoose"

const ShareImage = new Schema({
    image: {type: Types.ObjectId, ref: "Image"},
    expireAt: {type: Date, default: Date.now, index: { expires: '7d'}}
}, {timestamps: true})

const Share = model("ShareImage", ShareImage)
export default Share