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
exports.getAllAdmin = void 0;
const UserModels_1 = require("../../models/UserModels");
const getAllAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.usuario.role !== "admin") {
            return res.status(401).json({ message: 'No estas autorizado' });
        }
        const roleAdmin = yield UserModels_1.userModel.find({ role: 'admin' });
        if (!roleAdmin)
            return res.status(500).json({ message: 'No estas autorizado' });
        res.status(200).json({ message: ` Todos los administradores`, roleAdmin });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getAllAdmin = getAllAdmin;
//# sourceMappingURL=allAdmin.js.map