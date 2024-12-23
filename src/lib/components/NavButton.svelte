<script lang="ts">
	import { page } from '$app/state';

	export let href: string;
	export let label: string;
</script>

<a
	{href}
	class={`flex flex-col gap-1 justify-center items-center w-full p-2 ${page.url.pathname === href ? 'variant-filled-primary' : 'hover:variant-soft-primary'}`}
>
	<slot name="icon" />
	<span>{label}</span>
</a>
