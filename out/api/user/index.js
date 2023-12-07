"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = require("express");
const db_1 = require("../../db");
const imageRoute = __importStar(require("./image"));
const joi_1 = __importDefault(require("joi"));
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const hasUser_1 = require("../../middlewar/hasUser");
const route = (0, express_1.Router)();
const tmpFiles = "uploads";
const stConf = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/tmp");
    },
    filename(req, file, callback) {
        callback(null, file.originalname);
    }
});
const UserInScheme = joi_1.default.object({
    UserPassword: joi_1.default.string().min(8).required()
});
route.get("/:id", hasUser_1.hasUser, (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const getUser = yield db_1.db_models.UserModel.findById(userId);
    resp.json({
        "UserID": getUser === null || getUser === void 0 ? void 0 : getUser.id,
        "UserName": getUser === null || getUser === void 0 ? void 0 : getUser.UserName,
        "UserEmail": getUser === null || getUser === void 0 ? void 0 : getUser.UserEmail,
        "ImageCount": getUser === null || getUser === void 0 ? void 0 : getUser.UserImages.length
    });
}));
route.delete("/:id", hasUser_1.hasUser, (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const userDb = yield db_1.db_models.UserModel.findByIdAndDelete(userId);
    const imageDb = yield db_1.db_models.ImageModel.deleteMany({ ownerId: userId });
    fs_1.default.promises.rm(`uploads/save/${userId}`, { recursive: true });
    console.log(`user ${userId} is deleted`);
    resp.json({ message: "user deleted" });
}));
route.put("/:id", hasUser_1.hasUser, (0, express_1.urlencoded)({ extended: false }), (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    let ValidateData = UserInScheme.validate(req.body);
    if (ValidateData.error) {
        resp.status(400);
        resp.json({ message: "wrong pasword" });
        console.log(ValidateData.error.message);
        return;
    }
    try {
        const userDb = yield db_1.db_models.UserModel.findById(userId);
        const hash = crypto_1.default.createHash('sha256');
        hash.update(ValidateData.value.UserPassword);
        const NewUserPassword = hash.digest('hex');
        if (NewUserPassword === (userDb === null || userDb === void 0 ? void 0 : userDb.UserPassword)) {
            resp.status(409);
            resp.json({ message: "wrong password" });
            console.log("[ERR] edit same password");
            return;
        }
        yield (userDb === null || userDb === void 0 ? void 0 : userDb.updateOne({
            $set: {
                UserPassword: NewUserPassword
            }
        }));
        resp.json({
            messgae: "data updated"
        });
    }
    catch (error) {
        resp.json({
            message: "error on edit data"
        });
    }
}));
route.get("/:id/stat", hasUser_1.hasUser, (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const userDB = yield db_1.db_models.UserModel.findById(userId);
    resp.json({
        stat: Object.assign({}, userDB === null || userDB === void 0 ? void 0 : userDB.UserStat)
    });
}));
route.get("/:id/image", hasUser_1.hasUser, imageRoute.imageGet);
route.post("/:id/image", hasUser_1.hasUser, (0, express_1.urlencoded)({ extended: false }), (0, multer_1.default)({ storage: stConf }).single("image"), imageRoute.imagePost);
route.delete("/:id/image/:imgId", hasUser_1.hasUser, imageRoute.imageDelete);
route.get("/:id/image/:imgId", hasUser_1.hasUser, imageRoute.getImageFile);
route.get("/:id/image/data/:imgId/", hasUser_1.hasUser, imageRoute.fullImageGet);
route.put("/:id/image/:imgId", (0, express_1.urlencoded)({ extended: false }), hasUser_1.hasUser, imageRoute.imageEdit);
exports.default = route;
