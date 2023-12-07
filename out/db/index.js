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
exports.db_models = exports.ConnectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./models/user"));
const image_1 = __importDefault(require("./models/image"));
const process_1 = require("process");
function ConnectDB(db_ip) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("try to connect to db");
            let conn = yield mongoose_1.default.connect(`mongodb://${db_ip}:27017/picture_founder`);
            let connStatus = conn.connection.readyState;
            if (connStatus) {
                console.log("DB is connected");
            }
        }
        catch (e) {
            console.log("error on connetc to db");
            (0, process_1.exit)(0);
        }
    });
}
exports.ConnectDB = ConnectDB;
const db_models = {
    UserModel: user_1.default,
    ImageModel: image_1.default
};
exports.db_models = db_models;
