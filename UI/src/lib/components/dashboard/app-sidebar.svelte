<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { IconProps } from "@lucide/svelte";
	import type { Component, ComponentProps } from "svelte";
	import { adminDashboardRoutes } from "./dashboard-routes";
	import NavMain from "./nav-main.svelte";
	import NavUser from "./nav-user.svelte";
			
	// interface NavItem {
	// 	title: string;
	// 	url: string;
	// 	icon: Component<IconProps, {}, "">,
	// 	isActive: boolean,
	// }

	const data = {
		user: {
			name: "shadcn",
			email: "m@example.com",
			avatar: "/avatars/shadcn.jpg",
		},
		navMain: [...adminDashboardRoutes],
	
	};
	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps} class="mt-16 max-h-[92vh]" >
	<Sidebar.Content>
		<NavMain items={data.navMain} />
 	</Sidebar.Content>
	<Sidebar.Footer >
 		<NavUser user={data.user} />
	</Sidebar.Footer>
</Sidebar.Root>
