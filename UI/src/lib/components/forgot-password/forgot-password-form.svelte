<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Field,
		FieldDescription,
		FieldGroup,
		FieldLabel
	} from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLFormAttributes } from 'svelte/elements';
	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithElementRef<HTMLFormAttributes> = $props();
	const id = $props.id();
</script>

<form class={cn('flex flex-col gap-6', className)} bind:this={ref} {...restProps}>
	<FieldGroup>
		<div class="flex flex-col items-center gap-1 text-center">
			<h1 class="text-2xl font-bold">Forgot password</h1>
			<p class="text-sm text-balance text-muted-foreground">
				Enter the email that will receive the password reset link
			</p>
		</div>
		<Field>
			<FieldLabel for="email-{id}">Email</FieldLabel>
			<Input id="email-{id}" type="email" placeholder="m@example.com" required />
		</Field>
		<Field>
			<Button type="submit">Submit</Button>
		</Field>
		<Field>
			<FieldDescription class="text-center">
				<a href="/login" class="underline underline-offset-4">Back to login</a>
			</FieldDescription>
		</Field>
	</FieldGroup>
</form>
