import {Schema, Types, model} from "mongoose"

const ShareImage = new Schema({
    link: {type: String},
    image: {type: Types.ObjectId, ref: "Image"},
    expireAt: {type: Date, default: Date.now, index: { expires: '1m'}}
}, {timestamps: true})

const Share = model("ShareImage", ShareImage)
export default Share