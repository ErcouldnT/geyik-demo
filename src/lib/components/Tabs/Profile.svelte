<script lang="ts">
	import socket from "$lib/socket";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { supabase } from "$lib/supabaseClient";
	import type { User } from "@supabase/supabase-js";

	let user = writable<User | null>(null);
	let errorMessage = writable("");
	let email = "";
	let password = "";

	const socketId = writable("");

	supabase.auth.onAuthStateChange((event, session) => {
		if (session) {
			user.set(session.user);
		} else {
			user.set(null);
		}
	});

	onMount(() => {
		if (socket.connected) {
			socketId.set(socket.id as string);
		} else {
			socket.on("connect", () => {
				socketId.set(socket.id as string);
			});
		}
	});

	async function signUp() {
		const { data, error } = await supabase.auth.signUp({
			email,
			password
		});

		if (error) {
			errorMessage.set(`Error signing up: ${error.message}`);
			console.error("Error signing up:", error);
		} else {
			console.log("User signed up:", data.user);
			errorMessage.set("");
		}
	}

	async function signIn() {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			errorMessage.set(`Error signing in: ${error.message}`);
			console.error("Error signing in:", error);
		} else {
			console.log("User signed in:", data.user);
			errorMessage.set("");
		}
	}

	async function signOut() {
		const { error } = await supabase.auth.signOut();

		if (error) {
			errorMessage.set(`Error signing out: ${error.message}`);
			console.error("Error signing out:", error);
		} else {
			console.log("User signed out");
			errorMessage.set("");
		}
	}
</script>

<p class="text-center opacity-50">Profil ve uygulama ayarları</p>
<p class="text-sm text-center">Socket ID: {$socketId}</p>

{#if $user}
	<div class="max-w-md mx-auto p-5 space-y-2">
		<p class="text-center">Hoş geldiniz {$user.id}</p>
		<button
			on:click={signOut}
			class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
			>Çıkış yap</button
		>
	</div>
{:else}
	<form on:submit|preventDefault={signUp} class="mb-4 max-w-md mx-auto">
		<div class="mb-2">
			<label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
			<input
				type="email"
				id="email"
				bind:value={email}
				required
				class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>
		</div>
		<div class="mb-2">
			<label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
			<input
				type="password"
				id="password"
				bind:value={password}
				required
				class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>
		</div>
		<button
			type="submit"
			class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>Kayıt ol</button
		>
	</form>

	<form on:submit|preventDefault={signIn} class="mb-4 max-w-md mx-auto">
		<div class="mb-2">
			<label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
			<input
				type="email"
				id="email"
				bind:value={email}
				required
				class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>
		</div>
		<div class="mb-2">
			<label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
			<input
				type="password"
				id="password"
				bind:value={password}
				required
				class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>
		</div>
		<button
			type="submit"
			class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>Giriş yap</button
		>
	</form>
{/if}

<p class="text-red-500 mt-4">{$errorMessage}</p>
