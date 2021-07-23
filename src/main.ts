import {createApp} from 'vue'
import App from './App.vue'
import router from './router';

import {IonicVue, isPlatform} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import {createConnections, createConnection, Connection} from 'typeorm';
import {CapacitorSQLite, SQLiteConnection} from '@capacitor-community/sqlite';
import {Item} from "@/entity/item";
import {User} from "@/entity/user";
import {AddItemTable1626863626662} from "@/migration/1626863626662-AddItemTable";
import {AddUserTable1626944570684} from "@/migration/1626944570684-AddUserTable";
import {Post} from "@/entity/post";
import {Author} from "@/entity/author";
import {AddPostTable1626863626672} from "@/migration/1626863626672-AddPostTable";
import {AddAuthorTable1626944570694} from "@/migration/1626944570694-AddAuthorTable";
import {Category} from "@/entity/category";
import {AddCategoryTable1627029917418} from "@/migration/1627029917418-AddCategoryTable";

const app = createApp(App)
	.use(IonicVue)
	.use(router);

if (isPlatform('capacitor')) {
	const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

	createConnections([
		{
			name:'userConnection',
			type: 'capacitor',
			driver: sqliteConnection,
			database: 'ionic-vue-user',
			entities: [User, Item],
			migrations: [AddUserTable1626944570684, AddItemTable1626863626662],
			logging: ['error', 'query', 'schema'],
			synchronize: false,
			migrationsRun: false,
		},
		{
			name:'authorConnection',
			type: 'capacitor',
			driver: sqliteConnection,
			database: 'ionic-vue-author',
			entities: [Author, Post, Category],
			migrations: [AddAuthorTable1626944570694, AddPostTable1626863626672, AddCategoryTable1627029917418],
			logging: ['error', 'query', 'schema'],
			synchronize: false,
			migrationsRun: false,
		}
	])
	.then(async connections => {
		try {
			// run all migrations
			for (const connection of connections) {
				await connection.runMigrations();
			}
			router.isReady().then(() => {
				app.mount("#app");
			});
		} catch (e) {
			console.log(e.message);
		}
	})

} else {
	router.isReady().then(() => {
		app.mount("#app");
	});
}
