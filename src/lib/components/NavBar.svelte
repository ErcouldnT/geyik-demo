<script lang="ts">
	import { page } from '$app/state';
	import { CirclePlus, Compass, MessagesSquare, Server, UserRoundCog } from 'lucide-svelte';
	import NavButton from '$lib/components/NavButton.svelte';
</script>

{#key page.url.pathname}
	<nav class="grid grid-cols-5 bg-surface-100-800-token">
		<NavButton href="/servers" label="Servers">
			<Server slot="icon" class="mx-auto" />
		</NavButton>
		<NavButton href="/discover" label="Discover">
			<Compass slot="icon" class="mx-auto" />
		</NavButton>
		<NavButton href="/create" label="Create">
			<CirclePlus slot="icon" class="mx-auto" />
		</NavButton>
		<NavButton href="/library" label="Library">
			<MessagesSquare slot="icon" class="mx-auto" />
		</NavButton>
		<NavButton href="/profile" label="Profile">
			<UserRoundCog slot="icon" class="mx-auto" />
		</NavButton>
	</nav>
{/key}
