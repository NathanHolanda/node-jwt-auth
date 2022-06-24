import { Router } from "express"
import errorHandler from "../middlewares/errorHandler"
import authRoutes from "./auth.routes"
import statusRoutes from "./status.routes"
import usersRoutes from "./users.routes"

const routes = Router()

routes.use(statusRoutes)
routes.use("/users", usersRoutes)
routes.use("/token", authRoutes)
routes.use(errorHandler)

export default routes