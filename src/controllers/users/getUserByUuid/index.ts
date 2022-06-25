import UsersRepository from "../../../repositories/UsersRepository"
import GetUserByUuidController from "./GetUserByUuidController"
import GetUserByUuidUseCase from "./GetUserByUuidUseCase"

const usersRepository = new UsersRepository()
const getUserByUuidUseCase = new GetUserByUuidUseCase(usersRepository)
const getUserByUuidController = new GetUserByUuidController(getUserByUuidUseCase)

export default getUserByUuidController