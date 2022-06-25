import { NextFunction, Request, Response } from "express"
import GetAllUsersUseCase from "./GetAllUsersUseCase"

class GetAllUsersController{
    constructor(private getAllUsersUseCase: GetAllUsersUseCase){}

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        try{
            const users = await this.getAllUsersUseCase.execute()

            return res.json(users)
        }catch(err: any){
            return next(err)
        }
    }
}

export default GetAllUsersController