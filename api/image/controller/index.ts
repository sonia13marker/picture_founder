import { Request, Response } from "express"
import { ImageScheme, ImageSchemeEdit, imagesGetScheme } from "../dto/DataValidateDto";
import { AddImage, FullImageGet, GetImageFile, GetUserImages, ImageDownload, ImageEdit, RemoveImage, SearchQueryImage } from "../service";
import { CustomError } from "../../../exceptions/ExampleError";
import { UserErrorType } from "../../../exceptions/UserExceptions";
import { ImageData } from "../../../dto/ImageDataDto";
import { MyError, MyLogController } from "../../../utils/CustomLog";


export async function GetImage(req: Request, resp: Response) {

    const needData = imagesGetScheme.validate(req.query);
    const userId = req.params.id

    if (needData.error) {
        resp.statusCode = 400
        resp.json({ code: 401, message: "invalid data", detail: "" })
        MyError(`inavalide date when get image`);
        return
    }
    MyLogController(JSON.stringify(needData.value));

    GetUserImages(userId, needData.value.isFavorite || false, needData.value.offset, needData.value.filter)
        .then((result: ImageData[]) => {
            resp.json(result)
        })
        .catch((err: CustomError) => {
            resp.statusCode = err.statusCode;
            resp.json({ code: err.code, message: err.message, detail: err.detail });
        })
}


export async function ImagePost(req: Request, resp: Response) {

    //получаю параметры изображения и id пользователя
    const userId = req.params.id
    const reqData = ImageScheme.validate(req.body)
    const imageData = <Express.Multer.File>req.file;

    // проверяю есть ли ошибки при валидации данных
    if (reqData.error) {
        resp.statusCode = 400
        MyError(`[ERROR] error on upload new image \n ${reqData.error}`);

        resp.json({
            code: UserErrorType.VALIDATE_ERROR,
            message: `[ERROR] error on upload new image \n ${reqData.error}`,
            detail: ""
        })
        return
    }

    //проверяю есть ли изображение
    if (!imageData) {
        MyError(`[ERROR] error on upload is empty | userid ${userId}`);
        
        resp.statusCode = 400
        resp.json({
            code: UserErrorType.VALIDATE_ERROR,
            message: `[ERROR] error on upload is empty | userid ${userId}`,
            detail: ""
        })
        return
    }

    if (!Array.isArray(reqData.value.imageTags)) {
        reqData.value.imageTags = [reqData.value.imageTags]
    }

    AddImage(userId, imageData, reqData.value)
        .then((result) => {
            resp.json({ result })
        })
        .catch((err: CustomError) => {
            resp.statusCode = err.statusCode
            resp.json({ code: err.code, message: err.message, detail: err.detail })
            MyLogController("err on add");

        })
}

export async function imageDelete(req: Request, resp: Response) {

    const userId = req.params.id;
    const imageId = req.params.imgId;

    RemoveImage(imageId, userId)
        .then(() => {
            resp.json({ code: 204, message: "image delete" })
        })
        .catch((err: CustomError) => {
            resp.statusCode = err.statusCode
            resp.json({code: err.code, message: err.message, detail: err.detail})
        })
}

export async function fullImageGet(req: Request, resp: Response) {

    const userId = req.params.id;
    const imageId = req.params.imgId;

    FullImageGet(userId, imageId)
        .then((data) => {
            resp.json(data)
        })
        .catch((err: CustomError) => {
            resp.statusCode = err.statusCode
            resp.json({code: err.code, message: err.message, detail: err.detail})
        })

}

export async function imageEdit(req: Request, resp: Response) {

    const imageId = req.params.imgId
    const data = ImageSchemeEdit.validate(req.body).value
    const err = ImageSchemeEdit.validate(req.body).error

    if (!Array.isArray(data.imageTags) && data.imageTags) {
        data.imageTags = [data.imageTags]
    }

    if (err) {
        resp.statusCode = 400
        resp.json({
            code: UserErrorType.VALIDATE_ERROR,
            message: err.message,
            detail: ""
        })
        return
    }
    const valData = Object.assign(data)

    MyLogController("val DATA: " + JSON.stringify(valData));

    ImageEdit(valData, imageId)
        .then(() => {
            resp.json({ code: 204, message: "image data updated" }).status(204);
        })
        .catch((err: CustomError) => {
            resp.statusCode = err.statusCode
            resp.json({code: err.code, message: err.message, detail: err.detail})
        })
}

export async function getImageFile(req: Request, resp: Response) {


    const imageId = req.params.imgId;
    GetImageFile(imageId, resp)
        // .then(() => {
        //     resp.sendFile(val)
        // })
        .catch((err: CustomError) => {
            resp.statusCode = err.statusCode || 500
            resp.json({code: err.code, message: err.message, detail: err.detail})
        })

}

export async function SearchQuery(req: Request, resp: Response) {

    const userId = req.params.id
    const searchString = <string>req.query.searchQuery

    if (!userId) {
        resp.statusCode = 400
        resp.json({
            code: UserErrorType.USER_NOT_FOUND,
            message: `empty user string`,
            detail: ""
        })
    }
    if (!searchString) {
        resp.statusCode = 400
        resp.json({
            code: UserErrorType.VALIDATE_ERROR,
            message: `empty query string`,
            detail: ""
        })
    }

    MyLogController(JSON.stringify(searchString));

    SearchQueryImage(userId, searchString)
        .then((data) => {
            resp.json({ code: 200, data: data })
        })
        .catch((err: CustomError) => {
            resp.statusCode = err.statusCode
            resp.json({code: err.code, message: err.message, detail: err.detail})
        })
}

export async function DownloadImage(req: Request, resp: Response){
    const imageId = req.params.imgId

    MyLogController("get image file")
    ImageDownload(imageId)
    .then( data => {
        resp.download(`${data.path}`)
    })
    .catch( (err: CustomError)=>{
        resp.statusCode = err.statusCode
        resp.json({code: err.code, message: err.message, detail: err.detail})
    })
}