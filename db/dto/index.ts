import { Types, Document } from "mongoose"

export interface userStatData extends Document{
    name: String,
    count: Number,
    description?: String
}

export interface userImageData extends Document {
    imageId: Types.ObjectId,
    imageName: string,
    ownerId: Types.ObjectId,
    uploadDate: string,
    imageTags: Array<string>,
    isFavorite: boolean
}

export interface userData extends Document {
    userEmail: string,
    userPassword: string,
    userImages: Array<userImageData>,
    userStat: Array<userStatData>
}

export interface userGetData {
    
}