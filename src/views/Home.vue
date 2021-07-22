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
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/vue';
import {defineComponent, onBeforeMount} from 'vue';
import {getConnection} from "typeorm";
import {Item} from "@/entity/item";

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
		onBeforeMount(async () => {
			try {
				const connection = getConnection();

				const item = new Item();
				item.name = 'Item Foo';
				item.phoneNumber = 123456789;

				await connection.manager
						.save(item)
						.then(item => {
							console.log("Item has been saved. Item id is", item.id);
						});

				const savedItems = await connection.manager.find(Item);
				console.log("All items from the db: ", savedItems);

			} catch (e) {
				console.log(e.message);
			}
		})
	},
});
</script>

