import UsersRepository from "../../../database/repositories/UsersRepository"
import DatabaseError from "../../../errors/DatabaseError"
import { IUser } from "../../../interfaces/IUser"
import encryptPassword from "../../../utils/encryptPassword"

class GetAllUsersUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute(data: IUser): Promise<string>{
        try{
            if(data.password)
                data.password = await encryptPassword(data.password)

            const uuid = await this.usersRepository.create(data)
            
            return uuid
        }catch(err: any){
            throw new DatabaseError("Error while creating a new user.")
        }
    }
}

export default GetAllUsersUseCase