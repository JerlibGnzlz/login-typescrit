import { Schema, model } from "mongoose"
import { IUser } from '../Interfaces/user.Interfaces';
import bcrypt from "bcrypt"



const userSchema = new Schema(
    {
        nombre: {
            type: String,
            require: true,
            unique: true,
            lowercase: true

        }, email: {
            type: String,
            require: [true, "Ingresa un email"],
            unique: true,
            trim: true,
            lowercase: true
        }
        ,
        password: {
            type: String,
            require: [true, "Ingresa un password"],


        }
    },
    {
        versionKey: false,
        timestamps: true

    })



export const userModel = model<IUser>("user", userSchema)