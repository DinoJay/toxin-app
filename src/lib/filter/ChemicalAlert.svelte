<script>
	import uniqBy from 'lodash.uniqBy';

	export let cas;

	$: {
		console.log('cas', cas);
	}
	const host = 'http://0527-62-235-197-156.ngrok.io';

	const q = `/api/v6/Search/cas/${cas}/true`;

	console.log('query', `${host}${q}`);

	let profilingPromise = fetch(`${host}${q}`)
		.then((res) => res.json())
		.then((res) => {
			console.log('res', res);
			return res.length > 0 ? res[0].ChemId : null;
		})
		.then((chemId) => {
			const profilingQ = `/api/v6/Profiling/all/${chemId}`;
			const promiseProfiling = fetch(`${host}${profilingQ}`)
				.then((res) => res.json())
				.then((res) => {
					console.log('profiling', res);
					return res;
				});

			const dataQ = `/api/v6/Data/all/${chemId}`;
			const promiseData = fetch(`${host}${dataQ}`)
				.then((res) => res.json())
				.then((res) => {
					console.log('data', res);
					return res;
				});

			return Promise.all([promiseProfiling, promiseData]).then(([profiling, data]) => ({
				profiling,
				data
			}));
		});

	// profilingPromise.then((d) => console.log('result', d));
</script>

<div class="mt-3 mb-4">
	<h1 class="text-xl">Chemical alert category</h1>
	<div class=" ">
		<div class="flex">
			{#await profilingPromise}
				<div>Loading...</div>
			{:then result}
				<div>
					<h2 class="text-lg">Profiling</h2>
					<ul class="max-h-96 overflow-y-auto" style="min-width:50%">
						{#each uniqBy(result.profiling, (d) => d.ProfilerGuid) as d, i}
							<li class="mb-3">
								<div>{d.ProfilerName}</div>
								<div>
									{#each d.Categories as c}
										{#if c}
											<div>{c}</div>
										{/if}
									{/each}
								</div>
							</li>
						{/each}
					</ul>
				</div>
				<div style="min-width:50%">
					<h2 class="text-lg">Data</h2>
					<ul class="max-h-96 overflow-y-auto">
						{#each uniqBy(result.data, (d) => d.Endpoint) as d, i}
							<li class="mb-3">
								<div>{d.Family}</div>
								<div>{d.Value}{' '}{d.Unit || ''}</div>
							</li>
						{/each}
					</ul>
				</div>
			{:catch error}
				error: {error}
			{/await}
		</div>
	</div>
</div>
