<script lang="ts">
	import socket from "$lib/socket";
	import { onMount } from "svelte";
	import { messages } from "$lib/stores/messages";
	import { notifications, addNotification } from "$lib/stores/notifications";

	let targetId = "";
	let message = "";
	let mySocketId = "";

	function sendPrivateMessage() {
		if (targetId.trim() && message.trim() && targetId !== mySocketId) {
			messages.update((msgs) => [...msgs, { from: mySocketId, message }]);
			socket.emit("privateMessage", { targetId, message });
			message = "";
		}
	}

	onMount(() => {
		if (socket.connected) {
			mySocketId = socket.id as string;
		} else {
			socket.on("connect", () => {
				mySocketId = socket.id as string;
			});
		}

		socket.off("privateMessage");
		socket.on("privateMessage", ({ from, message }) => {
			messages.update((msgs) => [...msgs, { from, message }]);
		});
	});
</script>

<div class="flex flex-row max-w-4xl mx-auto mt-10 p-6 rounded-lg shadow-md">
	<div class="w-1/2 pr-4">
		<h2 class="mb-4 opacity-50">Bildirimler</h2>
		<!-- Add your notifications content here -->
		<ul class="list-none p-0">
			{#each $notifications as notification}
				<li class="py-2 text-sm">{notification.message}</li>
			{/each}
		</ul>
	</div>
	<div class="w-1/2 pl-4">
		<h2 class="mb-4 opacity-50">Özel Mesajlar</h2>
		<label class="label block mb-4">
			<span class="block text-sm font-medium text-gray-700">Hedef Socket ID</span>
			<input
				class="input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
				type="text"
				bind:value={targetId}
				placeholder="Hedef Socket ID"
			/>
		</label>
		<ul class="list-none p-0">
			{#each $messages as msg}
				<li class="py-2"><strong>{msg.from}:</strong> {msg.message}</li>
			{/each}
		</ul>
		<form
			on:submit|preventDefault={sendPrivateMessage}
			class="mx-auto flex flex-col w-full rounded-lg shadow-md"
		>
			<label class="label block mb-4">
				<span class="block text-sm font-medium text-gray-700">Mesaj</span>
				<input
					class="input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
					type="text"
					bind:value={message}
					placeholder="Mesaj"
				/>
			</label>
			<button
				on:click={sendPrivateMessage}
				class="w-full py-2 px-4 variant-filled-primary text-white font-semibold shadow-md focus:outline-none rounded-md"
				>Gönder</button
			>
		</form>
	</div>
</div>
