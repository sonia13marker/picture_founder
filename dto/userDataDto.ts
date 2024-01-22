import { Types, Document } from "mongoose";

export interface successLoginData {
    userId: Types.ObjectId,
    userEmail: string,
    token?: string
}