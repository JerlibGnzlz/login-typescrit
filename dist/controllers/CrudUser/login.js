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
exports.login = void 0;
const UserModels_1 = require("../../models/UserModels");
const bcrypt_1 = require("../../helpers/bcrypt");
const token_1 = require("../../helpers/token");
const login_1 = require("../../validations/login");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = req.body;
    try {
        const validation = yield (0, login_1.validateLogin)(usuario);
        if (!validation.email) {
            return res.status(400).json({ message: 'Debe ingresar un correo' });
        }
        if (!validation.password) {
            return res.status(400).json({ message: 'Debe ingresar un password' });
        }
        const existeUsuario = yield UserModels_1.userModel.findOne({ email: validation.email });
        if (!existeUsuario) {
            return res.status(401).json({ message: "Esta cuenta no esta registrada" });
        }
        const passwordEncriptado = existeUsuario.password;
        const claveCorrecta = yield (0, bcrypt_1.passwordCorrecto)(validation.password, passwordEncriptado);
        if (claveCorrecta) {
            const token = yield (0, token_1.generarToken)(existeUsuario.email);
            const info = {
                token,
                usuario: existeUsuario
            };
            res.status(200).json({ message: "Session y token valido ", info });
        }
        else {
            res.status(403).json({ message: "Clave invalida intenta una vez mas" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }
});
exports.login = login;
//# sourceMappingURL=login.js.map