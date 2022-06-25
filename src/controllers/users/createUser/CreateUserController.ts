import { NextFunction, Request, Response } from "express"
import CreateUserUseCase from "./CreateUserUseCase"

class CreateUserController{
    constructor(private createUserUseCase: CreateUserUseCase){}

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        try{
            const data = req.body
    
            const uuid = await this.createUserUseCase.execute(data)
    
            return res.status(201).json({uuid})
        }catch(err: any){
            return next(err)
        }
    }
}

export default CreateUserController