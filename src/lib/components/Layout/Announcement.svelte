<script lang="ts">
	export let message: string;
	export let type: 'info' | 'warning' | 'error' = 'info';
</script>

{#if message}
	<div class={`text-center text-sm ${type}`}>
		<p class="opacity-50 font-mono">{message}</p>
	</div>
{/if}

<style>
	.info {
		color: black;
		background-color: aqua;
	}
	.warning {
		color: black;
		background-color: darkorange;
	}
	.error {
		color: white;
		background-color: red;
	}
</style>
