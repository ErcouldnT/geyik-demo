<script lang="ts">
	import socket from '$lib/socket';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const socketId = writable('');

	onMount(() => {
		if (socket.connected) {
			socketId.set(socket.id as string);
		} else {
			socket.on('connect', () => {
				socketId.set(socket.id as string);
			});
		}
	});
</script>

<p class="text-sm text-center">Profil ve uygulama ayarları</p>
<p class="text-sm text-center">Socket ID: {$socketId}</p>
