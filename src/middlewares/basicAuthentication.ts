import bcrypt from "bcrypt"
import { NextFunction, Request, Response } from "express"
import dataSource from "../database/dataSource"
import { Users } from "../database/entities/Users"
import UsersRepository from "../database/repositories/UsersRepository"
import ForbiddenError from "../errors/ForbiddenError"

async function basicAuthentication(req: Request, res: Response, next: NextFunction){
    try{
        const {authorization} = req.headers

        if(!authorization)
            throw new ForbiddenError("Access denied.")

        const [authType, token] = authorization.split(" ")

        if(authType !== "Basic" || !token)
            throw new ForbiddenError("Access denied.")

        const credentials = Buffer.from(token, 'base64').toString('utf8')
        const [username, password] = credentials.split(':')

        const user = await UsersRepository.checkCredentials(username, password)

        if(!user)
            throw new ForbiddenError("Access denied.")

        req.user = user
        return next()
    }catch(err: any){
        return next(err)
    }
}

export default basicAuthentication