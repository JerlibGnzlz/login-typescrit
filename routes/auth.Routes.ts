import { Router } from "express"
import { client } from '../controllers/getCient/getClient';
import { authToken } from "../middlewares/AuthToken"
import { isAdmin } from "../middlewares/checkRole"
import { auth } from '../controllers/CrudUser/auth';
import { login } from "../controllers/CrudUser/login";
import { getAllAdmin } from "../controllers/getAdmin/allAdmin";



const router = Router()

// ─── Registrar Usuario ───────────────────────────────────────────────────────
router.post("/api/auth", auth)

// ─── Loguear Usuario ─────────────────────────────────────────────────────────
router.post("/api/login", login)


// ─── Obtener Todos ROLES Admin ─────────────────────────────────────────
router.get("/api/admin", isAdmin, authToken, getAllAdmin)



router.get("/api/client", authToken, client)


export default router