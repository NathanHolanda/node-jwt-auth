import dotenv from "dotenv";
import { Request, Response, Router } from "express";

dotenv.config()

const port = process.env.NODE_SERVER_PORT

const routes = Router()

routes.get("/", (req: Request, res: Response) => {
    if(port)
        return res.json({message: `O servidor está em execução na porta ${port}.`})
    
    return res.json({message: "O servidor está em execução."})
})

export default routes