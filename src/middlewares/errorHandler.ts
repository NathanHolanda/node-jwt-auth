import { NextFunction, Request, Response } from "express"
import DatabaseError from "../errors/DatabaseError"

function errorHandler(err: any, request: Request, res: Response, next: NextFunction){
    if(err instanceof DatabaseError)
        return res.status(400).send()
    else
        return res.status(500).send()
}

export default errorHandler