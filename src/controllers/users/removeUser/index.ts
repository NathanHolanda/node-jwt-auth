import UsersRepository from "../../../repositories/UsersRepository"
import RemoveUserController from "./RemoveUserController"
import RemoveUserUseCase from "./RemoveUserUseCase"

const usersRepository = new UsersRepository()
const removeUserUseCase = new RemoveUserUseCase(usersRepository)
const removeUserController = new RemoveUserController(removeUserUseCase)

export default removeUserController