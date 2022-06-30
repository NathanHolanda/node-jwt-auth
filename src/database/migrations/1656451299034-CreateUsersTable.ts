import { MigrationInterface, QueryRunner } from "typeorm"
import encryptPassword from "../../utils/encryptPassword"

export class CreateUsersTable1656451299034 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users(
                "uuid" UUID DEFAULT uuid_generate_v4(),
                "username" VARCHAR UNIQUE NOT NULL,
                "password" VARCHAR NOT NULL,
                PRIMARY KEY (uuid)
            )
        `)
        
        const password = await encryptPassword("admin")
        await queryRunner.query(`
            INSERT INTO users ("username", "password") VALUES ('nathan', '${password}')
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE IF EXISTS users")
        
        await queryRunner.query("DROP EXTENSION IF EXISTS \"uuid-ossp\"")
    }

}
