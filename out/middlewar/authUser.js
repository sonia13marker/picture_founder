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
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("../env");
function authUser(req, resp, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authData = req.headers;
        console.log(authData);
        if (!authData.authorization) {
            resp.json({ message: "non autorizate" });
            return;
        }
        (0, jsonwebtoken_1.verify)(authData.authorization.split(' ')[1], env_1.env.TOKEN_SECRET, (err, decode) => {
            if (err) {
                resp.json({ message: "non autorizate" });
                return;
            }
            next();
        });
    });
}
exports.default = authUser;
