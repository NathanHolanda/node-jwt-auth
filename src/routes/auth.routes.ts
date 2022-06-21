import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../errors/ForbiddenError";
import UsersRepository from "../repositories/UsersRepository";

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
        console.log(user)

        return res.send()
    }catch(err: any){
        next(err)
    }
})

export default routes