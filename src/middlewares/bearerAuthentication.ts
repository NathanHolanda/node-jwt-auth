import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ForbiddenError from "../errors/ForbiddenError";

function bearerAuthentication(req: Request, res: Response, next: NextFunction){
    dotenv.config()

    try{
        const {authorization} = req.headers

        if(!authorization)
            throw new ForbiddenError("Acesso negado.")

        const [authType, token] = authorization.split(" ")

        if(authType !== "Bearer" || !token)
            throw new ForbiddenError("Acesso negado.")

        const secret = String(process.env.JWT_SECRET_KEY)
        const payload = jwt.verify(token, secret)

        if(typeof payload !== "object" || !payload.sub)
            throw new ForbiddenError("Acesso negado.")

        const user = {
            uuid: payload.sub,
            username: payload.name
        }

        req.user = user
        next()
    }catch(err: any){
        next(err)
    }
}

export default bearerAuthentication