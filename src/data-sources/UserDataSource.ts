import { User } from '@/entity/user';
import { Item } from '@/entity/item';
import { DataSource } from 'typeorm';
import { AddUserTable1626944570684 } from '@/migration/1626944570684-AddUserTable';
import { AddItemTable1626863626662 } from '@/migration/1626863626662-AddItemTable';
import sqliteConnection from '@/database';

export default new DataSource({
  name: 'userConnection',
  type: 'capacitor',
  driver: sqliteConnection,
  database: 'ionic-vue-user',
  entities: [User, Item],
  migrations: [AddUserTable1626944570684, AddItemTable1626863626662],
  logging: ['error', 'query', 'schema'],
  synchronize: false,
  migrationsRun: false,
});
