import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPostTable1626863626672 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE "post" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "phoneNumber" integer UNIQUE NOT NULL,
                "authorId" integer, CONSTRAINT "FK_Post1_Author1" FOREIGN KEY ("authorId") REFERENCES "author1" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            );
        `);
		await queryRunner.query(`
            CREATE TABLE "post_categories_category" (
                "postId" integer NOT NULL,
                "categoryId" integer NOT NULL,
                CONSTRAINT "FK_Post_Categories_Category_PostId"
                FOREIGN KEY ("postId") REFERENCES "post1" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_Post_Categories_Category_CategoryId"
                FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("postId", "categoryId"));
        `);
		await queryRunner.query(`
            CREATE INDEX "IDX_Post_Categories_Category_PostId" ON "post_categories_category" ("postId");
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_Post_Categories_Category_CategoryId" ON "post_categories_category" ("categoryId");      
        `);
    }

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            DROP TABLE "post";
        `);
		await queryRunner.query(`
            DROP TABLE "post_categories_category";
        `);
		await queryRunner.query(`
            DROP INDEX "IDX_Post_Categories_Category_PostId";
        `);
		await queryRunner.query(`
            DROP INDEX "IDX_Post_Categories_Category_CategoryId";
        `);
	}

}
