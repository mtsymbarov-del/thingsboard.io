/**
 * The key visuals: one entry per page under Components › Sections and Flows. Copy is the design's,
 * verbatim.
 *
 * Its own module because the sandbox page and every one of its panels needs it, and a panel that
 * had to reach back into the page for it would be a panel that cannot be moved or deleted on its
 * own. Addressed by id through `kv()`, never by array position: the panels used to say
 * `KEY_VISUALS[6]`, which meant inserting a visual silently retitled four others. That is also what
 * makes the order below free to change — this array decides the menus' order and nothing else.
 *
 * THE ORDER IS THE PAGE'S ORDER. Platform first: it opens the homepage as a centred section
 * above the rows. Then the rows in the order `index.astro` runs them, so walking the section menu
 * walks the page. `ai` sits between twin and normalize because that is where `AiSection` runs: a
 * full-bleed section rather than a row, but on the page there. Then the sections the running orders
 * brought or reworked — the use cases, the trust band — around `products` and `ecosystem`, and
 * "Why choose" and the customer voices close the homepage run. The hub and the menus do not read this
 * order for the homepage group: they follow the shipping running order (see `ON_HOME` below).
 * After it, what is not on the homepage: `choice`, which ships on the product pages instead, then
 * gateway, deploy and whitelabel, drawn and waiting for a section. The flows come last, in their
 * own area.
 */
import { compositionAnchors, shippingComposition } from '@data/home-compositions';
import { PLATFORM_COPY } from '@data/platform-visual';
import { SOLUTION_COPY } from '@data/solution-flow';
import { DIGITAL_TWIN_COPY } from '@data/digital-twin-visual';
import { NORMALIZE_COPY } from '@data/normalize-visual';
import { CONNECT_COPY } from '@data/connect-visual';
import { SCALE_COPY } from '@data/scale-visual';
import { DEPLOY_COPY } from '@data/deploy-visual';
import { WHITELABEL_COPY } from '@data/whitelabel-visual';
import { AI_COPY } from '@data/ai-visual';
import { DASHBOARDS_BADGE, DASHBOARDS_COPY } from '@data/home-dashboards';
import { TRUST_COPY } from '@data/home-trust';
import { HOME_FEATURES_COPY } from '@data/homeFeatures';
import { VOICES_COPY } from '@data/home-voices';

export interface KeyVisual {
	id: string;
	/** The tab's label. Short: ten of them share one line. */
	label: string;
	title?: string;
	body?: string;
	link?: { text: string; href: string };
	/**
	 * The section's mark, as `FeatureBlockSection` renders it. Lives with each visual's COPY, so the
	 * homepage and the sandbox take the same one from the same place; this only carries it across.
	 */
	badge?: { icon: string; color: string };
	/**
	 * The section's anchor on the homepage, when it has one — `/#<home>`. Having one IS being on the
	 * page: the hub groups by it, numbers by it and links by it, and the strip draws its seam after
	 * the last visual that has one. Put a visual on the homepage and give it an `id` there; set this,
	 * and all three follow.
	 */
	home?: string;
	/**
	 * Where it ships when that is not the homepage, in words for the hub: "the Cloud and On-premises
	 * pages". Its section lists it under "Product pages" rather than as waiting.
	 */
	shipsOn?: string;
	/**
	 * Which menu it belongs to. `sections` (the default) is Components › Sections, the homepage's
	 * pieces; `flows` is Flows, the paths behind a button. It decides the page's URL and its menus.
	 */
	area?: 'sections' | 'flows';
	/**
	 * A page of its own rather than `/internal/<area>/<id>/`: a section judged somewhere else, as the
	 * ecosystem cards are in their gallery. Its tile has no directions to summarise.
	 */
	href?: string;
}

export const KEY_VISUALS: KeyVisual[] = [
	{
		id: 'platform',
		home: 'intro',
		label: 'Platform',
		title: PLATFORM_COPY.title,
		body: PLATFORM_COPY.body,
		link: PLATFORM_COPY.link,
		badge: PLATFORM_COPY.badge,
	},
	{
		id: 'connect',
		home: 'connect',
		label: 'Connect devices',
		title: CONNECT_COPY.title,
		body: CONNECT_COPY.body,
		link: CONNECT_COPY.link,
		badge: CONNECT_COPY.badge,
	},
	{
		id: 'solution',
		home: 'solution',
		label: 'Device to end-user',
		title: SOLUTION_COPY.title,
		body: SOLUTION_COPY.body,
		link: SOLUTION_COPY.link,
		badge: SOLUTION_COPY.badge,
	},
	{
		id: 'twin',
		home: 'twin',
		label: 'Digital twin',
		...DIGITAL_TWIN_COPY,
	},
	{
		// A section, not a row: its copy has no link, and its badge is drawn by the section's own
		// header rather than by a row's.
		id: 'ai',
		home: 'ai',
		label: 'AI',
		title: AI_COPY.title,
		body: AI_COPY.body,
		badge: AI_COPY.badge,
	},
	{
		id: 'normalize',
		home: 'normalize',
		label: 'Normalize',
		title: NORMALIZE_COPY.title,
		body: NORMALIZE_COPY.body,
		link: NORMALIZE_COPY.link,
		badge: NORMALIZE_COPY.badge,
	},
	{
		id: 'scale',
		home: 'scale',
		label: 'Scale',
		title: SCALE_COPY.title,
		body: SCALE_COPY.body,
		link: SCALE_COPY.link,
		badge: SCALE_COPY.badge,
	},
	{
		// A centred section, not a row: the heading over the board and the named cases, whose copy
		// `UseCasesSection` reads from the same place.
		id: 'dashboards',
		home: 'dashboard_description',
		label: 'Use cases',
		title: DASHBOARDS_COPY.title,
		body: DASHBOARDS_COPY.subtitle,
		link: DASHBOARDS_COPY.link,
		badge: DASHBOARDS_BADGE,
	},
	{
		// Three cards between the use cases and Products. It carries no mark on the page; the tile's is
		// the bookends' indigo, the colour its ground runs into.
		id: 'trust',
		home: 'trust',
		label: 'Trust band',
		title: TRUST_COPY.title,
		badge: { icon: 'tabler:shield-check', color: '#121425' },
	},
	{
		// A SECTION of cards rather than a drawing: the deployment pair on the dark band. Its copy
		// is restated from `index.astro`'s own SectionHeader call, where it lives inline — keep the
		// two in step by hand until the section grows a data file.
		id: 'products',
		home: 'products',
		label: 'Products',
		title: 'Products',
		body: 'The same platform and the same features either way — what changes is who runs it. We host, scale and upgrade it for you, or you deploy it inside your own network.',
		badge: { icon: 'tabler:cloud', color: '#3d50f5' },
	},
	{
		// A section of cards, the ecosystem list under the products. Judged in its gallery, every card
		// one-wide beside two-wide, rather than on a page of directions. Copy from `index.astro`'s
		// SectionHeader call, where it lives inline.
		id: 'ecosystem',
		home: 'product-ecosystem',
		label: 'Ecosystem',
		title: 'Product ecosystem',
		body: 'Add what your project needs — protocol bridges, analytics, edge nodes, a mobile app, and a library of ready-made components.',
		href: '/internal/library/cards/',
		badge: { icon: 'tabler:apps', color: '#007c7b' },
	},
	{
		// Twelve tiles on the page's one light tint, under the value heading the shipping order gives
		// them (`heading: 'value'`) — the tile shows that one.
		id: 'features',
		home: 'bottom-features',
		label: 'Why choose',
		title: HOME_FEATURES_COPY.valueTitle,
		body: HOME_FEATURES_COPY.subtitle,
		badge: { icon: 'tabler:layout-grid', color: '#5b616e' },
	},
	{
		// The numbers and six quotes before the closing CTA. No mark on the page either; the tile's is
		// the bookends' indigo, as the trust band's is.
		id: 'voices',
		home: 'voices',
		label: 'Proven in production',
		title: VOICES_COPY.title,
		body: VOICES_COPY.lede,
		badge: { icon: 'tabler:quote', color: '#121425' },
	},
	{
		// The product pages' choice cards — Cloud's Public/Private pair and On-premises' licence
		// pair — each on its own page's ground. Not a homepage section: the cards ship on those two
		// pages, and this is where their treatments get judged before touching them there.
		id: 'choice',
		label: 'Choice cards',
		shipsOn: 'the Cloud and On-premises pages',
		badge: { icon: 'tabler:layout-columns', color: '#5b616e' },
	},
	{
		id: 'gateway',
		label: 'IoT Gateway',
		// The Gateway's own words, from its `homeEcosystem` entry — description, action label and
		// href verbatim. Only the headline is changed, from the description's opening sentence
		// ("Brings legacy equipment online.") into the imperative the other three headlines use.
		title: 'Bring legacy equipment online',
		body: 'Modbus, OPC UA, BACnet, SNMP, KNX and 25+ industrial protocols, translated to MQTT or HTTP. Open-source, runs on any hardware.',
		link: { text: 'See supported protocols', href: '/docs/iot-gateway/' },
		// `#7b3fe4` twice over: the accent the Gateway carries in `homeEcosystem`, and the only strong
		// colour in `GatewayDiagram` itself.
		badge: { icon: 'tabler:router', color: '#7b3fe4' },
	},
	{
		id: 'deploy',
		label: 'Deploy anywhere',
		title: DEPLOY_COPY.title,
		body: DEPLOY_COPY.body,
		link: DEPLOY_COPY.link,
		badge: DEPLOY_COPY.badge,
	},
	{
		id: 'whitelabel',
		label: 'White-labeling',
		title: WHITELABEL_COPY.title,
		body: WHITELABEL_COPY.body,
		link: WHITELABEL_COPY.link,
		badge: WHITELABEL_COPY.badge,
	},
	{
		// The path behind "Try for free": the sign-up form with its region switch, and the dialog that
		// asks the region first. Two variants of one flow; what it decides is where the button goes.
		id: 'sign-up',
		area: 'flows',
		label: 'Sign up',
		title: 'Sign up — from “Try for free” to the form',
		badge: { icon: 'tabler:user-plus', color: '#3d50f5' },
	},
	{
		// The path behind the header's "Sign in": the product's sign-in form, and the dialog that
		// replaces the header's region dropdown.
		id: 'sign-in',
		area: 'flows',
		label: 'Sign in',
		title: 'Sign in — from the header to the form',
		badge: { icon: 'tabler:login-2', color: '#00695c' },
	},
];

/**
 * ON THE HOMEPAGE MEANS IN THE SHIPPING RUNNING ORDER (`data/home-compositions.ts`), and in its
 * order — not this array's, and not merely having a `home` anchor. An entry's `home` is the anchor its
 * section answers to in ANY running order; the ones the shipping order does not render (Scale, since A
 * sends it to the On-premises page) fall to the groups below, and lose their tile's `/#anchor` link,
 * which would land on a `/` without them.
 *
 * `hero` is not a running-order section: the hero opens every order, so an entry anchored to it is
 * always on the homepage, and first.
 */
const FRAME = ['hero'];
const SHIPPING_ANCHORS = compositionAnchors(shippingComposition());

const homeRank = (v: Pick<KeyVisual, 'home'>) => {
	if (!v.home) return -1;
	const framed = FRAME.indexOf(v.home);
	if (framed >= 0) return framed;
	const i = SHIPPING_ANCHORS.indexOf(v.home);
	return i < 0 ? -1 : FRAME.length + i;
};

const onHome = (v: Pick<KeyVisual, 'home'>) => homeRank(v) >= 0;
const byHome = (a: KeyVisual, b: KeyVisual) => homeRank(a) - homeRank(b);
const offHome = (v: KeyVisual): KeyVisual => (v.home ? { ...v, home: undefined } : v);

/** The visuals that are on the homepage, in page order. */
export const ON_HOME = KEY_VISUALS.filter(onHome).sort(byHome);

/** The visuals in one menu, in the array's order. */
export const inArea = (area: 'sections' | 'flows') => KEY_VISUALS.filter((v) => (v.area ?? 'sections') === area);

/** A visual's page. Sections keep the URL every code comment cites; flows have their own. */
export const visualHref = (v: Pick<KeyVisual, 'id' | 'area' | 'href'>) =>
	v.href ?? `/internal/${v.area === 'flows' ? 'flows' : 'sections'}/${v.id}/`;

/**
 * An area's pages as the hub and the section menu group them. Sections: on the homepage in page
 * order, then on the product pages, then waiting for a section. Flows: one group.
 */
export function areaGroups(area: 'sections' | 'flows') {
	const all = inArea(area);
	if (area === 'flows') return [{ key: 'flows', title: 'Flows', items: all }];
	return [
		{
			key: 'home',
			title: 'Homepage',
			items: all.filter(onHome).sort(byHome),
		},
		{
			key: 'product',
			title: 'Product pages',
			items: all.filter((v) => !onHome(v) && v.shipsOn).map(offHome),
		},
		{
			key: 'waiting',
			title: 'Waiting for a section',
			items: all.filter((v) => !onHome(v) && !v.shipsOn).map(offHome),
		},
	].filter((g) => g.items.length);
}

/** The entry for `id`. Throws at build time rather than rendering a row with no copy in it. */
export function kv(id: string): KeyVisual {
	const found = KEY_VISUALS.find((v) => v.id === id);
	if (!found) throw new Error(`sections: no key visual with id "${id}"`);
	return found;
}
