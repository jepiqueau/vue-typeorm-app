<template>
    <div id="sqlite-service-container">
        <div id="message-container">
            <pre>
                <p>{{log}}</p>
            </pre>
            <div v-if="errMess.length > 0">
                <p>{{errMess}}</p>}
            </div>
            <div>
                <h2>Users</h2>
            </div>
            <div id="users-containers">
                <ul v-if="users">
                    <li v-for="user in users" :key="user.id">
                        {{ user.last_name }} {{ user.first_name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useState } from '@/composables/state';
//import SQLiteService  from '@/services/sqliteService';
import { Repository, getRepository } from 'typeorm';
import { User } from '@/entity/user';
//import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

export default defineComponent({
    name: 'SQLiteServiceTest',
    setup() {
        const [log, setLog] = useState("");
//        const sqliteService: SQLiteService  = new SQLiteService();
        const [users, setUsers] = useState([]);
        let errMess = "";

        onMounted(async () => {
            try {
                const user = new User();
                // eslint-disable-next-line @typescript-eslint/camelcase
                user.first_name = "Williams";
                // eslint-disable-next-line @typescript-eslint/camelcase
                user.last_name = "Clinton";
                user.email = "bill.clinton@example.com";
                console.log(`>>> User : ${JSON.stringify(user)}`);
                const userRepository = getRepository('user') as Repository<User>;
                await userRepository.save(user);
                const saveUser  = await userRepository.findOne(user);
                console.log(`>>> saveUser ${JSON.stringify(saveUser)}`);
                setUsers([...users.value, saveUser]);
                setLog(log.value
                    .concat("\n* The set of tests was successfull *\n"));

            } catch (err) {
                errMess = err;
                setLog(log.value
                        .concat("\n* The set of tests failed *\n"));
            }
            /*
            try {
                // Standard sqlite start up without the use of the hook
/*                await sqliteService.databaseStartup();
                console.log(`users from sqlite: ${JSON.stringify(sqliteService.users.value)}`);
                setUsers(sqliteService.users.value);
*/
                // *******************************************
                // TypeOrm Connection definition
//                await sqliteService.createTypeOrmConnection();

                // define a new user with typeOrmConn
/*                const user = new User();
                // eslint-disable-next-line @typescript-eslint/camelcase
                user.first_name = "Williams";
                // eslint-disable-next-line @typescript-eslint/camelcase
                user.last_name = "Clinton";
                user.email = "bill.clinton@example.com";
                console.log(`>>> User : ${user}`);
                await typeOrmConn.manager.save(user);
                console.log(`>>> Users: ${JSON.stringify(users)}`);

                // get users from typeOrmConn
                setUsers(await typeOrmConn.manager.find(User));
*/
                // ************************************************
/*
                setLog(log.value
                        .concat("\n* The set of tests was successfull *\n"));
            } catch (err) {
                errMess = err;
                setLog(log.value
                        .concat("\n* The set of tests failed *\n"));
            }
*/
        });
        return { log, errMess, users };
    },
});
</script>
<style scoped>
#message-container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 10%;
}
#users-containers {
    text-align: left;
    left: 10%;
}


</style>
