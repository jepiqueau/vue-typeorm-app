import {MigrationInterface, QueryRunner} from "typeorm";

export class AddItemTable1626863626662 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE "item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "phoneNumber" integer UNIQUE NOT NULL,
                "userId" integer, CONSTRAINT "FK_Item_User" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            DROP TABLE "item"
        `);
	}

}
