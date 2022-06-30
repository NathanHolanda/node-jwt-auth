import UsersRepository from "../../../database/repositories/UsersRepository"
import CreateUserController from "./CreateUserController"
import CreateUserUseCase from "./CreateUserUseCase"

const usersRepository = new UsersRepository()
const createUserUseCase = new CreateUserUseCase(usersRepository)
const createUserController = new CreateUserController(createUserUseCase)

export default createUserController