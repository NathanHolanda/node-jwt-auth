import { User } from "../../../models/User"
import UsersRepository from "../../../repositories/UsersRepository"

class GetAllUsersUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute(data: User): Promise<string>{
        const uuid = await this.usersRepository.create(data)

        return uuid
    }
}

export default GetAllUsersUseCase