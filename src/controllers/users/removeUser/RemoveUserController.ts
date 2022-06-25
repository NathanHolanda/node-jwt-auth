import { NextFunction, Request, Response } from "express"
import RemoveUserUseCase from "./RemoveUserUseCase"

class RemoveUserController{
    constructor(private removeUserUseCase: RemoveUserUseCase){}

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {uuid} = req.params
    
            await this.removeUserUseCase.execute(uuid)
    
            return res.send()
        }catch(err: any){
            return next(err)
        }
    }
}

export default RemoveUserController