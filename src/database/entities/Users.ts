import { Column, Entity, PrimaryColumn } from "typeorm"
import { IUser } from "../../interfaces/IUser"

@Entity()
class Users implements IUser{
    @PrimaryColumn("uuid")
    uuid?: string
    
    @Column("varchar")
    username!: string

    @Column("varchar")
    password?: string
}

export { Users }

