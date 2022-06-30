import bcrypt from "bcrypt"
import { NextFunction, Request, Response } from "express"
import dataSource from "../database/dataSource"
import { Users } from "../database/entities/Users"
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

        const user = await checkCredentials(username, password)

        if(!user)
            throw new ForbiddenError("Access denied.")

        req.user = user
        return next()
    }catch(err: any){
        return next(err)
    }
}

async function checkCredentials(username: string, password: string){
    const user = await dataSource
        .getRepository(Users)
        .findOneBy({username})

    const storedPassword = user?.password ?? null

    if(user && storedPassword){
        const isSame = await bcrypt.compare(password, storedPassword)

        if(isSame)
            return {
                uuid: user.uuid,
                username: user.username
            }
    }

    return null
}

export default basicAuthentication