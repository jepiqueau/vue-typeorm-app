import { Post } from '@/entity/post';
import { Author } from '@/entity/author';
import { Category } from '@/entity/category';
import { AddPostTable1626863626672 } from '@/migration/1626863626672-AddPostTable';
import { AddAuthorTable1626944570694 } from '@/migration/1626944570694-AddAuthorTable';
import { AddCategoryTable1627029917418 } from '@/migration/1627029917418-AddCategoryTable';
import { DataSource } from 'typeorm';
import sqliteConnection from '@/database';

export default new DataSource({
  name: 'authorConnection',
  type: 'capacitor',
  driver: sqliteConnection,
  database: 'ionic-vue-author',
  entities: [Author, Post, Category],
  migrations: [
    AddAuthorTable1626944570694,
    AddPostTable1626863626672,
    AddCategoryTable1627029917418,
  ],
  logging: ['error', 'query', 'schema'],
  synchronize: false,
  migrationsRun: false,
});
