import { Types, Document } from "mongoose";

export interface successLoginData {
    userId: Types.ObjectId,
    userEmail: string,
    token?: string,
    checkUpdate: boolean
}

export interface userStatData{
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

export type userData = {
    userEmail: string,
    userImages: Array<string>,
    userStat: Array<userStatData>
}
