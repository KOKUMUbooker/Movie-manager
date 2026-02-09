<script lang="ts">
	import {
		ArrowRight,
		Users,
		Calendar,
		Vote,
		Film,
		Sparkles,
		Play,
		CheckCircle
	} from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Badge } from '$lib/components/ui/badge';
	import { onMount } from 'svelte';

	// Mock data for featured movies
	const trendingMovies = [
		{ id: 1, title: 'Dune: Part Two', year: 2024, votes: 128, streaming: ['Netflix', 'Max'] },
		{ id: 2, title: 'Poor Things', year: 2023, votes: 95, streaming: ['Hulu'] },
		{ id: 3, title: 'The Holdovers', year: 2023, votes: 87, streaming: ['Prime'] },
		{ id: 4, title: 'Past Lives', year: 2023, votes: 76, streaming: ['Netflix', 'Hulu'] }
	];

	const features = [
		{
			icon: Users,
			title: 'Group Voting',
			description:
				'Suggest movies and vote together. Veto options prevent watching movies someone hates.'
		},
		{
			icon: Calendar,
			title: 'Smart Scheduling',
			description: 'Find times that work for everyone, across time zones and busy schedules.'
		},
		{
			icon: Film,
			title: 'Streaming Sync',
			description: "See what's actually available to your group across all streaming services."
		},
		{
			icon: Vote,
			title: 'Fair Decisions',
			description: 'Majority rules with respect for minority opinions through the veto system.'
		}
	];

	let userCount = 0;

	// Animate counter
	onMount(() => {
		const interval = setInterval(() => {
			if (userCount < 1234) {
				userCount += Math.floor(Math.random() * 50) + 10;
				if (userCount > 1234) userCount = 1234;
			} else {
				clearInterval(interval);
			}
		}, 50);

		return () => clearInterval(interval);
	});

	let samples = [
		{ movie: 'Dune: Part Two', votes: 5, veto: false },
		{ movie: 'Poor Things', votes: 3, veto: true },
		{ movie: 'The Holdovers', votes: 4, veto: false }
	];

	let appWorkings = [
		'1. Add movie suggestions from our database',
		'2. Vote thumbs up/down on options',
		'3. Each member gets one veto power',
		'4. See real-time voting results'
	];
</script>

<div class="min-h-screen bg-background">
	<!-- Navigation -->
	<nav class="container mx-auto flex items-center justify-between px-4 py-6">
		<div class="flex items-center gap-2">
			<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
				<Play class="h-5 w-5 text-primary-foreground" />
			</div>
			<span class="text-2xl font-bold text-foreground">GroupWatch</span>
		</div>

		<div class="flex items-center gap-4">
			<a href="/login" class="text-foreground/80 transition-colors hover:text-foreground">Log in</a>
			<Button>
				Get Started
				<ArrowRight class="ml-2 h-4 w-4" />
			</Button>
		</div>
	</nav>

	<!-- Hero Section -->
	<section class="container mx-auto px-4 py-16 md:py-24">
		<div class="mx-auto max-w-4xl text-center">
			<Badge class="mb-6 border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
				<Sparkles class="mr-1.5 h-3.5 w-3.5" />
				Beta Launch Week
			</Badge>

			<h1 class="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
				Stop debating.<br />
				<span class="text-primary">Start watching together.</span>
			</h1>

			<p class="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
				GroupWatch simplifies planning movie nights with friends. From voting to scheduling to
				streaming compatibility—all in one place.
			</p>

			<div class="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
				<Button size="lg" class="h-12 px-8">
					Create Your First Group
					<ArrowRight class="ml-2 h-5 w-5" />
				</Button>
				<Button size="lg" variant="outline" class="h-12 px-8">
					<Play class="mr-2 h-5 w-5" />
					See How It Works
				</Button>
			</div>

			<div class="inline-flex items-center gap-6 text-sm text-muted-foreground">
				<div class="flex items-center gap-2">
					<div class="flex -space-x-2">
						{#each [1, 2, 3, 4] as i}
							<div class="h-8 w-8 rounded-full border-2 border-background bg-primary/20" />
						{/each}
					</div>
					<span
						><span class="font-semibold text-foreground">{userCount.toLocaleString()}</span> friends watching</span
					>
				</div>
				<div class="h-4 w-px bg-border" />
				<div class="flex items-center gap-2">
					<CheckCircle class="h-4 w-4 text-primary" />
					<span>Free forever</span>
				</div>
			</div>
		</div>
	</section>

	<!-- How It Works -->
	<section class="container mx-auto px-4 py-16">
		<div class="mx-auto max-w-6xl">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold">From chat chaos to perfect movie nights</h2>
				<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
					GroupWatch turns the frustrating planning process into a smooth, fun experience
				</p>
			</div>

			<Tabs class="mx-auto max-w-4xl">
				<TabsList class="mb-8 grid grid-cols-4">
					<TabsTrigger
						value="voting"
						class="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
					>
						<Vote class="mr-2 h-4 w-4" />
						Vote Together
					</TabsTrigger>
					<TabsTrigger
						value="schedule"
						class="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
					>
						<Calendar class="mr-2 h-4 w-4" />
						Find Time
					</TabsTrigger>
					<TabsTrigger
						value="streaming"
						class="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
					>
						<Film class="mr-2 h-4 w-4" />
						Check Streaming
					</TabsTrigger>
					<TabsTrigger
						value="watch"
						class="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
					>
						<Play class="mr-2 h-4 w-4" />
						Press Play
					</TabsTrigger>
				</TabsList>

				<TabsContent value="voting" class="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Collaborative Voting System</CardTitle>
							<CardDescription>Everyone gets a voice in what to watch</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="grid gap-6 md:grid-cols-2">
								<div>
									<h3 class="mb-2 font-semibold">How it works:</h3>
									<ul class="space-y-2">
										{#each appWorkings as item}
											<li class="flex items-center gap-2">
												<div class="h-2 w-2 rounded-full bg-primary" />
												{item}
											</li>
										{/each}
									</ul>
								</div>
								<div class="rounded-lg bg-muted p-6">
									<div class="mb-4 text-center">
										<div
											class="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2"
										>
											<Users class="h-4 w-4" />
											<span class="font-semibold">Movie Voting Session</span>
										</div>
									</div>
									<div class="space-y-3">
										{#each samples as item, i}
											<div
												class={`flex items-center justify-between rounded-lg p-3 ${i === 0 ? 'border border-primary/20 bg-primary/10' : 'bg-background'}`}
											>
												<span
													class={`font-medium ${item.veto ? 'text-muted-foreground line-through' : ''}`}
												>
													{item.movie}
												</span>
												<div class="flex items-center gap-3">
													<Badge variant={i === 0 ? 'default' : 'outline'} class="gap-1">
														<Vote class="h-3 w-3" />
														{item.votes}
													</Badge>
													{#if item.veto}
														<Badge variant="destructive" class="text-xs">Vetoed</Badge>
													{/if}
												</div>
											</div>
										{/each}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<!-- Other tabs would have similar content -->
			</Tabs>
		</div>
	</section>

	<!-- Features Grid -->
	<section class="container mx-auto px-4 py-16">
		<div class="mx-auto max-w-6xl">
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{#each features as feature}
					<Card class="h-full transition-shadow duration-300 hover:shadow-lg">
						<CardHeader>
							<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
								<feature.icon class="h-6 w-6 text-primary" />
							</div>
							<CardTitle class="text-lg">{feature.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p class="text-sm text-muted-foreground">{feature.description}</p>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Trending Movies -->
	<section class="container mx-auto px-4 py-16">
		<div class="mx-auto max-w-6xl">
			<div class="mb-8 flex items-center justify-between">
				<div>
					<h2 class="mb-2 text-3xl font-bold">Trending in Groups</h2>
					<p class="text-muted-foreground">What people are voting for this week</p>
				</div>
				<Button variant="outline">View All</Button>
			</div>

			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each trendingMovies as movie}
					<Card class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
						<div class="aspect-2/3 rounded-t-lg bg-linear-to-br from-primary/20 to-secondary/20" />
						<CardHeader class="pb-3">
							<CardTitle class="text-lg transition-colors group-hover:text-primary">
								{movie.title}
							</CardTitle>
							<CardDescription>{movie.year} • {movie.votes} votes</CardDescription>
						</CardHeader>
						<CardContent class="pt-0">
							<div class="flex flex-wrap gap-1">
								{#each movie.streaming as service}
									<Badge variant="outline" class="text-xs">{service}</Badge>
								{/each}
							</div>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="container mx-auto px-4 py-24">
		<div class="mx-auto max-w-4xl text-center">
			<div class="relative">
				<div class="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-primary/10 blur-xl" />
				<div class="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-secondary/10 blur-xl" />

				<Card class="relative border-primary/20 bg-gradient-to-b from-background to-primary/5">
					<CardHeader class="pb-6">
						<CardTitle class="mb-4 text-4xl font-bold">Ready to watch with friends?</CardTitle>
						<CardDescription class="text-lg">
							Create your first group in under a minute. No credit card required.
						</CardDescription>
					</CardHeader>
					<CardContent class="pb-8">
						<div class="flex flex-col justify-center gap-4 sm:flex-row">
							<Button size="lg" class="h-12 px-8 text-lg">
								<Users class="mr-2 h-5 w-5" />
								Start Your Group
							</Button>
							<Button size="lg" variant="outline" class="h-12 px-8">Schedule a Demo</Button>
						</div>
						<p class="mt-6 text-sm text-muted-foreground">
							Join 1,234+ groups already enjoying stress-free movie nights
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	</section>
</div>

<style>
	/* Smooth scrolling */
	html {
		scroll-behavior: smooth;
	}

	/* Custom animations */
	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.float-animation {
		animation: float 3s ease-in-out infinite;
	}
</style>
