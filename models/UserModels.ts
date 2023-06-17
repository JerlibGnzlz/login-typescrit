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
            require: true,
            unique: true,
            trim: true,
            lowercase: true
        }
        ,
        password: {
            type: String,
            require: true

        }
    },
    {
        versionKey: false,
        timestamps: true

    })



export const userModel = model<IUser>("user", userSchema)