import { IOT_HUB_CATEGORIES } from '@models/iot-hub';
import { TBMQ_SITE_URL } from '@models/tbmq';

export interface EcosystemItem {
	name: string;
	/** Short category line under the name — what kind of thing this is. */
	label: string;
	description: string;
	icon: string;
	/**
	 * Trial (filled badge): opt-in per card. `true` fills the squircle with
	 * `accent` and knocks the mark out white; an object overrides the asset, its
	 * ink, or the fill. Only the mobile card takes it — the rest were tried
	 * filled and reverted. Deleting this field and the `filled:` below drops it.
	 */
	filled?: boolean | { icon?: string; ink?: string; bg?: string };
	href: string;
	/** Accent for the label, so each product is identifiable at a glance. */
	accent: string;
	/** Names the destination instead of the mechanic — replaces "Read more". */
	action: string;
	/** Sold as an add-on rather than part of the core platform. */
	addOn?: boolean;
	/** Spans two columns and carries the section's key visual. */
	wide?: boolean;
	videoWebm?: string;
	videoMp4?: string;
	/** Store buttons, shown beneath the primary action on the wide card. */
	stores?: { label: string; href: string }[];
	/**
	 * Per-tier adjustments, named for the grid's states, not devices: `cols3`
	 * is the 3-column grid, `cols2` the 2-column, `stack` the single column.
	 * Defaults everywhere: a double's visual sits to the RIGHT of the copy,
	 * and is shown. `flip` mirrors the columns, `single` demotes the card to
	 * one copy-only track at that tier, `no-visual` drops the artwork from the
	 * stacked card.
	 */
	at?: { cols3?: 'flip'; cols2?: 'flip' | 'single'; stack?: 'no-visual' };
	/** Wide card with a single destination: whole-card hit area, like the singles. */
	wholeCard?: boolean;
	/** Category tiles — the visual and the navigation in one. */
	tiles?: HubTile[];
}

/** One IoT Hub category, as a tile on the card. */
export interface HubTile {
	slug: string;
	label: string;
	href: string;
	/** The category's light tint (`tileColor`): the tile's hover ground. */
	color: string;
	/** The category's strong colour (`tileColorDark`): its hover ink, darkened for contrast. */
	colorDark: string;
	icon: string;
}

/**
 * A tile for an IoT Hub category, its colours read from the category itself (src/models/iot-hub.ts)
 * so the homepage and the Hub cannot drift apart. Throws on an unknown slug rather than drawing a
 * tile in no colour.
 */
const hubTile = (slug: string, label: string, icon: string): HubTile => {
	const cat = IOT_HUB_CATEGORIES.find((c) => c.slug === slug);
	if (!cat) throw new Error(`homeEcosystem: no IoT Hub category "${slug}".`);
	return { slug, label, href: `/iot-hub/${slug}/`, color: cat.tileColor, colorDark: cat.tileColorDark, icon };
};

// One card per product. The two mobile entries are now a single card pointing at
// the PE page, since they are one app to a reader even if there are two builds.
export const homeEcosystem: EcosystemItem[] = [
	{
		name: 'IoT Gateway',
		label: 'Protocol bridge',
		description:
			'Brings legacy equipment online. Modbus, OPC UA, BACnet, SNMP, KNX and 25+ industrial protocols, translated to MQTT. Open-source, runs on a Raspberry Pi or industrial PC.',
		icon: '/src/assets/images/landings/ce/gateway-icon.svg',
		href: '/docs/iot-gateway/',
		action: 'See supported protocols',
		accent: 'var(--color-accent-violet)',
		wide: true,
		// One destination, like the other two doubles, so the same whole-card
		// target and hover.
		wholeCard: true,
		// All three visuals sit out the stacked column for now — the compositions
		// were drawn for a column beside the copy, not under it. The flag is
		// per-card, so any of them can come back with one line.
		at: { stack: 'no-visual' },
	},
	{
		name: 'Edge',
		label: 'Edge computing',
		description:
			'Processes and visualizes data locally at the network edge, enabling autonomous operation during connectivity outages. Manage every remote edge location from one platform.',
		icon: '/src/assets/images/landings/ce/thingsboard-e-icon.svg',
		href: '/products/thingsboard-edge/',
		action: 'See how Edge works',
		accent: '#0f9b8e',
		addOn: true,
	},
	{
		name: 'Trendz',
		label: 'Analytics & AI',
		description:
			'Predictive analytics, anomaly detection and forecasting. Explore your data without code using natural-language queries, and run AI agents over it.',
		icon: '/src/assets/images/landings/ce/trendz-icon.svg',
		href: '/products/trendz/',
		action: 'Explore Trendz',
		accent: '#1976d2',
		addOn: true,
	},
	{
		name: 'Mobile App',
		label: 'iOS & Android',
		description:
			'Dashboards, alarms and device control in your pocket. Push notifications when something needs attention, and white-label builds you can ship under your own brand.',
		icon: '/src/assets/images/landings/ce/tb-pe-mobile-icon.svg',
		// The app icon as a light tile: the mark in the app's own green on white,
		// the same treatment the page gives its other light tiles. The near-black
		// icon it replaced read as a hole in the white card.
		// The mark a step darker than the card's accent green, so it carries on white.
		filled: { icon: '/src/assets/images/landings/thingsboard-mark.svg', ink: '#166534', bg: '#ffffff' },
		href: '/products/mobile-pe/',
		// Exploratory, not acquisitive — the store buttons below are the download,
		// so the primary sends you to the product page instead of duplicating them.
		action: 'Tour the app',
		// Takes the app icon's own green rather than the brand purple.
		accent: 'var(--brand-pe)',
		wide: true,
		// One destination now the store buttons are gone (they pointed at the
		// product page anyway, for want of real store URLs), so the whole card
		// is the target. The previous form lives on the library page.
		wholeCard: true,
		// Flipped on the 3-column grid only, where the phone lands mid-row —
		// Trendz's copy, the phone, this card's copy — the centre of the
		// composition. On the 2-column grid the three full-width doubles stack
		// and keep one template, copy then visual, as the homepage's rows do
		// below desktop: alternation is a desktop pattern here. The
		// phone-on-a-phone video goes below md.
		at: { cols3: 'flip', stack: 'no-visual' },
		// Reused from the mobile page's "Rich set of mobile actions" block —
		// 564 KB webm / 940 KB mp4, so it is lazy-loaded rather than shipped
		// with the page.
		videoWebm: 'https://video.thingsboard.io/mobile/pe/mobile-actions.webm',
		videoMp4: 'https://video.thingsboard.io/mobile/pe/mobile-actions.mp4',
	},
	{
		name: 'IoT Hub',
		label: 'Free marketplace',
		description:
			'Device profiles, widgets, dashboards and rule chains published by the community. Install what you need in a click instead of building it from scratch.',
		icon: 'tabler:building-store',
		href: '/iot-hub/',
		action: 'Browse the Hub',
		// Ochre, not the retail orange: the tiles already carry the card's colour,
		// and this keeps the section's one warm slot without the sale register.
		// Same hue family as GatewayRelay's Modbus chip.
		accent: 'var(--color-product-iot-hub)',
		wide: true,
		// Unflipped: copy left, tiles right, same reading order as the app card
		// above it. The tiles ride above the whole-card link on their z-index.
		wholeCard: true,
		// Demoted to a single in the 2-column grid so TBMQ is not an orphan on a
		// half-empty last row; the tiles go below md with the other visuals.
		at: { cols2: 'single', stack: 'no-visual' },
		// Colours are the categories' own, read from src/models/iot-hub.ts by `hubTile` — the
		// visual and the links are the same thing here, which is why this card needs no separate
		// button row.
		tiles: [
			hubTile('devices', 'Device Library', 'tabler:cpu'),
			hubTile('solution-templates', 'Templates', 'tabler:template'),
			hubTile('widgets', 'Widgets', 'tabler:layout-grid'),
			hubTile('calculated-fields', 'Calculated Fields', 'tabler:math-function'),
			hubTile('alarm-rules', 'Alarm Rules', 'tabler:bell'),
			hubTile('rule-chains', 'Rule Chains', 'tabler:sitemap'),
		],
	},
	{
		name: 'TBMQ',
		label: 'Dedicated MQTT broker',
		description:
			'Drop-in replacement for legacy brokers, built for millions of concurrent connections. Keep your existing clients and topics, and connect it to ThingsBoard when you need the platform too.',
		icon: '/src/assets/images/landings/ce/tbmq-icon.svg',
		href: TBMQ_SITE_URL,
		action: 'Go to tbmq.io',
		accent: 'var(--color-accent-green)',
	},
];
