"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
require("./db");
const port = process.env.PORT || 8001;
function main() {
    app_1.app.listen(app_1.app.get("port"), () => {
        console.log(`Escuchando el puerto ${port}`);
    });
}
main();
//# sourceMappingURL=index.js.map