"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getClient_1 = require("../controllers/getCient/getClient");
const AuthToken_1 = require("../middlewares/AuthToken");
const checkRole_1 = require("../middlewares/checkRole");
const auth_1 = require("../controllers/CrudUser/auth");
const login_1 = require("../controllers/CrudUser/login");
const allAdmin_1 = require("../controllers/getAdmin/allAdmin");
const router = (0, express_1.Router)();
// ─── Registrar Usuario ───────────────────────────────────────────────────────
router.post("/api/auth", auth_1.auth);
// ─── Loguear Usuario ─────────────────────────────────────────────────────────
router.post("/api/login", login_1.login);
// ─── Obtener Todos ROLES Admin ─────────────────────────────────────────
router.get("/api/admin", checkRole_1.isAdmin, AuthToken_1.authToken, allAdmin_1.getAllAdmin);
router.get("/api/client", AuthToken_1.authToken, getClient_1.client);
exports.default = router;
//# sourceMappingURL=auth.Routes.js.map