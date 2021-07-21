import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

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

import { createConnection } from 'typeorm';
import { User } from '@/entity/user';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';



const app = createApp(App)
  .use(IonicVue)
  .use(router);

const sqliteConnection =  new SQLiteConnection(CapacitorSQLite);

const typeOrmConnection = async () => {
  await createConnection({
      type: 'capacitor',
      driver: sqliteConnection, 
      database: 'ionic-vue-db',
      entities: [User],
      logging: ['error', 'query', 'schema'],
      synchronize: true
  });
}
  
// Share SQLite connection
app.config.globalProperties.$sqliteConnection = sqliteConnection;
  
router.isReady().then(() => {
  typeOrmConnection().then(() => {
    app.mount("#app");
  });
});