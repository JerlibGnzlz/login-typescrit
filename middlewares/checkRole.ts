import { NextFunction, Response } from "express";

export const isAdmin = async (req: any, res: Response, next: NextFunction) => {

  try {
    const role = "admin"

    const { userRole } = req.query

    if (!userRole) {
      return res.status(400).json({ message: 'El rol de Admin es requerido.' });
    }
    if (role !== userRole) {
      return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta.' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};



