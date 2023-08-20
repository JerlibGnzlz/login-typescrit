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
exports.client = void 0;
const UserModels_1 = require("../../models/UserModels");
const client = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.usuario.role !== "client") {
            return res.status(401).json({ message: 'No estas autorizado' });
        }
        const roleClient = yield UserModels_1.userModel.find({ role: "client" });
        if (!roleClient)
            return res.status(404).json({ message: 'No estas autorizado' });
        res.status(200).json({ message: "Perfil del usuario", roleClient });
    }
    catch (error) {
        console.log(error);
    }
});
exports.client = client;
//# sourceMappingURL=getClient.js.map