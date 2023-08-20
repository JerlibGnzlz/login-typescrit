import { validationEmail } from "./items/gmail";
import { validationPassword } from "./items/password";
import { IUser, userModel } from "../models/UserModels";

export const validateLogin = async (user: IUser): Promise<IUser> => {

  if (!user.email && !user.password) {
    throw Error("Ambos campos son requerido")
  }

  validationEmail(user.email);

  const usuario = await userModel.find({ email: user.email })

  if (!usuario) {
    throw Error('Esta cuenta no esta registrada');
  }

  validationPassword(user.password);

  return user;
}