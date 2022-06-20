import { User } from "../models/User";
import pool from "../db"
import dotenv from "dotenv"

class UsersRepository{
    constructor(){
        dotenv.config()
    }

    async getAll(): Promise<User[]>{
        const q = `
            SELECT uuid, name
            FROM users
        `

        const {rows} = await pool.query<User>(q)
  
        return rows
    }

    async find(uuid: string): Promise<User>{
        const q = `
            SELECT uuid, name 
            FROM users 
            WHERE uuid = $1
        `
        const values = [uuid]

        const {rows} = await pool.query<User>(q, values)
        const [user] = rows

        return user
    }

    async create(user: User): Promise<string>{
        const cryptKey = process.env.PG_PASSWORD_CRYPT_KEY
        const q = `
            INSERT INTO users("name", "password")
            VALUES($1, crypt($2, '${cryptKey}'))
            RETURNING uuid
        `

        const values = [user.name, user.password]

        const {rows} = await pool.query<{uuid: string}>(q, values)
        const [row] = rows
        const {uuid} = row

        return uuid
    }
}

export default UsersRepository