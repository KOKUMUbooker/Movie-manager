<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import X from '@lucide/svelte/icons/x';
	import type { Genre } from '../../../types';

	interface ActiveFiltersProps {
		updateFilters: () => void;
		searchQuery: string;
		selectedGenres: Genre[];
		toggleGenre: (genre: Genre) => void;
		clearFilters: () => void;
		yearRange: [number, number];
		ratingRange: [number, number];
	}
	let {
		updateFilters,
		searchQuery,
		selectedGenres,
		toggleGenre,
		clearFilters,
		yearRange,
		ratingRange
	}: ActiveFiltersProps = $props();
</script>

<div class="mb-6">
	<div class="flex flex-wrap items-center gap-2">
		<span class="text-sm text-muted-foreground">Active filters:</span>

		{#if searchQuery}
			<Badge variant="secondary" class="gap-1">
				Search: "{searchQuery}"
				<button
					onclick={() => {
						searchQuery = '';
						updateFilters();
					}}
				>
					<X size={12} />
				</button>
			</Badge>
		{/if}

		{#each selectedGenres as genre}
			<Badge variant="secondary" class="gap-1">
				{genre}
				<button onclick={() => toggleGenre(genre)}>
					<X size={12} />
				</button>
			</Badge>
		{/each}

		{#if yearRange[0] > 1980 || yearRange[1] < 2025}
			<Badge variant="secondary" class="gap-1">
				Year: {yearRange[0]}-{yearRange[1]}
				<button
					onclick={() => {
						yearRange = [1980, 2025];
						updateFilters();
					}}
				>
					<X size={12} />
				</button>
			</Badge>
		{/if}

		{#if ratingRange[0] > 0 || ratingRange[1] < 10}
			<Badge variant="secondary" class="gap-1">
				Rating: {ratingRange[0]}-{ratingRange[1]}
				<button
					onclick={() => {
						ratingRange = [0, 10];
						updateFilters();
					}}
				>
					<X size={12} />
				</button>
			</Badge>
		{/if}

		<Button variant="ghost" size="sm" onclick={clearFilters} class="ml-2">Clear All</Button>
	</div>
</div>
