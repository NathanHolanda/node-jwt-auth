import { SignOptions } from "jsonwebtoken"
import { User } from "../models/User"
import jwt from "jsonwebtoken"

function generateJwt(user: User) {
    const jwtPayload = {username: user.username}
        const jwtSecret = String(process.env.JWT_SECRET_KEY)
        const jwtOptions: SignOptions = {
            subject: user.uuid, 
            expiresIn: "15 min"
        }

        const jwtToken = jwt.sign(jwtPayload, jwtSecret, jwtOptions)

        const jwtRefreshPayload = {username: user.username}
        const jwtRefreshSecret = String(process.env.JWT_REFRESH_SECRET_KEY)
        const jwtRefreshOptions: SignOptions = {
            subject: user.uuid, 
            expiresIn: "3d"
        }

        const jwtRefreshToken = jwt.sign(jwtRefreshPayload, jwtRefreshSecret, jwtRefreshOptions)

        return {
            token: jwtToken,
            refreshToken: jwtRefreshToken
        }
}

export default generateJwt