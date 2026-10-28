<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/?sort=popular', { replaceState: true });
	});
</script>

<div class="page" data-scope="page-popular-redirect"></div>
