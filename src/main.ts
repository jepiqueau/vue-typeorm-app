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

import {createConnection} from 'typeorm';
import {CapacitorSQLite, SQLiteConnection} from '@capacitor-community/sqlite';
import {Item} from "@/entity/item";
import {User} from "@/entity/user";
import {AddItemTable1626863626662} from "@/migration/1626863626662-AddItemTable";
import {AddUserTable1626944570684} from "@/migration/1626944570684-AddUserTable";
const app = createApp(App)
	.use(IonicVue)
	.use(router);

if (isPlatform('capacitor')) {
	const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

	createConnection({
		type: 'capacitor',
		driver: sqliteConnection,
		database: 'ionic-vue',
		entities: [Item, User],
		migrations: [AddItemTable1626863626662, AddUserTable1626944570684],
		logging: ['error', 'query', 'schema'],
		synchronize: true,
		migrationsRun: false,
	}).then(async connection => {
		try {
			// run all migrations
			await connection.runMigrations();
		} catch (e) {
			console.log(e.message);
		}
		router.isReady().then(() => {
			app.mount("#app");
		});
	})
} else {
	router.isReady().then(() => {
		app.mount("#app");
	});
}
