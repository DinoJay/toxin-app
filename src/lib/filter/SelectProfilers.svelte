<script>
	import uniqBy from 'lodash.uniqBy';

	import DropDown from '$lib/DropDown.svelte';
	export let data;

	let selectedProfilers = [];

	const containsProfiler = (id) => !!selectedProfilers.find((d) => d.ProfilerGuid === id);
</script>

<div class="mb-3">
	<DropDown>
		<span class="text-lg" slot="title">Select Profiler</span>
		{#each data as d, i}
			<li class=" mb-3 flex items-center">
				<div class="flex-grow">{d.ProfilerName}</div>
				<input
					class="ml-3"
					type="checkbox"
					checked={containsProfiler(d.ProfilerGuid)}
					on:change={(e) => {
						if (containsProfiler(d.ProfilerGuid)) {
							selectedProfilers = selectedProfilers.filter(
								(e) => e.ProfilerGuid !== d.ProfilerGuid
							);
						} else {
							selectedProfilers = [d, ...selectedProfilers];
						}
					}}
				/>
			</li>
		{/each}
	</DropDown>

	<ul class="max-h-96 overflow-y-auto list-disc" style="min-width:50%">
		{#each selectedProfilers as d, i}
			<li class="mb-3">
				<div class="font-bold">{d.ProfilerName}</div>
				<ul class="list-disc ml-3">
					{#each d.Categories as c}
						{#if c}
							<li>{c}</li>
						{/if}
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>
