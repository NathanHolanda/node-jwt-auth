import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ForbiddenError from "../errors/ForbiddenError";
import UnauthorizedError from "../errors/UnauthorizedError";

function jwtAuthentication(req: Request, res: Response, next: NextFunction){
    dotenv.config()

    try{
        const {authorization} = req.headers

        if(!authorization)
            throw new ForbiddenError("Acesso negado.")

        const [authType, token] = authorization.split(" ")

        if(authType !== "Bearer" || !token)
            throw new ForbiddenError("Acesso negado.")

        const secret = String(process.env.JWT_SECRET_KEY)

        try{
            const payload = jwt.verify(token, secret)
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

            req.user = user
        }catch(err: any){
            if(err instanceof ForbiddenError)
                throw new ForbiddenError("Acesso negado.")
            else
                throw new UnauthorizedError("Token expirado.")
        }
        
        next()
    }catch(err: any){
        next(err)
    }
}

export default jwtAuthentication