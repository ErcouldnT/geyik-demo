<script lang="ts">
	import { page } from '$app/state';
</script>

<main class="container flex flex-col gap-2 p-5 justify-center items-center">
	<h1 class="text-2xl font-bold opacity-50">{page.status}</h1>
	<p class="opacity-50">{page.error?.message || 'Bir hata oluştu.'}</p>
</main>
