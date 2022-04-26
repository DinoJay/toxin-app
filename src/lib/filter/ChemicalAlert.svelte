<script>
	import uniqBy from 'lodash.uniqBy';
	import DropDown from '$lib/DropDown.svelte';
	import ArrowRightSFill from 'svelte-remixicon/lib/icons/ArrowRightSFill.svelte';
	import AttrElement from '$lib/element-list/attrElement.svelte';
	import ChemicalCompound from './ChemicalCompound.svelte';
	import SelectProfilers from './SelectProfilers.svelte';
	import { Result } from 'postcss';
	import SelectData from './SelectData.svelte';

	export let cas;

	$: {
		console.log('cas', cas);
	}
	const host = 'http://bb79-134-184-232-78.ngrok.io';

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
	<h1 class="text-xl mb-3">Chemical alert category</h1>
	<div class=" ">
		<div class="flex">
			{#await profilingPromise}
				<div>Loading...</div>
			{:then result}
				<div class="flex-grow mr-12">
					<SelectProfilers data={result.profiling} />
				</div>
				<div class="flex-grow">
					<SelectData data={result.data} />
				</div>
			{:catch error}
				error: {error}
			{/await}
		</div>
	</div>
</div>
