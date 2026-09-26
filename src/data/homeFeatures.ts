export interface FeatureItem {
	/** Tabler name — rendered as a bold black glyph, matching the ecosystem cards. */
	icon: string;
	title: string;
	href: string;
	/**
	 * The argument for the feature, not a label for it. Two or three sentences: what you get, and
	 * the consequence that makes it matter. The section this fills answers "why choose ThingsBoard",
	 * so a card that only names a capability leaves the question unanswered.
	 */
	description: string;
	/**
	 * Terms inside the description that point at a deeper article than `href`.
	 * Only where one actually exists — no link without a resource behind it.
	 */
	links?: { term: string; href: string }[];
}

/**
 * The section's own words. `title` and `subtitle` are `develop`'s heading and the lede written to
 * set it against the ecosystem above it.
 *
 * `valueTitle` is the heading for the running orders that keep the section under a claim
 * (`heading: 'value'` in `home-compositions.ts`), with `title` demoted to the eyebrow over it. What
 * the twelve tiles have in common is that each is something a team would otherwise build or run
 * itself — a widget library, white-labelling, tenancy, emulators, OTA, security patches — so the
 * heading says that, and the lede under it still says it all comes in the box.
 */
export const HOME_FEATURES_COPY = {
	title: 'Why choose ThingsBoard',
	valueTitle: 'The parts you’d otherwise build yourself',
	subtitle:
		'Ten years of building one platform packs a lot in. Everything here comes in the box, before you add a thing.',
};

/**
 * The closing feature section, taken from `develop`'s own `#bottom-features` — heading, copy, links
 * and glyphs — so the facelift argues the platform in the words the content team settled on rather
 * than a parallel set.
 *
 * TWELVE, IN FOUR GROUPS OF THREE, as thingsboard.one's copy has it since 2026-09-24: what you build
 * and hand over (visualization, white-labeling, tenancy), how fast you get there (AI, emulators,
 * OTA), what a security review asks (access, compliance, sovereignty), and what it runs on
 * (scalability, databases, source). The grid is three across, so each group is a row — keep them in
 * threes. OTA updates and RBAC & SSO are the two that group added; the AI, security and
 * architecture tiles took that pass's copy.
 *
 * It replaced sixteen one-line capability labels ("Telemetry collection", "Alarms", "Asset
 * management"…). Those named what the platform HAS; these say why it is the one to pick, which is
 * what a section immediately above the closing CTA is for.
 */
export const homeFeatures: FeatureItem[] = [
	{
		icon: 'tabler:chart-line',
		title: 'Data visualization',
		href: '/iot-data-visualization/',
		description:
			'600+ built-in widgets — charts, gauges, maps, SCADA-ready industrial control. Build custom widgets with the built-in editor. Real-time dashboards with role-based access, shareable with your team, customers, and their end users.',
	},
	{
		icon: 'tabler:palette',
		title: 'White-labeling',
		href: '/docs/pe/user-guide/white-labeling/',
		description:
			'Ship branded IoT solutions under your name — no coding or service restart required. Multi-level white-labeling: your customers and their customers can brand their own interface.',
	},
	{
		icon: 'tabler:users-group',
		title: 'Multi-tenancy',
		href: '/docs/pe/user-guide/multi-tenancy/',
		description:
			'Multi-tenant installations out-of-the-box. Each tenant can have multiple administrators managing millions of devices and customers — with full data isolation between tenants.',
	},
	{
		icon: 'tabler:sparkles',
		title: 'Built-in AI',
		href: '/docs/pe/iot-solutions-with-ai/',
		description:
			'Go from a plain-language prompt to a working solution — devices, dashboards and rules already wired together. Work with AI in the UI, or from your terminal with the CLI and your own coding agents.',
	},
	{
		icon: 'tabler:cpu',
		title: 'Device emulators',
		href: '/blog/from-zero-to-live-demo-how-to-simulate-real-world-iot-environments-instantly/',
		description:
			'Test your solution with realistic device data — no hardware needed. Prototype dashboards, tune rules, and validate at scale before your first device ships.',
	},
	{
		icon: 'tabler:cloud-download',
		title: 'OTA updates',
		href: '/docs/pe/user-guide/ota-updates/',
		description:
			"Push firmware and software to a whole device profile at once. Upload a package, assign it, and watch each device's progress — no site visit required.",
	},
	{
		icon: 'tabler:lock-access',
		title: 'Fine-grained RBAC & SSO',
		href: '/docs/pe/user-guide/roles/',
		description:
			'Roles and permissions down to the individual entity. Bring your own identity provider with OAuth 2.0 SSO and two-factor authentication, so every tenant, customer and end user sees exactly what they should.',
	},
	{
		icon: 'tabler:certificate',
		title: 'Security & compliance',
		href: '/docs/pe/user-guide/security/',
		description:
			'Every LTS release receives regular security patches — reviewed and applied by our engineers, not left to the community — plus an independent third-party penetration test. ISO 27001 and ISO 9001 certified.',
	},
	{
		icon: 'tabler:shield-lock',
		title: 'Data sovereignty & air-gapped',
		href: '/docs/pe/installation/',
		description:
			'Deploy in air-gapped environments with no internet connection. Your data stays where regulation, corporate policy, or operations require it — behind your firewall, in your data center, or in your cloud.',
	},
	{
		icon: 'tabler:stack-2',
		title: 'Horizontal scalability',
		href: '/docs/pe/reference/architecture/',
		description:
			'Start monolithic for quick launches, move to microservices as load grows. Add instances of any service — no single point of failure, and no rewrite along the way.',
		// The two architectures are the choice the card is about, and each has its own reference page,
		// so the words carry the links rather than the card sending both to one of them.
		links: [
			{ term: 'monolithic', href: '/docs/pe/reference/architecture/monolithic/' },
			{ term: 'microservices', href: '/docs/pe/reference/architecture/microservices/' },
		],
	},
	{
		icon: 'tabler:database',
		title: 'SQL, NoSQL, or hybrid database',
		href: '/docs/pe/reference/architecture/database/',
		description:
			'Choose SQL, NoSQL, or run both side-by-side. Store main entities and telemetry data wherever fits your operational and cost profile.',
	},
	{
		icon: 'tabler:source-code',
		title: 'Source-available & customization',
		href: 'https://github.com/thingsboard/thingsboard',
		description:
			'Full access to the source code — customize every part of your solution. Extend via APIs; integrate with any external system. Adapt the platform to your use case, not the other way around.',
	},
];
