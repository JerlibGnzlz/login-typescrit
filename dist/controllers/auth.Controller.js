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
exports.admin = exports.perfil = exports.login = exports.auth = void 0;
const UserModels_1 = require("../models/UserModels");
const bcrypt_1 = require("../helpers/bcrypt");
const token_1 = require("../helpers/token");
// import { checkRoleMiddleware } from '../middlewares/checkRole';
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const dominiosPermitidos = ['gmail.com', 'hotmail.com', "yahoo.com", "yahoo.es", "outlook.com", "outlook.es"];
    const dominiosPermitidosRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@(${dominiosPermitidos.join('|')})$`, 'i');
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;
    const number = /[0-9]/;
    const { nombre, email, password, role } = req.body;
    try {
        if (!nombre || !password) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }
        if (nombre.match(number)) {
            return res.status(400).json({ message: "Debes colocar un nombre valido" });
        }
        if (nombre.length < 3) {
            return res.status(400).json({ message: "Debes colocar un nombre mayor a 3 caracteres " });
        }
        if (!email) {
            return res.status(400).json({ message: 'Debe ingresar un correo' });
        }
        if (!emailRegex.test(email) || !dominiosPermitidosRegex.test(email)) {
            return res.status(400).json({ message: 'El correo electrónico no es válido' });
        }
        if (!regexPassword.test(password)) {
            return res.status(400).json({ message: 'La contraseña debe contener al menos 8 caracteres incluyendo: mayúsculas, minúsculas, números y caracteres especiales ( @, $, !, %, *, ?, _ , - o &.)' });
        }
        const existeUsuario = yield UserModels_1.userModel.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ message: "El usuario ya existe", existeUsuario });
        }
        const encriptado = yield (0, bcrypt_1.passwordHashado)(password);
        const nuevoUsuario = new UserModels_1.userModel({
            nombre,
            email,
            password: encriptado,
            role
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
    try {
        const roleUser = yield UserModels_1.userModel.find(req.usuarioId, { password: 0 });
        if (!roleUser)
            return res.status(404).json({ message: "No se encontro el pefil" });
        res.status(200).json({ message: "Perfil del usuario", roleUser });
    }
    catch (error) {
        console.log(error);
    }
});
exports.perfil = perfil;
// Ruta protegida que solo los usuarios con rol de 'admin' pueden acceder.
const admin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleAdmin = yield UserModels_1.userModel.find({ role: 'admin' });
        if (!roleAdmin)
            return res.status(500).json({ message: 'No se encontro el administrador' });
        res.status(200).json({ message: "Perfil del Administradores", roleAdmin });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.admin = admin;
//# sourceMappingURL=auth.Controller.js.map