import { Router } from "express"
import { login, perfil, auth, admin, getAllAdmin } from "../controllers/auth.Controller"
import { authToken } from "../middlewares/AuthToken"
import { isAdmin } from "../middlewares/checkRole"



const router = Router()


router.post("/api/auth", auth)

router.post("/api/login", login)

router.get("/api/perfil", authToken, perfil)

router.get("/api/admin", authToken, getAllAdmin)

// router.get("/api/clientes", authToken, IsTrainning("trainnig"), clientes)






export default router