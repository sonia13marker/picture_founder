"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = exports.schema = void 0;
const ts_dotenv_1 = require("ts-dotenv");
const path_1 = require("path");
exports.schema = {
    DB_IP: String,
    PORT: Number,
    TOKEN_SECRET: String
};
let env;
exports.env = env = (0, ts_dotenv_1.load)(exports.schema, {
    path: (0, path_1.resolve)(".env")
});
