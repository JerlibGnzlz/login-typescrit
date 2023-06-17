"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    }, email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.userModel = (0, mongoose_1.model)("user", userSchema);
//# sourceMappingURL=UserModels.js.map