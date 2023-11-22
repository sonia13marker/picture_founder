import { Router, Request, Response, urlencoded } from "express"
import { db_models } from "../../db"
import * as imageRoute from "./image"
import Joi from "joi"
import multer from "multer"
import cry from "crypto"
import fs from "fs"

const route = Router()

const tmpFiles = "uploads"
type newUserIn = {
    UserName: String,
    UserEmail: String,
    UserPassword: String
}

const stConf = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/tmp");
    },
    filename(req, file, callback) {
        callback(null, file.originalname)
    }
})

const newUserInScheme = Joi.object({
    UserName: Joi.string().min(2).required(),
    UserEmail: Joi.string().min(6).required(),
    UserPassword: Joi.string().min(8).required()
})

route.get( "/:id", async ( req: Request, resp: Response ): Promise<void> => {
    
    const userId = req.params.id;

    try {
        const getUser = await db_models.UserModel.findById(userId)

        resp.json({
            "UserID":getUser?.id,
            "UserName": getUser?.UserName,
            "UserEmail": getUser?.UserEmail,
            "ImageCount": getUser?.UserImages.length
        })
    } catch (error) {
        // console.log(error);

        let errText = `{"message": 'user ${userId} not found'}`
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
        console.log(ValidateData.error.message);
        return
    }

    let dbUser = await db_models.UserModel.create(ValidateData.value)
    await fs.promises.mkdir(`${tmpFiles}/save/${dbUser._id}`)
 
    //console.log(newUserData);
    resp.json({message: "complete user create", data: {"UserID": dbUser.id, "UserEmail": dbUser.UserName}})
        
})

route.get("/:id/image", imageRoute.imageGet)
route.post("/:id/image", urlencoded({extended: false}), multer({storage: stConf}).single("image"), imageRoute.imagePost)

export default route