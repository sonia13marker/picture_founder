"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageFile = exports.imageEdit = exports.fullImageGet = exports.imageDelete = exports.imagePost = exports.imageGet = void 0;
const db_1 = require("../../../db");
const joi_1 = __importDefault(require("joi"));
const crypto_1 = __importDefault(require("crypto"));
const promises_1 = __importDefault(require("fs/promises"));
var filter;
(function (filter) {
    filter[filter["NONE"] = 0] = "NONE";
    filter[filter["UP"] = 1] = "UP";
    filter[filter["DOWN"] = 2] = "DOWN";
})(filter || (filter = {}));
const tmpFiles = "uploads";
const imagesGetScheme = joi_1.default.object({
    filter: joi_1.default.string().valid(...Object.values(filter)).default("NONE"),
    offset: joi_1.default.number().default(0)
});
const ImageScheme = joi_1.default.object({
    imageName: joi_1.default.string().min(2),
    imageTags: joi_1.default.array().items(joi_1.default.string()).required(),
    isFavorite: joi_1.default.boolean().default(false)
});
function imageGet(req, resp) {
    return __awaiter(this, void 0, void 0, function* () {
        const needData = imagesGetScheme.validate(req.query);
        const userId = req.params.id;
        if (needData.error) {
            resp.json({ message: "invalid data" });
            return;
        }
        const userImages = yield db_1.db_models.UserModel.findById(userId).populate({
            path: "UserImages",
            options: { skip: needData.value.offset }
        }).exec();
        const userImagesArray = userImages === null || userImages === void 0 ? void 0 : userImages.UserImages;
        resp.json({
            filter: needData.value.filter,
            offset: needData.value.offset,
            images: userImagesArray
        });
    });
}
exports.imageGet = imageGet;
function imagePost(req, resp) {
    return __awaiter(this, void 0, void 0, function* () {
        //получаю параметры изображения и id пользователя
        const userId = req.params.id;
        const reqData = ImageScheme.validate(req.body);
        const imageData = req.file;
        // проверяю есть ли ошибки при валидации данных
        if (reqData.error) {
            console.error(`[ERROR] error on upload new image \n ${reqData.error.name}`);
            resp.status(400);
            resp.json({ message: `[ERROR] error on upload new image \n ${reqData.error.name}` });
            return;
        }
        //проверяю есть ли изображение
        if (!imageData) {
            console.error(`[ERROR] error on upload is empty | userid ${userId}`);
            resp.status(400);
            resp.json({ message: `[ERROR] error on upload is empty | userid ${userId}` });
            return;
        }
        //создаю хэш сумму изображения
        const HashSumImage = crypto_1.default.createHash("sha256");
        HashSumImage.update(imageData.originalname);
        const hashedFile = HashSumImage.digest("hex");
        //проверяю, есть ли такое изображение у пользователя
        const hasImage = yield db_1.db_models.ImageModel.exists({ imageHash: hashedFile, ownerID: userId });
        if (hasImage) {
            resp.json({ message: "image is uploaded" });
            return;
        }
        //добавляю в базу данных новое изображение
        console.log("add new image data");
        const createdImage = yield db_1.db_models.ImageModel.create({
            imageOrgName: imageData.originalname,
            imageSetName: (reqData.value.imageName || imageData.originalname),
            ownerId: userId,
            imageHash: hashedFile,
            imageSize: imageData.size,
            imageTags: reqData.value.imageTags,
            isFavotite: reqData.value.isFavorite,
            extend: imageData.mimetype.split("/")[1]
        });
        //обновляю пользовательские данные
        console.log("update user data");
        yield db_1.db_models.UserModel.updateOne({ _id: userId }, { $push: { UserImages: createdImage._id } });
        //переношу изображение из временного хранилише в пользовательское
        promises_1.default.rename(`${tmpFiles}/tmp/${imageData.originalname}`, `${tmpFiles}/save/${userId}/${hashedFile}`);
        resp.json({
            message: "image uploaded", data: {
                imageId: createdImage.id,
                imageName: createdImage.imageSetName,
                imageTags: createdImage.imageTags
            }
        });
    });
}
exports.imagePost = imagePost;
function imageDelete(req, resp) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.id;
        const imageId = req.params.imgId;
        let hasImage;
        try {
            hasImage = yield db_1.db_models.ImageModel.exists({ _id: imageId, ownerId: userId });
            console.log(hasImage);
        }
        catch (error) {
            resp.json({ message: "image not found" });
            return;
        }
        if (!hasImage) {
            resp.json({ message: "image not found" });
            return;
        }
        const imageData = yield db_1.db_models.ImageModel.findByIdAndDelete({ _id: imageId, ownerId: userId });
        yield db_1.db_models.UserModel.updateOne({ _id: userId }, { $pull: { UserImages: imageData === null || imageData === void 0 ? void 0 : imageData.id } });
        yield promises_1.default.rm(`${tmpFiles}/save/${userId}/${imageData === null || imageData === void 0 ? void 0 : imageData.imageHash}`);
        resp.json({
            message: "remove image", data: {
                imageName: imageData === null || imageData === void 0 ? void 0 : imageData.imageSetName
            }
        });
    });
}
exports.imageDelete = imageDelete;
function fullImageGet(req, resp) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.id;
        const imageId = req.params.imgId;
        let hasImage;
        try {
            hasImage = yield db_1.db_models.ImageModel.exists({ _id: imageId, ownerId: userId });
            console.log(hasImage);
        }
        catch (error) {
            resp.json({ message: "image not found" });
            return;
        }
        if (!hasImage) {
            resp.json({ message: "image not found" });
            return;
        }
        const imageData = yield db_1.db_models.ImageModel.find({ _id: imageId, ownerId: userId });
        resp.json(Object.assign({}, imageData));
    });
}
exports.fullImageGet = fullImageGet;
function imageEdit(req, resp) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageId = req.params.imgId;
        const valData = ImageScheme.validate(req.body);
        if (valData.error) {
            resp.status(400);
            console.log(`[ERR] on edit image data \n ${valData.error.message}`);
            resp.json({ message: "error on edit image" });
            return;
        }
        const hasImage = yield db_1.db_models.ImageModel.exists({ _id: imageId });
        if (!hasImage) {
            resp.status(400);
            resp.json({ message: "image not found" });
            return;
        }
        yield db_1.db_models.ImageModel.findByIdAndUpdate(imageId, {
            $set: {
                imageSetName: valData.value.imageName,
                imageTags: valData.value.imageTags,
                isFavotite: valData.value.isFavorite
            }
        });
        resp.json({
            message: "update image data",
            data: {
                imageSetName: valData.value.imageName,
                imageTags: valData.value.imageTags,
                isFavotite: valData.value.isFavorite
            }
        });
    });
}
exports.imageEdit = imageEdit;
function getImageFile(req, resp) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = require("path");
        const imageId = req.params.imgId;
        const imageDB = yield db_1.db_models.ImageModel.findById(imageId);
        const imagePath = path.resolve(`uploads/save/${imageDB === null || imageDB === void 0 ? void 0 : imageDB.ownerId}/${imageDB === null || imageDB === void 0 ? void 0 : imageDB.imageHash}`);
        const tmpPath = path.resolve(`uploads/tmp`);
        promises_1.default.copyFile(imagePath, `${tmpPath}/${imageDB === null || imageDB === void 0 ? void 0 : imageDB.imageOrgName}`)
            .catch((rs) => { resp.json({ message: "error on download image" }).status(505); });
        console.log(`[LOG] send image for user ${imageDB === null || imageDB === void 0 ? void 0 : imageDB.ownerId}`);
        resp.sendFile(`${tmpPath}/${imageDB === null || imageDB === void 0 ? void 0 : imageDB.imageOrgName}`);
        promises_1.default.rm(`${tmpPath}/${imageDB === null || imageDB === void 0 ? void 0 : imageDB.imageOrgName}`);
    });
}
exports.getImageFile = getImageFile;
