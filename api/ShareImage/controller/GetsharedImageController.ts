import { Router, Request, Response, urlencoded, NextFunction } from "express"
import { CustomError } from "../../../exceptions/ExampleError";
import {  getShareImage } from "../service/GetSharedImageService";



const router = Router()

router.get("/:shImgId", async (req: Request, resp: Response): Promise<void> => {
    const shareId = req.params.shImgId;

    await getShareImage(shareId, resp)
        .catch((err: CustomError) => {
            if ( err.message.includes("ownerId")){
                resp.statusCode = 404
            resp.json({ message: "link is dead. R.I.P" })    
            }
            resp.statusCode = err.statusCode || 500
            resp.json({ code: err.code, message: err.message, detail: err.detail })
        })
})

export default router