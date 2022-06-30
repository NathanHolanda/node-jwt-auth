import GetUserByUuidController from "./GetUserByUuidController"
import GetUserByUuidUseCase from "./GetUserByUuidUseCase"

const getUserByUuidUseCase = new GetUserByUuidUseCase()
const getUserByUuidController = new GetUserByUuidController(getUserByUuidUseCase)

export default getUserByUuidController