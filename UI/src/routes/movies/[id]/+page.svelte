<!-- src/routes/movies/[id]/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { dummyMovies, } from '../../../data/movies';
  import {type Movie } from "../../../types";
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import { Separator } from '$lib/components/ui/separator';
  	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import Clock from '@lucide/svelte/icons/clock';
	import Film from '@lucide/svelte/icons/film';
	import Heart from '@lucide/svelte/icons/heart';
	import Play from '@lucide/svelte/icons/play';
	import Star from '@lucide/svelte/icons/star';
	import User from '@lucide/svelte/icons/user';
  import { 
    Calendar, 
    Share2, 
    Bookmark,
     ThumbsUp,
    MessageSquare,
     Edit,
    Trash2,
    Globe,
    Award,
     Users,
    Verified
  } from '@lucide/svelte/icons';
  
  // Get movie ID from route
  let movieId: string = '';
  let movie: Movie | null = null;
  let isLoading = true;
  let error: string | null = null;
  
  // UI State
  let isLiked = false;
  let isBookmarked = false;
  let activeTab = 'details';
  let showFullDescription = false;
  
  // Related movies (simulated)
  let relatedMovies: Movie[] = [];
  
  onMount(() => {
    // Get ID from route
    const unsubscribe = page.subscribe($page => {
      movieId = $page.params?.id || "";
      loadMovie();
    });
    
    return unsubscribe;
  });
  
  const loadMovie = async () => {
    isLoading = true;
    error = null;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const id = parseInt(movieId);
    const foundMovie = dummyMovies.find(m => m.Id === id);
    
    if (foundMovie) {
      movie = foundMovie;
      
      // Load related movies (same genre)
      relatedMovies = dummyMovies
        .filter(m => m.Id !== id && m.Genre === foundMovie.Genre)
        .slice(0, 4);
      
      // Check localStorage for user preferences
      isLiked = localStorage.getItem(`movie_${id}_liked`) === 'true';
      isBookmarked = localStorage.getItem(`movie_${id}_bookmarked`) === 'true';
    } else {
      error = 'Movie not found';
    }
    
    isLoading = false;
  };
  
  // Format helpers
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };
  
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Actions
  const toggleLike = () => {
    isLiked = !isLiked;
    if (movie) {
      localStorage.setItem(`movie_${movie.Id}_liked`, isLiked.toString());
    }
  };
  
  const toggleBookmark = () => {
    isBookmarked = !isBookmarked;
    if (movie) {
      localStorage.setItem(`movie_${movie.Id}_bookmarked`, isBookmarked.toString());
    }
  };
  
  const shareMovie = async () => {
    if (movie && navigator.share) {
      try {
        await navigator.share({
          title: movie.Title,
          text: `Check out ${movie.Title} (${movie.ReleaseDate.getFullYear()})`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };
  
  const watchTrailer = () => {
    if (movie?.trailerUrl) {
      window.open(movie.trailerUrl, '_blank');
    }
  };
  
  // Rating helpers
  const getRatingColor = (rating: number): string => {
    if (rating >= 8) return 'text-green-500';
    if (rating >= 7) return 'text-yellow-500';
    if (rating >= 6) return 'text-orange-500';
    return 'text-red-500';
  };
</script>

<svelte:head>
  {#if movie}
    <title>{movie.Title} ({movie.ReleaseDate.getFullYear()}) - Movie Details</title>
    <meta name="description" content={movie.Description} />
  {:else}
    <title>Movie Details</title>
  {/if}
</svelte:head>

<div class="min-h-screen bg-background">
  <!-- Loading State -->
  {#if isLoading}
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-pulse space-y-8">
        <!-- Back button skeleton -->
        <div class="h-10 w-24 bg-muted rounded-lg"></div>
        
        <!-- Main content skeleton -->
        <div class="grid lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-6">
            <div class="h-12 bg-muted rounded-lg w-3/4"></div>
            <div class="space-y-4">
              <div class="h-4 bg-muted rounded w-full"></div>
              <div class="h-4 bg-muted rounded w-5/6"></div>
              <div class="h-4 bg-muted rounded w-4/6"></div>
            </div>
            <div class="h-64 bg-muted rounded-lg"></div>
          </div>
          <div class="space-y-4">
            <div class="h-96 bg-muted rounded-lg"></div>
            <div class="h-12 bg-muted rounded-lg"></div>
            <div class="h-12 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  
  {:else if error}
    <!-- Error State -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
          <Film class="w-8 h-8 text-destructive" />
        </div>
        <h2 class="text-2xl font-bold text-foreground mb-2">Movie Not Found</h2>
        <p class="text-muted-foreground mb-6">{error}</p>
        <Button onclick={() => window.history.back()}>
          <ArrowLeft class="mr-2" />
          Go Back
        </Button>
      </div>
    </div>
  
  {:else if movie}
    <!-- Movie Details Content -->
    
    <!-- Back Navigation -->
    <div class="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
            <a href="/movies">
                <Button variant="ghost"  class="gap-2">
                  <ArrowLeft size={16} />
                  Back to Movies
                </Button>
            </a>
          
          <div class="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Edit size={16} />
            </Button>
            <Button variant="ghost" size="icon" class="text-destructive">
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section -->
      <div class="grid lg:grid-cols-3 gap-8 mb-12">
        <!-- Movie Poster -->
        <div class="lg:col-span-1">
          <div class="sticky top-24">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
              <img
                src={movie.ImgUrl}
                alt={`${movie.Title} poster`}
                class="w-full aspect-[2/3] object-cover"
              />
              
              <!-- Age Rating Badge -->
              <div class="absolute top-4 left-4">
                <Badge class="text-lg font-bold px-4 py-1.5 bg-background/90 backdrop-blur-sm">
                  {movie.AgeRating}
                </Badge>
              </div>
              
              <!-- Verified Badge -->
              {#if movie.verified}
                <div class="absolute top-4 right-4">
                  <Badge variant="default" class="bg-green-500 hover:bg-green-600 gap-1">
                    <Verified size={12} />
                    Verified
                  </Badge>
                </div>
              {/if}
              
              <!-- Play Trailer Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-6">
                <Button size="lg" class="gap-2" onclick={watchTrailer}>
                  <Play size={20} />
                  Watch Trailer
                </Button>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="grid grid-cols-4 gap-3 mt-6">
              <Button 
                variant={isLiked ? 'default' : 'outline'} 
                class="flex-1 gap-2"
                onclick={toggleLike}
              >
                <Heart size={16}  />
                {isLiked ? 'Liked' : 'Like'}
              </Button>
              
              <Button 
                variant={isBookmarked ? 'default' : 'outline'} 
                class="flex-1 gap-2"
                onclick={toggleBookmark}
              >
                <Bookmark size={16} />
                Save
              </Button>
              
              <Button variant="outline" class="flex-1 gap-2" onclick={shareMovie}>
                <Share2 size={16} />
                Share
              </Button>
              
              <Button variant="outline" class="flex-1 gap-2">
                <ThumbsUp size={16} />
                Rate
              </Button>
            </div>
          </div>
        </div>
        
        <!-- Movie Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Title and Basic Info -->
          <div>
            <div class="flex items-start justify-between mb-4">
              <div>
                <h1 class="text-4xl lg:text-5xl font-bold tracking-tight mb-2">
                  {movie.Title}
                  <span class="text-2xl text-muted-foreground ml-2">
                    ({movie.ReleaseDate.getFullYear()})
                  </span>
                </h1>
                
                <div class="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="secondary" class="text-base">
                    {movie.Genre}
                  </Badge>
                  
                  <div class="flex items-center gap-1 text-muted-foreground">
                    <Calendar size={16} />
                    <span>{formatDate(movie.ReleaseDate)}</span>
                  </div>
                  
                  <div class="flex items-center gap-1 text-muted-foreground">
                    <Clock size={16} />
                    <span>{formatDuration(movie.Minutes)}</span>
                  </div>
                  
                  <div class="flex items-center gap-1 {getRatingColor(movie.Rating)}">
                    <Star size={16} class="fill-current" />
                    <span class="font-bold">{movie.Rating.toFixed(1)}</span>
                    <span class="text-muted-foreground">/10</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Description -->
            <div class="mb-8">
              <h3 class="text-xl font-semibold mb-3">Synopsis</h3>
              <p class="text-muted-foreground leading-relaxed">
                {showFullDescription ? movie.Description : movie.Description.slice(0, 300)}
                {#if movie.Description.length > 300 }
                <button
                  onclick={() => showFullDescription = !showFullDescription}
                  class="ml-2 text-primary hover:text-primary-foreground font-medium"
                >
                  {showFullDescription ? 'Show Less' : '...Read More'}
                </button>
                {/if}
              </p>
            </div>
            
            <!-- Primary Action -->
            <Button size="lg" class="gap-3" onclick={watchTrailer}>
              <Play size={20} />
              Watch Trailer
            </Button>
          </div>
          
          <!-- Tabs -->
          <Tabs bind:value={activeTab} class="w-full">
            <TabsList class="grid grid-cols-4 mb-8">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="cast">Cast & Crew</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="similar">Similar Movies</TabsTrigger>
            </TabsList>
            
            <!-- Details Tab -->
            <TabsContent value="details" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Left Column -->
                <Card>
                  <CardHeader>
                    <CardTitle class="flex items-center gap-2">
                      <Award size={18} />
                      Movie Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <p class="text-sm text-muted-foreground">Release Date</p>
                        <p class="font-medium">{formatDate(movie.ReleaseDate)}</p>
                      </div>
                      <div>
                        <p class="text-sm text-muted-foreground">Duration</p>
                        <p class="font-medium">{formatDuration(movie.Minutes)}</p>
                      </div>
                      <div>
                        <p class="text-sm text-muted-foreground">Age Rating</p>
                        <p class="font-medium">{movie.AgeRating}</p>
                      </div>
                      <div>
                        <p class="text-sm text-muted-foreground">Genre</p>
                        <p class="font-medium">{movie.Genre}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <p class="text-sm text-muted-foreground mb-2">Added By</p>
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User size={16} class="text-primary" />
                        </div>
                        <span class="font-medium">{movie.AddedBy}</span>
                        <span class="text-sm text-muted-foreground">
                          on {formatDate(movie.CreatedAt)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <!-- {/* Right Column - Additional Info */} -->
                <Card>
                  <CardHeader>
                    <CardTitle class="flex items-center gap-2">
                      <Globe size={18} />
                      Additional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent class="space-y-4">
                    <div>
                      <p class="text-sm text-muted-foreground mb-2">Status</p>
                      <div class="flex items-center gap-2">
                        <Badge variant={movie.verified ? 'default' : 'outline'}>
                          {movie.verified ? 'Verified' : 'Unverified'}
                        </Badge>
                        <Badge variant="outline">Active</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <p class="text-sm text-muted-foreground mb-2">Trailer Available</p>
                      <Badge variant={movie.trailerUrl ? 'default' : 'secondary'}>
                        {movie.trailerUrl ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    
                    <div>
                      <p class="text-sm text-muted-foreground mb-2">Popularity Score</p>
                      <div class="flex items-center gap-2">
                        <div class="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            class="h-full bg-primary rounded-full"
                            style={`width: ${(movie.Rating / 10) * 100}%`}
                          />
                        </div>
                        <span class="text-sm font-medium">{movie.Rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <!-- {/* Technical Specifications */} -->
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div class="text-center p-4 bg-secondary/50 rounded-lg">
                      <p class="text-sm text-muted-foreground">Aspect Ratio</p>
                      <p class="text-lg font-semibold">2.39:1</p>
                    </div>
                    <div class="text-center p-4 bg-secondary/50 rounded-lg">
                      <p class="text-sm text-muted-foreground">Resolution</p>
                      <p class="text-lg font-semibold">1080p</p>
                    </div>
                    <div class="text-center p-4 bg-secondary/50 rounded-lg">
                      <p class="text-sm text-muted-foreground">Audio</p>
                      <p class="text-lg font-semibold">Dolby 5.1</p>
                    </div>
                    <div class="text-center p-4 bg-secondary/50 rounded-lg">
                      <p class="text-sm text-muted-foreground">Subtitles</p>
                      <p class="text-lg font-semibold">EN, ES, FR</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <!-- Cast & Crew Tab -->
            <TabsContent value="cast" class="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle class="flex items-center gap-2">
                    <Users size={18} />
                    Cast & Crew
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {#each Array(8) as _, i}
                      <div class="text-center">
                        <div class="w-20 h-20 rounded-full bg-muted mx-auto mb-3"></div>
                        <p class="font-medium">Actor Name</p>
                        <p class="text-sm text-muted-foreground">Character</p>
                      </div>
                    {/each}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <!-- Reviews Tab -->
            <TabsContent value="reviews" class="space-y-6">
              <Card>
                <CardHeader>
                  <div class="flex justify-between items-center">
                    <CardTitle class="flex items-center gap-2">
                      <MessageSquare size={18} />
                      User Reviews
                    </CardTitle>
                    <Button>Write Review</Button>
                  </div>
                </CardHeader>
                <CardContent class="space-y-6">
                  {#each Array(3) as _, i}
                    <div class="space-y-3 p-4 border rounded-lg">
                      <div class="flex justify-between items-start">
                        <div class="flex items-center gap-3">
                          <div class="w-10 h-10 rounded-full bg-muted"></div>
                          <div>
                            <p class="font-medium">John Doe</p>
                            <p class="text-sm text-muted-foreground">2 days ago</p>
                          </div>
                        </div>
                        <div class="flex items-center gap-1">
                          <Star size={14} class="text-yellow-500 fill-current" />
                          <span class="font-medium">8.5</span>
                        </div>
                      </div>
                      <p class="text-muted-foreground">
                        Great movie! The cinematography was stunning and the acting was superb.
                        Definitely worth watching.
                      </p>
                    </div>
                  {/each}
                </CardContent>
              </Card>
            </TabsContent>
            
            <!-- Similar Movies Tab -->
            <TabsContent value="similar" class="space-y-6">
              <div>
                <h3 class="text-xl font-semibold mb-4">More like "{movie.Title}"</h3>
                {#if relatedMovies.length > 0}
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {#each relatedMovies as relatedMovie}
                      <a 
                        href={`/movies/${relatedMovie.Id}`}
                        class="group block space-y-3"
                      >
                        <div class="relative aspect-[2/3] rounded-lg overflow-hidden">
                          <img
                            src={relatedMovie.ImgUrl}
                            alt={relatedMovie.Title}
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div>
                          <p class="font-medium line-clamp-1">{relatedMovie.Title}</p>
                          <div class="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{relatedMovie.ReleaseDate.getFullYear()}</span>
                            <div class="flex items-center gap-1">
                              <Star size={12} class="text-yellow-500 fill-current" />
                              <span>{relatedMovie.Rating.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    {/each}
                  </div>
                {:else}
                  <p class="text-muted-foreground text-center py-8">
                    No similar movies found.
                  </p>
                {/if}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <!-- Stats Section -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent class="pt-6 text-center">
            <div class="text-3xl font-bold text-primary mb-2">
              {movie.Rating.toFixed(1)}
            </div>
            <p class="text-sm text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent class="pt-6 text-center">
            <div class="text-3xl font-bold text-primary mb-2">
              {formatDuration(movie.Minutes)}
            </div>
            <p class="text-sm text-muted-foreground">Duration</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent class="pt-6 text-center">
            <div class="text-3xl font-bold text-primary mb-2">
              {movie.AgeRating}
            </div>
            <p class="text-sm text-muted-foreground">Age Rating</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent class="pt-6 text-center">
            <div class="text-3xl font-bold text-primary mb-2">
              {movie.Genre}
            </div>
            <p class="text-sm text-muted-foreground">Genre</p>
          </CardContent>
        </Card>
      </div>
      
      <!-- Recent Activity -->
      <Card class="mb-12">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User size={18} class="text-primary" />
              </div>
              <div class="flex-1">
                <p class="font-medium">
                  {movie.AddedBy} added this movie to the collection
                </p>
                <p class="text-sm text-muted-foreground">
                  {formatDate(movie.CreatedAt)}
                </p>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Verified size={18} class="text-green-500" />
              </div>
              <div class="flex-1">
                <p class="font-medium">
                  Movie verified by system
                </p>
                <p class="text-sm text-muted-foreground">
                  {new Date(movie.CreatedAt.getTime() + 86400000).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  {/if}
</div>