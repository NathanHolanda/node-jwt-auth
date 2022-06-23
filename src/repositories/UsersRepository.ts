import dotenv from "dotenv";
import pool from "../db";
import DatabaseError from "../errors/DatabaseError";
import { User } from "../models/User";

class UsersRepository{
    constructor(){
        dotenv.config()
    }

    async getAll(): Promise<User[]>{
        try{
            const script = `
                SELECT "uuid", "username"
                FROM users
            `

            const {rows} = await pool.query<User>(script)
    
            return rows
        }catch(err: any){
            throw new DatabaseError("Error while getting all users.")
        }
    }

    async find(uuid: string): Promise<User | DatabaseError>{
        try{
            const script = `
                SELECT "uuid", "username" 
                FROM users 
                WHERE "uuid" = $1
            `
            const values = [uuid]

            const {rows} = await pool.query<User>(script, values)
            const [user] = rows

            return user
        }catch(err: any){
            throw new DatabaseError("Error while getting user by UUID.")
        }
    }

    async create(user: User): Promise<string>{
        try{
            const cryptKey = process.env.PG_PASSWORD_CRYPT_KEY
            const script = `
                INSERT INTO users("username", "password")
                VALUES($1, crypt($2, '${cryptKey}'))
                RETURNING "uuid"
            `

            const values = [user.username, user.password]

            const { rows: [row] } = await pool.query<{uuid: string}>(script, values)
            const {uuid} = row

            return uuid
        }catch(err: any){
            throw new DatabaseError("Error while creating a new user.")
        }
    }

    async modify(uuid: string, user: User): Promise<void>{
        try{
            const cryptKey = process.env.PG_PASSWORD_CRYPT_KEY
            const script = `
                UPDATE users
                SET "username" = $1, "password" = crypt($2, '${cryptKey}')
                WHERE "uuid" = $3
            `

            const values = [user.username, user.password, uuid]

            await pool.query(script, values)
        }catch(err: any){
            throw new DatabaseError("Error while updating user.")
        }
    }

    async remove(uuid: string): Promise<void>{
        try{
            const script = `
                DELETE FROM users
                WHERE "uuid" = $1
            `

            const values = [uuid]

            await pool.query(script, values)
        }catch(err: any){
            throw new DatabaseError("Error while deleting user.")
        }
    }

    async authenticate(username: string, password: string): Promise<User | null>{
        const cryptKey = process.env.PG_PASSWORD_CRYPT_KEY
        const script = `
            SELECT "uuid", "username"
            FROM users
            WHERE "username" = $1 
            AND "password" = crypt($2, '${cryptKey}')
        `
        
        const values = [username, password]

        const {rows: [user]} = await pool.query<User>(script, values)

        return user ?? null
    }
}

export default UsersRepository