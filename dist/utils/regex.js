"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.number = exports.fullName = exports.regexPassword = exports.dominiosPermitidosRegex = exports.dominiosPermitidos = exports.emailRegex = void 0;
exports.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
exports.dominiosPermitidos = ['gmail.com', 'hotmail.com', "yahoo.com", "yahoo.es", "outlook.com", "outlook.es"];
exports.dominiosPermitidosRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@(${exports.dominiosPermitidos.join('|')})$`, 'i');
exports.regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;
exports.fullName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ]{3,}(?:\s|-)[a-zA-ZáéíóúÁÉÍÓÚüÜ]{3,}$/;
exports.number = /[0-9]/;
//# sourceMappingURL=regex.js.map