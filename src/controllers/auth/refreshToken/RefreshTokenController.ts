import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import ForbiddenError from "../../../errors/ForbiddenError"
import UnauthorizedError from "../../../errors/UnauthorizedError"
import generateJwt from "../../../utils/generateJwt"

class RefreshTokenController{
    handle(req: Request, res: Response, next: NextFunction){
        try{
            const {authorization} = req.headers
    
            if(!authorization)
                throw new ForbiddenError("Access denied.")
    
            const [authType, refreshToken] = authorization.split(" ")
    
            if(authType !== "Bearer" || !refreshToken)
                throw new ForbiddenError("Access denied.")
    
            const refreshSecret = String(process.env.JWT_REFRESH_SECRET_KEY)
    
            try{
                const payload = jwt.verify(refreshToken, refreshSecret)
                if(typeof payload !== "object" || !payload.sub)
                    throw new ForbiddenError("Access denied.")
    
                if(payload.exp){
                    const now = Date.now()/1000
                    const expiresIn = new Date(payload.exp).getTime()
    
                    if(now > expiresIn)
                        throw new UnauthorizedError("Token expired.")
                }
    
                const user = {
                    uuid: payload.sub,
                    username: payload.name
                }
    
                const responseBody = generateJwt(user)
    
                return res.json(responseBody)
            }catch(err: any){
                if(err instanceof ForbiddenError)
                    throw new ForbiddenError("Access denied.")
                else
                    throw new UnauthorizedError("Token expired.")
            }
        }catch(err: any){
            return next(err)
        }
    }
}

export default RefreshTokenController