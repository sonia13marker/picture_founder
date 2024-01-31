import { db_models } from "../../../db"
import { filter } from "../dto/FilterImageDto";
import * as cry from "crypto"
import { ImageData, ImageDataDB, ImageDataFile, ImageDataUpdate, ImageTags } from "../../../dto/ImageDataDto";
import { pathResolve } from "../../../dto/PathResolve"
import { join } from "path";
import { copyFile, rename, rm } from "fs/promises"
import { CustomError } from "../../../exceptions/ExampleError";
import { UserGetImageData } from "../dto/UserDto";


export async function GetUserImages(userId: string, isFavorite: boolean = false, offset: number = 20, filters: filter = 1): Promise<UserGetImageData> {


    //пока по умолчанию сортировка будет по возрастанию
    //позже будет 2 метода для просто получения и для получения с фильтром

    const userData = await db_models.UserModel
        .findById(userId)
        .populate({
            path: "userImages",
            options: {
                skip: offset,
                limit: 20,
                sort: {
                    createdAt: filters
                }
            },
            // match: {
            //     isFavorite: isFavorite 
            // }
        })
        .exec()
        .catch((err) => {
            throw new Error("ERR on filter")
        })

    if (!userData) {
        throw new Error("not user")
    }

    const userImages = userData.userImages as unknown as ImageData[]
    if (isFavorite){
        const filtered  = userImages.filter((val)=>val.isFavorite)
        return { imageCount: filtered!.length, images: filtered }
    }
    return { imageCount: userImages!.length, images: userImages }
}

//добавление изображения
export async function AddImage(userId: string, image: ImageDataFile, imageData: ImageDataUpdate): Promise<ImageData> {

    //создаю хэш сумму изображения
    const hashedFile = cry.createHash("sha256").update(image.originalname).digest("hex");

    //проверяю, есть ли такое изображение у пользователя
    const hashImage = await db_models.ImageModel.exists({ ownerId: userId, imageHash: hashedFile })
    console.log(`${hashImage?._id} || ${hashedFile}`);

    if (hashImage) {
        throw new Error("error | image found")//оштбка при существующем изображении
    }

    //добавляю в базу данных новое изображение
    console.log("add new image data");
    const createdImage = await db_models.ImageModel.create({
        imageOrgName: image.originalname,
        imageName: imageData.imageName,
        imageHash: hashedFile,
        imageTags: imageData.imageTags,
        ownerId: userId,
        isFavorite: imageData.isFavorite
    })

    //обновляю пользовательские данные
    console.log("update user data");
    console.log(createdImage._id);

    await db_models.UserModel.updateOne({ _id: userId }, { $push: { userImages: createdImage._id } })



    //переношу изображение из временного хранилише в пользовательское
    rename(join(pathResolve.UserImageUploadDir(), String(image.originalname)), join(pathResolve.UserImageSaveDir(userId), hashedFile))
        .catch((err: CustomError) => {
            throw new Error("error on rename")
        })

    return createdImage
}

export async function RemoveImage(imageId: string, userId: string): Promise<void> {

    const findImage = await db_models.ImageModel.findById({ _id: imageId, ownerId: userId })

    console.log(JSON.stringify(findImage));
    if (!findImage) {
        throw new Error("image not found");
    }

    await db_models.ImageModel.deleteOne({ _id: imageId, ownerId: userId })
    await db_models.UserModel.updateOne({ _id: userId }, { $pull: { userImages: imageId } });
    rm(join(pathResolve.UserImageSaveDir(userId), String(findImage!.imageHash)))
        .catch((err: CustomError) => {
            throw new Error(err.message);
        })
}

export async function FullImageGet(userId: string, imageId: string): Promise<ImageData> {

    const imageData: ImageData[] = await db_models.ImageModel.find({ _id: imageId, ownerId: userId })
        .catch((err: CustomError) => {
            throw new Error(err.message);
        })

    console.log(`get full image data. image ${imageData[0]?.imageOrgName}`);
    return imageData[0];
}

export async function ImageEdit(updateData: any | ImageData, imageId: string) {

    const updatedData = Object.keys(updateData).filter(el => updateData).reduce((s, a) => ({ ...s, [a]: updateData[a], }), {});
    console.log(updatedData);

    await db_models.ImageModel.findByIdAndUpdate(imageId, {
        $set: updatedData
    })
    console.log(`edit image ${imageId} with name `)
    return updatedData
}


export async function GetImageFile(imageId: string): Promise<string> {


    const imageDB = await db_models.ImageModel.findById(imageId)
        .catch(err => {
            throw new Error("DB error");
        });
   
    if ( !imageDB ){
        throw new Error("file not exist");
    }
    
    const toSendImage = join(pathResolve.UserImageUploadDir(), String(imageDB?.imageOrgName))
    const fromSendImage = join(pathResolve.UserImageSaveDir(String(imageDB?.ownerId)), String(imageDB?.imageHash))
    copyFile(fromSendImage, toSendImage)
        .catch((err: CustomError) => {
            throw new Error(err.message)            
        })

    console.log(`[LOG] send image for user ${imageDB?.ownerId}`);
    console.log(`get image[file] ${imageDB?.imageOrgName}`)
    return toSendImage

}
