<script lang="ts">
	import { supabase } from "$lib/supabaseClient";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { user } from "$lib/stores/user";

	const joinedRooms = writable<any[]>([]);
	const errorMessage = writable("");
	
	async function listJoinedRooms() {
		if (!$user) {
			errorMessage.set("You must be logged in to view your rooms.");
			return;
		}

		// Kullanıcının bağlı bulunduğu odaların kimliklerini al
		const { data: userData, error: userError } = await supabase
			.from("user_data")
			.select("joined_rooms")
			.eq("user_id", $user.id)
			.single();

		if (userError) {
			errorMessage.set(`Error fetching user data: ${userError.message}`);
			console.error("Error fetching user data:", userError);
			return;
		}

		if (userData && userData.joined_rooms.length > 0) {
			// Bağlı bulunduğu odaların detaylarını al
			const { data: roomsData, error: roomsError } = await supabase
				.from("rooms")
				.select("*")
				.in("id", userData.joined_rooms);

			if (roomsError) {
				errorMessage.set(`Error fetching rooms: ${roomsError.message}`);
				console.error("Error fetching rooms:", roomsError);
			} else {
				joinedRooms.set(roomsData);
				errorMessage.set("");
			}
		} else {
			joinedRooms.set([]);
			errorMessage.set("No rooms found.");
		}
	}

	onMount(() => {
		listJoinedRooms();

		const channel = supabase
			.channel("rooms")
			.on("postgres_changes", { event: "*", schema: "public", table: "rooms" }, (payload) => {
				console.log("Change received!", payload);
				listJoinedRooms();
			})
			.subscribe();

		return () => {
			// No need to remove subscription as it is not a valid method
			supabase.removeChannel(channel);
		};
	});
</script>

<div class="max-w-md flex flex-col mx-auto mt-10 p-6 rounded-lg shadow-md">
	<h2 class="mb-4 opacity-50">Bağlı olduğun sunucular</h2>
	<ul class="list-none p-0">
		{#each $joinedRooms as room}
			<li class="py-2">
				<p>{room.name}</p>
			</li>
		{/each}
	</ul>
	<button
		on:click={listJoinedRooms}
		class="mt-4 py-2 px-4 variant-filled-primary font-semibold rounded-md shadow-md"
	>
		Yenile
	</button>
	{#if $errorMessage}
		<p class="text-red-500 mt-4">{$errorMessage}</p>
	{/if}
</div>
