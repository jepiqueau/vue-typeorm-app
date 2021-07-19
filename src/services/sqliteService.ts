import { ref } from "vue";
// PLUGIN IMPORTS
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { Connection, createConnection } from 'typeorm';

export default class SQLiteService {
    database = ref<any>(null);
    users = ref<any>(null);
    databaseInitialized = ref(false); 
    sqlite: SQLiteConnection;
    constructor()  {
      this.sqlite = new SQLiteConnection(CapacitorSQLite);
    }

    /**
     * Create the database in the application
     */
    databaseStartup = async (): Promise<void> => {
        try {
            const res = await this.sqlite.isConnection('ionic-vue-db'); 
            if( res.result) {
              await this.sqlite.closeConnection('ionic-vue-db');
            }
            const db = await this.sqlite.createConnection(
                "ionic-vue-db",
                false,
                "no-encryption",
                1
            );

            if (!db) {
                return Promise.reject(`Error: Create Connection no such database`);
            }
            await db.open();
            this.database.value = db;

            await this.initDbTable();

            // Run once
            await this.addUser();

            this.databaseInitialized.value = true;

            await this.loaduserData();
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(`Error: databaseStartup ${err}`);
        }
    };
    /**
     * init thr tabvle users
     * @returns 
     */
    initDbTable = async (): Promise<void> => {
        const CREATE_TABLE =
        "CREATE TABLE IF NOT EXISTS users (" +
        "id INTEGER PRIMARY KEY NOT NULL," +
        "first_name TEXT NOT NULL," +
        "last_name TEXT NOT NULL," +
        "email TEXT NOT NULL UNIQUE );";
        try {
            const res = await this.database.value.execute(CREATE_TABLE); 
            if (res.changes.changes < 0) {
                return Promise.reject(`Error: Execute createTablesToEncrypt changes < 0`);
            }
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(`Error: initDbTable ${err}`);
        }
    };
    /**
     * Add a user
     * @returns 
     */
    addUser = async (): Promise<void> => {
        try {
            const res = await this.database.value.run(
                "INSERT INTO users (first_name, last_name, email) " +
                  "VALUES(?, ?, ?);",
                ["Allen", "Saunders", "allen@mail.com"]
            );
            if(res.changes.changes !== 1) {
                return Promise.reject(`Error: addUser changes != 1`);
            }
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(`Error: addUser ${err}`);
        }
    };
    /**
     * 
     * @returns Load Users data
     */
    loaduserData = async (): Promise<void> => {
        try {
            const res = await (this.database as any).value.query(
                "SELECT * FROM users;"
            );
            this.users.value = res.values;
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(`Error: Loading users ${err}`);
        }
    };
    /**
     * Create a TypeOrm connection
     */
    createTypeOrmConnection = async(): Promise<Connection> => {
      console.log("$$$ in createTypeOrmConnection ... $$$")
      try {
        const res = await this.sqlite.isConnection('ionic-vue-db'); 
        if( res.result) {
          await this.sqlite.closeConnection('ionic-vue-db');
          console.log("$$$ in createTypeOrmConnection close connection... $$$")
        }
        const typeOrmConnection = await createConnection({
          type: 'capacitor',
          driver: this.sqlite, 
          database: 'ionic-vue-db'
        });
        console.log(`$$$ typeOrmConnection: ${JSON.stringify(typeOrmConnection)}`);
        return Promise.resolve(typeOrmConnection);
      } catch (err) {
        return Promise.reject(`Error: createTypeOrmConnection ${err}`);
      }
    }
        
}
/*
const database = ref<any>(null);
const users = ref<any>(null);

const sqliteService = () => {
  const databaseInitialized = ref(false);
  // INIT DATABASE

  const initDbTable = async () => {
    const CREATE_TABLE =
      "CREATE TABLE IF NOT EXISTS users (" +
      "id INTEGER PRIMARY KEY NOT NULL," +
      "first_name TEXT NOT NULL," +
      "last_name TEXT NOT NULL," +
      "email TEXT NOT NULL UNIQUE );";
    const resp = await database.value?.query(CREATE_TABLE);

    if (resp.message) {
      throw new Error(resp?.message);
    }

    return true;
  };

  const addUser = async () => {
    const resp = await database.value?.run(
      "INSERT INTO users (first_name, last_name, email) " +
        "VALUES(?, ?, ?);",
      ["Allen", "Saunders", "allen@mail.com"]
    );
    if (resp.message) {
      throw new Error(resp?.message);
    }

    return true;
  };

  const loaduserData = async () => {
    try {
      const resp = await (database as any).value?.query(
        "SELECT * FROM users;"
      );
      users.value = resp.values;
      return true;
    } catch (e) {
      alert("Error Loading users");
    }
  };

  /**
   *
   * @param userId
   */
/*
  const deleteuserById = async (userId: string) => {
    const response = await database.value?.run(
      "DELETE FROM users WHERE id=?",
      [userId + ""]
    );
    await loaduserData();
    return response;
  };
*/
  /**
   *
   */
/*  const getuserById = async (userId: string) => {
    const result = await database.value?.query(
      "SELECT * FROM users WHERE id = ?;",
      [userId]
    );
    return result.values[0];
  };
*/
  /**
   *
   * @param firstName
   * @param lastName
   * @param email
   */
/*  const createuser = async (
    firstName: string,
    lastName: string,
    email: string
  ) => {
    const resp = await (database as any).value?.query(
      "INSERT INTO users (first_name, last_name, email) " + "VALUES(?,?,?)",
      [firstName, lastName, email]
    );
    await loaduserData();
    return resp;
  };
*/
  /**
   *
   * @param firstName
   * @param lastName
   * @param email
   * @param userId
   */
/*  const updateuser = async (
    firstName: string,
    lastName: string,
    email: string,
    userId: string
  ) => {
    const resp = await (database as any).value?.query(
      "UPDATE users SET first_name=?, last_name=?, email=? " + "WHERE id=?",
      [firstName, lastName, email, userId]
    );

    await loaduserData();
    return resp;
  };
*/
  /**
   * Create the database in the application
   */
/*  const databaseStartup = async () => {
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    const db = await sqlite.createConnection(
      "ionic-vue-db",
      false,
      "no-encryption",
      1
    );

    if (!db) throw new Error("No such database");
    await db?.open();
    database.value = db;

    await initDbTable();

    // Run once
    await addUser();

    databaseInitialized.value = true;

    await loaduserData();
  };

  return {
    // FUNCTIONS
    databaseStartup,
    loaduserData,
    deleteuserById,
    getuserById,
    createuser,
    updateuser,

    // PROPS
    databaseInitialized,
    users,
    database,
  };
};

*/