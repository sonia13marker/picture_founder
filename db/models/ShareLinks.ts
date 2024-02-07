import {Schema, Types, model} from "mongoose"

const ShareImage = new Schema({
    link: {type: String},
    ownerId: {type: Types.ObjectId},
    expireAt: {type: Date, default: Date.now, index: { expires: '1m'}},
}, {timestamps: true})

const Share = model("ShareImage", ShareImage)
export default Share