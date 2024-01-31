import Joi from "joi";
import { userStatData } from "../../../dto/UserDataDto";


export type newUserIn = {
    userName: String,
    userEmail: String,
    userPassword: String
}

export type updateUserData = {
    userEmail: string,
    userPassword: string,
    userImages: Array<string>,
    userStat: Array<userStatData>
}

export const UserChPass = Joi.object({
    UserPassword: Joi.string().min(8).required()
})