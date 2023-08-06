import { Response, Request, NextFunction } from "express"
import { userModel } from "../models/UserModels"
import { passwordHashado, passwordCorrecto } from '../helpers/bcrypt';
import { generarToken } from "../helpers/token";



export const auth = async (req: Request, res: Response) => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    /* The `dominiosPermitidos` variable is an array that contains a list of allowed email domains.
    These are the domains that are considered valid for user registration. */
    const dominiosPermitidos = ['gmail.com', 'hotmail.com', "yahoo.com", "yahoo.es", "outlook.com", "outlook.es"];
    const dominiosPermitidosRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@(${dominiosPermitidos.join('|')})$`, 'i');
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;
    const number = /[0-9]/

    const { nombre, email, password, confirmarPassword, role } = req.body

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


        if (regexPassword.test(password) !== regexPassword.test(confirmarPassword)) {
            return res.status(400).json({ message: 'No coinciden las Contraseña' })
        }


        const existeUsuario = await userModel.findOne({ email })


        if (existeUsuario) {
            return res.status(400).json({ message: "El usuario ya existe", existeUsuario })
        }

        const encriptado = await passwordHashado(password)

        const nuevoUsuario = new userModel(
            {
                role,
                nombre,
                email,
                password: encriptado,
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

        if (!email) {
            return res.status(400).json({ message: 'Debe ingresar un correo' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Debe ingresar un password' });
        }


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

            res.status(403).json({ message: "Clave invalida intenta una vez mas" })

        }

    } catch (error) {
        console.log(error)
    }
}

export const perfil = async (req: any, res: Response) => {


    try {

        const roleUser = await userModel.find(req.usuarioId, { password: 0 })

        if (!roleUser) return res.status(404).json({ message: "No se encontro el pefil" })

        res.status(200).json({ message: "Perfil del usuario", roleUser })

    } catch (error) {
        console.log(error)
    }


}



// Ruta protegida que solo los usuarios con rol de 'admin' pueden acceder.
export const admin = async (req: Request, res: Response) => {

    try {
        const roleAdmin = await userModel.find({ role: 'admin' });

        if (!roleAdmin) return res.status(500).json({ message: 'No se encontro el administrador' });

        res.status(200).json({ message: ` Perfil de administradores`, roleAdmin });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const clientes = async (req: Request, res: Response) => {

    try {
        const roleAdmin = await userModel.findOneAndDelete({ role: 'admin' });

        if (!roleAdmin) return res.status(500).json({ message: 'No estas autorizado' });

        res.status(200).json({ message: ` Eliminados todos los`, roleAdmin });
    } catch (error) {
        res.status(500).json({ error });
    }
}

