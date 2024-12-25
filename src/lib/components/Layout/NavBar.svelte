<script lang="ts">
	import { CirclePlus, Compass, MessagesSquare, Server, UserRoundCog } from "lucide-svelte";
	import NavButton from "$lib/components/NavButton.svelte";
</script>

<nav class="grid grid-cols-5 bg-surface-100-800-token">
	<NavButton label="Sunucular" value={1}>
		<Server slot="icon" class="mx-auto" />
	</NavButton>
	<NavButton label="Keşfet" value={2}>
		<Compass slot="icon" class="mx-auto" />
	</NavButton>
	<NavButton label="Oluştur" value={3}>
		<CirclePlus slot="icon" class="mx-auto" />
	</NavButton>
	<NavButton label="Kütüphane" value={4}>
		<MessagesSquare slot="icon" class="mx-auto" />
	</NavButton>
	<NavButton label="Profil" value={5}>
		<UserRoundCog slot="icon" class="mx-auto" />
	</NavButton>
</nav>
