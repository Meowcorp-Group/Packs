<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import type { LayoutData } from './$types';

	let { data }: { data: LayoutData } = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<p>{m.hello_world({ name: data.username ?? '' })}</p>
