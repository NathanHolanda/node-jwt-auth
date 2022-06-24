import { NextFunction, Request, Response } from "express"
import ForbiddenError from "../errors/ForbiddenError"
import UsersRepository from "../repositories/UsersRepository"

const usersRepository = new UsersRepository()

async function basicAuthentication(req: Request, res: Response, next: NextFunction){
    try{
        const {authorization} = req.headers

        if(!authorization)
            throw new ForbiddenError("Acesso negado.")

        const [authType, token] = authorization.split(" ")

        if(authType !== "Basic" || !token)
            throw new ForbiddenError("Acesso negado.")

        const credentials = Buffer.from(token, 'base64').toString('utf8')
        const [username, password] = credentials.split(':')

        const user = await usersRepository.authenticate(username, password)

        if(!user)
            throw new ForbiddenError("Acesso negado.")

        req.user = user
        next()
    }catch(err: any){
        next(err)
    }
}

export default basicAuthentication