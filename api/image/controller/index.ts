import { Request, Response } from "express"
import { ImageScheme, ImageSchemeEdit, imagesGetScheme } from "../dto/DataValidateDto";
import { AddImage, FullImageGet, GetImageFile, GetUserImages, ImageEdit, RemoveImage } from "../service";
import { CustomError } from "../../../exceptions/ExampleError";
import { UserGetImageData } from "../dto/UserDto";


export async function GetImage(req: Request, resp: Response) {

    const needData = imagesGetScheme.validate(req.query);
    const userId = req.params.id

    if (needData.error) {
        resp.json({ message: "invalid data" })
        return
    }
    console.log(needData.value);
    
    GetUserImages(userId, needData.value.isFavorite || false, needData.value.offset, needData.value.filters)
    .then( ( result: UserGetImageData) => {
        resp.json(result)
    })
    .catch( (err: CustomError) => {
        resp.json(err)
    })
}


export async function ImagePost(req: Request, resp: Response) {

    //получаю параметры изображения и id пользователя
    const userId = req.params.id
    const reqData = ImageScheme.validate(req.body)
    const imageData = <Express.Multer.File>req.file;

    // проверяю есть ли ошибки при валидации данных
    if (reqData.error) {
        console.error(`[ERROR] error on upload new image \n ${reqData.error}`);
        resp.status(400);
        resp.json({ message: `[ERROR] error on upload new image \n ${reqData.error}` })
        return
    }

    //проверяю есть ли изображение
    if (!imageData) {
        console.error(`[ERROR] error on upload is empty | userid ${userId}`);
        resp.status(400);
        resp.json({ message: `[ERROR] error on upload is empty | userid ${userId}` })
        return
    }

    if ( !Array.isArray( reqData.value.imageTags ) ){
        reqData.value.imageTags  = [reqData.value.imageTags]
    }

   AddImage(userId, imageData, reqData.value)
   .then((result) => {
    resp.json({result})
   })
   .catch( (err: CustomError) =>{
    resp.json(err.message)
    console.log("err on add");
    
   })
}

export async function imageDelete(req: Request, resp: Response) {

    const userId = req.params.id;
    const imageId = req.params.imgId;

    RemoveImage(imageId, userId)
    .then(() => {
        resp.json({code: 204, message: "image delete"})
    } )
    .catch( ( err: CustomError ) => {
        resp.json({code: err.statusCode, message: err.message, detail: err.detail});
    })
}

export async function fullImageGet(req: Request, resp: Response) {

    const userId = req.params.id;
    const imageId = req.params.imgId;

    FullImageGet(userId, imageId)
    .then(( data ) => {
        resp.json(data)
    })
    .catch( ( err: CustomError ) => {
        resp.json({code: err.statusCode, message: err.message, detail: err.detail});
    })

}

export async function imageEdit(req: Request, resp: Response) {

    const imageId = req.params.imgId
    const data = ImageSchemeEdit.validate(req.body).value
    const err = ImageSchemeEdit.validate(req.body).error
    
    if ( !Array.isArray( data.imageTags ) && data.imageTags ){
        data.imageTags  = [data.imageTags]
    }

    if ( err ){
        resp.json({code: 404, message: err.message, detail: ""})
        return
    }
    const valData = Object.assign(data)

    console.log("val DATA: " + JSON.stringify(valData));
    
    ImageEdit(valData, imageId)
    .then(() => {
        resp.json({code: 204, message: "image data updated"});
    })
    .catch( (err: CustomError) => {
        resp.json({code: err.statusCode, message: err.message, detail: err.detail});
    })
}

export async function getImageFile(req: Request, resp: Response) {


    const imageId = req.params.imgId;
    GetImageFile(imageId)
    .then(( val ) => {
        resp.sendFile(val)
    })
    .catch( ( err: CustomError) => {
        resp.json({code: err.statusCode, message: err.message, detail: err.detail});
    })

}

