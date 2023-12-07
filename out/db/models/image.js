"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ImageSchema = new mongoose_1.Schema({
    imageOrgName: String,
    imageSetName: String,
    imageSize: Number,
    imageHash: String,
    ownerId: { type: mongoose_1.Schema.ObjectId, ref: "User" },
    imageTags: [String],
    isFavotite: Boolean,
    extend: String
}, { timestamps: true });
const Image = (0, mongoose_1.model)("Image", ImageSchema);
exports.default = Image;
