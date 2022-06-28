import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
class User{
    @PrimaryColumn("uuid")
    uuid?: string
    
    @Column("varchar")
    username!: string

    @Column("varchar")
    password?: string
}

export {User}