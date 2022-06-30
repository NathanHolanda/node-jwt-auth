import { Repository } from "typeorm"
import dataSource from "../../../database/dataSource"
import { Users } from "../../../database/entities/Users"
import DatabaseError from "../../../errors/DatabaseError"
import { User } from "../../../models/User"

class GetAllUsersUseCase{
    constructor(){
        this.usersRepository = dataSource.getRepository(Users)
    }

    private usersRepository: Repository<Users>

    async execute(): Promise<User[]>{
        try{
            const users = await this.usersRepository.find({
                select: {
                    uuid: true,
                    username: true
                }
            })

            return users
        }catch(err: any){
            throw new DatabaseError("Error while getting all users.")
        }
    }
}

export default GetAllUsersUseCase