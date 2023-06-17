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
exports.perfil = exports.login = exports.auth = void 0;
const UserModels_1 = require("../models/UserModels");
const bcrypt_1 = require("../helpers/bcrypt");
const token_1 = require("../helpers/token");
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password } = req.body;
    try {
        if (!nombre || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }
        const existeUsuario = yield UserModels_1.userModel.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ message: "El usuario ya existe", existeUsuario });
        }
        const encriptado = yield (0, bcrypt_1.passwordHashado)(password);
        const nuevoUsuario = new UserModels_1.userModel({
            nombre,
            email,
            password: encriptado
        });
        const usuarioGuardado = yield nuevoUsuario.save();
        res.status(200).json({ message: "Usuario creado", usuarioGuardado });
    }
    catch (error) {
        console.log(error);
    }
});
exports.auth = auth;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existeUsuario = yield UserModels_1.userModel.findOne({ email });
        if (!existeUsuario) {
            return res.status(401).json({ message: "Esta cuenta no esta registrada" });
        }
        const passwordEncriptado = existeUsuario.password;
        const claveCorrecta = yield (0, bcrypt_1.passwordCorrecto)(password, passwordEncriptado);
        if (claveCorrecta) {
            const token = yield (0, token_1.generarToken)(existeUsuario.email);
            const info = {
                token,
                usuario: existeUsuario
            };
            res.status(200).json({ message: "Session y token valido ", info });
        }
        else {
            res.status(403).json({ message: "Clave invalida " });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
const perfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioRegistado = yield UserModels_1.userModel.findOne(req.usuarioId, { password: 0 });
    if (!usuarioRegistado)
        return res.status(404).json({ message: "No se encontro el pefil" });
    res.status(200).json({ message: "Perfil del usuario", usuarioRegistado });
});
exports.perfil = perfil;
//# sourceMappingURL=auth.Controller.js.map