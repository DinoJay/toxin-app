<script>
	import uniqBy from '$lib/uniqBy';

	import DropDown from '$lib/DropDown.svelte';
	export let data;

	let selectedData = [];

	const containsData = (id) => !!selectedData.find((d) => d.Family === id);
</script>

<div class="mb-3">
	<DropDown>
		<span class="text-lg" slot="title">Select Data</span>
		{#each uniqBy(data, (d) => d.Family) as d, i}
			<li class=" mb-3 flex items-center">
				<div class="flex-grow">{d.Family}</div>
				<input
					class="ml-3"
					type="checkbox"
					checked={containsData(d.Family)}
					on:change={(e) => {
						if (containsData(d.Family)) {
							selectedData = selectedData.filter((e) => e.Family !== d.Family);
						} else {
							selectedData = [d, ...selectedData];
						}
					}}
				/>
			</li>
		{/each}
	</DropDown>

	<ul class="max-h-96 overflow-y-auto list-disc" style="min-width:50%">
		{#each selectedData as d, i}
			<li class="mb-3 ">
				<div class="font-bold">{d.Family}</div>
				<div class="ml-3">{d.Value}{' '}{d.Unit || ''}</div>
			</li>
		{/each}
	</ul>
</div>
