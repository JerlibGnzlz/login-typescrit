import { Schema, model } from "mongoose"
import { IUser } from '../Interfaces/user.Interfaces';




const userSchema = new Schema(
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