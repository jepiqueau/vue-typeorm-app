<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>Home</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Home</ion-title>
				</ion-toolbar>
			</ion-header>
        <div id="log">
            <pre>
                <p>{{log}}</p>
            </pre>
            <div v-if="errMess.length > 0">
                <p>{{errMess}}</p>}
            </div>
        </div>
		<div id="items">
			<h2>Items</h2>
			<ul>
			<li v-for="item in items" :key="item.id">
				{{ item.name }} {{ item.phoneNumber }}
			</li>
			</ul>
		</div>
		<div id="users">
			<h2>Users</h2>
			<ul>
				<li v-for="user in users" :key="user.id">
					{{user.firstName}} {{user.lastName}} 
					<ul>
						<li v-for="item in user.items" :key="item.id">
							{{ item.name }} {{ item.phoneNumber }}
						</li>
					</ul>
				</li>
			</ul>
		</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/vue';
import {defineComponent, onBeforeMount, getCurrentInstance } from 'vue';
import {getConnection} from "typeorm";
import {Item} from "@/entity/item";
import {User} from "@/entity/user";
import {useState} from '@/composables/state';

export default defineComponent({
	name: 'Home',
	components: {
		IonContent,
		IonHeader,
		IonPage,
		IonTitle,
		IonToolbar,
	},
	setup() {
		const app = getCurrentInstance();
		const [log, setLog] = useState("");
		const [items, setItems] = useState([]);
		const [users, setUsers] = useState([]);
		let errMess = "";
		if(app != null) {
			const platform = app.appContext.config.globalProperties.$platform;
			const sqlite= app.appContext.config.globalProperties.$sqlite;
			onBeforeMount(async () => {
			setLog(log.value
                    .concat("\n* Start testing *\n"));

			try {

				const connection = getConnection('userConnection');
				const database = connection.options.database;
				// create a user
				const user = new User();
				user.firstName = "Arthur";
				user.lastName = "Ashe";
				user.email = "arthur.ashe@example.com";
				const userRepository = connection.getRepository(User);
				let userToUpdate = await userRepository.findOne({email: user.email})
				console.log(`$$$$ userToUpdate : ${JSON.stringify(userToUpdate)}`)
				if( userToUpdate != null) {
					user.id = userToUpdate.id;
				}
				await userRepository.save(user);

				// create a second user was added later to test live-reload
				const user1 = new User();
				user1.firstName = "Dan";
				user1.lastName = "Jeep";
				user1.email = "dan.jeep@example.com";
				userToUpdate = await userRepository.findOne({email: user1.email})
				console.log(`$$$$ userToUpdate : ${JSON.stringify(userToUpdate)}`)
				if( userToUpdate != null) {
					user1.id = userToUpdate.id;
				}
				await userRepository.save(user1);


/*		await connection.manager.find(User)
				
						.save(user)
						.then(user => {
							setLog(log.value.concat(`User has been saved. User id: ${user.id}\n`));
							console.log("User has been saved. User id is", user.id);
						})

						.catch(err => {
							console.log(`Error User ${err.message}`);
						});
*/
/*					.insert(user)
					.into(Tokens)
					.values(post2)
					.onConflict(`("userId") DO UPDATE SET UUID = :uuid`)
					.setParameter("title", values.uuid)
					.execute();
*/
				// create items
				const item1 = new Item();
				item1.name = 'Iphone 12 Pro Max';
				item1.phoneNumber = 123456789;
				item1.user = user;
				const item2 = new Item();
				item2.name = 'Galaxy S21';
				item2.phoneNumber = 132456789;
				item2.user = user;
				const itemRepository = connection.getRepository(Item);
				let itemToUpdate = await itemRepository.findOne({phoneNumber: item1.phoneNumber})
				console.log(`$$$$ itemToUpdate : ${JSON.stringify(itemToUpdate)}`)
				if( itemToUpdate != null) {
					item1.id = itemToUpdate.id;
				}
				await itemRepository.save(item1);

				itemToUpdate = await itemRepository.findOne({phoneNumber: item2.phoneNumber})
				console.log(`$$$$ itemToUpdate : ${JSON.stringify(itemToUpdate)}`)
				if( itemToUpdate != null) {
					item2.id = itemToUpdate.id;
				}
				await itemRepository.save(item2);

				// added later to test live-reload
				const item3 = new Item();
				item3.name = 'Note 3';
				item3.phoneNumber = 732456189;
				item3.user = user1;
				itemToUpdate = await itemRepository.findOne({phoneNumber: item3.phoneNumber})
				console.log(`$$$$ itemToUpdate : ${JSON.stringify(itemToUpdate)}`)
				if( itemToUpdate != null) {
					item3.id = itemToUpdate.id;
				}
				await itemRepository.save(item3);

				/*
				await connection.manager
						.save(item1)
						.then(item1 => {
							setLog(log.value.concat(`Item1 has been saved. Item id: ${item1.id}\n`));
							console.log("Item has been saved. Item id is", item1.id);
						})
						.catch(err => {
							console.log(`Error Item ${err.message}`);
						});

				await connection.manager
						.save(item2)
						.then(item => {
							setLog(log.value.concat(`Item2 has been saved. Item id: ${item.id}\n`));
							console.log("Item has been saved. Item id is", item.id);
						});

*/
				if(platform === 'web') {
					await sqlite.saveToStore(database);
				}
				const savedItems = await connection.manager.find(Item);
				setLog(log.value.concat(`Saved items from the db successful\n`));
				console.log("$$$ Saved items from the db: ", savedItems);
				setItems(savedItems);
				const loadedUsers = await connection.createQueryBuilder(User,"user")
					.innerJoinAndSelect("user.items","item")
					.orderBy('user.lastName,item.name')
					.getMany();
				setLog(log.value.concat(`Saved users from the db successful \n`));
				console.log("$$$ Saved users from the db: ", loadedUsers);
				setUsers(loadedUsers);


			} catch (e) {
				console.log(e.message);
				errMess = `Error: ${e.message}`;
			}
		})
		} else {
			errMess = `Error: app is null or undefined`;
		}
		return {log, items, users, errMess};
	},
});
</script>

