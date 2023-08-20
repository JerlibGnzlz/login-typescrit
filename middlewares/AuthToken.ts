import Jwt, { JwtPayload } from "jsonwebtoken";
import { userModel } from "../models/UserModels"
import { NextFunction, Request, Response } from "express";


// interface IPayload {
//     id: string,
//     iat: number,
//     exp: number
// }

export const authToken = async (req: any, res: Response, next: NextFunction) => {


    try {
        const token = req.headers.authorization?.split(" ")[1]
        console.log(token, "token")

        if (!token) {
            return res.status(401).json({ message: 'No se proporcionó un token de autenticación.' });
        }

        const payload = Jwt.verify(token, process.env.TOKEN || "CL@VE") as JwtPayload

        const usuario = await userModel.findOne({ email: payload.id })
        console.log(usuario)//trae todo el objeto de usuario

        req.usuario = usuario


        return next()

    } catch (error) {
        return res.status(400).json({ message: "Sesion o token invalido" })
    }


}

