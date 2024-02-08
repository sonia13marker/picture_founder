import { Response } from "express";
import { db_models } from "../../../db";
import { join } from "path";
import {pathResolve} from "../../../dto/PathResolve"
import { createReadStream } from "fs";


export async function getShareImage( linkId: string, resp: Response): Promise<void>{
    
    const linkData = await  db_models.LinkModel.findById(linkId);
    const imageData = await  db_models.ImageModel.findById(linkData?.image)

    const toImagePath = join(pathResolve.UserImageSaveDir(imageData!.ownerId.toString()), imageData!.imageHash.toString())

    resp.contentType(`image/${imageData!.ext}`)
    createReadStream(toImagePath).pipe(resp)
}
