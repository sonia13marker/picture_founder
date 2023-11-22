import { Router, Request, Response } from "express"
import goose, { Error } from "mongoose"
import { db_models } from "../../../db"
import Joi from "joi";
import multer from "multer";
import { Express } from "express"
import cry from "crypto"
import fs from "fs/promises"

enum filter {
    "NONE",
    "UP",
    "DOWN"
}

const tmpFiles = "uploads"

const imagesGetScheme = Joi.object({
    filter: Joi.string().valid(...Object.values(filter)).default("NONE"),
    offset: Joi.number().default(0)
})

const newImageScheme = Joi.object({
    imageName: Joi.string().min(2).required(),
    imageTags: Joi.array().items(Joi.string()).required(),
    isFavorite: Joi.boolean().default(false)
})


async function imageGet ( req: Request, resp: Response ) {
    
    const needData = imagesGetScheme.validate(req.query);
    const userImages = await db_models.UserModel.findById(req.params.id).populate("UserImages").exec()
    const userImagesArray = userImages?.UserImages
    
    resp.json({
        filter: needData.value.filter,
        offset: needData.value.offset,
        images: userImagesArray
    })
}


async function imagePost( req: Request, resp: Response ) {
    
    const reqData = newImageScheme.validate(req.body)
    const userId = req.params.id
    const imageData = <Express.Multer.File>req.file;
    
    const HashSumImage = cry.createHash("sha256")
    
    console.log(imageData);
    
    if ( reqData.error ){
        console.error(`[ERROR] error on upload new image \n ${reqData.error.name}`);
        resp.status(400);
        resp.json({message: `[ERROR] error on upload new image \n ${reqData.error.name}`})
        return
    }

    if ( !imageData ){
        console.error(`[ERROR] error on upload is empty | userid ${userId}`);
        resp.status(400);
        resp.json({message: `[ERROR] error on upload is empty | userid ${userId}`})
        return
    }

    HashSumImage.update(imageData.originalname)
    
    const hashedFile = HashSumImage.digest("hex")

    const newImageData = db_models.ImageModel

    const hasImage = await newImageData.find({imageHash: hashedFile});
    console.log(hasImage);
    

    if ( hasImage.length ){
        resp.json({message: "imame is uploaded"})
        return
    }
    
    
    console.log("add new image data");
    const createdImage = await db_models.ImageModel.create({
        imageOrgName: imageData.originalname,
        imageSetName: reqData.value.imageName,
        ownerID: userId,
        imageHash: hashedFile,
        imageSize: imageData.size,
        imageTags: reqData.value.imageTags,
        isFavotite: reqData.value.isFavorite,
        extend: imageData.mimetype.split("/")[1]
    })

    console.log("update user data");
    await db_models.UserModel.updateOne({_id: userId}, {$push: {UserImages: createdImage._id}})

    fs.rename( `${tmpFiles}/tmp/${imageData.originalname}`, `${tmpFiles}/save/${userId}/${hashedFile}` )
    
    resp.json({message: "sdf"})
}

export { imageGet, imagePost }