import { NextFunction, Request, Response } from "express"
import DatabaseError from "../errors/DatabaseError"
import ForbiddenError from "../errors/ForbiddenError"
import UnauthorizedError from "../errors/UnauthorizedError"

function errorHandler(err: any, request: Request, res: Response, next: NextFunction){
    if(err instanceof DatabaseError)
        return res.status(400).send()
    else if(err instanceof ForbiddenError)
        return res.status(403).send()
    else if(err instanceof UnauthorizedError)
        return res.status(401).send()
    else{
        return res.status(500).send()
    }
}

export default errorHandler