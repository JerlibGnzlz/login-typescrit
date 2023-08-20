"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const auth_Routes_1 = __importDefault(require("./routes/auth.Routes"));
const morgan_1 = __importDefault(require("morgan"));
// ─── Settinng ────────────────────────────────────────────────────────────────
exports.app = (0, express_1.default)();
// ─── Puerto ─────────────────────────────────────────────────────────────────
exports.app.set("port", 8000);
// ─── Middelware ──────────────────────────────────────────────────────────────
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
// ─── Rutas ───────────────────────────────────────────────────────────────────
exports.app.use(auth_Routes_1.default);
//# sourceMappingURL=app.js.map