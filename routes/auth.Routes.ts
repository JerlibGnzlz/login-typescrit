import { Router } from "express"
import { login, perfil, auth, admin } from "../controllers/auth.Controller"
import { authToken } from "../middlewares/AuthToken"
import { checkRoleMiddleware } from "../middlewares/checkRole"



const router = Router()


router.post("/api/auth", auth)

router.post("/api/login", login)

router.get("/api/perfil", authToken, perfil)

router.get("/admin", authToken, checkRoleMiddleware("admin"), admin)





export default router