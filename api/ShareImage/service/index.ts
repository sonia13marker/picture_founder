import { Response } from "express";
import { db_models } from "../../../db";


export async function getShareImage( linkId: string, resp: Response): Promise<string>{
    
    const linkData = db_models.LinkModel.findById(linkId);
    const imageData = db_models.ImageModel
}