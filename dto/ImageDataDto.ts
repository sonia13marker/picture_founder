import { Document, Types } from "mongoose";

export interface ImageDataFile extends Express.Multer.File {

}

export interface ImageTags {
    fieldName: string[] | string
}

export type ImageDataUpdate = {
    imageName: string,
    imageTags: Array<string>,
    isFavorite: boolean
}

export interface ImageData {
    imageOrgName: String,
    imageName: String,
    imageSize: Number,
    imageHash: String,
    ownerId: Types.ObjectId,
    imageTags: [String],
    isFavorite: Boolean,
    ext: string
}

export interface ImageDataDB extends ImageData, Document {
}   