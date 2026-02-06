<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { HTMLAttributes } from 'svelte/elements';
	let { class: className, ...restProps }: HTMLAttributes<HTMLFormElement> = $props();

	let OldPassword = $state('');
	let NewPassword = $state('');
	let PasswordConfirm = $state('');
</script>

<form class={cn('flex flex-col gap-6', className)} {...restProps}>
	<Field.Group>
		<div class="flex flex-col items-center gap-1 text-center">
			<h1 class="text-2xl font-bold">Reset password</h1>
		</div>

		<Field.Field>
			<Field.Label for="OldPassword">Old Password</Field.Label>
			<Input id="OldPassword" bind:value={OldPassword} type="password" required />
			<Field.Description>Must be at least 8 characters long.</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="NewPassword">New Password</Field.Label>
			<Input id="NewPassword" bind:value={NewPassword} type="password" required />
			<Field.Description>Must be at least 8 characters long.</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="passwordConfirm">Confirm Password</Field.Label>
			<Input id="passwordConfirm" bind:value={PasswordConfirm} type="password" required />
			<Field.Description>Please confirm your password.</Field.Description>
		</Field.Field>
		<Field.Field>
			<Button type="submit">Reset password</Button>
		</Field.Field>
		<Field.Field>
			<Field.Description class="px-6 text-center">
				<a href="/login">Back to log in</a>
			</Field.Description>
		</Field.Field>
	</Field.Group>
</form>
