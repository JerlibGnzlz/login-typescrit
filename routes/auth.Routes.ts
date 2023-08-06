import { Router } from "express"
import { login, perfil, auth, admin, clientes } from "../controllers/auth.Controller"
import { authToken } from "../middlewares/AuthToken"
import { checkRoleMiddleware } from "../middlewares/checkRole"



const router = Router()


router.post("/api/auth", auth)

router.post("/api/login", login)

router.get("/api/perfil", authToken, perfil)

router.get("/api/admin", authToken, checkRoleMiddleware("admin"), admin)

router.get("/api/clientes", authToken, checkRoleMiddleware("employed"), clientes)






export default router