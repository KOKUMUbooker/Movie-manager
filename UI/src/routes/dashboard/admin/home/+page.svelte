<!-- src/routes/dashboard/admin/+page.svelte -->
<script lang="ts">
  import { 
    Users,
    Film,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    BarChart3,
    Shield,
    Clock,
    Activity,
    DollarSign,
    Database,
    Eye
  } from '@lucide/svelte';
  
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Separator } from '$lib/components/ui/separator';

  // System stats
  let stats = {
    totalUsers: 156,
    totalMovies: 1247,
    pendingApprovals: 8,
    activeSessions: 42,
    storageUsed: '2.4 GB',
    systemHealth: 'Good',
    revenue: 2450
  };

  // Recent activity
  let recentActivity = [
    { user: 'Sarah Chen', action: 'added new movie', target: 'Dune: Part Two', time: '5 min ago' },
    { user: 'Admin', action: 'approved movie', target: 'The Creator', time: '15 min ago' },
    { user: 'Mike Ross', action: 'created account', time: '30 min ago' },
    { user: 'System', action: 'performed backup', time: '2 hours ago' },
    { user: 'Admin', action: 'updated system settings', time: '4 hours ago' }
  ];

  // Quick actions
  let quickActions = [
    { title: 'Review Movies', icon: Film, count: stats.pendingApprovals, color: 'bg-blue-500' },
    { title: 'Manage Users', icon: Users, count: 3, color: 'bg-green-500' },
    { title: 'View Reports', icon: BarChart3, color: 'bg-purple-500' },
    { title: 'System Settings', icon: Database, color: 'bg-yellow-500' }
  ];

  // System status
  let systemStatus = [
    { service: 'API Server', status: 'online', uptime: '99.9%' },
    { service: 'Database', status: 'online', uptime: '99.8%' },
    { service: 'Email Service', status: 'online', uptime: '98.5%' },
    { service: 'Backup System', status: 'warning', uptime: '95.2%' }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'offline': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBg = (status: string) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
</script>

<svelte:head>
  <title>Admin Dashboard</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      <p class="text-muted-foreground">System overview and quick actions</p>
    </div>
    <Badge variant="outline" class="gap-2">
      <Shield class="h-4 w-4" />
      Administrator
    </Badge>
  </div>

  <!-- Key Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl font-bold">{stats.totalUsers}</div>
            <p class="text-sm text-muted-foreground">Total Users</p>
          </div>
          <div class="p-3 rounded-lg bg-blue-500/10">
            <Users class="h-6 w-6 text-blue-500" />
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl font-bold">{stats.totalMovies}</div>
            <p class="text-sm text-muted-foreground">Movies</p>
          </div>
          <div class="p-3 rounded-lg bg-green-500/10">
            <Film class="h-6 w-6 text-green-500" />
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl font-bold">{stats.pendingApprovals}</div>
            <p class="text-sm text-muted-foreground">Pending</p>
          </div>
          <div class="p-3 rounded-lg bg-yellow-500/10">
            <CheckCircle class="h-6 w-6 text-yellow-500" />
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl font-bold">{stats.activeSessions}</div>
            <p class="text-sm text-muted-foreground">Active Now</p>
          </div>
          <div class="p-3 rounded-lg bg-purple-500/10">
            <Activity class="h-6 w-6 text-purple-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- System Status and Quick Actions -->
  <div class="grid md:grid-cols-3 gap-6">
    <!-- System Status -->
    <Card class="md:col-span-2">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Database class="h-5 w-5" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        {#each systemStatus as service}
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class={`h-2 w-2 rounded-full ${getStatusBg(service.status)}`} />
              <span class="font-medium">{service.service}</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-sm text-muted-foreground">{service.uptime} uptime</span>
              <Badge variant="outline" class={getStatusColor(service.status)}>
                {service.status}
              </Badge>
            </div>
          </div>
        {/each}
        
        <Separator />
        
        <div class="flex items-center justify-between pt-2">
          <div class="text-sm text-muted-foreground">Overall System Health</div>
          <div class="flex items-center gap-2">
            <div class={`h-2 w-2 rounded-full ${stats.systemHealth === 'Good' ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <span class="font-medium">{stats.systemHealth}</span>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Quick Actions -->
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        {#each quickActions as action}
          <Button 
            variant="outline" 
            class="w-full justify-start h-auto py-3"
          >
            <div class="flex items-center gap-3 text-left w-full">
              <div class={`p-2 rounded-lg ${action.color}`}>
                <svelte:component this={action.icon} class="h-5 w-5 text-white" />
              </div>
              <div class="flex-1">
                <div class="font-medium">{action.title}</div>
                {#if action.count !== undefined}
                  <div class="text-sm text-muted-foreground">{action.count} pending</div>
                {/if}
              </div>
            </div>
          </Button>
        {/each}
      </CardContent>
    </Card>
  </div>

  <!-- Recent Activity -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Clock class="h-5 w-5" />
        Recent Activity
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        {#each recentActivity as activity}
          <div class="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <div class="p-2 rounded-lg bg-primary/10">
              <Activity class="h-4 w-4 text-primary" />
            </div>
            <div class="flex-1">
              <p>
                <span class="font-medium">{activity.user}</span>
                {' '}{activity.action}
                {#if activity.target}
                  {' '}<span class="font-medium">"{activity.target}"</span>
                {/if}
              </p>
              <p class="text-sm text-muted-foreground">{activity.time}</p>
            </div>
            <Button variant="ghost" size="sm">
              <Eye class="h-4 w-4" />
            </Button>
          </div>
        {/each}
      </div>
    </CardContent>
  </Card>

  <!-- Bottom Stats -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-xl font-bold">${stats.revenue}</div>
            <p class="text-sm text-muted-foreground">Monthly Revenue</p>
          </div>
          <TrendingUp class="h-8 w-8 text-green-500" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-xl font-bold">{stats.storageUsed}</div>
            <p class="text-sm text-muted-foreground">Storage Used</p>
          </div>
          <Database class="h-8 w-8 text-blue-500" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-xl font-bold">24/7</div>
            <p class="text-sm text-muted-foreground">Uptime</p>
          </div>
          <div class="relative">
            <div class="h-8 w-8 rounded-full border-4 border-green-500" />
            <div class="absolute inset-0 flex items-center justify-center">
              <CheckCircle class="h-4 w-4 text-green-500" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</div>