import { goto } from '$app/navigation';

let lastListing = $state<string>('/');

export function setListingUrl(url: string): void {
	if (!url.includes('/gallery/')) {
		lastListing = url;
		if (typeof sessionStorage !== 'undefined') {
			try {
				sessionStorage.setItem('nh_last_listing_url', url);
			} catch {}
		}
	}
}

export function getListingUrl(): string {
	if (typeof sessionStorage !== 'undefined') {
		try {
			const stored = sessionStorage.getItem('nh_last_listing_url');
			if (stored && !stored.includes('/gallery/')) {
				return stored;
			}
		} catch {}
	}
	return lastListing || '/';
}

export function returnToListing(): void {
	const dest = getListingUrl();
	goto(dest);
}
