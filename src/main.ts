import {createApp, ref} from 'vue';
import App from './App.vue';
import router from './router';

import {IonicVue} from '@ionic/vue';

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

import { defineCustomElements as jeepSqlite, applyPolyfills } from "jeep-sqlite/loader";
import { Capacitor } from '@capacitor/core';
import {createConnections} from 'typeorm';
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

applyPolyfills().then(() => {
    jeepSqlite(window);
});

window.addEventListener('DOMContentLoaded', async () => {
  
	const app = createApp(App)
		.use(IonicVue)
		.use(router);

	const sqliteConnection = new SQLiteConnection(CapacitorSQLite);
//	const platform = ref(Capacitor.getPlatform());
	const platform = Capacitor.getPlatform();
	app.config.globalProperties.$platform = platform;
	app.config.globalProperties.$sqlite = sqliteConnection;

	try {
		if(platform === "web") {
			const jeepEl = document.querySelector('jeep-sqlite');
			if(jeepEl != null) {
				document.body.removeChild(jeepEl);
			}
			// Create the 'jeep-sqlite' Stencil component
			const jeepSqlite = document.createElement('jeep-sqlite');
			document.body.appendChild(jeepSqlite);
			await customElements.whenDefined('jeep-sqlite');
			// Initialize the Web store
			await sqliteConnection.initWebStore();
		}
		// when using Capacitor, you might want to close existing connections, 
		// otherwise new connections will fail when using dev-live-reload
		// see https://github.com/capacitor-community/sqlite/issues/106
		CapacitorSQLite.checkConnectionsConsistency({
			dbNames: [], // i.e. "i expect no connections to be open"
		}).catch((e) => {
			// the plugin throws an error when closing connections. we can ignore
			// that since it is expected behaviour
			console.log(e);
			return {};
		});
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
				if(platform === "web") {
					// save the database from memory to store
					await sqliteConnection.saveToStore('ionic-vue-user');
					await sqliteConnection.saveToStore('ionic-vue-author');
				}
				
				router.isReady().then(() => {
					app.mount("#app");
				});
			} catch (err) {
				console.log(`Error in runMigrations: ${err}`);
				throw new Error(`Error in runMigrations: ${err}`)
			}
		})		  

	} catch (err) {
		console.log(`Error: ${err}`);
		throw new Error(`Error: ${err}`)
	}
});
