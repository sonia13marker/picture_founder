import { db_models } from "../../../db"
import { filterEnum } from "../dto/FilterImageDto";
import * as cry from "crypto"
import { ImageData, ImageDataDB, ImageDataFile, ImageDataUpdate, ImageTags } from "../../../dto/ImageDataDto";
import { pathResolve } from "../../../dto/PathResolve"
import { join } from "path";
import { copyFile, rename, rm } from "fs/promises"
import { existsSync } from "fs";
import { createReadStream } from "node:fs"
import { CustomError } from "../../../exceptions/ExampleError";
import { ImageNotFoundError, ImageSendError, NoUserDataError, UserImageExistError, UserUpdateError } from "../../../exceptions/ImageExceptions";
import { DataBaseError, FileNotFoundException, ImageError } from "../../../exceptions/ServerExceptions";
import { NotFoundAnyDataInUser } from "../../../exceptions/UserExceptions";
import { MyError, MyLogService } from "../../../utils/CustomLog";
import { Response } from "express"

export async function GetUserImages(userId: string, isFavorite: boolean = false, offset: number = 20, filter: filterEnum): Promise<ImageData[] | []> {


    //пока по умолчанию сортировка будет по возрастанию
    //позже будет 2 метода для просто получения и для получения с фильтром
    const userData: any = await db_models.UserModel
        .findById(userId)
        .populate({
            path: "userImages",
            options: {
                skip: offset,
                limit: 20,
                sort: {
                    createdAt: filterEnum[filter],
                },
            },
            // match: {
            //     isFavorite: isFavorite 
            // }
        })
        .exec()
        .catch((err: CustomError) => {
            throw new Error("ERR on filter")
        })

    if (!userData) {
        throw new NoUserDataError()
    }

    MyLogService(`user ${userId} get image data`)
    if (isFavorite) {

        return userData.userImages.filter((val: ImageData) => val.isFavorite)
    }
    return userData.userImages.length > 0 ? userData.userImages : []
}

//добавление изображения
export async function AddImage(userId: string, image: ImageDataFile, imageData: ImageDataUpdate): Promise<ImageData> {

    //создаю хэш сумму изображения
    const hashedFile = cry.createHash("sha256").update(image.originalname).digest("hex");

    //проверяю, есть ли такое изображение у пользователя
    const hashImage = await db_models.ImageModel.exists({ ownerId: userId, imageHash: hashedFile })
    MyLogService(`${hashImage?._id} || ${hashedFile}`);

    if (hashImage) {
        throw new UserImageExistError()//оштбка при существующем изображении
    }

    //добавляю в базу данных новое изображение
    MyLogService("add new image data");
    const createdImage = await db_models.ImageModel.create({
        imageOrgName: image.originalname,
        imageName: imageData.imageName,
        imageHash: hashedFile,
        imageTags: imageData.imageTags,
        ownerId: userId,
        isFavorite: imageData.isFavorite,
        ext: image.mimetype.split("/")[1]
    })

    //обновляю пользовательские данные
    MyLogService("update user data");
    MyLogService(createdImage._id);

    await db_models.UserModel.updateOne({ _id: userId }, { $push: { userImages: createdImage._id } })



    //переношу изображение из временного хранилише в пользовательское
    rename(join(pathResolve.UserImageUploadDir(), String(image.originalname)), join(pathResolve.UserImageSaveDir(userId), hashedFile))
        .catch((err: CustomError) => {
            throw new ImageError("error on rename")
        })

    return createdImage
}

export async function RemoveImage(imageId: string, userId: string): Promise<void> {

    const findImage = await db_models.ImageModel.findById({ _id: imageId, ownerId: userId })

    MyLogService(JSON.stringify(findImage));
    if (!findImage) {
        throw new FileNotFoundException("image not found");
    }

    await db_models.ImageModel.deleteOne({ _id: imageId, ownerId: userId })
    await db_models.UserModel.updateOne({ _id: userId }, { $pull: { userImages: imageId } });
    await rm(join(pathResolve.UserImageSaveDir(userId), String(findImage!.imageHash)))
        .catch((err: CustomError) => {
            throw new ImageError(err.message);
        })
}

export async function FullImageGet(userId: string, imageId: string): Promise<ImageData> {

    const imageData: ImageData[] = await db_models.ImageModel.find({ _id: imageId, ownerId: userId })
        .catch((err: CustomError) => {
            throw new NoUserDataError(err.message);
        })

    MyLogService(`get full image data. image ${imageData[0]?.imageOrgName}`);
    return imageData[0];
}

export async function ImageEdit(updateData: any | ImageData, imageId: string) {

    const updatedData: any = Object.keys(updateData).filter(el => updateData).reduce((s, a) => ({ ...s, [a]: updateData[a], }), {});

    MyLogService(updatedData);
    // if ( !Object.keys(updateData).length === 0){
    //     throw new CustomError("NOTHING_TO_UPDATE", 102, "nothing update. skip", 204)
    // }

    if (!updatedData.imageTags) {
        delete updatedData.imageTags
    }

    await db_models.ImageModel.findByIdAndUpdate(imageId, {
        $set: updatedData
    })
        .catch((err: CustomError) => {
            throw new UserUpdateError()
        })
    MyLogService(`edit image ${imageId} with name `)
    return updatedData
}


export async function GetImageFile(imageId: string, resp: Response): Promise<void> {


    const imageDB = await db_models.ImageModel.findById(imageId)
        .catch((err: Error) => {
            throw new DataBaseError(err.message);
        });

    if (!imageDB) {
        throw new NoUserDataError("file not exist");
    }

    const toSendImage = join(pathResolve.UserImageUploadDir(), String(imageDB?.imageOrgName))
    const fromSendImage = join(pathResolve.UserImageSaveDir(String(imageDB?.ownerId)), String(imageDB?.imageHash))
    const ext = toSendImage.split(".").at(-1)

    if (!existsSync(fromSendImage)) {
        throw new ImageNotFoundError()
    }

    resp.contentType(`image/${imageDB.ext || ext}`)
    createReadStream(fromSendImage).pipe(resp)

    // copyFile(fromSendImage, toSendImage)
    //     .then(() => {
    //         resp.contentType(`image/${imageDB.ext || ext}`)
    //         createReadStream(toSendImage).pipe(resp)
    //     })
    //     .then(() => {
    //         rm(toSendImage)
    //             .catch(err => {
    //                 MyError("rm image " + err.message)
    //             })
    //     })
    //     .catch((err: CustomError) => {
    //         throw new ImageSendError(err.message)
    //     })

    MyLogService(`[LOG] send image for user ${imageDB?.ownerId}`);
    MyLogService(`get image[file] ${imageDB?.imageOrgName}`);
    // return toSendImage

}


export async function SearchQueryImage(userId: string, stringQuery: string): Promise<ImageData[]> {
    const userImages = await db_models.ImageModel.find({ ownerId: userId })
        .catch((err: CustomError) => {
            throw new NotFoundAnyDataInUser(err.message)
        })

    return userImages.filter(img => {
        return img.imageName.includes(stringQuery) || img.imageTags.find(tag => tag.includes(stringQuery))
    })
}

type sendImage = {
    ext: string,
    path: string
}
export async function ImageDownload(imageId: string): Promise<sendImage> {
    const image = await db_models.ImageModel.findById(imageId).catch((err: CustomError) => {
        throw new ImageNotFoundError();
    })

    MyLogService("send image file")
    return {
        ext: image!.ext || "jpeg",
        path: join(pathResolve.UserImageSaveDir(String(image?.ownerId)), String(image?.imageHash))
    }
}