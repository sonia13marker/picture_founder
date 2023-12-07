"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const auth_1 = __importDefault(require("./auth"));
const authUser_1 = __importDefault(require("../middlewar/authUser"));
const route = (0, express_1.Router)();
console.log("use api");
route.use("/user", authUser_1.default, user_1.default);
route.use("/auth", (0, express_1.urlencoded)({ extended: false }), auth_1.default);
exports.default = route;
