<script lang="ts">
	import socket from "$lib/socket";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

	const myRooms = writable<string[]>([]);

	function listMyRooms() {
		socket.emit("listMyRooms");
	}

	onMount(() => {
		socket.on("myRooms", (roomsList: string[]) => {
			myRooms.set(roomsList);
		});

		listMyRooms();
	});
</script>

<div class="max-w-md flex flex-col mx-auto mt-10 p-6 rounded-lg shadow-md">
	<h2 class="mb-4 opacity-50">Bağlı olduğun sunucular</h2>
	<ul class="list-none p-0">
		{#each $myRooms as room}
			<li class="py-2">{room}</li>
		{/each}
	</ul>
	<button
		on:click={listMyRooms}
		class="mt-4 py-2 px-4 variant-filled-primary font-semibold rounded-md shadow-md">Yenile</button
	>
</div>
