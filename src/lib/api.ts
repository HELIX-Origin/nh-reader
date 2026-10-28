import { backend } from '$lib/client';
import { cacheGetJson, cacheSetJson } from '$lib/cache';
import type { GalleryDetail, GalleryList, GalleryListItem, Paginated, RelatedGalleries, Tag } from '$lib/types';
import { getSettings } from '$lib/stores/settings.svelte';
import { getBlacklist, matchesBlacklist, getBlacklistVersion } from '$lib/stores/blacklist.svelte';

const TTL_HOURS = 24;
export const GALLERIES_PER_PAGE = 28;

async function cached<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
	const hit = await cacheGetJson<T>(key);
	if (hit !== null) return hit;
	const data = await fetchFn();
	await cacheSetJson(key, data);
	return data;
}

function cacheKey(parts: (string | number | undefined)[]): string {
	return parts.filter(Boolean).join(':');
}

interface StreamBuffer {
	items: GalleryListItem[];
	lastUpstreamPage: number;
	totalUpstreamPages: number;
	filterSig: string;
}

function createStreamBuffer(): StreamBuffer {
	return {
		items: [],
		lastUpstreamPage: 0,
		totalUpstreamPages: 99999,
		filterSig: '',
	};
}

let newGalleriesStream = createStreamBuffer();
const taggedStreamMap = new Map<string, StreamBuffer>();
const searchStreamMap = new Map<string, StreamBuffer>();

function getActiveFilterSignature(): string {
	const s = getSettings();
	if (!s.blacklistEnabled || s.blacklistMode !== 'hide') return 'none';
	const list = getBlacklist();
	if (list.length === 0) return 'none';
	return `${getBlacklistVersion()}:${list.map((e) => `${e.type}:${e.id}`).sort().join(',')}`;
}

async function streamBackfilledList(
	stream: StreamBuffer,
	page: number,
	perPage: number,
	fetchUpstreamPage: (upstreamPage: number) => Promise<GalleryList>,
): Promise<GalleryList> {
	const sig = getActiveFilterSignature();
	if (stream.filterSig !== sig) {
		stream.items = [];
		stream.lastUpstreamPage = 0;
		stream.totalUpstreamPages = 99999;
		stream.filterSig = sig;
	}

	const startIndex = (page - 1) * perPage;
	const endIndex = page * perPage;

	let maxBatches = 15;
	while (
		stream.items.length < endIndex &&
		stream.lastUpstreamPage < stream.totalUpstreamPages &&
		maxBatches-- > 0
	) {
		const nextUpstream = stream.lastUpstreamPage + 1;
		const upstream = await fetchUpstreamPage(nextUpstream);
		stream.lastUpstreamPage = nextUpstream;
		stream.totalUpstreamPages = upstream.num_pages || stream.totalUpstreamPages;

		if (!upstream.result || upstream.result.length === 0) break;

		const unblocked = upstream.result.filter((g) => !matchesBlacklist(g));
		stream.items.push(...unblocked);
	}

	const result = stream.items.slice(startIndex, endIndex);
	const ratio = stream.items.length / Math.max(1, stream.lastUpstreamPage * perPage);
	const estimatedNumPages = Math.max(page, Math.round(stream.totalUpstreamPages * (ratio || 1)));

	return {
		result,
		num_pages: estimatedNumPages,
		per_page: perPage,
		total: estimatedNumPages * perPage,
	};
}

export const api = {
	newGalleries(page = 1, perPage = GALLERIES_PER_PAGE): Promise<GalleryList> {
		const sig = getActiveFilterSignature();
		if (sig === 'none') {
			return cached(cacheKey(['cache:new', page, perPage]), () =>
				backend.fetchNew(page, perPage),
			);
		}
		return streamBackfilledList(newGalleriesStream, page, perPage, (p) =>
			cached(cacheKey(['cache:new', p, perPage]), () => backend.fetchNew(p, perPage)),
		);
	},

	popular(): Promise<GalleryListItem[]> {
		return cached('cache:popular', () => backend.fetchPopular());
	},

	tagged(tagId: number, sort = 'date', page = 1, perPage = GALLERIES_PER_PAGE): Promise<GalleryList> {
		const sig = getActiveFilterSignature();
		if (sig === 'none') {
			return cached(cacheKey(['cache:tagged', tagId, sort, page, perPage]), () =>
				backend.fetchTagged(tagId, sort, page, perPage),
			);
		}
		const streamKey = `${tagId}:${sort}`;
		let stream = taggedStreamMap.get(streamKey);
		if (!stream) {
			stream = createStreamBuffer();
			taggedStreamMap.set(streamKey, stream);
		}
		return streamBackfilledList(stream, page, perPage, (p) =>
			cached(cacheKey(['cache:tagged', tagId, sort, p, perPage]), () =>
				backend.fetchTagged(tagId, sort, p, perPage),
			),
		);
	},

	search(query: string, sort = 'date', page = 1, ttlHours = TTL_HOURS): Promise<GalleryList> {
		const sig = getActiveFilterSignature();
		if (sig === 'none') {
			return cached(cacheKey(['cache:search', query, sort, page, ttlHours]), () =>
				backend.searchGalleries(query, sort, page),
			);
		}
		const streamKey = `${query}:${sort}`;
		let stream = searchStreamMap.get(streamKey);
		if (!stream) {
			stream = createStreamBuffer();
			searchStreamMap.set(streamKey, stream);
		}
		return streamBackfilledList(stream, page, perPageForSearch(), (p) =>
			cached(cacheKey(['cache:search', query, sort, p, ttlHours]), () =>
				backend.searchGalleries(query, sort, p),
			),
		);
	},

	gallery(id: number, include = 'favorite'): Promise<GalleryDetail> {
		return cached(cacheKey(['cache:gallery', id, include]), () =>
			backend.fetchGallery(id, include),
		);
	},

	related(id: number): Promise<RelatedGalleries> {
		return cached(cacheKey(['cache:related', id]), () => backend.relatedGalleries(id));
	},

	tagsByType(tagType: string, sort = 'popular', page = 1, perPage = 24): Promise<Paginated<Tag>> {
		return cached(cacheKey(['cache:tags', tagType, sort, page, perPage]), () =>
			backend.fetchTagsByType(tagType, sort, page, perPage),
		);
	},

	async randomGallery(): Promise<GalleryListItem | null> {
		try {
			const randomId = await backend.fetchRandomId();
			if (randomId) {
				const detail = await this.gallery(randomId);
				const item: GalleryListItem = {
					id: detail.id,
					media_id: detail.media_id,
					english_title: detail.title.english || detail.title.pretty || 'Untitled',
					japanese_title: detail.title.japanese,
					thumbnail: detail.thumbnail.path,
					thumbnail_width: detail.thumbnail.width,
					thumbnail_height: detail.thumbnail.height,
					num_pages: detail.num_pages,
					num_favorites: detail.num_favorites,
					tag_ids: detail.tags.map((t) => t.id),
					blacklisted: false,
				};
				if (!matchesBlacklist(item)) {
					return item;
				}
			}
		} catch {
			// Fall through to catalog random selection
		}

		const maxPages = 2000;
		for (let attempt = 0; attempt < 5; attempt++) {
			const randomPage = Math.floor(Math.random() * maxPages) + 1;
			try {
				const res = await this.newGalleries(randomPage);
				const unblocked = res.result.filter((g) => !matchesBlacklist(g));
				if (unblocked.length > 0) {
					return unblocked[Math.floor(Math.random() * unblocked.length)];
				}
			} catch {
				// Retry with another page
			}
		}
		return null;
	},
};

function perPageForSearch(): number {
	return GALLERIES_PER_PAGE;
}