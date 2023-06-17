import { Router } from "express"
import { login, perfil, auth } from "../controllers/auth.Controller"
import { authToken } from "../middlewares/AuthToken"


const router = Router()


router.post("/api/auth", auth)

router.post("/api/login", login)

router.get("/api/perfil", authToken, perfil)




export default router