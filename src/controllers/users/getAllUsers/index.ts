import UsersRepository from "../../../repositories/UsersRepository"
import GetAllUsersController from "./GetAllUsersController"
import GetAllUsersUseCase from "./GetAllUsersUseCase"

const usersRepository = new UsersRepository()
const getAllUsersUseCase = new GetAllUsersUseCase(usersRepository)
const getAllUsersController = new GetAllUsersController(getAllUsersUseCase)

export default getAllUsersController