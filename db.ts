import { connect } from "mongoose";


connect(process.env.URL_MONGO || "db")

    .then(() => console.log("Base de datos conectada"))
    .catch(() => { console.log("Error de conexion") })

