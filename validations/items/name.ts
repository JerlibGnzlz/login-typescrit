import { fullName } from '../../utils/regex';

export const validationFullName = (name: string): string => {

  if (!name.match(fullName)) {
    throw Error("Debe ingresar un nombre completo")
  }

  return name;
}