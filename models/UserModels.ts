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
            require: [true, "Ingresa un password"],
        },
        role: {
            type: String,
            enum: ['user', 'admin', "employed"],
            default: 'user',
        },
    },
    {
        versionKey: false,
        timestamps: true

    })



export const userModel = model<IUser>("user", userSchema)