import { regexPassword } from "../../utils/regex"

export const validationPassword = (password: string): string => {

  if (!regexPassword.test(password)) {

    throw Error('La contraseña debe tener 8 caracteres incluyendo: Mayuscula, minuscula, numero y un caracter especial(@, $, !, %, *, ?, _ , -, &)');
  }

  return password;
}