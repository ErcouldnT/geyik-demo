<script lang="ts">
	import { tabSet } from '$lib/stores/tabSet';

	export let label: string;
	export let value: number;

	const onClick = () => {
		tabSet.set(value);
	};
</script>

<button
	on:click={onClick}
	class={`flex flex-col gap-1 justify-center items-center w-full p-2 ${$tabSet === value ? 'variant-filled-primary' : 'hover:variant-soft-primary'}`}
>
	<slot name="icon" />
	<span>{label}</span>
</button>
