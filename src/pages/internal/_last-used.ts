/**
 * The "Last used" and "Last visited" marks' storage, shared by the components that read it
 * (`_CloudAuth`, `_RegionDialog`) and the sandbox control that sets it (`_LastUsedControls`).
 *
 * Each store is a `localStorage` key and a window event. The event reaches listeners in the same
 * document; the `storage` event reaches the phone frames, same-origin iframes that receive it
 * whenever another document writes the key. Values are ids only, never anything personal: a method
 * name, a region id. Storage can be missing or throw (private windows, blocked site data), and then
 * nothing is marked, which is the product's default.
 */
import { LAST_REGION } from '@util/cloud-regions';

export const LAST_USED = {
	/** The method this browser last signed up or in with, on a Cloud host. */
	method: { key: 'tb.cloud.lastAuthMethod', event: 'csl:last' },
	/** The region this browser last went to Cloud in: the shipped dialog's own store. */
	region: LAST_REGION,
} as const;

export type LastUsedStore = keyof typeof LAST_USED;

export function readLastUsed(store: LastUsedStore): string | null {
	try {
		return localStorage.getItem(LAST_USED[store].key);
	} catch {
		return null;
	}
}

/**
 * Stores a value and tells this document. An empty string means "none" and is stored rather than
 * cleared, so a component's demo fallback does not come back on the next load.
 */
export function writeLastUsed(store: LastUsedStore, value: string): void {
	try {
		localStorage.setItem(LAST_USED[store].key, value);
	} catch {
		// No storage: this document still hears the event below.
	}
	window.dispatchEvent(new CustomEvent(LAST_USED[store].event, { detail: value }));
}

/** Calls `fn` whenever the store changes, from this document or another one. */
export function onLastUsed(store: LastUsedStore, fn: (value: string | null) => void): void {
	const { key, event } = LAST_USED[store];
	window.addEventListener(event, (e) => fn((e as CustomEvent<string>).detail));
	window.addEventListener('storage', (e) => {
		if (e.key === key) fn(e.newValue);
	});
}
