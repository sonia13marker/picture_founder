import { Router, Request, Response, urlencoded, NextFunction } from "express"
import { CustomError } from "../../../exceptions/ExampleError";
import { createShareLink } from "../service/CreateLinkService";
import { hasUser } from "../../../middlewar/hasUser";
import { MyError } from "../../../utils/CustomLog";


const router = Router()


router.get("/:imgId", async (req: Request, resp: Response)=>{

    const imageId = req.params.imgId;
    

    createShareLink(imageId)
    .then( link => {
        resp.json({message: "complite", data: {link}})
    })
    .catch( (err: CustomError) => {
        MyError("SERVICE err: " + err.message)
        resp.statusCode = err.statusCode || 500
        resp.json({ code: err.code, message: err.message, detail: err.detail })
    })
})

export default router