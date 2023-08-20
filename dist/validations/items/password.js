"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationPassword = void 0;
const regex_1 = require("../../utils/regex");
const validationPassword = (password) => {
    if (!regex_1.regexPassword.test(password)) {
        throw Error('La contraseña debe tener 8 caracteres incluyendo: Mayuscula, minuscula, numero y un caracter especial(@, $, !, %, *, ?, _ , -, &)');
    }
    return password;
};
exports.validationPassword = validationPassword;
//# sourceMappingURL=password.js.map