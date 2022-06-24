import dotenv from "dotenv";
import { NextFunction, Request, Response, Router } from "express";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import ForbiddenError from "../errors/ForbiddenError";
import UnauthorizedError from "../errors/UnauthorizedError";
import basicAuthentication from "../middlewares/basicAuthentication";
import jwtAuthentication from "../middlewares/jwtAuthentication";
import generateJwt from "../utils/generateJwt";

dotenv.config()

const routes = Router()

routes.post('/', basicAuthentication, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {user} = req
        if(!user)
            throw new ForbiddenError("Acesso negado.")

        const responseBody = generateJwt(user)

        res.json(responseBody)
    }catch(err: any){
        next(err)
    }
})

routes.post('/refresh', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {authorization} = req.headers

        if(!authorization)
            throw new ForbiddenError("Acesso negado.")

        const [authType, refreshToken] = authorization.split(" ")

        if(authType !== "Bearer" || !refreshToken)
            throw new ForbiddenError("Acesso negado.")

        const refreshSecret = String(process.env.JWT_REFRESH_SECRET_KEY)

        try{
            const payload = jwt.verify(refreshToken, refreshSecret)
            if(typeof payload !== "object" || !payload.sub)
                throw new ForbiddenError("Acesso negado.")

            if(payload.exp){
                const now = Date.now()/1000
                const expiresIn = new Date(payload.exp).getTime()

                if(now > expiresIn)
                    throw new UnauthorizedError("Token expirado.")
            }

            const user = {
                uuid: payload.sub,
                username: payload.name
            }

            const responseBody = generateJwt(user)

            res.json(responseBody)
        }catch(err: any){
            if(err instanceof ForbiddenError)
                throw new ForbiddenError("Acesso negado.")
            else
                throw new UnauthorizedError("Token expirado.")
        }
    }catch(err: any){
        next(err)
    }
})

routes.post('/validate', jwtAuthentication, async (req: Request, res: Response, next: NextFunction) => {
    return res.json({message: "O token JWT tem formato válido."})
})

export default routes