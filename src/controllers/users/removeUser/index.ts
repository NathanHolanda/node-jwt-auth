import RemoveUserController from "./RemoveUserController"
import RemoveUserUseCase from "./RemoveUserUseCase"

const removeUserUseCase = new RemoveUserUseCase()
const removeUserController = new RemoveUserController(removeUserUseCase)

export default removeUserController