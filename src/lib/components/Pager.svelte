<script lang="ts">
	import Icon from './Icon.svelte';
	import { locale } from '$lib/stores/locale.svelte';

	let { page, numPages, ongoto }: { page: number; numPages: number; ongoto: (p: number) => void } =
		$props();

	const atStart = $derived(page <= 1);
	const atEnd = $derived(page >= numPages);
</script>

<nav class="pager" data-scope="pager" aria-label="Pagination">
	<button
		type="button"
		class="btn pager-btn"
		disabled={atStart}
		onclick={() => ongoto(page - 1)}
		aria-label={locale.t('common.prev')}
	>
		<Icon name="chevron-left" size={16} />
		<span class="btn-text">{locale.t('common.prev')}</span>
	</button>
	<span class="page-info">
		{locale.t('common.page')} <b>{page}</b> {locale.t('common.of')} <b>{numPages > 0 ? numPages : 1}</b>
	</span>
	<button
		type="button"
		class="btn pager-btn"
		disabled={atEnd}
		onclick={() => ongoto(page + 1)}
		aria-label={locale.t('common.next')}
	>
		<span class="btn-text">{locale.t('common.next')}</span>
		<Icon name="chevron-right" size={16} />
	</button>
</nav>
