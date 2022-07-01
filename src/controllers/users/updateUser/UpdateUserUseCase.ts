import UsersRepository from "../../../database/repositories/UsersRepository";
import DatabaseError from "../../../errors/DatabaseError";
import { IUser } from "../../../interfaces/IUser";
import encryptPassword from "../../../utils/encryptPassword";

class UpdateUserUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute(uuid: string, data: IUser): Promise<void>{
        try{
            if(data.password)
                data.password = await encryptPassword(data.password)

            await this.usersRepository.update(uuid, data)
        }catch(err: any){
            throw new DatabaseError("Error while updating user.")
        }
    }
}

export default UpdateUserUseCase