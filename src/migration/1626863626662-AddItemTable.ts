import {MigrationInterface, QueryRunner/*, Table*/} from "typeorm";

export class AddItemTable1626863626662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
/*        await queryRunner.createTable(new Table({
            name: "item",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "phoneNumber",
                    type: "integer",
                },
            ]
        }), true)
*/
		await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS item (
                id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
                name VARCHAR NOT NULL,
                phoneNumber INTEGER NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query("DROP TABLE item;");
    }

}
