import { NextFunction, Request, Response } from "express"
import ForbiddenError from "../../../errors/ForbiddenError"
import generateJwt from "../../../utils/generateJwt"

class GenerateTokenController{
    handle(req: Request, res: Response, next: NextFunction): Response | void{
        try{
            const {user} = req
            if(!user)
                throw new ForbiddenError("Access denied.")
    
            const responseBody = generateJwt(user)
    
            return res.json(responseBody)
        }catch(err: any){
            return next(err)
        }
    }
}

export default GenerateTokenController