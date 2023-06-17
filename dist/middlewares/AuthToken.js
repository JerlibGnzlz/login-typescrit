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
exports.authToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModels_1 = require("../models/UserModels");
// interface IPayload {
//     id: string,
//     iat: number,
//     exp: number
// }
const authToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN || "CL@VE");
            const usuarioid = yield UserModels_1.userModel.findOne({ email: payload.id });
            req.usuarioId = usuarioid;
            return next();
        }
        catch (error) {
            return res.status(400).json({ message: "Sesion o token invalido" });
        }
    }
    return next();
});
exports.authToken = authToken;
//# sourceMappingURL=AuthToken.js.map