import { User } from "../models/User";
import pool from "../db"
import dotenv from "dotenv"

class UsersRepository{
    constructor(){
        dotenv.config()
    }

    async getAll(): Promise<User[]>{
        const script = `
            SELECT uuid, name
            FROM users
        `

        const {rows} = await pool.query<User>(script)
  
        return rows
    }

    async find(uuid: string): Promise<User>{
        const script = `
            SELECT uuid, name 
            FROM users 
            WHERE uuid = $1
        `
        const values = [uuid]

        const {rows} = await pool.query<User>(script, values)
        const [user] = rows

        return user
    }

    async create(user: User): Promise<string>{
        const cryptKey = process.env.PG_PASSWORD_CRYPT_KEY
        const script = `
            INSERT INTO users("name", "password")
            VALUES($1, crypt($2, '${cryptKey}'))
            RETURNING uuid
        `

        const values = [user.name, user.password]

        const { rows: [row] } = await pool.query<{uuid: string}>(script, values)
        const {uuid} = row

        return uuid
    }

    async modify(uuid: string, user: User): Promise<void>{
        const cryptKey = process.env.PG_PASSWORD_CRYPT_KEY
        const script = `
            UPDATE users
            SET "name" = $1, "password" = crypt($2, '${cryptKey}')
            WHERE uuid = $3
        `

        const values = [user.name, user.password, uuid]

        await pool.query(script, values)
    }

    async remove(uuid: string): Promise<void>{
        const script = `
            DELETE FROM users
            WHERE uuid = $1
        `

        const values = [uuid]

        await pool.query(script, values)
    }
}

export default UsersRepository