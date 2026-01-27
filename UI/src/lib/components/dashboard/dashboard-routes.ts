// data/dashboardRoutes.ts
import {
    Activity,
    AlertCircle,
    Archive,
    BarChart3,
    Bell,
    CheckCircle,
    Clock,
    Cpu,
    Database,
    FileText,
    Film,
    Filter,
    Globe,
    Heart,
    Home,
    Key,
    LayoutDashboard,
    List,
    MessageSquare,
    PlusCircle,
    Settings,
    Shield,
    Star,
    TrendingUp,
    User,
    Users,
    Wrench,
    type IconProps
} from '@lucide/svelte';
import type { Component } from 'svelte';

export interface NavItem {
		title: string;
		url: string;
		icon: Component<IconProps, {}, "">,
}

// ============================================
// REGULAR USER DASHBOARD ROUTES
// Focused on: Personal Stats, Quick Add, Activity, Watchlist, Profile
// ============================================
export const userDashboardRoutes: NavItem[] = [
	{
		title: 'Dashboard Overview',
		url: '/dashboard',
		icon: LayoutDashboard
	},
	{
		title: 'Personal Stats',
		url: '/dashboard/stats',
		icon: BarChart3
	},
	{
		title: 'Add Movie',
		url: '/dashboard/add-movie',
		icon: PlusCircle
	},
	{
		title: 'My Movies',
		url: '/dashboard/my-movies',
		icon: Film
	},
	{
		title: 'Watchlist',
		url: '/dashboard/watchlist',
		icon: Heart
	},
	{
		title: 'My Lists',
		url: '/dashboard/lists',
		icon: List
	},
	{
		title: 'Recent Activity',
		url: '/dashboard/activity',
		icon: Activity
	},
	{
		title: 'My Reviews',
		url: '/dashboard/reviews',
		icon: MessageSquare
	},
	{
		title: 'My Ratings',
		url: '/dashboard/ratings',
		icon: Star
	},
	{
		title: 'Profile Editor',
		url: '/dashboard/profile',
		icon: User
	},
	{
		title: 'Account Settings',
		url: '/dashboard/settings',
		icon: Settings
	},
	{
		title: 'Notifications',
		url: '/dashboard/notifications',
		icon: Bell
	},
	{
		title: 'Back to Site',
		url: '/',
		icon: Home
	}
];

// ============================================
// ADMIN DASHBOARD ROUTES
// Focused on: Overview, Pending Approvals, User Management, System Health, Quick Actions, Audit Log
// ============================================
export const adminDashboardRoutes: NavItem[] = [
	// Overview & Quick Actions
	{
		title: 'Admin Overview',
		url: '/dashboard/admin',
		icon: Shield
	},
	{
		title: 'Quick Actions',
		url: '/dashboard/quick-actions',
		icon: Wrench
	},
	
	// Content Management
	{
		title: 'Pending Approvals',
		url: '/dashboard/pending',
		icon: CheckCircle
	},
	{
		title: 'All Movies',
		url: '/dashboard/all-movies',
		icon: Film
	},
	{
		title: 'Content Moderation',
		url: '/dashboard/moderation',
		icon: Filter
	},
	
	// User Management
	{
		title: 'User Management',
		url: '/dashboard/users',
		icon: Users
	},
	{
		title: 'Role Management',
		url: '/dashboard/roles',
		icon: Key
	},
	
	// System & Monitoring
	{
		title: 'System Health',
		url: '/dashboard/health',
		icon: Cpu
	},
	{
		title: 'Performance Metrics',
		url: '/dashboard/metrics',
		icon: TrendingUp
	},
	{
		title: 'Audit Log',
		url: '/dashboard/audit',
		icon: Clock
	},
	{
		title: 'System Alerts',
		url: '/dashboard/alerts',
		icon: AlertCircle
	},
	
	// Analytics & Reports
	{
		title: 'System Analytics',
		url: '/dashboard/analytics',
		icon: BarChart3
	},
	{
		title: 'Reports',
		url: '/dashboard/reports',
		icon: FileText
	},
	
	// Configuration
	{
		title: 'System Settings',
		url: '/dashboard/system',
		icon: Settings
	},
	{
		title: 'Database',
		url: '/dashboard/database',
		icon: Database
	},
	{
		title: 'Backup & Restore',
		url: '/dashboard/backup',
		icon: Archive
	},
	{
		title: 'Site Configuration',
		url: '/dashboard/site-config',
		icon: Globe
	},
	
	// Personal Admin
	{
		title: 'My Admin Profile',
		url: '/dashboard/admin-profile',
		icon: User
	},
	{
		title: 'Back to Site',
		url: '/',
		icon: Home
	}
];

export const getIsActive = (url: string, currentPath: string): boolean => {
	if (url === '/dashboard') {
		return currentPath === '/dashboard' || currentPath === '/dashboard/';
	}
	return currentPath.startsWith(url);
};

/**
 * Get all routes for a specific role with active state
 */
export function getUserRoutes(currentPath: string = ''): NavItem[] {
	return userDashboardRoutes.map(r => ({
		...r,
		isActive: currentPath === r.url || currentPath.startsWith(r.url + '/')
	}));
}

export function getAdminRoutes(currentPath: string = ''): NavItem[] {
	return adminDashboardRoutes.map(r => ({
		...r,
		isActive: currentPath === r.url || currentPath.startsWith(r.url + '/')
	}));
}

/**
 * Get the page title for the current route
 */
export function getPageTitle(path: string, isAdmin: boolean): string {
	const routes = isAdmin ? adminDashboardRoutes : userDashboardRoutes;
	const route = routes.find(r => path === r.url || path.startsWith(r.url + '/'));
	return route?.title || 'Dashboard';
}

/**
 * Check if a route requires admin privileges
 */
export function isAdminRoute(path: string): boolean {
	return adminDashboardRoutes.some(r => path === r.url || path.startsWith(r.url + '/'));
}

/**
 * Get the breadcrumb trail for current path
 */
export function getBreadcrumbs(path: string, isAdmin: boolean): Array<{ title: string; url: string }> {
	const routes = isAdmin ? adminDashboardRoutes : userDashboardRoutes;
	const breadcrumbs = [{ title: 'Dashboard', url: '/dashboard' }];
	
	// Find matching route
	const route = routes.find(r => path === r.url || path.startsWith(r.url + '/'));
	if (route && route.url !== '/dashboard') {
		breadcrumbs.push({ title: route.title, url: route.url });
	}
	
	return breadcrumbs;
}