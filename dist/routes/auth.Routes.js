"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_Controller_1 = require("../controllers/auth.Controller");
const AuthToken_1 = require("../middlewares/AuthToken");
const router = (0, express_1.Router)();
router.post("/api/auth", auth_Controller_1.auth);
router.post("/api/login", auth_Controller_1.login);
router.get("/api/perfil", AuthToken_1.authToken, auth_Controller_1.perfil);
exports.default = router;
//# sourceMappingURL=auth.Routes.js.map