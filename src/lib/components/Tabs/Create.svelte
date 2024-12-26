<script lang="ts">
	import { supabase } from "$lib/supabaseClient";
	import { writable } from "svelte/store";
	import { user } from "$lib/stores/user";

	let roomName = "";
	let errorMessage = writable("");
	let successMessage = writable("");

	async function createRoom() {
		const currentUser = $user;
		if (!currentUser) {
			errorMessage.set("You must be logged in to create a room.");
			return;
		}

		if (roomName.trim()) {
			const { data, error } = await supabase
				.from("rooms")
				.insert([{ name: roomName, admin_id: currentUser.id }]);

			if (error) {
				errorMessage.set(`Error creating room: ${error.message}`);
				console.error("Error creating room:", error);
			} else {
				successMessage.set("Room created successfully!");
				console.log("Room created:", data);
				roomName = "";
			}
		} else {
			errorMessage.set("Room name cannot be empty");
		}
	}
</script>

<form
	on:submit|preventDefault={createRoom}
	class="create-room max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md"
>
	<label class="label block mb-4">
		<span class="block text-sm font-medium text-gray-700">Sunucuna isim ver</span>
		<input
			class="input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
			type="text"
			bind:value={roomName}
			placeholder="Dingo'nun ahırı"
		/>
	</label>
	<button
		type="submit"
		class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
	>
		Oda Oluştur
	</button>
</form>

<p class="text-red-500 mt-4">{$errorMessage}</p>
<p class="text-green-500 mt-4">{$successMessage}</p>
