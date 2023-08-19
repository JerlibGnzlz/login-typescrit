"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        require: true,
        lowercase: true
    },
    email: {
        type: String,
        require: [true, "Ingresa un email"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        require: [true, "Ingresa  password"],
    },
    confirmarPassword: {
        type: String,
        require: [true, "Confirmar el password"],
    },
    role: {
        type: String,
        enum: ["admin", "client", "trainig"],
        default: 'admin',
    },
}, {
    versionKey: false,
    timestamps: true
});
exports.userModel = (0, mongoose_1.model)("user", userSchema);
//# sourceMappingURL=UserModels.js.map