import { Repository } from "typeorm";
import dataSource from "../../../database/dataSource";
import { Users } from "../../../database/entities/Users";
import DatabaseError from "../../../errors/DatabaseError";
import { User } from "../../../models/User";
import encryptPassword from "../../../utils/encryptPassword";

class UpdateUserUseCase{
    constructor(){
        this.usersRepository = dataSource.getRepository(Users)
    }

    private usersRepository: Repository<Users>

    async execute(uuid: string, data: User): Promise<void>{
        try{
            if(data.password)
                data.password = await encryptPassword(data.password)

            await this.usersRepository
                .update({uuid}, data)
        }catch(err: any){
            throw new DatabaseError("Error while updating user.")
        }
    }
}

export default UpdateUserUseCase