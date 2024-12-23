<script lang="ts">
	import { CirclePlus, Compass, MessagesSquare, Server, UserRoundCog } from 'lucide-svelte';
	import NavButton from '$lib/components/NavButton.svelte';
</script>

<nav class="grid grid-cols-5 bg-surface-100-800-token">
	<NavButton label="Servers" value={1}>
		<Server slot="icon" class="mx-auto" />
	</NavButton>
	<NavButton label="Discover" value={2}>
		<Compass slot="icon" class="mx-auto" />
	</NavButton>
	<NavButton label="Create" value={3}>
		<CirclePlus slot="icon" class="mx-auto" />
	</NavButton>
	<NavButton label="Library" value={4}>
		<MessagesSquare slot="icon" class="mx-auto" />
	</NavButton>
	<NavButton label="Profile" value={5}>
		<UserRoundCog slot="icon" class="mx-auto" />
	</NavButton>
</nav>
