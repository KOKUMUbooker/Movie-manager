<!-- src/routes/dashboard/movies/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { dummyMovies } from '../../../data/movies';
  import type { Movie } from '../../../types';
  import { ALL_GENRES } from '../../../types';
  import { 
    Film, 
    Heart, 
    List, 
    PlusCircle, 
    Search, 
    Filter, 
    Star,
    Clock,
    Calendar,
    Trash2,
    Eye
  } from  '@lucide/svelte';
  
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Badge } from '$lib/components/ui/badge';
  import { Separator } from '$lib/components/ui/separator';

  // State
  let myMovies = [];
  let searchQuery = '';
  let selectedGenre = 'all';

  onMount(() => {
    // Filter user's movies
    myMovies = dummyMovies.filter(movie => 
      movie.AddedBy === 'user' || movie.AddedBy === 'admin'
    );
  });

  // Filtered movies
  $: filteredMovies = myMovies.filter(movie => {
    const matchesSearch = !searchQuery || 
      movie.Title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = selectedGenre === 'all' || movie.Genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  });

  // Helper functions
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const addMovie = () => {
    // Simple add function - in real app, open a modal/form
    alert('Add movie form would open here');
  };
</script>

<svelte:head>
  <title>My Movies</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold">My Movies</h1>
      <p class="text-muted-foreground">
        {myMovies.length} movies in your collection
      </p>
    </div>
    <Button on:click={addMovie}>
      <PlusCircle class="h-4 w-4 mr-2" />
      Add Movie
    </Button>
  </div>

  <!-- Search and Filter -->
  <Card>
    <CardContent class="pt-6">
      <div class="space-y-4">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            bind:value={searchQuery}
            placeholder="Search your movies..."
            class="pl-10"
          />
        </div>
        
        <div class="flex gap-2 overflow-x-auto pb-2">
          <Button 
            variant={selectedGenre === 'all' ? 'default' : 'outline'} 
            size="sm"
            on:click={() => selectedGenre = 'all'}
          >
            All
          </Button>
          {#each ALL_GENRES.slice(0, 8) as genre}
            <Button 
              variant={selectedGenre === genre ? 'default' : 'outline'} 
              size="sm"
              on:click={() => selectedGenre = genre}
            >
              {genre}
            </Button>
          {/each}
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Movies List -->
  <div class="space-y-3">
    {#if filteredMovies.length === 0}
      <Card>
        <CardContent class="pt-12 pb-12 text-center">
          <Film class="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 class="text-lg font-semibold mb-2">No movies found</h3>
          <p class="text-muted-foreground mb-4">
            {searchQuery ? 'Try a different search' : 'Start by adding your first movie'}
          </p>
          <Button on:click={addMovie}>
            <PlusCircle class="h-4 w-4 mr-2" />
            Add Movie
          </Button>
        </CardContent>
      </Card>
    {:else}
      {#each filteredMovies as movie}
        <Card class="hover:bg-accent/50 transition-colors">
          <CardContent class="p-4">
            <div class="flex gap-4">
              <!-- Movie Poster -->
              <img
                src={movie.ImgUrl}
                alt={movie.Title}
                class="w-16 h-24 object-cover rounded"
              />
              
              <!-- Movie Details -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <h3 class="font-semibold text-lg">{movie.Title}</h3>
                    <div class="flex items-center gap-2 mt-1">
                      <Badge variant="outline" class="text-xs">
                        {movie.Genre}
                      </Badge>
                      <span class="text-sm text-muted-foreground">
                        {movie.ReleaseDate.getFullYear()}
                      </span>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <div class="flex items-center gap-1 text-sm">
                      <Star class="h-4 w-4 text-yellow-500 fill-current" />
                      <span class="font-medium">{movie.Rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                
                <p class="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {movie.Description}
                </p>
                
                <div class="flex items-center gap-4 text-sm text-muted-foreground">
                  <div class="flex items-center gap-1">
                    <Clock class="h-4 w-4" />
                    <span>{formatDuration(movie.Minutes)}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Calendar class="h-4 w-4" />
                    <span>Added {movie.CreatedAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="flex gap-2 mt-4">
                  <Button variant="ghost" size="sm" class="h-8">
                    <Eye class="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm" class="h-8">
                    <Heart class="h-4 w-4 mr-1" />
                    Watchlist
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    {/if}
  </div>

  <!-- Quick Stats -->
  <Separator />
  
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="text-center">
      <div class="text-2xl font-bold">{myMovies.length}</div>
      <div class="text-sm text-muted-foreground">Total</div>
    </div>
    <div class="text-center">
      <div class="text-2xl font-bold">
        {myMovies.length > 0 ? (myMovies.reduce((sum, m) => sum + m.Rating, 0) / myMovies.length).toFixed(1) : '0.0'}
      </div>
      <div class="text-sm text-muted-foreground">Avg Rating</div>
    </div>
    <div class="text-center">
      <div class="text-2xl font-bold">
        {myMovies.reduce((sum, m) => sum + m.Minutes, 0) > 0 
          ? formatDuration(myMovies.reduce((sum, m) => sum + m.Minutes, 0)) 
          : '0h'}
      </div>
      <div class="text-sm text-muted-foreground">Watch Time</div>
    </div>
    <div class="text-center">
      <div class="text-2xl font-bold">{ALL_GENRES.filter(g => myMovies.some(m => m.Genre === g)).length}</div>
      <div class="text-sm text-muted-foreground">Genres</div>
    </div>
  </div>
</div>