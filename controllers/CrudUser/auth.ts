import { Response, Request, NextFunction } from "express"
import { userModel, IUser } from "../../models/UserModels"
import { passwordHashado } from '../../helpers/bcrypt';
import { validateRegister } from "../../validations/register";

export const auth = async (req: Request, res: Response) => {

  const usuario = req.body as IUser

  try {
    const validacion = validateRegister(usuario)

    const existeUsuario = await userModel.findOne({ email: validacion.email })

    if (existeUsuario) {
      return res.status(400).json({ message: "El usuario ya existe", existeUsuario })
    }

    const encriptado = await passwordHashado(validacion.password)

    const nuevoUsuario = new userModel(
      {
        role: validacion.role,
        nombre: validacion.nombre,
        email: validacion.email,
        password: encriptado,
      })

    const usuarioGuardado = await nuevoUsuario.save()

    return res.status(200).json({ message: "Usuario creado", usuarioGuardado })


  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });

    }
  }

}
