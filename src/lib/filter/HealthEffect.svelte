<script>
	import { ACUTE_TOXICITY, MUTAGENICITY, REPEATED_DOSE_TOXICITY } from '$lib/endpoint_constants';

	import Expandable from '$lib/Expandable.svelte';
	import { constructQuery } from '$lib/sparql.js';
	export let openId;
	export let promise;
	export let onClick;

	const data = [
		{ label: 'Acute Toxicity', endpoint: ACUTE_TOXICITY },
		{ label: 'Irritation and corrosivity' },
		{ label: 'Skin sensitisation' },
		{ label: 'Organ-specific toxicity' },
		{ label: 'Repeated dose toxicity', endpoint: REPEATED_DOSE_TOXICITY },
		{ label: 'Reproductive toxicity' },
		{ label: 'Mutagenicity / genotoxicity', endpoint: MUTAGENICITY },
		{ label: 'Carcinogenicity' },
		{ label: 'Photo-induced toxicity' },
		{ label: 'Human data' },
		{ label: 'Special investigations' },
		{ label: 'Absorption' },
		{ label: 'Toxicokinetics' },
		{ label: 'Distribution' },
		{ label: 'Metabolism' },
		{ label: 'Extraction' }
	];

	let val = '';
	$: valInList = !!data.find((d) => d.label.toLowerCase() === val.toLowerCase());

	$: endpoint = data.find((d) => d.label.toLowerCase() === val.toLowerCase())?.endpoint;

	let oecd = true;
	let nonOecd = true;

	let invivo = true;
	let invitro = true;
	let insilico = true;
	let inchemico = true;
</script>

<Expandable open={openId === 'HealthEffect'} {onClick}>
	<h2 class="text-xl" slot="title">Health Effect</h2>
	<div class="text-lg">
		<p class="mb-3">Look for compounds with a specific toxicological outcome</p>
		<form on:submit={(e) => e.preventDefault()}>
			<div class="mb-3">
				<div class="">
					<label for="toxi-outcome">Type the health effect or parameter of interest:</label>
					<input
						class="ml-1 p-1 border"
						list="outcomes"
						name="toxi-outcome"
						id="toxi-outcome"
						bind:value={val}
					/>
					<datalist id="outcomes">
						{#each data as d}
							<option value={d.label}>{d.label}</option>
						{/each}
					</datalist>
				</div>
			</div>
			<div class="mb-3">
				<p>Chose the type(s) of study:</p>
				<div>
					<input type="checkbox" id="in-vivo" name="in-vivo" bind:checked={invivo} />
					<label for="in-vivo">In vivo</label>
				</div>
				<div>
					<input type="checkbox" id="in-vitro" name="in-vitro" bind:checked={invitro} />
					<label for="in-vitro">In vitro</label>
				</div>
				<div>
					<input type="checkbox" id="in-silico" name="in-silico" bind:checked={insilico} />
					<label for="in-silico">In silico</label>
				</div>
				<div>
					<input type="checkbox" id="in-chemico" name="in-chemico" bind:checked={inchemico} />
					<label for="in-chemico">In chemico</label>
				</div>
			</div>

			<div>
				<p>Chose the type of guideline(s):</p>
				<div>
					<input type="checkbox" id="oecd" name="oecd" bind:checked={oecd} />
					<label for="oecd">OECD</label>
				</div>
				<div>
					<input type="checkbox" id="non-oecd" name="non-oecd" bind:checked={nonOecd} />
					<label for="non-oecd">Non-OECD</label>
				</div>
			</div>

			<button
				class="mt-3 border px-2 py-1 w-full {!valInList && 'opacity-50'}"
				disabled={!valInList}
				on:click={() => {
					promise = fetch(constructQuery(endpoint))
						.then((res) => res.json())
						.then((res) => ({
							...res,
							compoundLabel: decodeURI(res.compoundLabel),
							oecd,
							nonOecd,
							invivo,
							invitro,
							insilico,
							inchemico,
							endpoint,
							type: 'health-effect'
						}));
				}}>Go</button
			>
		</form>
	</div>
</Expandable>

<style>
	:global([role='listbox']) {
		margin: 20rem;
	}
</style>
