<script lang="ts">
	export let message: string;
	export let type: 'info' | 'warning' | 'error' = 'info';
</script>

{#if message}
	<div class={`text-center text-sm ${type}`}>
		<p>{message}</p>
	</div>
{/if}

<style>
    .info {
        color: aqua;
    }
    .warning {
        color: yellow;
    }
    .error {
        color: red;
    }
</style>
