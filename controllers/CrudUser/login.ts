import { IUser, userModel } from "../../models/UserModels";
import { Response, Request, NextFunction } from "express"
import { passwordCorrecto } from '../../helpers/bcrypt';
import { generarToken } from "../../helpers/token";
import { validateLogin } from "../../validations/login";

export const login = async (req: Request, res: Response) => {

  const usuario = req.body as IUser


  try {
    const validation = await validateLogin(usuario);

    if (!validation.email) {
      return res.status(400).json({ message: 'Debe ingresar un correo' });
    }
    if (!validation.password) {
      return res.status(400).json({ message: 'Debe ingresar un password' });
    }


    const existeUsuario = await userModel.findOne({ email: validation.email })


    if (!existeUsuario) {
      return res.status(401).json({ message: "Esta cuenta no esta registrada" })
    }


    const passwordEncriptado = existeUsuario.password


    const claveCorrecta = await passwordCorrecto(validation.password, passwordEncriptado)

    if (claveCorrecta) {

      const token = await generarToken(existeUsuario.email)

      const info = {
        token,
        usuario: existeUsuario
      }

      res.status(200).json({ message: "Session y token valido ", info })

    } else {

      res.status(403).json({ message: "Clave invalida intenta una vez mas" })

    }

  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message })
    }
  }
}