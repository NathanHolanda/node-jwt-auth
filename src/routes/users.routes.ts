import { NextFunction, Request, Response, Router } from "express"
import createUserController from "../controllers/users/createUser"
import getAllUsersController from "../controllers/users/getAllUsers"
import getUserByUuidController from "../controllers/users/getUserByUuid"
import removeUserController from "../controllers/users/removeUser"
import updateUserController from "../controllers/users/updateUser"
import jwtAuthentication from "../middlewares/jwtAuthentication"

const routes = Router()

routes.use(jwtAuthentication)

routes.get(
    '/', 
    async (req: Request, res: Response, next: NextFunction) => {
        return await getAllUsersController.handle(req, res, next)
    }
)
    
routes.get(
    '/:uuid',
    async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
        return await getUserByUuidController.handle(req, res, next)
    }
)

routes.post(
    '/', 
    async (req: Request, res: Response, next: NextFunction) => {
        return await createUserController.handle(req, res, next)
    }
)

routes.put(
    '/:uuid', 
    async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
        return await updateUserController.handle(req, res, next)
    }
)

routes.delete(
    '/:uuid', 
    async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
        return await removeUserController.handle(req, res, next)
    }
)

export default routes