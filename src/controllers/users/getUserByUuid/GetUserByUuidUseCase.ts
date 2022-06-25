import { User } from "../../../models/User";
import UsersRepository from "../../../repositories/UsersRepository";

class GetUserByUuidUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute(uuid: string): Promise<User>{
        const user = await this.usersRepository.find(uuid)

        return user
    }
}

export default GetUserByUuidUseCase