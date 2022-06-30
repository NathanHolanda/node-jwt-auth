import UsersRepository from "../../../database/repositories/UsersRepository"
import DatabaseError from "../../../errors/DatabaseError"
import { IUser } from "../../../interfaces/IUser"

class GetAllUsersUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute(): Promise<IUser[]>{
        try{
            const users = await this.usersRepository.getAll()

            return users
        }catch(err: any){
            throw new DatabaseError("Error while getting all users.")
        }
    }
}

export default GetAllUsersUseCase