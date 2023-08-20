import { dominiosPermitidosRegex, emailRegex } from "../../utils/regex";

export const validationEmail = (gmail: string): string => {

  if (!gmail) {
    throw Error('Debe ingresar un correo');
  }

  if (!emailRegex.test(gmail) || !dominiosPermitidosRegex.test(gmail)) {
    throw Error('Correo invalido');
  }

  return gmail;
}