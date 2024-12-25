<script lang="ts">
	import socket from "$lib/socket";
	import { addRoom } from "$lib/stores/myRooms";

	let roomName = "";

	function createRoom() {
		if (roomName.trim()) {
			socket.emit("createRoom", roomName);
			roomName = "";
		}
	}

	socket.on("roomCreated", (room) => {
		console.log(`Room created: ${room}`);
		addRoom(room);
	});
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
		on:click={createRoom}
		class="w-full py-2 px-4 variant-filled-primary text-white font-semibold shadow-md focus:outline-none rounded-md"
		>Sunucu oluştur</button
	>
</form>
