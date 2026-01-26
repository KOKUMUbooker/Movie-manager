<script lang="ts">
	import MovieGrid from '$lib/components/home/MovieGrid.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';
	import {
		Sheet,
		SheetContent,
		SheetDescription,
		SheetHeader,
		SheetTitle,
		SheetTrigger
	} from '$lib/components/ui/sheet';
	import { Slider } from '$lib/components/ui/slider';
	import { Tabs, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import SortDesc from '@lucide/svelte/icons/arrow-down-1-0';
	import SortAsc from '@lucide/svelte/icons/arrow-up-1-0';
	import Calendar from '@lucide/svelte/icons/calendar';
	import Clock from '@lucide/svelte/icons/clock';
	import Grid2x2 from '@lucide/svelte/icons/grid-2x2';
	import List from '@lucide/svelte/icons/list';
	import RefreshCw from '@lucide/svelte/icons/refresh-cw';
	import Search from '@lucide/svelte/icons/search';
	import Filter from '@lucide/svelte/icons/sliders-horizontal';
	import Star from '@lucide/svelte/icons/star';
	import X from '@lucide/svelte/icons/x';
	import { onMount } from 'svelte';
	import { dummyMovies } from '../../data/movies';
	import { ALL_GENRES, type Genre, type Movie } from '../../types';
	import ActiveFilters from '@/components/movies/active-filters.svelte';

	// State
	let movies: Movie[] = dummyMovies;
	let filteredMovies: Movie[] = dummyMovies;
	let isLoading = false;

	// Filter state
	let searchQuery = '';
	let selectedGenres: Genre[] = [];
	let yearRange: [number, number] = [1980, 2025];
	let ratingRange: [number, number] = [0, 10];
	let sortBy: 'title' | 'rating' | 'releaseDate' | 'duration' = 'rating';
	let sortOrder: 'asc' | 'desc' = 'desc';
	let viewMode: 'cards' | 'grid' | 'list' = 'cards';

	// UI state
	let isFilterOpen = false;
	let showMobileFilters = false;

	// Initialize
	onMount(() => {
		movies = dummyMovies;
		filteredMovies = movies;
		updateFilters();
	});

	// Available years for filtering
	const availableYears = Array.from(
		new Set(movies.map((m) => m.ReleaseDate.getFullYear()).sort((a, b) => b - a))
	);

	// Update filters
	const updateFilters = () => {};

	// Handler functions
	const handleSearch = () => updateFilters();

	const toggleGenre = (genre: Genre) => {};

	const clearFilters = () => {
		searchQuery = '';
		selectedGenres = [];
		yearRange = [1980, 2025];
		ratingRange = [0, 10];
		sortBy = 'rating';
		sortOrder = 'desc';
		updateFilters();
	};

	const toggleSortOrder = () => {
		sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
		updateFilters();
	};

	// Get active filter count
	const activeFilterCount =
		(searchQuery ? 1 : 0) +
		selectedGenres.length +
		(yearRange[0] > 1980 || yearRange[1] < 2025 ? 1 : 0) +
		(ratingRange[0] > 0 || ratingRange[1] < 10 ? 1 : 0);
</script>

<svelte:head>
	<title>Movies - Browse Collection</title>
	<meta
		name="description"
		content="Browse and filter our movie collection. Find your next favorite film with advanced search and filtering options."
	/>
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Hero Header -->
	<div class="border-b border-border bg-linear-to-r from-primary/10 to-secondary/10">
		<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
				<div>
					<h1 class="text-4xl font-bold tracking-tight">Movie Collection</h1>
					<p class="mt-2 text-muted-foreground">
						Browse our curated collection of {movies.length} movies
					</p>
				</div>
				<div class="flex items-center gap-4">
					<Button size="lg" class="gap-2">
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 4v16m8-8H4"
							/>
						</svg>
						Add Movie
					</Button>
				</div>
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="flex flex-col gap-8 lg:flex-row">
			<!-- Left Sidebar - Filters (Desktop) -->
			<div class="hidden lg:block lg:w-1/4">
				<Card>
					<CardHeader class="pb-3">
						<div class="flex items-center justify-between">
							<CardTitle class="text-lg">Filters</CardTitle>
							{#if activeFilterCount > 0}
								<Button variant="ghost" size="sm" onclick={clearFilters} class="gap-1">
									<X size={14} />
									Clear All
								</Button>
							{/if}
						</div>
						{#if activeFilterCount > 0}
							<p class="text-sm text-muted-foreground">
								{activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
							</p>
						{/if}
					</CardHeader>

					<CardContent class="space-y-6">
						<!-- Search -->
						<div class="space-y-2">
							<label class="text-sm font-medium">Search</label>
							<div class="relative">
								<Input
									bind:value={searchQuery}
									placeholder="Search movies..."
									oninput={handleSearch}
									class="pl-10"
								/>
								<Search
									class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground"
								/>
								{#if searchQuery}
									<button
										onclick={() => {
											searchQuery = '';
											handleSearch();
										}}
										class="absolute top-1/2 right-3 -translate-y-1/2 transform"
									>
										<X size={16} class="text-muted-foreground hover:text-foreground" />
									</button>
								{/if}
							</div>
						</div>

						<!-- Sort -->
						<div class="space-y-2">
							<label class="text-sm font-medium">Sort By</label>
							<div class="flex gap-2">
								<Select type="single">
									<SelectTrigger class="flex-1">
										{sortBy}
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="rating">Rating</SelectItem>
										<SelectItem value="title">Title</SelectItem>
										<SelectItem value="releaseDate">Release Date</SelectItem>
										<SelectItem value="duration">Duration</SelectItem>
									</SelectContent>
								</Select>
								<Button
									variant="outline"
									size="icon"
									onclick={toggleSortOrder}
									title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
								>
									{#if sortOrder === 'asc'}
										<SortAsc size={16} />
									{:else}
										<SortDesc size={16} />
									{/if}
								</Button>
							</div>
						</div>

						<!-- Genres -->
						<div class="space-y-3">
							<div class="flex items-center justify-between">
								<label class="text-sm font-medium">Genres</label>
								<span class="text-xs text-muted-foreground">
									{selectedGenres.length} selected
								</span>
							</div>
							<div class="flex flex-wrap gap-2">
								{#each ALL_GENRES as genre}
									<Badge
										variant={selectedGenres.includes(genre) ? 'default' : 'outline'}
										class="cursor-pointer transition-colors hover:bg-accent"
										onclick={() => toggleGenre(genre)}
									>
										{genre}
									</Badge>
								{/each}
							</div>
						</div>

						<!-- Year Range -->
						<div class="space-y-3">
							<div class="flex items-center justify-between">
								<label class="text-sm font-medium">
									<Calendar size={14} class="mr-2 inline" />
									Year Range
								</label>
								<span class="text-xs text-muted-foreground">
									{yearRange[0]} - {yearRange[1]}
								</span>
							</div>
							<Slider
								min={1980}
								max={2025}
								step={1}
								type="multiple"
								bind:value={yearRange}
								onchange={updateFilters}
								class="py-4"
							/>
							<div class="flex justify-between text-sm text-muted-foreground">
								<span>{yearRange[0]}</span>
								<span>{yearRange[1]}</span>
							</div>
						</div>

						<!-- Rating Range -->
						<div class="space-y-3">
							<div class="flex items-center justify-between">
								<label class="text-sm font-medium">
									<Star size={14} class="mr-2 inline" />
									Rating
								</label>
								<span class="text-xs text-muted-foreground">
									{ratingRange[0].toFixed(1)} - {ratingRange[1].toFixed(1)}
								</span>
							</div>
							<Slider
								min={0}
								max={10}
								step={0.5}
								type="multiple"
								bind:value={ratingRange}
								onchange={updateFilters}
								class="py-4"
							/>
							<div class="flex justify-between text-sm text-muted-foreground">
								<span>{ratingRange[0].toFixed(1)}</span>
								<span>{ratingRange[1].toFixed(1)}</span>
							</div>
						</div>

						<!-- Duration Filter -->
						<div class="space-y-2">
							<label class="flex items-center gap-2 text-sm font-medium">
								<Clock size={14} />
								Duration
							</label>
							<Tabs class="w-full">
								<TabsList class="grid grid-cols-4">
									<TabsTrigger value="all" onclick={() => updateFilters()}>All</TabsTrigger>
									<TabsTrigger
										value="short"
										onclick={() => {
											// Filter short movies (< 90 min)
											const filtered = filteredMovies.filter((m) => m.Minutes < 90);
											filteredMovies = filtered;
										}}>Short</TabsTrigger
									>
									<TabsTrigger
										value="medium"
										onclick={() => {
											// Filter medium movies (90-150 min)
											const filtered = filteredMovies.filter(
												(m) => m.Minutes >= 90 && m.Minutes <= 150
											);
											filteredMovies = filtered;
										}}>Medium</TabsTrigger
									>
									<TabsTrigger
										value="long"
										onclick={() => {
											// Filter long movies (> 150 min)
											const filtered = filteredMovies.filter((m) => m.Minutes > 150);
											filteredMovies = filtered;
										}}>Long</TabsTrigger
									>
								</TabsList>
							</Tabs>
						</div>

						<!-- Action Buttons -->
						<div class="space-y-2 border-t border-border pt-4">
							<Button variant="outline" class="w-full gap-2" onclick={clearFilters}>
								<RefreshCw size={16} />
								Reset Filters
							</Button>
							<Button class="w-full" onclick={() => (isFilterOpen = false)}>Apply Filters</Button>
						</div>
					</CardContent>
				</Card>

				<!-- Stats Card -->
				<Card class="mt-6">
					<CardHeader class="pb-3">
						<CardTitle class="text-lg">Collection Stats</CardTitle>
					</CardHeader>
					<CardContent class="space-y-4">
						<div class="grid grid-cols-2 gap-4">
							<div class="rounded-lg bg-secondary p-3 text-center">
								<div class="text-2xl font-bold">{movies.length}</div>
								<div class="text-sm text-muted-foreground">Total Movies</div>
							</div>
							<div class="rounded-lg bg-secondary p-3 text-center">
								<div class="text-2xl font-bold">
									{[...new Set(movies.map((m) => m.Genre))].length}
								</div>
								<div class="text-sm text-muted-foreground">Genres</div>
							</div>
						</div>
						<div class="space-y-2">
							<div class="flex justify-between text-sm">
								<span class="text-muted-foreground">Avg Rating</span>
								<span class="font-medium">
									{(movies.reduce((acc, m) => acc + m.Rating, 0) / movies.length).toFixed(1)}/10
								</span>
							</div>
							<div class="flex justify-between text-sm">
								<span class="text-muted-foreground">Avg Duration</span>
								<span class="font-medium">
									{Math.round(movies.reduce((acc, m) => acc + m.Minutes, 0) / movies.length)} min
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<!-- Main Content -->
			<div class="lg:w-3/4">
				<!-- Mobile Filter Bar -->
				<div class="mb-6 lg:hidden">
					<div class="flex flex-col gap-4 sm:flex-row">
						<!-- Mobile Search -->
						<div class="relative flex-1">
							<Input
								bind:value={searchQuery}
								placeholder="Search movies..."
								oninput={handleSearch}
								class="pl-10"
							/>
							<Search
								class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground"
							/>
						</div>

						<!-- Mobile Filter Button -->
						<Sheet bind:open={showMobileFilters}>
							<SheetTrigger>
								<Button variant="outline" class="gap-2">
									<Filter size={16} />
									Filters
									{#if activeFilterCount > 0}
										<Badge variant="default" class="ml-1 h-5 w-5 p-0">
											{activeFilterCount}
										</Badge>
									{/if}
								</Button>
							</SheetTrigger>
							<SheetContent side="left" class="w-[90vw] max-w-md overflow-y-auto">
								<SheetHeader>
									<SheetTitle>Filters</SheetTitle>
									<SheetDescription>Refine your movie search</SheetDescription>
								</SheetHeader>
								<div class="space-y-6 py-6">
									<!-- Mobile filter content would go here -->
									<!-- You can reuse the filter components from desktop sidebar -->
								</div>
							</SheetContent>
						</Sheet>

						<!-- View Toggle -->
						<div class="flex items-center gap-2">
							<Button
								variant={viewMode === 'grid' ? 'default' : 'outline'}
								size="icon"
								onclick={() => (viewMode = 'grid')}
							>
								<Grid2x2 size={16} />
							</Button>
							<Button
								variant={viewMode === 'list' ? 'default' : 'outline'}
								size="icon"
								onclick={() => (viewMode = 'list')}
							>
								<List size={16} />
							</Button>
						</div>
					</div>
				</div>

				<!-- Desktop Header -->
				<div class="mb-6 hidden items-center justify-between lg:flex">
					<div>
						<h2 class="text-2xl font-semibold">
							{filteredMovies.length} Movie{filteredMovies.length !== 1 ? 's' : ''} Found
						</h2>
						{#if activeFilterCount > 0}
							<p class="text-sm text-muted-foreground">
								Filtered by {activeFilterCount} criteria
							</p>
						{/if}
					</div>

					<div class="flex items-center gap-4">
						<!-- View Toggle -->
						<div class="flex items-center gap-2 rounded-lg border p-1">
							<Button
								variant={viewMode === 'cards' ? 'default' : 'ghost'}
								size="sm"
								class="px-3"
								onclick={() => (viewMode = 'cards')}
							>
								<Grid2x2 size={16} class="mr-2" />
								Cards
							</Button>
							<Button
								variant={viewMode === 'grid' ? 'default' : 'ghost'}
								size="sm"
								class="px-3"
								onclick={() => (viewMode = 'grid')}
							>
								<Grid2x2 size={16} class="mr-2" />
								Grid
							</Button>
							<Button
								variant={viewMode === 'list' ? 'default' : 'ghost'}
								size="sm"
								class="px-3"
								onclick={() => (viewMode = 'list')}
							>
								<List size={16} class="mr-2" />
								List
							</Button>
						</div>

						<!-- Sort Dropdown -->
						<Select type="multiple">
							<SelectTrigger class="w-45">
								{sortBy}
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="rating">Rating (High to Low)</SelectItem>
								<SelectItem value="title">Title (A-Z)</SelectItem>
								<SelectItem value="releaseDate">Release Date (Newest)</SelectItem>
								<SelectItem value="duration">Duration (Shortest)</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<!-- Active Filters Display -->
				{#if activeFilterCount > 0}
					<ActiveFilters
						{clearFilters}
						{ratingRange}
						{selectedGenres}
						{searchQuery}
						{toggleGenre}
						{updateFilters}
						{yearRange}
					/>
				{/if}

				<!-- Movie Grid -->
				<MovieGrid
					movies={filteredMovies}
					{viewMode}
					columns={viewMode === 'cards' ? 3 : 4}
					{isLoading}
					emptyMessage={searchQuery || selectedGenres.length > 0
						? 'No movies match your search criteria. Try adjusting your filters.'
						: 'No movies available in the collection.'}
				/>

				{#if filteredMovies.length > 0}
					<div class="mt-8 flex justify-center">
						<div class="flex items-center gap-2">
							<Button variant="outline" size="sm">Previous</Button>
							<div class="flex items-center gap-1">
								<Button variant="ghost" size="sm" class="h-8 w-8 p-0">1</Button>
								<Button variant="outline" size="sm" class="h-8 w-8 p-0">2</Button>
								<Button variant="ghost" size="sm" class="h-8 w-8 p-0">3</Button>
								<span class="px-2 text-muted-foreground">...</span>
								<Button variant="ghost" size="sm" class="h-8 w-8 p-0">10</Button>
							</div>
							<Button variant="outline" size="sm">Next</Button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* Custom scrollbar for filter panel */
	::-webkit-scrollbar {
		width: 6px;
	}

	::-webkit-scrollbar-track {
		background: transparent;
	}

	::-webkit-scrollbar-thumb {
		background: hsl(var(--border));
		border-radius: 3px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: hsl(var(--muted-foreground));
	}
</style>
