/**
 * The homepage's running orders: which sections run between the hero and the closing CTA, in what
 * order, and with which options. `index.astro` renders the shipping one at `/`; every one of them
 * also renders at `/internal/homepages/<id>/`, and the internal island switches between them.
 *
 * DATA ONLY. A section here is an id and its options; `HomeSections.astro` maps the id to markup. So
 * a new running order is one entry below and nothing else, and a section that changes its markup
 * changes it in every order at once.
 *
 * THE HERO, THE LOGO STRIP AND THE CLOSING CTA ARE NOT SECTIONS HERE. Every order opens and closes
 * the same way, and those three stay in `index.astro` where the hero's own work happens.
 *
 * THE REFERENCE IS PINNED. `handoff` is the page as it was before A, and it states every option it
 * depends on, even where that option is a section's default: a default that moves must not move the
 * reference with it.
 *
 * The rows (see `ROW_SECTIONS`) take their sides and their wash from where they fall, not from
 * here: `HomeSections` alternates them by their position among the rows, so reordering them cannot
 * leave two visuals on the same side.
 */

import { AI_COPY } from '@data/ai-visual';
import { CONNECT_COPY } from '@data/connect-visual';
import { DIGITAL_TWIN_COPY } from '@data/digital-twin-visual';
import { NORMALIZE_COPY } from '@data/normalize-visual';
import { PLATFORM_COPY } from '@data/platform-visual';
import { SCALE_COPY } from '@data/scale-visual';
import { SOLUTION_COPY } from '@data/solution-flow';
import { DASHBOARDS_BADGE } from '@data/home-dashboards';

export type HomeSectionId =
	| 'platform'
	| 'ai'
	| 'connect'
	| 'twin'
	| 'normalize'
	| 'solution'
	| 'scale'
	| 'dashboards'
	| 'trust'
	| 'products'
	| 'ecosystem'
	| 'features'
	| 'voices';

/** A section and its options. Only the sections that have options take any. */
export type HomeSection =
	| {
			id: 'platform';
			/**
			 * `build` — "Build, deploy, and scale IoT solutions", the heading the handoff shipped.
			 * `loop` — "Your equipment, your people, one platform between them", the platform row's own
			 * title. For any order where the AI section sits next to the loop: its heading also opens
			 * on "Build", and two in a row read as one heading said twice. It also drops a promise the
			 * page stops keeping once the Scale row leaves: "scale".
			 */
			heading: 'build' | 'loop';
	  }
	| {
			id: 'ai';
			/**
			 * `block` — one call to action under the row, on the wash: a line, a button and a link, all
			 * following the switch (Cloud sign-up for the Assistant, the CLI guide for the agent). `route`
			 * — the same two actions, one at the end of each route's copy. `none` — no action, as the
			 * handoff shipped it.
			 */
			cta: 'block' | 'route' | 'none';
			/**
			 * `cycle` — the band's wash runs through the page's section colours, in step with the mark.
			 * `route` — the wash takes the showing route's hue, as the handoff shipped it.
			 */
			wash: 'cycle' | 'route';
	  }
	| {
			id: 'normalize';
			/**
			 * `pulse` — the Normalize drawing alone, as the handoff shipped it. `switch` — Normalize,
			 * Filter and Notify on one drawing skeleton, chosen by a switch over the row's media.
			 */
			media: 'pulse' | 'switch';
	  }
	| {
			id: 'features';
			/**
			 * `why` — "Why choose ThingsBoard" as the heading, as the handoff shipped it. `value` — the
			 * same words as an eyebrow, under a heading that says what the twelve tiles are worth.
			 */
			heading: 'why' | 'value';
	  }
	| { id: Exclude<HomeSectionId, 'platform' | 'ai' | 'normalize' | 'features'> };

export interface HomeSectionMeta {
	/** What the controls and the outline call it. Short: it sits in a pill over the section. */
	label: string;
	/**
	 * The id the section's element carries, and so its `/#anchor`. Stable across orders, so a link
	 * to a section lands on it in any of them, and the switch can keep your place.
	 */
	anchor: string;
	/** The section's own badge colour, for the overview and the outline. */
	hue: string;
}

export const HOME_SECTIONS: Record<HomeSectionId, HomeSectionMeta> = {
	platform: { label: 'Platform loop', anchor: 'intro', hue: PLATFORM_COPY.badge.color },
	ai: { label: 'AI', anchor: 'ai', hue: AI_COPY.badge.color },
	connect: { label: 'Connect', anchor: 'connect', hue: CONNECT_COPY.badge.color },
	twin: { label: 'Model', anchor: 'twin', hue: DIGITAL_TWIN_COPY.badge.color },
	normalize: { label: 'Turn data into action', anchor: 'normalize', hue: NORMALIZE_COPY.badge.color },
	solution: { label: 'Device to end-user', anchor: 'solution', hue: SOLUTION_COPY.badge.color },
	scale: { label: 'Scale', anchor: 'scale', hue: SCALE_COPY.badge.color },
	dashboards: { label: 'Use cases', anchor: 'dashboard_description', hue: DASHBOARDS_BADGE.color },
	trust: { label: 'Trust band', anchor: 'trust', hue: '#121425' },
	products: { label: 'Products', anchor: 'products', hue: '#3d50f5' },
	ecosystem: { label: 'Ecosystem', anchor: 'product-ecosystem', hue: '#007c7b' },
	features: { label: 'Why choose', anchor: 'bottom-features', hue: '#5b616e' },
	voices: { label: 'Proven in production', anchor: 'voices', hue: '#121425' },
};

/**
 * The capability rows. Consecutive ones share one `.new-rows` block, which sets their padding and
 * alternates their wash; anything else between two of them splits the block.
 */
export const ROW_SECTIONS: ReadonlySet<HomeSectionId> = new Set(['connect', 'twin', 'normalize', 'solution', 'scale']);

export interface HomeComposition {
	/** The address segment, `/internal/homepages/<id>/`. Never reused for a different order. */
	id: string;
	/** The switch's label. A letter or one word: three of them share a pill. */
	label: string;
	/** What the order is called in the proposal it came from. */
	name: string;
	/** One sentence on what this order does differently, for the overview and the switch's tooltip. */
	note: string;
	/**
	 * What colours the sections. `primary` — the handoff's: the rows alternate one flat primary wash
	 * (`#f5f6ff`) and every drawing's connectors are the brand blue. `section` — each section takes
	 * its OWN badge colour: a subtle gradient in that hue under the row (and under the use cases and
	 * the customer voices), and the connectors inside its drawing in the same hue, so a row's mark,
	 * ground and lines are one colour. Set per order so the handoff stays the page it was.
	 */
	hues: 'primary' | 'section';
	sections: HomeSection[];
}

/** The order `/` renders. Also first in `HOME_COMPOSITIONS`, so every list shows it first. */
export const SHIPPING_COMPOSITION = 'a';

export const HOME_COMPOSITIONS: HomeComposition[] = [
	{
		id: 'a',
		label: 'A',
		name: 'Show, then explain',
		hues: 'section',
		note: 'The AI demo straight under the hero, with a call to action, then the platform loop and its four rows in the loop’s own order. A trust band, “Why choose” under a value heading, and customer quotes join; Scale leaves for the On-premises page. Every section takes its own colour.',
		sections: [
			{ id: 'ai', cta: 'block', wash: 'cycle' },
			{ id: 'platform', heading: 'loop' },
			{ id: 'connect' },
			{ id: 'twin' },
			{ id: 'normalize', media: 'switch' },
			{ id: 'solution' },
			{ id: 'dashboards' },
			{ id: 'trust' },
			{ id: 'products' },
			{ id: 'ecosystem' },
			{ id: 'features', heading: 'value' },
			{ id: 'voices' },
		],
	},
	{
		id: 'handoff',
		label: 'Handoff',
		name: 'As handed off',
		hues: 'primary',
		note: 'The running order before A, kept as the reference: the platform loop, three rows, AI in the seam, two more rows, the use cases, Products, Ecosystem and “Why choose”.',
		sections: [
			{ id: 'platform', heading: 'build' },
			{ id: 'connect' },
			{ id: 'solution' },
			{ id: 'twin' },
			{ id: 'ai', cta: 'none', wash: 'route' },
			{ id: 'normalize', media: 'pulse' },
			{ id: 'scale' },
			{ id: 'dashboards' },
			{ id: 'products' },
			{ id: 'ecosystem' },
			{ id: 'features', heading: 'why' },
		],
	},
	{
		id: 'b',
		label: 'B',
		name: 'Map, then magic',
		hues: 'section',
		note: 'A with its first two sections swapped: the platform loop orients first, then the AI demo. The smallest change from the handoff that still moves AI up.',
		sections: [
			{ id: 'platform', heading: 'loop' },
			{ id: 'ai', cta: 'block', wash: 'cycle' },
			{ id: 'connect' },
			{ id: 'twin' },
			{ id: 'normalize', media: 'switch' },
			{ id: 'solution' },
			{ id: 'dashboards' },
			{ id: 'trust' },
			{ id: 'products' },
			{ id: 'ecosystem' },
			{ id: 'features', heading: 'value' },
			{ id: 'voices' },
		],
	},
];

/**
 * Checked as this module loads, so a bad entry fails the build rather than rendering a page with a
 * section twice (two elements answering to one anchor) or a switch with two tabs on one address.
 */
(function assertCompositions() {
	const ids = new Set<string>();
	for (const c of HOME_COMPOSITIONS) {
		if (ids.has(c.id)) throw new Error(`home-compositions: the id "${c.id}" is used twice`);
		ids.add(c.id);
		const seen = new Set<HomeSectionId>();
		for (const s of c.sections) {
			if (seen.has(s.id)) throw new Error(`home-compositions: "${c.id}" runs "${s.id}" twice`);
			seen.add(s.id);
		}
	}
	if (HOME_COMPOSITIONS[0]?.id !== SHIPPING_COMPOSITION) {
		throw new Error('home-compositions: the shipping order must come first, so every list shows it first');
	}
})();

export const shippingComposition = (): HomeComposition => HOME_COMPOSITIONS[0];

export const isShipping = (c: Pick<HomeComposition, 'id'>) => c.id === SHIPPING_COMPOSITION;

/** Where an order lives. The shipping one is the real homepage, so its address is `/`. */
export const compositionHref = (c: Pick<HomeComposition, 'id'>) =>
	isShipping(c) ? '/' : `/internal/homepages/${c.id}/`;

/** The anchors an order renders, top to bottom. */
export const compositionAnchors = (c: HomeComposition) => c.sections.map((s) => HOME_SECTIONS[s.id].anchor);
