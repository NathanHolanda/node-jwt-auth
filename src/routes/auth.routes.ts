import dotenv from "dotenv";
import { NextFunction, Request, Response, Router } from "express";
import generateTokenController from "../controllers/auth/generateToken";
import refreshTokenController from "../controllers/auth/refreshToken";
import basicAuthentication from "../middlewares/basicAuthentication";
import jwtAuthentication from "../middlewares/jwtAuthentication";

dotenv.config()

const routes = Router()

routes.post(
    '/', 
    basicAuthentication, 
    (req: Request, res: Response, next: NextFunction) => {
        return generateTokenController.handle(req, res, next)
    }
)

routes.post(
    '/refresh', 
    (req: Request, res: Response, next: NextFunction) => {
        return refreshTokenController.handle(req, res, next)
    }
)

routes.post(
    '/validate', 
    jwtAuthentication, 
    (req: Request, res: Response, next: NextFunction) => {
        return res.json({message: "O token JWT tem formato válido."})
    }
)

export default routes