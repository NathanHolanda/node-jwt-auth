import { Repository } from "typeorm"
import { IUser } from "../../interfaces/IUser"
import dataSource from "../dataSource"
import { Users } from "../entities/Users"
import bcrypt from "bcrypt"

class UsersRepository{
    constructor(){
        this.users = dataSource.getRepository(Users)
    }

    private users: Repository<Users>

    async create(data: IUser): Promise<string>{
        const result = await this.users
            .createQueryBuilder()
            .insert()
            .into(Users, ["username", "password"])
            .values(data)
            .returning(["uuid"])
            .execute()

        const [ {uuid} ] = result.identifiers
        
        return String(uuid)
    }

    async getAll(): Promise<IUser[]>{
        const users = await this.users.find({
            select: {
                uuid: true,
                username: true
            }
        })

        return users
    }

    async getByUuid(uuid: string): Promise<IUser | null>{
        const user = await this.users.findOne({
            select: {
                uuid: true,
                username: true
            },
            where: {uuid}
        })

        return user
    }

    async remove(uuid: string): Promise<void>{
        await this.users
            .delete({uuid})
    }

    async update(uuid: string, data: IUser){
        await this.users
            .update({uuid}, data)
    }

    static async checkCredentials(username: string, password: string){
        const user = await dataSource
            .getRepository(Users)
            .findOneBy({username})

        const storedPassword = user?.password ?? null

        if(user && storedPassword){
            const isSame = await bcrypt.compare(password, storedPassword)

            if(isSame)
                return {
                    uuid: user.uuid,
                    username: user.username
                }
        }

        return null
    }
}

export default UsersRepository