import Jwt from "jsonwebtoken"


export const generarToken = async (id: string): Promise<string> => {
    return Jwt.sign({ id }, process.env.TOKEN || "CL@VE", {
        expiresIn: "3h"
    })
}
