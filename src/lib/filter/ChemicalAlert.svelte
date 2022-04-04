<script>
	export let cas;

	$: {
		console.log('cas', cas);
	}
	const host = 'http://b80b-134-184-232-67.ngrok.io';
	const q = `/api/v6/Search/cas/${cas}/true`;

	let promise = fetch(`${host}${q}`)
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

	promise.then((d) => console.log('result', d));
</script>

<div>
	<h2>Chemical alert category</h2>
	<p class="my-1 p-2 max-h-40 overflow-y-auto">
		if link to OECDTOOL box for instance PHYSICO_CHEMICAL PROPERTY [Can be selected to display the
		complete physico-chemical property inputted or be linked to Cosmosdb to calculate new parameter]
	</p>
</div>
