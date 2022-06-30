import { Repository } from "typeorm"
import dataSource from "../../../database/dataSource"
import { Users } from "../../../database/entities/Users"
import DatabaseError from "../../../errors/DatabaseError"
import { User } from "../../../models/User"
import encryptPassword from "../../../utils/encryptPassword"

class GetAllUsersUseCase{
    constructor(){
        this.usersRepository = dataSource.getRepository(Users)
    }

    private usersRepository: Repository<Users>

    async execute(data: User): Promise<string>{
        try{
            if(data.password)
                data.password = await encryptPassword(data.password)

            const { identifiers } = await this.usersRepository
                .createQueryBuilder()
                .insert()
                .into(Users, ["username", "password"])
                .values(data)
                .returning(["uuid"])
                .execute()

            const [ {uuid} ] = identifiers
            
            return String(uuid)
        }catch(err: any){
            throw new DatabaseError("Error while creating a new user.")
        }
    }
}

export default GetAllUsersUseCase