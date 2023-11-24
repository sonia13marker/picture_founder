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
    UserName: Joi.string().min(2).required(),
    UserEmail: Joi.string().min(6).required(),
    UserPassword: Joi.string().min(8)
})

const UserInScheme = Joi.object({
    UserName: Joi.string().min(2),
    UserEmail: Joi.string().min(6)
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
        resp.json({ message: "non valide data" })
        console.log(ValidateData.error.message);
        return
    }

    try {
        const userDb = await db_models.UserModel.findByIdAndUpdate(userId, {
            $set: {
                UserName: ValidateData.value.UserName,
                UserEmail: ValidateData.value.UserEmail
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


route.post("/create", async (req: Request, resp: Response): Promise<void> => {
    console.log("Try create user");

    let ValidateData = newUserInScheme.validate(req.body)

    if (ValidateData.error) {
        resp.status(400)
        resp.json({ message: "non valide data" })
        console.log(ValidateData.error.message);
        return
    }

    const userData = ValidateData.value

    const hash = cry.createHash('sha256');
    hash.update(ValidateData.value.UserPassword)

    userData.UserPassword = hash.digest('hex')

    let dbUser = await db_models.UserModel.create(userData)
    await fs.promises.mkdir(`${tmpFiles}/save/${dbUser._id}`)

    //console.log(newUserData);
    resp.json({ message: "complete user create", data: { "UserID": dbUser.id, "UserEmail": dbUser.UserName } })

})

route.get("/:id/image", hasUser, imageRoute.imageGet)
route.post("/:id/image", hasUser, urlencoded({ extended: false }), multer({ storage: stConf }).single("image"), imageRoute.imagePost)
route.delete("/:id/image/:imgId", hasUser, imageRoute.imageDelete)
route.get("/:id/image/:imgId", hasUser, imageRoute.fullImageGet)

export default route