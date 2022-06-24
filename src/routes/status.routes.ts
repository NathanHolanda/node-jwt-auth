import dotenv from "dotenv";
import { Request, Response, Router } from "express";

dotenv.config()
const port = process.env.SERVER_PORT

const routes = Router()

routes.get("/", (req: Request, res: Response) => {
    return res.json({message: `O servidor está em execução na porta ${port}.`})
})

export default routes