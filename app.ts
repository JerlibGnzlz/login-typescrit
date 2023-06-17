import "dotenv/config"
import express, { Application } from "express";
import authRoutes from "./routes/auth.Routes"
import morgan from "morgan";


// ─── Settinng ────────────────────────────────────────────────────────────────
const app: Application = express()


// ─── Pueerto ─────────────────────────────────────────────────────────────────

app.set("port", 8000)


// ─── Middelware ──────────────────────────────────────────────────────────────
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ─── Rutas ───────────────────────────────────────────────────────────────────

app.use(authRoutes)
// app.use(PerfilRoutes)
// app.use(loginRoutes)






export {
    app
}