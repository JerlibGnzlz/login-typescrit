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
const app = (0, express_1.default)();
exports.app = app;
// ─── Pueerto ─────────────────────────────────────────────────────────────────
app.set("port", 8000);
// ─── Middelware ──────────────────────────────────────────────────────────────
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// ─── Rutas ───────────────────────────────────────────────────────────────────
app.use(auth_Routes_1.default);
//# sourceMappingURL=app.js.map