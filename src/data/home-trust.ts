/**
 * The trust band: three cards between the use cases and Products — security, scale, openness — each
 * opening on a small drawing (`TrustVisual`) rather than an icon.
 *
 * It answers what a reader brings to the Products band under it — is it safe, will it grow with me,
 * am I stuck with it — so that band can stay a choice between two deployments rather than an
 * argument for either.
 *
 * NO DEPLOYMENT CARD. There was one ("Deploy anywhere", the Deploy visual's fork), and it made the
 * Products band's own argument one band early and in less room: Products is where the Cloud or
 * On-premises split is explained, with a card each. Its slot went to the question Products does not
 * answer — whether building on ThingsBoard ties you to it.
 *
 * WHERE THE WORDS COME FROM, since none of them is new:
 * - Security is thingsboard.one's (2026-09-24/25): "ISO 27001 and ISO 9001 certified", the
 *   penetration test with no frequency attached (its pass removed "before each major release" and
 *   then "every year"), and the RBAC & SSO tile's two-factor sign-in.
 * - Scale is the Scale row's promise, which leaves the homepage for the On-premises page, said the
 *   way thingsboard.one now says it: "you scale the deployment, not your solution". Not its figure —
 *   that pass says "5+ million" where this repo benchmarks one million — so the card promises the
 *   move from one server to a cluster, which the drawing shows, and no number.
 * - Openness is the "Source-available & customization" tile's, with the device protocols and APIs
 *   the docs reference names (`reference/http-api`, `mqtt-api`, `coap-api`, `rest-api`).
 *
 * `Why choose` still runs further down with its own security, scalability and source tiles. The
 * cards here say what you can count on; the tiles say what is in the box, in more detail and with
 * their own links. Trim the tiles, not these, if the two start to read as one thing said twice.
 */

export type TrustKind = 'security' | 'scale' | 'open';

export interface TrustPoint {
	/** Which drawing opens the card. */
	kind: TrustKind;
	title: string;
	body: string;
	link: { text: string; href: string };
}

/** The band's heading. Visually hidden: the three titles carry the band, the outline still needs a name. */
export const TRUST_COPY = { title: 'Built to run where you need it' };

export const TRUST_POINTS: TrustPoint[] = [
	{
		kind: 'security',
		title: 'Secure and certified',
		body: 'ISO 27001 and ISO 9001 certified, independently penetration-tested, and patched on every LTS release. SSO, two-factor sign-in, and permissions down to a single device.',
		link: { text: 'Security overview', href: '/docs/pe/user-guide/security/' },
	},
	{
		kind: 'scale',
		title: 'Scale without surprises',
		body: 'Start on one server and move to a cluster as you grow. Dashboards, calculated fields and device profiles carry over unchanged: you scale the deployment, not your solution.',
		link: { text: 'Architecture reference', href: '/docs/pe/reference/architecture/' },
	},
	{
		kind: 'open',
		title: 'Open at the core',
		body: 'Source code on GitHub, open protocols for your devices, and REST and WebSocket APIs for everything else. Extend any part of the platform, or connect it to any system.',
		link: { text: 'REST API reference', href: '/docs/pe/reference/rest-api/' },
	},
];

// --- the drawings -----------------------------------------------------------------------------
// Only what the card's own text says, and few enough to set large: each word is 16 to 18 units in a
// 260-unit drawing, ~20px on a phone. A drawing that names a thing the text does not (it once listed
// MQTT, CoAP and HTTP) makes the reader look for it in the text and not find it.

/**
 * Security: the two certifications as seals, and the two sign-in guarantees beside them, one each.
 *
 * THE SEALS ARE OURS, NOT ISO'S. ISO does not certify anyone and does not let its logo stand for a
 * certification; a certified company shows its CERTIFICATION BODY's mark, which comes with the
 * certificate. Until the team supplies that mark, these are plain seals that say the standard's
 * number and nothing else, drawn in the card's green.
 */
export const TRUST_CERTS = ['27001', '9001'];

/** "SSO, two-factor sign-in", as the body says it, as two rows: they are two things. */
export const TRUST_ACCESS = ['SSO', '2FA'];

// Scale draws `ScaleDuo`'s own modes and stores (`SCALE_MODES` in `@data/scale-visual`), so it has
// nothing of its own to say here.

/**
 * Openness: the repo, and its star count, and nothing else. The count is the header button's own
 * snapshot (`@data/github-stars`), so the two never disagree; the APIs are the body's to name.
 */
export const TRUST_REPO = 'thingsboard/thingsboard';

/** What the security and scale drawings say to a screen reader, which gets each as one image. */
export const TRUST_VISUAL_LABELS: Record<Exclude<TrustKind, 'open'>, string> = {
	security: 'Certified to ISO 27001 and ISO 9001, with single sign-on and two-factor sign-in.',
	scale: 'Two ways to run it: a monolith on PostgreSQL, Citus or Cassandra, and a cluster that adds Kafka and Valkey.',
};

// --- the stages drawings (`TrustVisualStages`, the homepage's since 2026-09-27) ----------------

/**
 * Scale as ONE TOPOLOGY AT A TIME, growing: the monolith, then hybrid storage, then the cluster, each
 * with the devices it is for and the stores it lights. The ranges are the user's brief, and only one
 * of them is backed here:
 * - 10K–1M for hybrid matches benchmark E, 1M devices on one instance with Cassandra (see
 *   `@data/scale-visual`, which calls the mode "Hybrid storage").
 * - 1–10K for the monolith on PostgreSQL alone has no source in the docs' recommendations yet.
 * - "Up to 5M" for the cluster is thingsboard.one's "5+ million", which this repo does not benchmark;
 *   the Scale row says "Any size". STILL UNCONFIRMED: this direction shipped (2026-09-27) with both.
 */
export interface TrustScaleStage {
	mode: string;
	devices: string;
	/** The mode's hue: the cells, its name, its bar. */
	hue: string;
	/**
	 * Its section of the devices bar, as a percentage: 25 / 25 / 50, the cluster half. A picture of the
	 * steps, not a scale of the ranges (10K is 0.2% of 5M). The loop's time splits 3 / 5 / 9 on its
	 * own (`TrustVisualStages`), so the fill's pace differs per section.
	 */
	span: number;
	/** Cells lit out of five; more than one lights in turn, the cluster scaling out. */
	cells: number;
	/** The stores this stage lights in the one row of marks; the rest stay dim. */
	stores: string[];
}

export const TRUST_SCALE_STAGES: TrustScaleStage[] = [
	{
		mode: 'Monolith',
		devices: '1–10K devices',
		span: 25,
		hue: 'var(--color-primary, #3d50f5)',
		cells: 1,
		stores: ['PostgreSQL'],
	},
	{
		mode: 'Hybrid',
		devices: '10K–1M devices',
		span: 25,
		hue: '#007c7b',
		cells: 1,
		stores: ['PostgreSQL', 'Cassandra'],
	},
	{
		mode: 'Cluster',
		devices: 'Up to 5M devices',
		span: 50,
		hue: 'var(--color-product-gw, #6d28d9)',
		cells: 5,
		stores: ['Citus', 'Kafka', 'Valkey'],
	},
];

export const TRUST_STAGES_LABELS = {
	security: 'Certified to ISO 27001 and ISO 9001.',
	scale:
		'As it grows: a monolith on PostgreSQL for 1 to 10 thousand devices, hybrid storage adding Cassandra beside PostgreSQL up to a million, and a cluster with Citus, Kafka and Valkey up to 5 million.',
};
