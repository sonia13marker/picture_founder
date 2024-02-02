import { Router, Request, Response, urlencoded, NextFunction } from "express"
// import * as imageRoute from "./image"
import { DeleteUser, getUserData } from "../service"
import { Types } from "mongoose"
import { hasUser } from "../../../middlewar/hasUser"
import { CustomError } from "../../../exceptions/ExampleError"
import { UserChPass } from "../dto"
import { UpdateUserPassword } from "../service"
import { GetImage, ImagePost, SearchQuery, fullImageGet, getImageFile, imageDelete, imageEdit } from "../../image/controller"
import multer from "multer"
import { stConf } from "../../../configs/multer"

const route = Router()

const tmpFiles = "uploads"

//получение данных пользователя по id
route.get("/:id", hasUser, async (req: Request, resp: Response): Promise<void> => {

    const userId = new Types.ObjectId(req.params.id);
    getUserData(userId.toString())
        .then((data) => {
            resp.json(data).status(200);

            console.log(`get user ${data}`);
        })
        .catch( (err: CustomError  ) => {
            resp.json({code: err.code, message: err.message, detail: err.detail}).status(err.statusCode)
        })
})

//удаление польщователя по id
route.delete("/:id", hasUser, async (req: Request, resp: Response): Promise<void> => {

    const userId = req.params.id;

    DeleteUser(userId)
        .then((res) => {
            console.log(`user ${userId} is deleted`);
            resp.json({ code: 204, message: "user deleted", detail: "" })
        })
        .catch ( (err: CustomError ) => {
            resp.json({code: err.code, message: err.message, detail: err.detail}).status(err.statusCode)
        })
})

//изменение пароля пользователя по id
route.put("/:id/chPass", hasUser, urlencoded({ extended: false }), async (req: Request, resp: Response): Promise<void> => {

    const userId = req.params.id;

    let ValidateData = UserChPass.validate(req.body)

    if (ValidateData.error) {
        resp.status(400)
        resp.json({ message: "wrong pasword" })
        console.log(ValidateData.error.message);
        return
    }
    console.log(typeof ValidateData.value.UserPassword)
    UpdateUserPassword(userId, ValidateData.value.UserPassword)
    .then( ( res ) => {
        resp.json({ code: 204, message: "user password updated", detail: "" })
        console.log(`user password ${userId} is update`);
    })
    .catch( (err: CustomError ) =>{
        resp.json({code: err.code, message: err.message, detail: err.detail}).status(err.statusCode)
        console.error(`[ERR] error on chage password fo user ${userId}/ err code ${err.code}`);
        
    })
})

// route.get("/:id/stat", hasUser, async (req: Request, resp: Response): Promise<void> => {

//     const userId = req.params.id
//     const userDB = await db_models.UserModel.findById(userId)

//     resp.json({
//         stat:{
//             ...userDB?.UserStat
//         }
//     })

//     console.log(`user ${userId} is get stat`);
// })

route.get("/:id/image", hasUser, GetImage)
route.post("/:id/image", hasUser, urlencoded({ extended: false }), multer({ storage: stConf, limits: { fieldSize: 1000000000} }).single("image"), ImagePost)
route.get("/:id/image/search", hasUser, SearchQuery)
route.delete("/:id/image/:imgId", hasUser, imageDelete)
route.get("/:id/image/:imgId", hasUser, getImageFile)
route.get("/:id/image/data/:imgId/", hasUser, fullImageGet)
route.put("/:id/image/:imgId", urlencoded({ extended: false }), hasUser, imageEdit)

export default route
