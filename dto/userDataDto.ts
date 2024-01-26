import { Types, Document } from "mongoose";

export interface successLoginData {
    userId: Types.ObjectId,
    userEmail: string,
    token?: string
}

export interface userStatData extends Document{
    name: String,
    count: Number,
    description?: String
}

export interface userImageData {
    userId: Types.ObjectId,
    imageName: string,
    ownerId: Types.ObjectId,
    uploadDate: string,
    imageTags: Array<string>,
    isFavorite: boolean
}
export interface userImageDataDB extends Document, userImageData {}

export interface userData extends Document {
    userEmail: string,
    userPassword: string,
    userImages: Array<userImageData>,
    userStat: Array<userStatData>
}

