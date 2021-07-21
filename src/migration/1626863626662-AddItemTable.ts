import {MigrationInterface, QueryRunner} from "typeorm";

export class AddItemTable1626863626662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE "item" (
                "id" integer PRIMARY KEY AUTO_INCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "phoneNumber" integer NOT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            DROP TABLE "item"
        `);
    }

}
