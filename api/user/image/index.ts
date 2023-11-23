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
    const userId = req.params.id

    if ( needData.error ){
        resp.json({message: "invalid data"})
        return
    }



    const userImages = await db_models.UserModel.findById(userId).populate({
        path: "UserImages",
        options: {skip: needData.value.offset}
    }).exec()
    const userImagesArray = userImages?.UserImages
    
    resp.json({
        filter: needData.value.filter,
        offset: needData.value.offset,
        images: userImagesArray
    })
}


async function imagePost( req: Request, resp: Response ) {
    
    //получаю параметры изображения и id пользователя
    const userId = req.params.id
    const reqData = newImageScheme.validate(req.body)
    const imageData = <Express.Multer.File>req.file;
    
    // проверяю есть ли ошибки при валидации данных
    if ( reqData.error ){
        console.error(`[ERROR] error on upload new image \n ${reqData.error.name}`);
        resp.status(400);
        resp.json({message: `[ERROR] error on upload new image \n ${reqData.error.name}`})
        return
    }

    //проверяю есть ли изображение
    if ( !imageData ){
        console.error(`[ERROR] error on upload is empty | userid ${userId}`);
        resp.status(400);
        resp.json({message: `[ERROR] error on upload is empty | userid ${userId}`})
        return
    }

    //создаю хэш сумму изображения
    const HashSumImage = cry.createHash("sha256")
    HashSumImage.update(imageData.originalname)
    
    const hashedFile = HashSumImage.digest("hex")

    //проверяю, есть ли такое изображение у пользователя
    const hasImage = await db_models.ImageModel.exists({imageHash: hashedFile, ownerID: userId})    
    if ( hasImage ){
        resp.json({message: "image is uploaded"})
        return
    }
    
    //добавляю в базу данных новое изображение
    console.log("add new image data");
    const createdImage = await db_models.ImageModel.create({
        imageOrgName: imageData.originalname,
        imageSetName: reqData.value.imageName,
        ownerId: userId,
        imageHash: hashedFile,
        imageSize: imageData.size,
        imageTags: reqData.value.imageTags,
        isFavotite: reqData.value.isFavorite,
        extend: imageData.mimetype.split("/")[1]
    })

    //обновляю пользовательские данные
    console.log("update user data");
    await db_models.UserModel.updateOne({_id: userId}, {$push: {UserImages: createdImage._id}})

    //переношу изображение из временного хранилише в пользовательское
    fs.rename( `${tmpFiles}/tmp/${imageData.originalname}`, `${tmpFiles}/save/${userId}/${hashedFile}` )
    
    resp.json({message: "image uploaded", data: {
        imageId: createdImage.id,
        imageName: createdImage.imageSetName,
        imageTags: createdImage.imageTags
    }})
}

async function imageDelete (req: Request, resp: Response) {
    
    const userId = req.params.id;
    const imageId = req.params.imgId;

    let hasImage;
    try {
        hasImage = await db_models.ImageModel.exists({_id: imageId, ownerId: userId})
        console.log(hasImage);
    } catch (error) {
        resp.json({message: "image not found"})
        return
    }
    
    if ( !hasImage ){
        resp.json({message: "image not found"})
        return
    }

    const imageData = await db_models.ImageModel.findByIdAndDelete({_id: imageId, ownerId: userId})
    await db_models.UserModel.updateOne({_id: userId}, {$pull: {UserImages: imageData?.id}})
    
    await fs.rm(`${tmpFiles}/save/${userId}/${imageData?.imageHash}`)
    
    resp.json({message: "remove image", data: {
        imageName: imageData?.imageSetName
    }})
}

async function fullImageGet( req: Request, resp: Response ) {
    
    const userId = req.params.id;
    const imageId = req.params.imgId;

    let hasImage;
    try {
        hasImage = await db_models.ImageModel.exists({_id: imageId, ownerId: userId})
        console.log(hasImage);
    } catch (error) {
        resp.json({message: "image not found"})
        return
    }
    
    if ( !hasImage ){
        resp.json({message: "image not found"})
        return
    }

    const imageData = await db_models.ImageModel.find({_id: imageId, ownerId: userId})
    
    resp.json({
        ...imageData
    })
}

export { imageGet, imagePost, imageDelete, fullImageGet }