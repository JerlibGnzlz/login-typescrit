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
exports.validateLogin = void 0;
const gmail_1 = require("./items/gmail");
const password_1 = require("./items/password");
const UserModels_1 = require("../models/UserModels");
const validateLogin = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.email && !user.password) {
        throw Error("Ambos campos son requerido");
    }
    (0, gmail_1.validationEmail)(user.email);
    const usuario = yield UserModels_1.userModel.find({ email: user.email });
    if (!usuario) {
        throw Error('Esta cuenta no esta registrada');
    }
    (0, password_1.validationPassword)(user.password);
    return user;
});
exports.validateLogin = validateLogin;
//# sourceMappingURL=login.js.map