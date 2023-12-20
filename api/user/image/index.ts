import { Request, Response } from "express"
import { db_models } from "../../../db"
import Joi from "joi"
import cry from "crypto"
import fs from "fs/promises"
import path from "path"

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

const ImageScheme = Joi.object({
    imageName: Joi.string().min(2),
    imageTags: Joi.array().items(Joi.string()),
    isFavorite: Joi.boolean().default(false)
})

const ImageSchemeEdit = Joi.object({
    imageName: Joi.string().min(2),
    imageTags: Joi.array().items(Joi.string()),
    isFavorite: Joi.boolean()
})


async function imageGet(req: Request, resp: Response) {

    const needData = imagesGetScheme.validate(req.query);
    const userId = req.params.id

    if (needData.error) {
        resp.json({ message: "invalid data" })
        return
    }



    const userImages = await db_models.UserModel.findById(userId).populate({
        path: "UserImages",
        options: { skip: needData.value.offset }
    }).exec()
    const userImagesArray = userImages?.UserImages
	console.log(`get images from user ${userId}`)
    resp.json({
        filter: needData.value.filter,
        offset: needData.value.offset,
        images: userImagesArray
    })
}


async function imagePost(req: Request, resp: Response) {

    //получаю параметры изображения и id пользователя
    const userId = req.params.id
    const reqData = ImageScheme.validate(req.body)
    const imageData = <Express.Multer.File>req.file;

    // проверяю есть ли ошибки при валидации данных
    if (reqData.error) {
        console.error(`[ERROR] error on upload new image \n ${reqData.error.name}`);
        resp.status(400);
        resp.json({ message: `[ERROR] error on upload new image \n ${reqData.error.name}` })
        return
    }

    //проверяю есть ли изображение
    if (!imageData) {
        console.error(`[ERROR] error on upload is empty | userid ${userId}`);
        resp.status(400);
        resp.json({ message: `[ERROR] error on upload is empty | userid ${userId}` })
        return
    }

    //создаю хэш сумму изображения
    const HashSumImage = cry.createHash("sha256")
    HashSumImage.update(imageData.originalname)

    const hashedFile = HashSumImage.digest("hex")

    //проверяю, есть ли такое изображение у пользователя
    const hasImage = await db_models.ImageModel.exists({ imageHash: hashedFile, ownerID: userId })
    if (hasImage) {
        resp.json({ message: "image is uploaded" })
        return
    }

    //добавляю в базу данных новое изображение
    console.log("add new image data");
    const createdImage = await db_models.ImageModel.create({
        imageOrgName: imageData.originalname,
        imageName: (reqData.value.imageName || imageData.originalname),
        ownerId: userId,
        imageHash: hashedFile,
        imageSize: imageData.size,
        imageTags: reqData.value.imageTags,
        isFavorite: reqData.value.isFavorite,
        extend: imageData.mimetype.split("/")[1]
    })

    //обновляю пользовательские данные
    console.log("update user data");
    await db_models.UserModel.updateOne({ _id: userId }, { $push: { UserImages: createdImage._id } })

    //переношу изображение из временного хранилише в пользовательское
    fs.rename(`${tmpFiles}/tmp/${imageData.originalname}`, `${tmpFiles}/save/${userId}/${hashedFile}`)

    resp.json({
        message: "image uploaded", data: {
            imageId: createdImage.id,
            imageName: createdImage.imageName,
            imageTags: createdImage.imageTags
        }
    })
}

async function imageDelete(req: Request, resp: Response) {

    const userId = req.params.id;
    const imageId = req.params.imgId;

    let hasImage;
    try {
        hasImage = await db_models.ImageModel.exists({ _id: imageId, ownerId: userId })
        console.log(hasImage);
    } catch (error) {
        resp.json({ message: "image not found" })
        return
    }

    if (!hasImage) {
        resp.json({ message: "image not found" })
        return
    }

    const imageData = await db_models.ImageModel.findByIdAndDelete({ _id: imageId, ownerId: userId })
    await db_models.UserModel.updateOne({ _id: userId }, { $pull: { UserImages: imageData.value?.id } })

	try {
		
    	await fs.rm(`${tmpFiles}/save/${userId}/${imageData.value?.imageHash}`)
    }
    catch ( e ){
    	resp.json({message:"error on delete image"});
    	console.error(`[ERR] error on delete image file`);
    }

    resp.json({
        message: "remove image", data: {
            imageName: imageData.value?.imageName
        }
    })
}

async function fullImageGet(req: Request, resp: Response) {

    const userId = req.params.id;
    const imageId = req.params.imgId;

    let hasImage;
    try {
        hasImage = await db_models.ImageModel.exists({ _id: imageId, ownerId: userId })
        console.log(hasImage);
    } catch (error) {
        resp.json({ message: "image not found" })
        return
    }

    if (!hasImage) {
        resp.json({ message: "image not found" })
        return
    }

    const imageData = await db_models.ImageModel.find({ _id: imageId, ownerId: userId })
	console.log(`get full image data. image ${imageData[0]?.imageOrgName}`)

    resp.json({
        ...imageData
    })
}

async function imageEdit(req: Request, resp: Response) {

    const imageId = req.params.imgId
    const valData = Object.assign(ImageSchemeEdit.validate(req.body))

    console.log(valData);
    

    if (valData.error) {
        resp.status(400);
        console.log(`[ERR] on edit image data \n ${valData.error.message}`);
        resp.json({ message: "error on edit image" });
        return
    }

    const hasImage = await db_models.ImageModel.exists({ _id: imageId });
    
    if (!hasImage) {
        resp.status(400)
        resp.json({ message: "image not found" })
        return
    }

    const updatedData = Object.keys(valData.value).filter(el => valData.value[el]).reduce((s, a) => ({...s, [a]: valData.value[a],}), {});
    console.log(updatedData);

    await db_models.ImageModel.findByIdAndUpdate(imageId, {
        $set: updatedData
    })
	console.log(`edit image ${valData.value.imageName}`)
    resp.json({
        message: "update image data",
        data: {
            imageName: valData.value.imageName,
            imageTags: valData.value.imageTags,
            isFavotite: valData.value.isFavorite
        }
    })
}


async function getImageFile( req: Request, resp: Response ) {


    const imageId = req.params.imgId;
    const imageDB = await db_models.ImageModel.findById(imageId).catch(err => {
        resp.json({message: "image not found"}).status(404)
    });

    console.log(req.body);
    
    
    const imagePath = path.resolve(`uploads/save/${imageDB?.ownerId}/${imageDB?.imageHash}`)
    const tmpPath = path.resolve(`uploads/tmp`)

    try {
    	await fs.copyFile(imagePath, `${tmpPath}/${imageDB?.imageOrgName}`)
    }
    catch(e){
    	resp.json({message: "error on download image"}).status(505)
    	return
    }

    console.log(`[LOG] send image for user ${imageDB?.ownerId}`);
    
	console.log(`get image[file] ${imageDB?.imageOrgName}`)
    resp.sendFile(`${tmpPath}/${imageDB?.imageOrgName}`)
    fs.rm(`${tmpPath}/${imageDB?.imageOrgName}`)

}

export { imageGet, imagePost, imageDelete, fullImageGet, imageEdit, getImageFile}
