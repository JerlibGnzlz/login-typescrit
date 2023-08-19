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
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = "admin";
        const { userRole } = req.query;
        if (!userRole) {
            return res.status(400).json({ message: 'El rol de Admin es requerido.' });
        }
        if (role !== userRole) {
            return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta.' });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
});
exports.isAdmin = isAdmin;
//# sourceMappingURL=checkRole.js.map