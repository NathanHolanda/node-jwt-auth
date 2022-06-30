import UsersRepository from "../../../database/repositories/UsersRepository";
import DatabaseError from "../../../errors/DatabaseError";
import { IUser } from "../../../interfaces/IUser";

class GetUserByUuidUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute(uuid: string): Promise<IUser>{
        try{
            const user = await this.usersRepository.getByUuid(uuid)
            if(user)
                return user
            
            throw new Error
        }catch(err: any){
            throw new DatabaseError("Error while getting user by UUID.")
        }
    }
}

export default GetUserByUuidUseCase