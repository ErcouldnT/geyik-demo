<script lang="ts">
	type Server = {
		id: number;
		name: string;
		description: string;
		status: 'online' | 'offline';
	};

	let discoverServers: Server[] = [
		{
			id: 5,
			name: 'Upsilon Server',
			description: 'A server for upsilon functions',
			status: 'online'
		},
		{ id: 6, name: 'Phi Server', description: 'A server for phi functions', status: 'offline' },
		{ id: 7, name: 'Chi Server', description: 'A server for chi functions', status: 'online' },
		{ id: 8, name: 'Psi Server', description: 'A server for psi functions', status: 'offline' },
		{ id: 9, name: 'Rho Server', description: 'A server for rho functions', status: 'online' },
		{ id: 10, name: 'Kappa Server', description: 'A server for kappa functions', status: 'offline' }
	];
</script>

<p class="text-sm text-center">Katılmış olduğunuz serverlar</p>

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
