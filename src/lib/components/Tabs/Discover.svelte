<script lang="ts">
	import socket from "$lib/socket";
	import { onMount } from "svelte";
	import { myRooms, addRoom } from "$lib/stores/myRooms";

	let rooms: string[] = [];
	let connectedRooms: string[] = [];

	function getAllRooms() {
		socket.emit("getAllRooms");
	}

	function connectToRoom(room: string) {
		socket.emit("joinRoom", room);
		addRoom(room);
		// join olunan odayı listeden kaldır:
		rooms = rooms.filter((r) => r !== room);
	}

	onMount(() => {
		socket.on("allRooms", (roomsList: string[]) => {
			rooms = roomsList.filter((room) => !connectedRooms.includes(room));
		});

		myRooms.subscribe((value) => {
			connectedRooms = value;
		});

		getAllRooms();
	});
</script>

<div class="max-w-md flex flex-col mx-auto mt-10 p-6 rounded-lg shadow-md">
	<h2 class="mb-4 opacity-50">Diğer sunucular</h2>
	<ul class="list-none p-0">
		{#each rooms as room}
			<li class="py-2 flex justify-between items-center">
				{room}
				<button
					on:click={() => connectToRoom(room)}
					class="ml-4 py-1 px-3 variant-filled-primary font-semibold rounded-md shadow-md"
					>Bağlan</button
				>
			</li>
		{/each}
	</ul>
	<button
		on:click={getAllRooms}
		class="mt-4 py-2 px-4 variant-filled-primary font-semibold rounded-md shadow-md">Yenile</button
	>
</div>
