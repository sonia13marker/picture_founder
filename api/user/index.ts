import { Router, Request, Response } from "express"
import { db_models } from "../../db"
import imageRoute from "./image"
import Joi from "joi"
const route = Router()

type newUserIn = {
    UserName: String,
    UserEmail: String,
    UserPassword: String
}

const newUserInScheme = Joi.object({
    UserName: Joi.string().min(2).required(),
    UserEmail: Joi.string().min(6).required(),
    UserPassword: Joi.string().min(8).required()
})

route.get( "/:id", async ( req: Request, resp: Response ): Promise<void> => {
    
    const UserID = req.params.id;

    try {
        const getUser = await db_models.UserModel.findById(UserID)

        resp.json({
            "UserID":getUser?.id,
            "UserName": getUser?.UserName,
            "UserEmail": getUser?.UserEmail,
            "ImageCount": getUser?.UserImages.length
        })
    } catch (error) {
        // console.log(error);

        let errText = `{"message": 'user ${UserID} not found'}`
        resp.statusCode = 404;
        resp.json(errText)
        console.error(errText);
    }
    
} )


route.post( "/create", async ( req: Request, resp: Response ): Promise<void> => {
    console.log("Try create user");

    let ValidateData = newUserInScheme.validate(req.body)
    
    if ( ValidateData.error ){
        resp.status(400)
        resp.json({message: "non valide data"})
        return
    }

    let dbUser = await db_models.UserModel.create(ValidateData.value)
 
    //console.log(newUserData);
    resp.json({message: "complete user create", data: {"UserID": dbUser.id, "UserEmail": dbUser.UserName}})
    
})


route.use("/:id/image", imageRoute)

export default route