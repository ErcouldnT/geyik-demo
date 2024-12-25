<script lang="ts">
	import socket from '$lib/socket';
	import { tabSet } from '$lib/stores/tabSet';
	import Servers from '$lib/components/Tabs/Servers.svelte';
	import Discover from '$lib/components/Tabs/Discover.svelte';
	import Create from '$lib/components/Tabs/Create.svelte';
	import Library from '$lib/components/Tabs/Library.svelte';
	import Profile from '$lib/components/Tabs/Profile.svelte';

	if ($tabSet < 1 && $tabSet > 5) {
		$tabSet = 1;
	}

	socket.on('connect', () => {
		console.log(`Socket connected with ID: ${socket.id}`);
	});

	socket.on('connect_error', (err) => {
		console.error('Socket connection error:', err);
	});

	socket.on('connect_timeout', () => {
		console.error('Socket connection timed out');
	});

	socket.on('disconnect', (reason) => {
		console.log(`Socket disconnected: ${reason}`);
	});

	socket.on('reconnect', (attempt) => {
		console.log(`Socket reconnected after ${attempt} attempts`);
	});

	socket.on('reconnect_attempt', (attempt) => {
		console.log(`Reconnect attempt: ${attempt}`);
	});

	socket.on('reconnect_error', (err) => {
		console.error('Reconnect error:', err);
	});

	socket.on('reconnect_failed', () => {
		console.error('Failed to reconnect after max attempts');
	});

	socket.on('ping', () => {
		console.log('Ping sent to server');
	});

	socket.on('pong', (latency) => {
		console.log(`Pong received. Latency: ${latency}ms`);
	});

	socket.on('error', (err) => {
		console.error('Socket error:', err);
	});
</script>

{#if $tabSet === 1}
	<Servers />
{:else if $tabSet === 2}
	<Discover />
{:else if $tabSet === 3}
	<Create />
{:else if $tabSet === 4}
	<Library />
{:else if $tabSet === 5}
	<Profile />
{/if}
