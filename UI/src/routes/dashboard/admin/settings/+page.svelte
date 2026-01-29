<!-- src/routes/dashboard/admin-settings/+page.svelte -->
<script lang="ts">
  import {
  	AlertCircle,
  	CheckCircle,
  	Clock,
  	Database,
  	Download,
  	Eye,
  	EyeOff,
  	Globe,
  	Key,
  	Mail,
  	Save,
  	Settings,
  	Shield,
  	Upload
  } from '@lucide/svelte';
  
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Separator } from '$lib/components/ui/separator';
  import { Switch } from '$lib/components/ui/switch';
  import { Textarea } from '$lib/components/ui/textarea';

  // Site Settings
  let site = {
    name: 'Movie Manager',
    description: 'Your personal movie collection manager',
    logoUrl: '',
    contactEmail: 'admin@moviemanager.com',
    maintenanceMode: false
  };

  // Security Settings
  let security = {
    requireEmailVerification: true,
    allowUserRegistration: true,
    enable2FA: false,
    passwordMinLength: 8,
    sessionTimeout: 60, // minutes
    apiKey: 'sk_live_********',
    showApiKey: false
  };

  // Email Settings
  let email = {
    smtpHost: 'smtp.example.com',
    smtpPort: '587',
    smtpUser: 'noreply@moviemanager.com',
    smtpPassword: '********',
    fromName: 'Movie Manager',
    fromEmail: 'noreply@moviemanager.com'
  };

  // UI State
  let isSaving = false;
  let showBackupModal = false;
  let showResetModal = false;
  let saveStatus = '';

  const saveSettings = () => {
    isSaving = true;
    saveStatus = 'Saving...';
    
    // Simulate API call
    setTimeout(() => {
      isSaving = false;
      saveStatus = 'Settings saved successfully';
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        saveStatus = '';
      }, 3000);
    }, 1000);
  };

  const performBackup = () => {
    alert('Database backup started...');
    showBackupModal = false;
  };

  const restoreBackup = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json,.sql';
    fileInput.onchange = (e) => {
      alert('Restore process would start with selected file');
    };
    fileInput.click();
  };

  const resetSettings = () => {
    if (confirm('Are you sure? This will reset all settings to defaults.')) {
      alert('Settings reset to defaults');
      showResetModal = false;
    }
  };

  const generateApiKey = () => {
    security.apiKey = 'sk_live_' + Math.random().toString(36).substring(2, 15);
  };

  const toggleApiKeyVisibility = () => {
    security.showApiKey = !security.showApiKey;
  };
</script>

<svelte:head>
  <title>Admin - System Settings</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold">System Settings</h1>
      <p class="text-muted-foreground">Configure system-wide settings and preferences</p>
    </div>
    <div class="flex items-center gap-2">
      {#if saveStatus} 
      <div class={`text-sm ${saveStatus.includes('successfully') ? 'text-green-500' : 'text-blue-500'}`}>
        {saveStatus}
      </div>
      {/if}
     
        <Button onclick={saveSettings} disabled={isSaving}>
        {#if isSaving}
            <div>Saving...</div>
        {:else}
            <div class="flex items-center">
            <Save class="h-4 w-4 mr-2" />
            Save Changes
            </div>
        {/if}
        </Button>
    </div>
  </div>

  <!-- Site Settings -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Globe class="h-5 w-5" />
        Site Settings
      </CardTitle>
      <CardDescription>Configure your site's appearance and basic settings</CardDescription>
    </CardHeader>
    <CardContent class="space-y-6">
      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="site-name">Site Name</Label>
            <Input 
              id="site-name" 
              bind:value={site.name}
              placeholder="Your site name"
            />
          </div>
          
          <div class="space-y-2">
            <Label for="site-description">Site Description</Label>
            <Textarea 
              id="site-description" 
              bind:value={site.description}
              placeholder="Brief description of your site"
              rows={2}
            />
          </div>
          
          <div class="space-y-2">
            <Label for="contact-email">Contact Email</Label>
            <Input 
              id="contact-email" 
              bind:value={site.contactEmail}
              type="email"
              placeholder="contact@example.com"
            />
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="logo-url">Logo URL</Label>
            <Input 
              id="logo-url" 
              bind:value={site.logoUrl}
              placeholder="https://example.com/logo.png"
            />
            <div class="text-xs text-muted-foreground">
              URL to your site logo (recommended size: 200x50px)
            </div>
          </div>
          
          <div class="flex items-center justify-between pt-2">
            <div class="space-y-0.5">
              <Label>Maintenance Mode</Label>
              <p class="text-sm text-muted-foreground">Show maintenance page to users</p>
            </div>
            <Switch bind:checked={site.maintenanceMode} />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Security Settings -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Shield class="h-5 w-5" />
        Security Settings
      </CardTitle>
      <CardDescription>Configure authentication and security options</CardDescription>
    </CardHeader>
    <CardContent class="space-y-6">
      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="space-y-0.5">
              <Label>Require Email Verification</Label>
              <p class="text-sm text-muted-foreground">Users must verify email to activate account</p>
            </div>
            <Switch bind:checked={security.requireEmailVerification} />
          </div>
          
          <div class="flex items-center justify-between">
            <div class="space-y-0.5">
              <Label>Allow User Registration</Label>
              <p class="text-sm text-muted-foreground">Allow new users to register accounts</p>
            </div>
            <Switch bind:checked={security.allowUserRegistration} />
          </div>
          
          <div class="flex items-center justify-between">
            <div class="space-y-0.5">
              <Label>Enable Two-Factor Auth</Label>
              <p class="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
            </div>
            <Switch bind:checked={security.enable2FA} />
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="password-length">Minimum Password Length</Label>
            <div class="flex items-center gap-2">
              <Input 
                id="password-length" 
                type="number"
                bind:value={security.passwordMinLength}
                min="6"
                max="32"
                class="w-24"
              />
              <span class="text-sm text-muted-foreground">characters</span>
            </div>
          </div>
          
          <div class="space-y-2">
            <Label for="session-timeout">Session Timeout</Label>
            <div class="flex items-center gap-2">
              <Input 
                id="session-timeout" 
                type="number"
                bind:value={security.sessionTimeout}
                min="5"
                max="1440"
                class="w-24"
              />
              <span class="text-sm text-muted-foreground">minutes</span>
            </div>
          </div>
          
          <div class="space-y-2">
            <Label for="api-key">API Key</Label>
            <div class="flex gap-2">
              <div class="flex-1 relative">
                <Input 
                  id="api-key" 
                  type={security.showApiKey ? 'text' : 'password'}
                  value={security.apiKey}
                  readonly
                  class="pr-10"
                />
                <button 
                  type="button"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onclick={toggleApiKeyVisibility}
                >
                {#if security.showApiKey }
                <EyeOff class="h-4 w-4 text-muted-foreground" /> : 
                <Eye class="h-4 w-4 text-muted-foreground" />
                {/if}
             
                </button>
              </div>
              <Button variant="outline" onclick={generateApiKey}>
                <Key class="h-4 w-4 mr-2" />
                Generate New
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Email Settings -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Mail class="h-5 w-5" />
        Email Settings
      </CardTitle>
      <CardDescription>Configure email server for notifications</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="smtp-host">SMTP Host</Label>
            <Input 
              id="smtp-host" 
              bind:value={email.smtpHost}
              placeholder="smtp.example.com"
            />
          </div>
          
          <div class="space-y-2">
            <Label for="smtp-port">SMTP Port</Label>
            <Input 
              id="smtp-port" 
              bind:value={email.smtpPort}
              placeholder="587"
            />
          </div>
          
          <div class="space-y-2">
            <Label for="smtp-user">SMTP Username</Label>
            <Input 
              id="smtp-user" 
              bind:value={email.smtpUser}
              placeholder="username"
            />
          </div>
          
          <div class="space-y-2">
            <Label for="smtp-password">SMTP Password</Label>
            <Input 
              id="smtp-password" 
              bind:value={email.smtpPassword}
              type="password"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="from-name">From Name</Label>
            <Input 
              id="from-name" 
              bind:value={email.fromName}
              placeholder="Movie Manager"
            />
          </div>
          
          <div class="space-y-2">
            <Label for="from-email">From Email</Label>
            <Input 
              id="from-email" 
              bind:value={email.fromEmail}
              type="email"
              placeholder="noreply@example.com"
            />
          </div>
          
          <div class="pt-6">
            <Button variant="outline" class="w-full">
              <Mail class="h-4 w-4 mr-2" />
              Test Email Configuration
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- System Management -->
  <div class="grid md:grid-cols-2 gap-6">
    <!-- Backup & Restore -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Database class="h-5 w-5" />
          Backup & Restore
        </CardTitle>
        <CardDescription>Manage system backups</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium">Last Backup</h3>
              <p class="text-sm text-muted-foreground">January 24, 2024 - 2:30 PM</p>
            </div>
            <CheckCircle class="h-5 w-5 text-green-500" />
          </div>
          
          <Separator />
          
          <div class="space-y-2">
            <Button 
              variant="outline" 
              class="w-full justify-start gap-2"
              onclick={performBackup}
            >
              <Download class="h-4 w-4" />
              Create Backup Now
            </Button>
            <Button 
              variant="outline" 
              class="w-full justify-start gap-2"
              onclick={restoreBackup}
            >
              <Upload class="h-4 w-4" />
              Restore from Backup
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- System Tools -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Settings class="h-5 w-5" />
          System Tools
        </CardTitle>
        <CardDescription>Maintenance and debugging tools</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium">Cache Status</h3>
              <p class="text-sm text-muted-foreground">2.4 MB cached data</p>
            </div>
            <Button variant="outline" size="sm">
              Clear Cache
            </Button>
          </div>
          
          <Separator />
          
          <div class="space-y-2">
            <Button 
              variant="outline" 
              class="w-full justify-start gap-2"
              onclick={() => alert('Logs cleared')}
            >
              <Clock class="h-4 w-4" />
              Clear System Logs
            </Button>
            <Button 
              variant="outline" 
              class="w-full justify-start gap-2"
              onclick={() => alert('Database optimized')}
            >
              <Database class="h-4 w-4" />
              Optimize Database
            </Button>
            <Button 
              variant="destructive" 
              class="w-full justify-start gap-2"
              onclick={() => showResetModal = true}
            >
              <AlertCircle class="h-4 w-4" />
              Reset to Defaults
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- Danger Zone -->
  <Card class="border-red-200 dark:border-red-900">
    <CardHeader>
      <CardTitle class="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
      <CardDescription>Irreversible actions - proceed with caution</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium">Delete All Data</h3>
            <p class="text-sm text-muted-foreground">Permanently delete all movies, users, and data</p>
          </div>
          <Button variant="destructive">
            <AlertCircle class="h-4 w-4 mr-2" />
            Delete Everything
          </Button>
        </div>
        
        <Separator />
        
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium">System Information</h3>
            <p class="text-sm text-muted-foreground">View detailed system specs and logs</p>
          </div>
          <Button variant="outline">
            View System Info
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</div>

<!-- Reset Confirmation Modal -->
{#if showResetModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <Card class="max-w-md w-full">
      <CardHeader>
        <CardTitle class="text-red-600 flex items-center gap-2">
          <AlertCircle class="h-5 w-5" />
          Reset Settings
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <p class="text-muted-foreground">
          Are you sure you want to reset all settings to their default values? 
          This action cannot be undone.
        </p>
        
        <div class="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            class="flex-1"
            onclick={() => showResetModal = false}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            class="flex-1"
            onclick={resetSettings}
          >
            Reset Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
{/if}