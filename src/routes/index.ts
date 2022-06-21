import { Router } from "express"
import usersRoutes from "./users.routes"
import errorHandler from "../middlewares/errorHandler"

const routes = Router()

routes.use("/users", usersRoutes)
routes.use(errorHandler)

export default routes