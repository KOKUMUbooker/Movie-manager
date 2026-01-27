<script lang="ts" module>
	import BookOpenIcon from "@lucide/svelte/icons/book-open";
	import BotIcon from "@lucide/svelte/icons/bot";
	import Settings2Icon from "@lucide/svelte/icons/settings-2";
	import SquareTerminalIcon from "@lucide/svelte/icons/square-terminal";

	const data = {
		user: {
			name: "shadcn",
			email: "m@example.com",
			avatar: "/avatars/shadcn.jpg",
		},
		navMain: [
			{
				title: "Playground",
				url: "#",
				icon: SquareTerminalIcon,
				isActive: true,
			},
			{
				title: "Models",
				url: "#",
				icon: BotIcon,
				
			},
			{
				title: "Documentation",
				url: "#",
				icon: BookOpenIcon,
			
			},
			{
				title: "Settings",
				url: "#",
				icon: Settings2Icon,
				
			},
		],
	
	};
</script>

<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";
	import NavMain from "./nav-main.svelte";
	import NavUser from "./nav-user.svelte";

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
