import { NextFunction, Request, Response, Router } from "express"
import UsersRepository from "../repositories/usersRepository"

const route = Router()

const usersRepository = new UsersRepository()

route.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await usersRepository.getAll()

    return res.json(users)
})

route.get('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const {uuid} = req.params

    const user = await usersRepository.find(uuid)

    return res.status(200).json(user)
})

route.post('/users/', async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body

    const uuid = await usersRepository.create(user)

    return res.status(200).send({uuid})
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