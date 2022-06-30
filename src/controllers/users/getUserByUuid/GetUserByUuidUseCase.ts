import { Repository } from "typeorm";
import dataSource from "../../../database/dataSource";
import { Users } from "../../../database/entities/Users";
import DatabaseError from "../../../errors/DatabaseError";
import { User } from "../../../models/User";

class GetUserByUuidUseCase{
    constructor(){
        this.usersRepository = dataSource.getRepository(Users)
    }

    private usersRepository: Repository<User>

    async execute(uuid: string): Promise<User | null>{
        try{
            const user = await this.usersRepository.findOne({
                select: {
                    uuid: true,
                    username: true
                },
                where: {uuid}
            })

            return user
        }catch(err: any){
            throw new DatabaseError("Error while getting user by UUID.")
        }
    }
}

export default GetUserByUuidUseCase