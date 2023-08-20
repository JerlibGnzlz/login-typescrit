"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationFullName = void 0;
const regex_1 = require("../../utils/regex");
const validationFullName = (name) => {
    if (!name.match(regex_1.fullName)) {
        throw Error("Debe ingresar un nombre completo");
    }
    return name;
};
exports.validationFullName = validationFullName;
//# sourceMappingURL=name.js.map