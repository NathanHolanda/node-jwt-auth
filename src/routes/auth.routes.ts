import dotenv from "dotenv";
import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import ForbiddenError from "../errors/ForbiddenError";
import UsersRepository from "../repositories/UsersRepository";

dotenv.config()

const routes = Router()

const usersRepository = new UsersRepository()

routes.post('/token', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {authorization} = req.headers

        const [authType, token] = (authorization ?? "").split(" ")

        if(authType !== "Basic" || !token)
            throw new ForbiddenError("Acesso negado.")

        const credentials = Buffer.from(token, 'base64').toString('utf8')
        const [username, password] = credentials.split(':')

        const user = await usersRepository.authenticate(username, password)

        if(!user)
            throw new ForbiddenError("Acesso negado.")

        const jwtPayload = {username: user.name}
        const jwtSecret = String(process.env.JWT_SECRET_KEY)
        const jwtOptions = {subject: user.uuid}

        const jwtToken = jwt.sign(jwtPayload, jwtSecret, jwtOptions)

        return res.json({token: jwtToken})

        return res.send()
    }catch(err: any){
        next(err)
    }
})

export default routes