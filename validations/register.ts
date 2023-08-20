import { IUser } from "../models/UserModels";
import { validationEmail } from "./items/gmail";
import { validationPassword } from "./items/password";
import { validationFullName } from "./items/name";

export const validateRegister = (user: IUser): IUser => {

  if (!user.nombre && !user.password && !user.email) {
    throw Error("Todos los campos son requerido")
  }

  validationFullName(user.nombre);

  validationEmail(user.email);

  validationPassword(user.password);

  if (validationPassword(user.password) !== user.confirmarPassword) {
    throw Error("Las contraseña no coinciden")
  }

  return user;
}