import Joi from "joi";


export type newUserIn = {
    userName: String,
    userEmail: String,
    userPassword: String
}

export type updateUserData = {
    
}

export const UserChPass = Joi.object({
    UserPassword: Joi.string().min(8).required()
})