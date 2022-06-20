import { NextFunction, Request, Response, Router } from "express"
import UsersRepository from "../repositories/usersRepository"

const route = Router()

const usersRepository = new UsersRepository()

route.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await usersRepository.getAllUsers()

    return res.json(users)
})

route.get('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const {uuid} = req.params

    return res.status(200).json({uuid})
})

route.post('/users/', (req: Request, res: Response, next: NextFunction) => {
    const users = [{name: "Nathan"}]

    return res.status(200).send()
})

route.put('/users/:uuid', (req: Request, res: Response, next: NextFunction) => {
    const users = [{name: "Nathan"}]

    return res.status(200).send()
})

route.delete('/users/:uuid', (req: Request, res: Response, next: NextFunction) => {
    const users = [{name: "Nathan"}]

    return res.status(200).send()
})

export default route