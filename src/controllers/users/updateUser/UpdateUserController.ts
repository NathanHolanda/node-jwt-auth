import { NextFunction, Request, Response } from "express"
import { IUser } from "../../../interfaces/IUser"
import UpdateUserUseCase from "./UpdateUserUseCase"

class UpdateUserController{
    constructor(private updateUserUseCase: UpdateUserUseCase){}

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {uuid} = req.params
            const data: IUser = req.body
    
            await this.updateUserUseCase.execute(uuid, data)
    
            return res.send()
        }catch(err: any){
            return next(err)
        }
    }
}

export default UpdateUserController