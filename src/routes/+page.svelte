<script lang="ts">
	import { tabSet } from '$lib/stores/tabSet';
	import Servers from '$lib/components/Servers.svelte';
	import Discover from '$lib/components/Discover.svelte';
	import Create from '$lib/components/Create.svelte';
	import Library from '$lib/components/Library.svelte';
	import Profile from '$lib/components/Profile.svelte';

	if ($tabSet < 1 && $tabSet > 5) {
		$tabSet = 1;
	}
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
