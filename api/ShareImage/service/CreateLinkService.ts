import { db_models } from "../../../db";
import { Types } from "mongoose";
import { CustomError } from "../../../exceptions/ExampleError";

export async function createShareLink(imageId: string): Promise<string> {

    const imgId = new Types.ObjectId(imageId)
    const existImage = await db_models.ImageModel.exists( { _id: imgId})
    
    if ( !existImage ){
        throw new Error("no image")
    }

    const alreadyShared = await db_models.LinkModel.exists({ image: imgId})
    
    if ( alreadyShared ){
        return (await db_models.LinkModel.find({ image: imgId}))[0]._id.toString()
    }

    const linkId = await db_models.LinkModel.create({
        image: new Types.ObjectId(imageId)
    })
    .catch( (err: CustomError) => {
        throw new Error("err on create link\n"+err.message)
    })

    return linkId._id.toString()
}