import UsersRepository from "../../../repositories/UsersRepository"
import UpdateUserController from "./UpdateUserController"
import UpdateUserUseCase from "./UpdateUserUseCase"

const usersRepository = new UsersRepository()
const updateUserUseCase = new UpdateUserUseCase(usersRepository)
const updateUserController = new UpdateUserController(updateUserUseCase)

export default updateUserController