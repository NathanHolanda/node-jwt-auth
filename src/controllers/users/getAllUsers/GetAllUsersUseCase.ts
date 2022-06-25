import { User } from "../../../models/User"
import UsersRepository from "../../../repositories/UsersRepository"

class GetAllUsersUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute(): Promise<User[]>{
        const users = await this.usersRepository.getAll()

        return users
    }
}

export default GetAllUsersUseCase