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
import {defineComponent, onBeforeMount} from 'vue';
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
		const [log, setLog] = useState("");
		const [items, setItems] = useState([]);
		const [users, setUsers] = useState([]);
		let errMess = "";
		onBeforeMount(async () => {
			setLog(log.value
                    .concat("\n* Start testing *\n"));

			try {

				const connection = getConnection();
				// create a user
				const user = new User();
				user.firstName = "Arthur";
				user.lastName = "Ashe";
				user.email = "arthur.ashe@example.com";
				
				await connection.manager
						.save(user)
						.then(user => {
							setLog(log.value.concat(`User has been saved. User id: ${user.id}\n`));
							console.log("User has been saved. User id is", user.id);
						});

				// create items
				const item1 = new Item();
				item1.name = 'Iphone 12 Pro Max';
				item1.phoneNumber = 123456789;
				item1.user = user;
				const item2 = new Item();
				item2.name = 'Galaxy S21';
				item2.phoneNumber = 132456789;
				item2.user = user;

				await connection.manager
						.save(item1)
						.then(item1 => {
							setLog(log.value.concat(`Item1 has been saved. Item id: ${item1.id}\n`));
							console.log("Item has been saved. Item id is", item1.id);
						});
				await connection.manager
						.save(item2)
						.then(item => {
							setLog(log.value.concat(`Item2 has been saved. Item id: ${item.id}\n`));
							console.log("Item has been saved. Item id is", item.id);
						});


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
		return {log, items, users, errMess};
	},
});
</script>

