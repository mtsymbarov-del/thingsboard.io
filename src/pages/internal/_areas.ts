import { areaGroups, inArea, visualHref } from '@root/pages/internal/_key-visuals';
import { HOME_COMPOSITIONS, compositionHref } from '@data/home-compositions';

/**
 * The internal pages' structure, in one place: the areas the floating island links to, and the
 * pages each area's top bar shows as tabs.
 *
 * - HOMEPAGES: the homepage's running orders, each the real page with a different order between
 *   its hero and its CTA (`data/home-compositions.ts`). The shipping one is `/` itself.
 * - COMPONENTS: the homepage's sections, each on its own page (the ecosystem cards included, in
 *   their gallery), and the product-page pieces judged with them.
 * - FLOWS: the paths behind a button that leads to Cloud, one page per button.
 * - DESIGN SYSTEM: what every page is built from. Type and UI; Color joins them later.
 *
 * Every area has the same shape: an overview of tiles, then its pages. The island opens an area on
 * its overview; the top bar then switches between the pages, as tabs while there are few and as a
 * grouped picker once there are more than `TABS_UP_TO` (see `_AreaBar`).
 * URLs did not move with the areas: `/internal/sections/<id>/` is cited across the codebase, and the
 * library pages keep theirs. The areas are the structure; the paths are only addresses.
 */
export interface AreaPage {
	href: string;
	label: string;
	/**
	 * The path prefix that counts as this page, when it has pages under it: every section's page is
	 * in "Sections". Defaults to the page's own path, matched exactly.
	 */
	match?: string;
	/** Drawn as this icon rather than its label, which becomes the accessible name: the overviews. */
	icon?: string;
	/** The heading it sits under in the picker, when the area has enough pages for one. */
	group?: string;
}

/** An area shows its pages as tabs up to this many; past it, as a grouped picker. */
export const TABS_UP_TO = 5;

/** Every area opens on its overview, drawn as the grid the old strip used for "all visuals". */
const overview = (href: string): AreaPage => ({ href, label: 'Overview', icon: 'tabler:layout-grid' });

export interface Area {
	id: 'homepages' | 'components' | 'flows' | 'design';
	label: string;
	pages: AreaPage[];
}

export const AREAS: Area[] = [
	{
		id: 'homepages',
		label: 'Homepages',
		pages: [
			overview('/internal/homepages/'),
			...HOME_COMPOSITIONS.map((c) => ({ href: compositionHref(c), label: `${c.label} · ${c.name}` })),
		],
	},
	{
		id: 'components',
		label: 'Components',
		pages: [
			overview('/internal/components/'),
			...areaGroups('sections').flatMap((g) =>
				g.items.map((v) => ({ href: visualHref(v), label: v.label, group: g.title }))
			),
		],
	},
	{
		id: 'flows',
		label: 'Flows',
		pages: [overview('/internal/flows/'), ...inArea('flows').map((v) => ({ href: visualHref(v), label: v.label }))],
	},
	{
		id: 'design',
		label: 'Design system',
		pages: [
			overview('/internal/design-system/'),
			{ href: '/internal/library/type/', label: 'Type' },
			{ href: '/internal/library/ui/', label: 'UI' },
		],
	},
];

/** Trailing slash either way, so `/internal/sections` and `/internal/sections/` both match. */
const normal = (path: string) => path.replace(/\/?$/, '/');

const matches = (page: AreaPage, path: string) =>
	page.match ? normal(path).startsWith(page.match) : normal(path) === page.href;

/** The area and page a path belongs to, or nothing for a page outside every area (the homepage). */
export function areaFor(path: string): { area?: Area; page?: AreaPage } {
	for (const area of AREAS) {
		const page = area.pages.find((p) => matches(p, path));
		if (page) return { area, page };
	}
	return {};
}
