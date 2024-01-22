import * as Joi from "joi"

const UserScheme = Joi.object({
    UserEmail: Joi.string().min(6).regex(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
    UserPassword: Joi.string().min(8).required()
})


export { UserScheme }