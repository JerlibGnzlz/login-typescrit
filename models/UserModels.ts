import { Document, Schema, model } from "mongoose"
// import { IUser } from '../Interfaces/user.Interfaces';


export interface IUser {
    role: string
    nombre: string,
    email: string,
    password: string,
    confirmarPassword: string,
    passwordHashado(password: string): Promise<string>
    passwordCorrecto(password: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
    {
        nombre: {
            type: String,
            require: true,
            lowercase: true

        },
        email: {
            type: String,
            require: [true, "Ingresa un email"],
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            require: [true, "Ingresa  password"],
        },
        confirmarPassword: {
            type: String,
            require: [true, "Confirmar el password"],
        },
        role: {
            type: String,
            enum: ["admin", "client", "trainig"],
            default: 'admin',
        },
    },
    {
        versionKey: false,
        timestamps: true

    })



export const userModel = model<IUser>("user", userSchema)