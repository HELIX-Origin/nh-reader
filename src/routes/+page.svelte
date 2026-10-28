<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { api } from '$lib/api';
	import type { GalleryList } from '$lib/types';
	import GalleryGrid from '$lib/components/GalleryGrid.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import ErrorNotice from '$lib/components/ErrorNotice.svelte';
	import Pager from '$lib/components/Pager.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { locale } from '$lib/stores/locale.svelte';
	import { getSettings } from '$lib/stores/settings.svelte';
	import { getBlacklistVersion } from '$lib/stores/blacklist.svelte';

	const sort = $derived(page.url.searchParams.get('sort') || 'date');
	const current = $derived(Number(page.url.searchParams.get('page')) || 1);
	const settings = getSettings();

	const sortOptions = $derived([
		{ value: 'date', label: locale.t('browse.sortNewest') },
		{ value: 'popular', label: locale.t('browse.sortPopular') },
		{ value: 'popular-week', label: locale.t('browse.sortPopularWeek') },
		{ value: 'popular-today', label: locale.t('browse.sortPopularToday') },
	]);

	let data = $state<GalleryList | null>(null);
	let error = $state<string | null>(null);
	let loading = $state(true);
	let requestId = 0;
	let tick = $state(0);

	let randomLoading = $state(false);
	let randomNotice = $state<string | null>(null);

	$effect(() => {
		void tick;
		void settings.blacklistEnabled;
		void settings.blacklistMode;
		void getBlacklistVersion();
		const s = sort;
		const p = current;
		const id = ++requestId;
		loading = true;
		error = null;

		const fetcher = s === 'date'
			? api.newGalleries(p)
			: api.search('', s, p);

		fetcher
			.then((res) => {
				if (id === requestId) {
					data = res;
					loading = false;
				}
			})
			.catch((e) => {
				if (id === requestId) {
					error = String(e);
					loading = false;
				}
			});
	});

	$effect(() => {
		const onRefresh = () => {
			tick++;
		};
		window.addEventListener('nh-reader:refresh:browse', onRefresh);
		window.addEventListener('nh-reader:refresh:latest', onRefresh);
		window.addEventListener('nh-reader:refresh:popular', onRefresh);
		return () => {
			window.removeEventListener('nh-reader:refresh:browse', onRefresh);
			window.removeEventListener('nh-reader:refresh:latest', onRefresh);
			window.removeEventListener('nh-reader:refresh:popular', onRefresh);
		};
	});

	function buildUrl(targetPage: number, targetSort: string): string {
		const params = new URLSearchParams();
		if (targetSort && targetSort !== 'date') {
			params.set('sort', targetSort);
		}
		if (targetPage > 1) {
			params.set('page', String(targetPage));
		}
		const qs = params.toString();
		return qs ? `/?${qs}` : '/';
	}

	function gotoPage(n: number) {
		goto(buildUrl(n, sort), { noScroll: true });
	}

	function changeSort(newSort: string) {
		if (newSort === sort) return;
		goto(buildUrl(1, newSort), { noScroll: true });
	}

	function retry() {
		tick++;
	}

	async function openRandom() {
		if (randomLoading) return;
		randomLoading = true;
		randomNotice = null;
		try {
			const chosen = await api.randomGallery();
			if (chosen) {
				goto(`/g/${chosen.id}`);
			} else {
				randomNotice = locale.t('browse.noRandomFound');
				setTimeout(() => {
					randomNotice = null;
				}, 4000);
			}
		} catch (err) {
			randomNotice = String(err);
			setTimeout(() => {
				randomNotice = null;
			}, 4000);
		} finally {
			randomLoading = false;
		}
	}
</script>

<div class="page" data-scope="page-browse">
	<div class="browse-header">
		<div class="browse-titles">
			<h1>{locale.t('browse.title')}</h1>
			<span class="faint">{locale.t('browse.subtitle')}</span>
		</div>

		<div class="browse-actions">
			<div class="browse-sort-chips" role="tablist" aria-label="Sort options">
				{#each sortOptions as opt}
					<button
						type="button"
						class="sort-chip"
						class:active={sort === opt.value}
						onclick={() => changeSort(opt.value)}
						role="tab"
						aria-selected={sort === opt.value}
					>
						{opt.label}
					</button>
				{/each}
			</div>

			<button
				type="button"
				class="btn-random"
				class:loading={randomLoading}
				onclick={openRandom}
				disabled={randomLoading}
				title={locale.t('browse.randomTooltip')}
			>
				<Icon name="sparkle" size={15} />
				<span>{randomLoading ? locale.t('browse.findingRandom') : locale.t('browse.random')}</span>
			</button>
		</div>
	</div>

	{#if randomNotice}
		<div class="random-notice">
			<span>{randomNotice}</span>
		</div>
	{/if}

	{#if loading && !data}
		<Loader label={locale.t('browse.loading')} />
	{:else if error && !data}
		<ErrorNotice message={error} onretry={retry} />
	{:else if data}
		<GalleryGrid galleries={data.result} />
		<Pager page={current} numPages={data.num_pages} ongoto={gotoPage} />
	{/if}
</div>
