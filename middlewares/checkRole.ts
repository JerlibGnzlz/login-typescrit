import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

export const checkRoleMiddleware = (role: any) => {

  return (req: any, res: Response, next: NextFunction) => {



    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token de autenticación.' });
      }

      const decodedToken = jwt.verify(token, process.env.TOKEN || "CL@VE") as JwtPayload
      const userRole = decodedToken.role;

      if (role.includes(userRole)) {
        return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta.' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
  };
};


