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
exports.auth = void 0;
const UserModels_1 = require("../../models/UserModels");
const bcrypt_1 = require("../../helpers/bcrypt");
const register_1 = require("../../validations/register");
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = req.body;
    try {
        const validacion = (0, register_1.validateRegister)(usuario);
        const existeUsuario = yield UserModels_1.userModel.findOne({ email: validacion.email });
        if (existeUsuario) {
            return res.status(400).json({ message: "El usuario ya existe", existeUsuario });
        }
        const encriptado = yield (0, bcrypt_1.passwordHashado)(validacion.password);
        const nuevoUsuario = new UserModels_1.userModel({
            role: validacion.role,
            nombre: validacion.nombre,
            email: validacion.email,
            password: encriptado,
        });
        const usuarioGuardado = yield nuevoUsuario.save();
        return res.status(200).json({ message: "Usuario creado", usuarioGuardado });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }
});
exports.auth = auth;
//# sourceMappingURL=auth.js.map