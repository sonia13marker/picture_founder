"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const statScheme = new mongoose_1.Schema({
    name: { type: String, require: true },
    count: { type: Number, require: true },
    description: { type: String, require: true }
});
const UserScheme = new mongoose_1.Schema({
    UserName: { type: String, require: true },
    UserEmail: { type: String, require: true },
    UserImages: [{ type: mongoose_1.Schema.ObjectId, ref: "Image" }],
    UserPassword: { type: String, require: true },
    UserStat: [{ type: statScheme, require: true }]
}, { timestamps: true });
const User = (0, mongoose_1.model)("User", UserScheme);
exports.default = User;
