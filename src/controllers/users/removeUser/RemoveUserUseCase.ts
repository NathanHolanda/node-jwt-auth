import { Repository } from "typeorm";
import dataSource from "../../../database/dataSource";
import { Users } from "../../../database/entities/Users";
import DatabaseError from "../../../errors/DatabaseError";

class RemoveUserUseCase{
    constructor(){
        this.usersRepository = dataSource.getRepository(Users)
    }

    private usersRepository: Repository<Users>

    async execute(uuid: string): Promise<void>{
        try{
            await this.usersRepository
                .delete({uuid})
        }catch(err: any){
            throw new DatabaseError("Error while deleting user.")
        }
    }
}

export default RemoveUserUseCase