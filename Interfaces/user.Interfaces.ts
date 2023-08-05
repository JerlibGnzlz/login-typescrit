export interface IUser {
    role: string
    nombre: string,
    email: string,
    password: string,
    passwordHashado(password: string): Promise<string>
    passwordCorrecto(password: string): Promise<boolean>
}