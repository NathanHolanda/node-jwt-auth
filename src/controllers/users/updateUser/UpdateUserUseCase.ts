import { User } from "../../../models/User";
import UsersRepository from "../../../repositories/UsersRepository";

class UpdateUserUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute(uuid: string, data: User): Promise<void>{
        await this.usersRepository.modify(uuid, data)
    }
}

export default UpdateUserUseCase