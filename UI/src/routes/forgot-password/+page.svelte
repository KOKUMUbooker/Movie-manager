<script lang="ts">
	import mvImg from '$lib/assets/movie.jpg';
	import ForgotPasswordForm from '@/components/forgot-password/forgot-password-form.svelte';
</script>

<div class="grid min-h-svh lg:grid-cols-2">
	<div class="flex flex-col gap-4 p-6 md:p-10">
		<div class="flex flex-1 items-center justify-center">
			<div class="w-full max-w-xs">
				<ForgotPasswordForm />
			</div>
		</div>
	</div>
	<div class="relative hidden bg-muted lg:block">
		<img
			src={mvImg}
			alt="placeholder"
			class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] dark:grayscale"
		/>
	</div>
</div>
