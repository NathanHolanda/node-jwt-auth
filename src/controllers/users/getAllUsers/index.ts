import GetAllUsersController from "./GetAllUsersController"
import GetAllUsersUseCase from "./GetAllUsersUseCase"

const getAllUsersUseCase = new GetAllUsersUseCase()
const getAllUsersController = new GetAllUsersController(getAllUsersUseCase)

export default getAllUsersController