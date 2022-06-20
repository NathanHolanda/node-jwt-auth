import { User } from "../models/User";
import pool from "../db"

class UsersRepository{
    async getAllUsers(): Promise<User[]>{
        const q = "SELECT uuid, name FROM users"

        const result = await pool.query<User>(q)
        const data = result.rows

        return data
    }
}

export default UsersRepository