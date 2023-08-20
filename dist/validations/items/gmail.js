"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationEmail = void 0;
const regex_1 = require("../../utils/regex");
const validationEmail = (gmail) => {
    if (!gmail) {
        throw Error('Debe ingresar un correo');
    }
    if (!regex_1.emailRegex.test(gmail) || !regex_1.dominiosPermitidosRegex.test(gmail)) {
        throw Error('Correo invalido');
    }
    return gmail;
};
exports.validationEmail = validationEmail;
//# sourceMappingURL=gmail.js.map