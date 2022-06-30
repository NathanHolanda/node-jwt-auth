import bcrypt from "bcrypt"
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm"
import encryptPassword from "../../utils/encryptPassword"

@Entity()
class Users{
    @PrimaryColumn("uuid")
    uuid?: string
    
    @Column("varchar")
    username!: string

    @Column("varchar")
    password?: string

    @BeforeInsert()
    async afterInsert(){
        if(this.password){
            this.password = await encryptPassword(this.password)
        }
    }
}

export { Users }
