import { NextFunction, Response } from "express";

// middleware/checkRole.js
import jwt, { JwtPayload } from 'jsonwebtoken';

export const checkRoleMiddleware = (role: any) => {

  return (req: any, res: Response, next: NextFunction) => {


    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No se proporcionó un token de autenticación.' });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN || "CL@VE") as JwtPayload
      const userRole = decodedToken.role;

      if (role.includes(userRole)) {
        return res.status(403).json({ error: 'No tienes permiso para acceder a esta ruta.' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
  };
};


