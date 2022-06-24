import dotenv from "dotenv";
import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import ForbiddenError from "../errors/ForbiddenError";
import basicAuthentication from "../middlewares/basicAuthentication";
import jwtAuthentication from "../middlewares/jwtAuthentication";

dotenv.config()

const routes = Router()

routes.post('/', basicAuthentication, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {user} = req
        if(!user)
            throw new ForbiddenError("Acesso negado.")

        const jwtPayload = {username: user.username}
        const jwtSecret = String(process.env.JWT_SECRET_KEY)
        const jwtOptions = {subject: user.uuid}

        const jwtToken = jwt.sign(jwtPayload, jwtSecret, jwtOptions)

        return res.json({token: jwtToken})
    }catch(err: any){
        next(err)
    }
})

routes.post('/validate', jwtAuthentication, async (req: Request, res: Response, next: NextFunction) => {
    return res.json({message: "O token JWT tem formato válido."})
})

export default routes