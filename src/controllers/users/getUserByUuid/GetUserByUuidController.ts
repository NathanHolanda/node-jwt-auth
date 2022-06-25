import { NextFunction, Request, Response } from "express"
import GetUserByUuidUseCase from "./GetUserByUuidUseCase"

class GetUserByUuidController{
    constructor(private getUserByUuidUseCase: GetUserByUuidUseCase){}

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {uuid} = req.params
    
            const user = await this.getUserByUuidUseCase.execute(uuid)
    
            return res.json(user)
        }catch(err: any){
            return next(err)
        }
    }
}

export default GetUserByUuidController