import { Router } from "express"
import errorHandler from "../middlewares/errorHandler"
import authRoutes from "./auth.routes"
import usersRoutes from "./users.routes"

const routes = Router()

routes.use("/users", usersRoutes)
routes.use(authRoutes)
routes.use(errorHandler)

export default routes