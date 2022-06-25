import { NextFunction, Request, Response } from "express"

class ValidateTokenController{
    handle(req: Request, res: Response, next: NextFunction){
        return res.json({message: "O token JWT tem formato válido."})
    }
}

export default ValidateTokenController