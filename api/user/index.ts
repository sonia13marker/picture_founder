import { Router, Request, Response, urlencoded } from "express"
import { db_models } from "../../db"
import * as imageRoute from "./image"
import Joi from "joi"
import multer from "multer"
import cry from "crypto"
import fs from "fs"
import { hasUser } from "../../middlewar/hasUser"

const route = Router()

const tmpFiles = "uploads"
type newUserIn = {
    UserName: String,
    UserEmail: String,
    UserPassword: String
}

const stConf = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/tmp");
    },
    filename(req, file, callback) {
        callback(null, file.originalname)
    }
})

const newUserInScheme = Joi.object({
    UserEmail: Joi.string().min(6).required(),
    UserPassword: Joi.string().min(8)
})

const UserInScheme = Joi.object({
    UserPassword: Joi.string().min(8).required()
})

route.get("/:id", hasUser, async (req: Request, resp: Response): Promise<void> => {

    const userId = req.params.id;
    const getUser = await db_models.UserModel.findById(userId)

    resp.json({
        "UserID": getUser?.id,
        "UserName": getUser?.UserName,
        "UserEmail": getUser?.UserEmail,
        "ImageCount": getUser?.UserImages.length
    })


})

route.delete("/:id", hasUser, async (req: Request, resp: Response): Promise<void> => {

    const userId = req.params.id;
    const userDb = await db_models.UserModel.findByIdAndDelete(userId)
    const imageDb = await db_models.ImageModel.deleteMany({ ownerId: userId })

    fs.promises.rm(`uploads/save/${userId}`, { recursive: true })

    console.log(`user ${userId} is deleted`);

    resp.json({ message: "user deleted" })

})

route.put("/:id", hasUser, urlencoded({ extended: false }), async (req: Request, resp: Response): Promise<void> => {

    const userId = req.params.id;

    let ValidateData = UserInScheme.validate(req.body)

    if (ValidateData.error) {
        resp.status(400)
        resp.json({ message: "wrong pasword" })
        console.log(ValidateData.error.message);
        return
    }

    try {
        const userDb = await db_models.UserModel.findById(userId);
        const hash = cry.createHash('sha256');

        hash.update(ValidateData.value.UserPassword)
        const NewUserPassword = hash.digest('hex')

        if (NewUserPassword === userDb?.UserPassword) {
            resp.status(409)
            resp.json({ message: "wrong password" })
            console.log("[ERR] edit same password");
            return
        }

        await userDb?.updateOne({
            $set: {
                UserPassword: NewUserPassword
            }
        });

        resp.json({
            messgae: "data updated"
        })
    } catch (error) {
        resp.json({
            message: "error on edit data"
        })
    }



})

route.get("/:id/stat", hasUser, async (req: Request, resp: Response): Promise<void> => {
    
    const userId = req.params.id
    const userDB = await db_models.UserModel.findById(userId)
    
    resp.json({
        stat:{
            ...userDB?.UserStat
        }
    })
})


route.post("/create", urlencoded({ extended: false }), async (req: Request, resp: Response): Promise<void> => {
    console.log("Try create user");

    let ValidateData = newUserInScheme.validate(req.body)
    const userData = ValidateData.value
    const hasUser = await db_models.UserModel.exists({ UserEmail: userData.UserEmail })

    if (ValidateData.error) {
        resp.status(400)
        resp.json({ message: "non valide data" })
        console.log(ValidateData.error.message);
        return
    }

    if (hasUser) {
        resp.status(400)
        resp.json({ message: "user is exist" })
        console.log("[ERR] try create exist user");
        return
    }

    const hash = cry.createHash('sha256');
    hash.update(ValidateData.value.UserPassword)

    userData.UserPassword = hash.digest('hex')

    let dbUser = await db_models.UserModel.create(userData)
    await fs.promises.mkdir(`${tmpFiles}/save/${dbUser._id}`, { recursive: true })

    //console.log(newUserData);
    resp.json({ message: "complete user create", data: { "UserID": dbUser.id, "UserEmail": dbUser.UserName } })

})

route.get("/:id/image", hasUser, imageRoute.imageGet)
route.post("/:id/image", hasUser, urlencoded({ extended: false }), multer({ storage: stConf }).single("image"), imageRoute.imagePost)
route.delete("/:id/image/:imgId", hasUser, imageRoute.imageDelete)
route.get("/:id/image/:imgId", hasUser, imageRoute.fullImageGet)
route.put("/:id/image/:imgId", urlencoded({ extended: false }), hasUser, imageRoute.imageEdit)

export default route