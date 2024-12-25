<script lang="ts">
	import socket from '$lib/socket';
	import { onMount } from 'svelte';

	let rooms: string[] = [];

	function getAllRooms() {
		socket.emit('getAllRooms');
	}

	onMount(() => {
		socket.on('allRooms', (roomsList) => {
			rooms = roomsList;
		});

		getAllRooms();
	});
</script>

<div class="max-w-md flex flex-col mx-auto mt-10 p-6 rounded-lg shadow-md">
	<h2 class="mb-4">Diğer sunucular</h2>
	<ul class="list-none p-0">
		{#each rooms as room}
			<li class="py-2">{room}</li>
		{/each}
	</ul>
	<button on:click={getAllRooms} class="mt-4 py-2 px-4 variant-filled-primary font-semibold rounded-md shadow-md ">Yenile</button>
</div>
