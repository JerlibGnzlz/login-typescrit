"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
(0, mongoose_1.connect)(process.env.URL_MONGO || "db")
    .then(() => console.log("Base de datos conectada"))
    .catch(() => { console.log("Error de conexion"); });
//# sourceMappingURL=db.js.map