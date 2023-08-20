import { Response, Request } from "express"
import { userModel } from "../../models/UserModels";



export const getAllAdmin = async (req: any, res: Response) => {

  try {
    if (req.usuario.role !== "admin") {
      return res.status(401).json({ message: 'No estas autorizado' });
    }

    const roleAdmin = await userModel.find({ role: 'admin' });

    if (!roleAdmin) return res.status(500).json({ message: 'No estas autorizado' });

    res.status(200).json({ message: ` Todos los administradores`, roleAdmin });
  } catch (error) {
    res.status(500).json({ error });
  }
}
