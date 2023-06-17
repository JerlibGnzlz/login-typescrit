import Jwt, { JwtPayload } from "jsonwebtoken";
import { userModel } from "../models/UserModels"
import { NextFunction, Request, Response } from "express";


// interface IPayload {
//     id: string,
//     iat: number,
//     exp: number
// }

export const authToken = async (req: any, res: Response, next: NextFunction) => {


    if (req.headers.authorization) {

        try {
            const token = req.headers.authorization.split(" ")[1]


            const payload = Jwt.verify(token, process.env.TOKEN || "CL@VE") as JwtPayload

            const usuarioid = await userModel.findOne({ email: payload.id })

            req.usuarioId = usuarioid


            return next()

        } catch (error) {
            return res.status(400).json({ message: "Sesion o token invalido" })
        }
    }
    return next()
}

