<script lang="ts">
	type Server = {
		id: number;
		name: string;
		description: string;
		status: 'online' | 'offline';
	};

	let discoverServers: Server[] = [
		{
			id: 1,
			name: 'Lambda Server',
			description: 'A server for lambda functions',
			status: 'online'
		},
		{ id: 2, name: 'Omega Server', description: 'A server for omega functions', status: 'offline' },
		{ id: 3, name: 'Sigma Server', description: 'A server for sigma functions', status: 'online' },
		{ id: 4, name: 'Tau Server', description: 'A server for tau functions', status: 'offline' }
	];
</script>

<p class="text-sm text-center">Yeni serverlar keşfet</p>

<ul class="list-none p-0">
	{#each discoverServers as server}
		<li class="py-4 mb-2 rounded flex justify-between items-center">
			<div>
				<h3 class="text-lg font-bold">{server.name}</h3>
				<p class="text-sm text-gray-600">{server.description}</p>
			</div>
			<span class={server.status === 'online' ? 'text-green-500' : 'text-red-500'}>
				{server.status}
			</span>
		</li>
	{/each}
</ul>
