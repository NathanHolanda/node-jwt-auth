import { NextFunction, Request, Response, Router } from "express"
import DatabaseError from "../errors/DatabaseError"
import UsersRepository from "../repositories/UsersRepository"

const route = Router()

const usersRepository = new UsersRepository()

route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const users = await usersRepository.getAll()

        return res.json(users)
    }catch(err: any){
        next(err)
    }
})

route.get('/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    try{
        const {uuid} = req.params

        const user = await usersRepository.find(uuid)

        return res.status(200).json(user)
    }catch(err: any){
        next(err)
    }
})

route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const data = req.body

        const uuid = await usersRepository.create(data)

        return res.status(200).json({uuid})
    }catch(err: any){
        next(err)
    }
})

route.put('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {uuid} = req.params
        const data = req.body

        await usersRepository.modify(uuid, data)

        return res.status(200).send()
    }catch(err: any){
        next(err)
    }
})

route.delete('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {uuid} = req.params

        await usersRepository.remove(uuid)

        return res.status(200).send()
    }catch(err: any){
        next(err)
    }
})

export default route