import UsersRepository from "../../../repositories/UsersRepository";

class RemoveUserUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute(uuid: string): Promise<void>{
        await this.usersRepository.remove(uuid)
    }
}

export default RemoveUserUseCase