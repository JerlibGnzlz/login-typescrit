import { Response, Request } from "express"
import { userModel } from "../../models/UserModels"


export const client = async (req: any, res: Response) => {

  try {
    if (req.usuario.role !== "client") {
      return res.status(401).json({ message: 'No estas autorizado' });
    }
    const roleClient = await userModel.find({ role: "client" })

    if (!roleClient) return res.status(404).json({ message: 'No estas autorizado' })

    res.status(200).json({ message: "Perfil del usuario", roleClient })

  } catch (error) {
    console.log(error)
  }

}
