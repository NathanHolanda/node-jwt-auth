import UsersRepository from "../../../database/repositories/UsersRepository";
import DatabaseError from "../../../errors/DatabaseError";

class RemoveUserUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute(uuid: string): Promise<void>{
        try{
            await this.usersRepository.remove(uuid)
        }catch(err: any){
            throw new DatabaseError("Error while deleting user.")
        }
    }
}

export default RemoveUserUseCase