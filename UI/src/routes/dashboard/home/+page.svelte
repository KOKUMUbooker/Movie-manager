<!-- src/routes/dashboard/home/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { dummyMovies } from '../../../data/movies';
  import { 
    Film, 
    Heart, 
    Star, 
    Clock, 
    PlusCircle,
    Activity,
    Bell,
    TrendingUp,
    Calendar
  } from  '@lucide/svelte';
  
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';

  // User data
  const user = {
    name: 'John',
    joinDate: 'Jan 2024'
  };

  // Stats
  let stats = {
    totalMovies: 0,
    avgRating: 0,
    watchlist: 8,
    recentActivity: 5
  };

  // Recent movies
  let recentMovies = [];
  let recentActivity = [
    'Added "Interstellar" to collection',
    'Rated "Hereditary" 8.5/10',
    'Added "The Dark Knight" to watchlist'
  ];

  onMount(() => {
    // Calculate stats
    const userMovies = dummyMovies.filter(m => m.AddedBy === 'user' || m.AddedBy === 'admin');
    stats.totalMovies = userMovies.length;
    stats.avgRating = userMovies.length > 0 
      ? parseFloat((userMovies.reduce((sum, m) => sum + m.Rating, 0) / userMovies.length).toFixed(1))
      : 0;

    // Get recent movies
    recentMovies = [...userMovies]
      .sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime())
      .slice(0, 3);
  });

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<div class="space-y-6">
  <!-- Welcome Header -->
  <div>
    <h1 class="text-2xl font-bold">Welcome back, {user.name}!</h1>
    <p class="text-muted-foreground">Member since {user.joinDate}</p>
  </div>

  <!-- Quick Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <Card>
      <CardContent class="pt-6 text-center">
        <div class="text-2xl font-bold">{stats.totalMovies}</div>
        <p class="text-sm text-muted-foreground">Movies</p>
      </CardContent>
    </Card>
    <Card>
      <CardContent class="pt-6 text-center">
        <div class="text-2xl font-bold">{stats.avgRating}/10</div>
        <p class="text-sm text-muted-foreground">Avg Rating</p>
      </CardContent>
    </Card>
    <Card>
      <CardContent class="pt-6 text-center">
        <div class="text-2xl font-bold">{stats.watchlist}</div>
        <p class="text-sm text-muted-foreground">Watchlist</p>
      </CardContent>
    </Card>
    <Card>
      <CardContent class="pt-6 text-center">
        <div class="text-2xl font-bold">{stats.recentActivity}</div>
        <p class="text-sm text-muted-foreground">This Week</p>
      </CardContent>
    </Card>
  </div>

  <!-- Quick Actions -->
  <div class="flex gap-3 overflow-x-auto pb-2">
    <Button class="flex-1 min-w-[140px] gap-2">
      <PlusCircle class="h-4 w-4" />
      Add Movie
    </Button>
    <Button variant="outline" class="flex-1 min-w-[140px] gap-2">
      <Heart class="h-4 w-4" />
      Watchlist
    </Button>
    <Button variant="outline" class="flex-1 min-w-[140px] gap-2">
      <Star class="h-4 w-4" />
      Rate Movies
    </Button>
  </div>

  <!-- Recent Movies -->
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold">Recent Movies</h2>
      <Button variant="ghost" size="sm">
        View All
      </Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {#each recentMovies as movie}
        <Card class="hover:bg-accent/50 transition-colors">
          <CardContent class="p-4">
            <div class="flex gap-4">
              <img
                src={movie.ImgUrl}
                alt={movie.Title}
                class="w-16 h-24 object-cover rounded"
              />
              <div class="flex-1">
                <h3 class="font-semibold mb-1">{movie.Title}</h3>
                <div class="flex items-center gap-2 mb-2">
                  <Badge variant="outline" class="text-xs">
                    {movie.Genre}
                  </Badge>
                  <span class="text-sm text-muted-foreground">
                    {movie.ReleaseDate.getFullYear()}
                  </span>
                </div>
                <div class="flex items-center gap-4 text-sm text-muted-foreground">
                  <div class="flex items-center gap-1">
                    <Star class="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{movie.Rating.toFixed(1)}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Clock class="h-4 w-4" />
                    <span>{formatDuration(movie.Minutes)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>

    {#if recentMovies.length === 0}
      <Card>
        <CardContent class="py-8 text-center">
          <Film class="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p class="text-muted-foreground mb-4">No movies added yet</p>
          <Button>
            <PlusCircle class="h-4 w-4 mr-2" />
            Add Your First Movie
          </Button>
        </CardContent>
      </Card>
    {/if}
  </div>

  <!-- Recent Activity -->
  <div>
    <h2 class="text-lg font-semibold mb-4">Recent Activity</h2>
    <Card>
      <CardContent class="p-4">
        <div class="space-y-3">
          {#each recentActivity as activity}
            <div class="flex items-start gap-3">
              <div class="p-2 rounded-lg bg-primary/10">
                <Activity class="h-4 w-4 text-primary" />
              </div>
              <div class="flex-1">
                <p>{activity}</p>
                <p class="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
          {/each}
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- Bottom Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
    <div class="p-4 bg-secondary/50 rounded-lg">
      <div class="text-xl font-bold">98%</div>
      <div class="text-sm text-muted-foreground">Profile</div>
    </div>
    <div class="p-4 bg-secondary/50 rounded-lg">
      <div class="text-xl font-bold">24</div>
      <div class="text-sm text-muted-foreground">Active Days</div>
    </div>
    <div class="p-4 bg-secondary/50 rounded-lg">
      <div class="text-xl font-bold">8.4</div>
      <div class="text-sm text-muted-foreground">Community</div>
    </div>
    <div class="p-4 bg-secondary/50 rounded-lg">
      <div class="text-xl font-bold">Top 15%</div>
      <div class="text-sm text-muted-foreground">Ranking</div>
    </div>
  </div>
</div>