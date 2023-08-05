import { Response, Request } from "express"
import { userModel } from "../models/UserModels"
import { passwordHashado, passwordCorrecto } from '../helpers/bcrypt';
import { generarToken } from "../helpers/token";



export const auth = async (req: Request, res: Response) => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const dominiosPermitidos = ['gmail.com', 'hotmail.com', "yahoo.com", "yahoo.es", "outlook.com", "outlook.es"];
    const dominiosPermitidosRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@(${dominiosPermitidos.join('|')})$`, 'i');
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;
    const number = /[0-9]/

    const { nombre, email, password } = req.body

    try {
        if (!nombre || !password) {
            return res.status(400).json({ message: "Todos los campos son requeridos" })
        }

        if (nombre.match(number)) {
            return res.status(400).json({ message: "Debes colocar un nombre valido" })
        }

        if (nombre.length < 3) {
            return res.status(400).json({ message: "Debes colocar un nombre mayor a 3 caracteres " })
        }

        if (!email) {
            return res.status(400).json({ message: 'Debe ingresar un correo' });
        }

        if (!emailRegex.test(email) || !dominiosPermitidosRegex.test(email)) {
            return res.status(400).json({ message: 'El correo electrónico no es válido' });
        }


        if (!regexPassword.test(password)) {
            return res.status(400).json(
                { message: 'La contraseña debe contener al menos 8 caracteres incluyendo: mayúsculas, minúsculas, números y caracteres especiales ( @, $, !, %, *, ?, _ , - o &.)' }
            );
        }


        const existeUsuario = await userModel.findOne({ email })


        if (existeUsuario) {
            return res.status(400).json({ message: "El usuario ya existe", existeUsuario })
        }

        const encriptado = await passwordHashado(password)

        const nuevoUsuario = new userModel(
            {
                nombre,
                email,
                password: encriptado
            })


        const usuarioGuardado = await nuevoUsuario.save()


        res.status(200).json({ message: "Usuario creado", usuarioGuardado })



    } catch (error) {
        console.log(error)
    }

}



export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body


    try {
        const existeUsuario = await userModel.findOne({ email })


        if (!existeUsuario) {
            return res.status(401).json({ message: "Esta cuenta no esta registrada" })
        }


        const passwordEncriptado = existeUsuario.password


        const claveCorrecta = await passwordCorrecto(password, passwordEncriptado)

        if (claveCorrecta) {

            const token = await generarToken(existeUsuario.email)

            const info = {
                token,
                usuario: existeUsuario
            }

            res.status(200).json({ message: "Session y token valido ", info })

        } else {

            res.status(403).json({ message: "Clave invalida " })

        }

    } catch (error) {
        console.log(error)
    }
}

export const perfil = async (req: any, res: Response) => {


    try {

        const usuarioRegistado = await userModel.findById(req.usuarioId, { password: 0 })

        if (!usuarioRegistado) return res.status(404).json({ message: "No se encontro el pefil" })

        res.status(200).json({ message: "Perfil del usuario", usuarioRegistado })

    } catch (error) {
        console.log(error)
    }


}