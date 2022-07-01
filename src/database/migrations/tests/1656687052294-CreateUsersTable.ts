import { MigrationInterface, QueryRunner } from "typeorm";
import encryptPassword from "../../../utils/encryptPassword"

export class CreateUsersTable1656687052294 implements MigrationInterface {
    name = 'CreateUsersTable1656687052294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
                "uuid" UUID DEFAULT uuid_generate_v4(),
                "username" VARCHAR UNIQUE NOT NULL,
                "password" VARCHAR NOT NULL,
                PRIMARY KEY (uuid)
            )
        `)
        
        const password = await encryptPassword("admin")

        await queryRunner.query(`
            INSERT INTO users (
                "uuid",
                "username",
                "password"
            ) 
            VALUES (
                '17c4710f-10d3-40df-9a7f-601e76de1cd6',
                'nathan', 
                '${password}'
            )
        `)
        await queryRunner.query(`
            INSERT INTO users (
                "uuid",
                "username",
                "password"
            ) 
            VALUES (
                'a11c0479-4503-4ae8-9020-bda26045d8c4',
                'maria', 
                '${password}'
            )
        `)
        await queryRunner.query(`
            INSERT INTO users (
                "uuid",
                "username",
                "password"
            ) 
            VALUES (
                '874fb245-c827-41a0-a6da-4188bd9803b7',
                'joao', 
                '${password}'
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
