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
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
const db_1 = require("../../db");
const env_1 = require("../../env");
const joi_1 = __importDefault(require("joi"));
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const route = (0, express_1.Router)();
const UserInScheme = joi_1.default.object({
    UserEmail: joi_1.default.string().min(6).required(),
    UserPassword: joi_1.default.string().min(8).required()
});
console.log("use auth route");
route.post("/login", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const userReq = UserInScheme.validate(req.body);
    console.log(`valid data: ${userReq.value}`);
    if (userReq.error) {
        resp.status(400);
        resp.json({ message: "non valide data" });
        console.log(userReq.error.message);
        return;
    }
    try {
        const hasUser = db_1.db_models.UserModel.exists({ UserEmail: userReq.value.UserEmail });
        if (!hasUser) {
            resp.status(404);
            resp.json({ message: "user not found" });
            return;
        }
    }
    catch (error) {
        resp.json({ message: "some error" }).status(404);
    }
    const hasUser = db_1.db_models.UserModel.exists({ UserEmail: userReq.value.UserEmail });
    if (!hasUser) {
        resp.status(404);
        resp.json({ message: "user not found" });
        return;
    }
    const userDb = yield db_1.db_models.UserModel.find({ UserEmail: userReq.value.UserEmail });
    const passHash = crypto_1.default.createHash("sha256").update(userReq.value.UserPassword).digest("hex");
    if (passHash !== userDb[0].UserPassword) {
        resp.status(404);
        resp.json({ message: "non valid password" });
        return;
    }
    const token = (0, jsonwebtoken_1.sign)({ id: userDb[0]._id, email: userDb[0].UserEmail }, env_1.env.TOKEN_SECRET, { expiresIn: "1d" });
    resp.status(200).json({
        message: "login success",
        token: token,
        userId: userDb[0]._id
    });
    console.log(`[LOG] user ${userDb[0].id} is login`);
}));
route.post("/regis", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Try create user");
    let ValidateData = UserInScheme.validate(req.body);
    const userData = ValidateData.value;
    const hasUser = yield db_1.db_models.UserModel.exists({ UserEmail: userData.UserEmail });
    const tmpFiles = "uploads";
    console.log(req.body);
    console.log(ValidateData.value);
    if (ValidateData.error) {
        resp.status(400);
        resp.json({ message: "non valide data" });
        console.log(ValidateData.error.message);
        return;
    }
    if (hasUser) {
        resp.status(400);
        resp.json({ message: "user is exist" });
        console.log("[ERR] try create exist user");
        return;
    }
    const hash = crypto_1.default.createHash('sha256');
    hash.update(ValidateData.value.UserPassword);
    userData.UserPassword = hash.digest('hex');
    let dbUser = yield db_1.db_models.UserModel.create(userData);
    yield fs_1.default.promises.mkdir(`${tmpFiles}/save/${dbUser._id}`, { recursive: true });
    //console.log(newUserData);
    resp.json({ message: "complete user create", data: { "UserID": dbUser.id, "UserEmail": dbUser.UserName } });
}));
route.post("/logout", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.default = route;
