import { NextFunction, Request, Response, Router } from "express"
import bearerAuthentication from "../middlewares/bearerAuthentication"
import UsersRepository from "../repositories/UsersRepository"

const routes = Router()

const usersRepository = new UsersRepository()

routes.use(bearerAuthentication)

routes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const users = await usersRepository.getAll()

        return res.json(users)
    }catch(err: any){
        next(err)
    }
})

routes.get('/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    try{
        const {uuid} = req.params

        const user = await usersRepository.find(uuid)

        return res.json(user)
    }catch(err: any){
        next(err)
    }
})

routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const data = req.body

        const uuid = await usersRepository.create(data)

        return res.status(201).json({uuid})
    }catch(err: any){
        next(err)
    }
})

routes.put('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {uuid} = req.params
        const data = req.body

        await usersRepository.modify(uuid, data)

        return res.send()
    }catch(err: any){
        next(err)
    }
})

routes.delete('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {uuid} = req.params

        await usersRepository.remove(uuid)

        return res.send()
    }catch(err: any){
        next(err)
    }
})

export default routes