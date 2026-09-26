/**
 * ThingsBoard Cloud page content.
 *
 * Lifted verbatim from `develop.tbqa.cloud/products/paas/`, which is ahead of this repo — the copy
 * there was never merged into this fork, so it could not be taken from a branch. Wording, prices,
 * ordering and link targets are the develop page's; only the markup around them is new.
 *
 * Kept as data rather than inlined in the page so the two things that change on different clocks —
 * commercial copy and the design it sits in — can be edited apart.
 */

// Link targets used from more than one place below. Declared up here because `paasChoice` reads
// one of them and a `const` cannot be referenced before its own line has run.
const CONTACT = '/contact-us/';
/** The Private Cloud enquiry form. `pcorder` is the flag the contact form routes on — keep it. */
const CONTACT_PRIVATE_CLOUD = '/contact-us/?subject=Private%20Cloud&pcorder&message=I%20am%20interested%20in%20Private%20Cloud';
const SUBSCRIPTIONS = '/docs/paas/reference/subscriptions/';

export interface PaasBenefit {
	/** Tabler name, rendered as a bare glyph — no fill behind it, as `FeatureTile` draws its own. */
	icon: string;
	/**
	 * The glyph's hue.
	 *
	 * These were black, on the reasoning that an accent per tile is a colour system with nothing to
	 * decode. That is still true — this codes nothing — but six identical glyphs at identical weight
	 * left the grid with no entry point at all, and "decorative" is not the same as "unwelcome".
	 * Every value below is already somewhere on this page, so it spreads the existing palette rather
	 * than introducing one.
	 */
	color: string;
	title: string;
	description: string;
}

/**
 * The four value cards under the intro statement. The develop page draws these as flat icon cards;
 * here they take the candidate's squircle mark.
 *
 * Develop's fifth card, "Public vs Private cloud choice", is NOT in this list — it is a chooser
 * between two products rather than a claim about one, and it renders as `paasChoice` below.
 */
export const paasBenefits: PaasBenefit[] = [
	{
		// A set of parts making a whole — the claim is completeness, which `box-multiple` only said
		// as "more than one box".
		icon: 'tabler:components',
		color: '#3d50f5',
		title: 'Everything you need to build IoT solutions',
		description:
			'Everything you need to build an IoT solution is already inside ThingsBoard, from device connectivity to end-user interface.',
	},
	{
		icon: 'tabler:rocket',
		color: '#c2410c',
		title: 'Ship faster and pay less',
		description:
			"We handle platform maintenance, feature configuration, and infrastructure costs so you don't have to.",
	},
	{
		// Uptime, not security. A shield here read as the latter, and `shield-lock` already carries
		// Compliance in the table — two shields, two meanings.
		icon: 'tabler:heartbeat',
		color: '#047857',
		title: 'High availability',
		description: 'ThingsBoard Cloud uses microservices architecture and is deployed in multiple availability zones.',
	},
	{
		// Stacked copies, which is what replication and nightly backups are. `database` named the
		// subject and left the claim — durability — unillustrated.
		icon: 'tabler:versions',
		color: '#006bc7',
		title: 'Data durability',
		description: "Platform uses data replication and backup procedures to make sure you don't lose the data.",
	},
	{
		// Develop's fifth card, back as a claim rather than as the question it used to ask. The
		// question itself is the `#choose` band's job now, so the sentence loses "Choose … or …" and
		// says what the product offers instead. The words are develop's.
		// The Private Cloud mark. This tile is about the choice between the two, and echoing one of
		// them points at it — while leaving the plain cloud to mean Public Cloud and nothing else.
		icon: 'tabler:cloud-lock',
		color: '#7c3aed',
		title: 'Public or private cloud',
		description:
			'Start on shared infrastructure, or run a dedicated, isolated cluster with a stronger SLA and higher throughput.',
	},
	{
		// The one sentence on this page that is not develop's, and it is assembled from the matrix's
		// own "Region choice" row rather than written fresh: US or EU on Public Cloud; EU, North
		// America or APAC, on AWS, Azure or GCP by request, on Private.
		icon: 'tabler:world',
		color: '#007c7b',
		title: 'Data residency you choose',
		description: 'Run in the US or EU on Public Cloud — or pick EU, North America or APAC on Private Cloud.',
	},
];

/**
 * Develop's "Public vs Private cloud choice" card, split into the two options it names.
 *
 * This is the page's ONLY call to action for the two deployments, and it sits directly under the
 * comparison table. It used to lead the page as well, which meant the same two-way decision was put
 * twice — once before the reader had anything to decide on, and once under the table that answers
 * it. The table is the answer, so the choice belongs with it.
 *
 * `price` is the entry number and nothing more. The full ladder — five Public plans, four Private —
 * is `/pricing/`'s job, which is what `plansHref` deep-links into; repeating it here would put the
 * same figures on two pages from two sources and let them drift. Both numbers below are the ones
 * the matrix already states under "Starting price".
 */
export const paasChoice = {
	// "Start free, or talk to us" rather than "Choose your deployment", because the two paths differ
	// in KIND and not just in spec: one is a button and the other is a conversation, and the heading
	// that says so is the one that maps to the two things directly under it. The lede's job is then
	// to explain why — self-serve against provisioned-for-you — instead of restating the table.
	title: 'Start free, or talk to us',
	lead: 'Public Cloud is self-serve and running in five minutes. Private Cloud is a dedicated cluster our team provisions for you, with a stronger SLA and higher throughput.',
	options: [
		{
			name: 'Public Cloud',
			// The pair is `cloud` / `cloud-lock`: one base glyph, and the lock is the only difference —
			// which is the only difference that matters here. Public carries no modifier at all, so
			// the lock reads as something Private ADDS rather than as two competing symbols.
			icon: 'tabler:cloud',
			price: 'Free',
			priceNote: 'Free tier up to 5 devices',
			summary: 'The fastest, shared-infrastructure start.',
			// NOT "30 days free": the free tier is capped on DEVICE COUNT, not on time, and the
			// price note directly above already states that cap. The two claims were contradicting
			// each other inside one card — a reader who believed the third bullet would expect the
			// thing to stop after a month, which is not what happens.
			points: ['Shared multi-tenant environment', 'Under 5 minutes, self-serve', 'No card required to start'],
			// "Start for free" rather than the hero's "Try Cloud for free": the card is headed Public
			// Cloud and priced From $0 directly above the button, so repeating either word in the
			// label spends the line saying what the card has already said twice.
			// The glyph is the HERO pair's own — the action's mark, not the option's.
			cta: {
				text: 'Start for free',
				icon: 'tabler:cloud-filled',
				href: 'https://thingsboard.cloud/signup',
				variant: 'primary' as const,
			},
			plansHref: '/pricing/?product=thingsboard-cloud',
		},
		{
			name: 'Private Cloud',
			icon: 'tabler:cloud-lock',
			price: 'From $1,499',
			priceNote: 'Per month, 5,000 devices',
			summary: 'A dedicated, isolated cluster with a stronger SLA.',
			points: ['Dedicated, isolated Kubernetes cluster', 'Provisioned by our team in hours', '99.9% – 99.99% uptime SLA'],
			// Outlined rather than filled: two solid purples side by side made the pair read as one
			// choice offered twice. The shimmer is what keeps it from reading as the lesser option —
			// it is a different KIND of action, not a weaker one.
			cta: { text: 'Contact us', icon: 'tabler:message-circle', href: CONTACT_PRIVATE_CLOUD, variant: 'secondary' as const },
			plansHref: '/pricing/?product=thingsboard-private-cloud',
		},
	],
};

export interface CompareRow {
	label: string;
	/** Public Cloud, then Private Cloud. */
	values: [string, string];
}

export interface CompareGroup {
	title: string;
	/** Tabler name for the group's mark. */
	icon: string;
	/** The mark's hue. One rotation runs through both this table and the feature list. */
	color: string;
	rows: CompareRow[];
}

/** The unlabelled first row of the matrix, above the group headings. */
export const paasCompareLead: CompareRow = {
	label: 'Best for',
	values: ['Prototypes, MVPs, startups, SMBs', 'SMBs, enterprises, mission-critical workloads'],
};

/** Where the two differ. */
export const paasCompare: CompareGroup[] = [
	{
		title: 'Infrastructure & scale',
		icon: 'tabler:stack-2',
		color: '#3d50f5',
		rows: [
			{
				label: 'Infrastructure model',
				values: ['Shared multi-tenant environment', 'Dedicated, isolated Kubernetes cluster'],
			},
			{ label: 'Tenant isolation', values: ['Logical', 'Physical — your own cluster'] },
			{ label: 'Devices included', values: ['Up to 5,000', 'From 5,000 and up to infinity devices'] },
			{ label: 'Extra device', values: ['$0.30 / device/month', 'From $0.10 down to under $0.05 / device/month'] },
			{ label: 'Throughput', values: ['Up to 1B data points/month', '2B+ data points/month'] },
			{ label: 'Storage', values: ['Included per plan', '500 GB – 2 TB by plan, then $0.50 / GB'] },
			{
				label: 'Tenants & users',
				values: ['One subscription per tenant', 'Unlimited tenants, customers and users on one subscription'],
			},
			{ label: 'Region choice', values: ['US or EU', 'EU, North America or APAC — AWS, Azure or GCP on request'] },
			{ label: 'Setup time', values: ['Under 5 minutes, self-serve', 'Provisioned by our team in hours'] },
		],
	},
	{
		title: 'Reliability & operations',
		icon: 'tabler:activity',
		color: '#047857',
		rows: [
			{ label: 'Uptime SLA', values: ['99.9%', '99.9% – 99.99%'] },
			{ label: 'Application-level HA', values: ['Managed by ThingsBoard Team', 'Included from the Scale plan'] },
			{
				label: 'Database replication',
				values: ['Managed by ThingsBoard Team', 'Multi-AZ on every plan — Cassandra 3×, PostgreSQL 2×'],
			},
			{
				label: 'Backups',
				values: ['Managed by ThingsBoard Team', 'Nightly snapshots in a separate region, 7-day retention'],
			},
			{
				label: 'Upgrades and maintenance window',
				values: ['Applied by ThingsBoard Team', 'Suggested slots (Launch, Growth) · your choice (Scale, Enterprise)'],
			},
			{ label: 'Dev/Test environment', values: ['—', 'Available as an add-on'] },
		],
	},
	{
		title: 'Compliance',
		icon: 'tabler:shield-lock',
		color: '#006bc7',
		rows: [
			{
				label: 'Certifications',
				values: [
					'Hosted on SOC 2- and ISO 27001-compliant infrastructure',
					'ISO 27001 and PCI-DSS certified data centres',
				],
			},
			{
				label: 'Data export on exit',
				values: ['Via REST API and the dashboard', 'Full encrypted database dump, 60 days to retrieve'],
			},
		],
	},
	{
		title: 'Support & commercials',
		icon: 'tabler:headset',
		color: '#c2410c',
		rows: [
			{
				label: 'Starting price',
				values: [
					'$0 free tier up to 5 devices · $49 / month per 50 devices · $149 / month per 100 devices (White-labeling included)',
					'From $1,499 / month per 5,000 devices (White-labeling included)',
				],
			},
			{
				label: 'Support',
				values: [
					'Community (Free, Prototype) · help desk (Pilot) · priority help desk (Startup, Business)',
					'Support portal on every plan · priority channel from Growth · dedicated success engineer on Enterprise',
				],
			},
			{ label: 'Architecture consultations', values: ['—', 'Available from the Scale plan, purchased separately'] },
			{ label: 'Free tier', values: ['Free to 5 devices, no card required', 'Not available — evaluate on Public Cloud first'] },
			{ label: 'Payment', values: ['Stripe · monthly', 'Card or wire · monthly, or annual with 10% off'] },
			{ label: 'Commitment', values: ['Cancel anytime', 'No lock-in · 30 days’ notice · no setup or cancellation fee'] },
			// Develop files this under "Build the application", in the half where every other row is
			// identical on both — it is the one row there whose columns differ. Both its values are
			// plan tiers, so it sits with the other plan-gated rows rather than alone under a heading
			// repeating the name of the section above the table.
			{ label: 'White-labeling', values: ['From the Pilot plan', 'Included on every plan'] },
		],
	},
	{
		title: 'Add-ons',
		icon: 'tabler:puzzle',
		color: '#7c3aed',
		rows: [
			{ label: 'ThingsBoard Edge', values: ['From $9 / month', 'From $249 / month'] },
			{ label: 'Trendz Analytics', values: ['From $29 / month', 'From $449 / month'] },
			{ label: 'White-labeled Mobile App', values: ['From $99 / month', 'From $99 / month'] },
		],
	},
];

export interface SharedRow {
	label: string;
	detail: string;
}

export interface SharedGroup {
	title: string;
	/** Tabler name for the group's mark. */
	icon: string;
	/** The mark's hue. One rotation runs through both the comparison table and this list. */
	color: string;
	rows: SharedRow[];
}

/**
 * Develop's "The same platform on both" half of the matrix, which this page leads with as its own
 * "Platform features" section. Every row there spans both columns and repeats "Included in
 * ThingsBoard Public Cloud and ThingsBoard Private Cloud" before the detail — a screen-reader
 * affordance for a table whose cell is merged. This page states it once in the section's own lede
 * and keeps only the detail, which is the part that differs row to row.
 *
 * `White-labeling` is deliberately absent: it is the one row in this half whose two columns differ,
 * so it belongs in `paasCompare` and sits there under Support & commercials.
 */
export const paasShared: SharedGroup[] = [
	{
		title: 'Connect and control devices',
		// `CONNECT_COPY.badge` on the homepage, glyph and hue both.
		icon: 'tabler:plug-connected',
		color: '#007c7b',
		rows: [
			{
				label: 'Device connectivity',
				detail:
					'MQTT, HTTP, CoAP, LwM2M and SNMP direct; Modbus, OPC UA, BACnet and CAN via the IoT Gateway; LoRaWAN and Sigfox integrations',
			},
			{
				label: 'Device management',
				detail: 'Lifecycle, provisioning, claiming, bulk import, device profiles inherited by every device of a type',
			},
			{
				label: 'Remote control',
				detail: 'Persistent RPC from dashboards, rules or API — retries, expiry and full delivery state',
			},
			{
				label: 'Firmware & config updates (OTA)',
				detail: 'Firmware repository, chunked delivery, checksum validation, per-device status',
			},
			{ label: 'Device security', detail: 'X.509, tokens, per-device credentials, device claiming, audit log' },
		],
	},
	{
		title: 'Model and process data',
		icon: 'tabler:sitemap',
		color: '#047857',
		rows: [
			{
				label: 'Asset model & digital twin',
				detail: 'Assets, customers, hierarchies and relations; KPIs resolve across the tree',
			},
			{ label: 'Data processing', detail: 'Visual rule chains, calculated fields and formulas, JavaScript or TBEL' },
			{ label: 'Alarms', detail: 'Conditions, severity, assignment, full lifecycle and history' },
			{
				label: 'Time-series storage',
				detail: 'Partitioning, retention and aggregation handled for you; custom TTL policies',
			},
			{
				label: 'Integrations & APIs',
				detail: 'REST and WebSocket APIs, Kafka, RabbitMQ, business system integrations, version control, CLI',
			},
		],
	},
	{
		title: 'Build the application',
		// The homepage's "Build real-time IoT dashboards" badge, which was already this hue.
		icon: 'tabler:chart-dots',
		color: '#006bc7',
		rows: [
			{
				label: 'Dashboards & SCADA',
				detail: 'Real-time pages, drill-down navigation, maps, charts, 600+ widgets plus custom widgets',
			},
			{ label: 'Notifications', detail: 'In-app, email, SMS, push, Slack and Teams, with per-user preferences' },
			{
				label: 'Reporting & scheduling',
				detail: 'Scheduled PDF, CSV and XLSX by email or to systems, plus scheduled commands and syncs',
			},
			{ label: 'Users, roles & hierarchy', detail: 'OAuth2 SSO, 2FA, user groups, nested customers with data isolation' },
			{ label: 'Self-service', detail: 'End users register, onboard their own devices and manage their data' },
		],
	},
	{
		title: 'Work faster',
		icon: 'tabler:bolt',
		color: '#c2410c',
		rows: [
			{
				label: 'AI assistants & CLI',
				detail:
					'AI Solution Creator, dashboard and alarm rule assistants, terminal access scriptable for CI/CD',
			},
			{ label: 'IoT Hub', detail: 'Ready-made solution templates, devices, widgets, rule chains and dashboards' },
		],
	},
];

export interface FaqItem {
	q: string;
	/** Answer markup — ours, from this file, rendered with `set:html`. */
	a: string;
}

export interface FaqCategory {
	title: string;
	items: FaqItem[];
}


/**
 * Develop's FAQ, all seven categories and all 82 answers.
 *
 * Two develop-only details are dropped: `target="_blank"` on links that stay on the site, and the
 * `pricing-paas-link` / `data-paas-path` pair, which is a runtime rewrite hook for the US/EU domain
 * switch that this page does not run.
 */
export const paasFaq: FaqCategory[] = [
	{
		title: 'General',
		items: [
			{
				q: 'What is ThingsBoard Cloud?',
				a: '<p>ThingsBoard Cloud is a fully managed, scalable, and fault-tolerant platform for your IoT applications.</p>',
			},
			{
				q: 'What pricing plans does ThingsBoard Cloud offer?',
				a: `<p>ThingsBoard Cloud offers flexible monthly subscription plans, with tiers based on the number of devices and the volume of messages they generate. We support 5 predefined plans to cater to different needs. The beginner plan includes up to 5 devices and 10 million data points. For more details, visit the ThingsBoard Cloud <a href="/pricing/?product=thingsboard-cloud">pricing</a> page.</p>`,
			},
			{
				q: 'How is ThingsBoard Cloud pricing structured?',
				a: `<p>Pricing is based on the number of connected devices and the volume of messages they generate. Each plan has a fixed monthly fee, with the option to purchase additional entity packs and API call packs. In this case, the total monthly cost consists of the base fee for the selected plan plus additional charges for extra features. More details are available on the <a href="${SUBSCRIPTIONS}">subscription plans</a> page.</p>`,
			},
			{
				q: 'Are there any API or rate limits?',
				a: `<p>Yes, each plan includes specific API and rate limits. If needed, you can extend these limits by purchasing additional API call packs. Detailed limits for each plan are available on the <a href="${SUBSCRIPTIONS}">subscription plans</a> page.</p>`,
			},
			{
				q: 'Do you offer a free trial?',
				a: '<p>Yes, we offer a free 30-day trial to let you explore ThingsBoard Cloud before committing to a paid plan.</p>',
			},
			{
				q: 'What is included in the free trial?',
				a: '<p>The free trial includes access to all core features and Trendz Analytics tool with limited usage of devices, messages, and storage.</p>',
			},
			{
				q: 'Can I upgrade or downgrade my plan at any time?',
				a: '<p>Yes, you can change your plan at any time, and billing will be adjusted accordingly.</p>',
			},
			{
				q: 'How does ThingsBoard Cloud pricing compare to the on-premise version?',
				a: '<p>ThingsBoard Cloud eliminates infrastructure management costs, offering a predictable monthly fee, whereas the on-premise version requires separate hosting infrastructure and maintenance efforts.</p>',
			},
			{
				q: "What's the difference between ThingsBoard Cloud and on-premises subscriptions?",
				a: "<p>On-premises subscription plans include only the license fees and do not provide hosting services. This means you need to deploy ThingsBoard on an external cloud platform (AWS, Azure, GCP, etc.) or a local server (on-premise). Additionally, you are responsible for managing the infrastructure and maintaining the ThingsBoard server.</p><p>On the other hand, ThingsBoard Cloud offers the same platform as a fully managed service, hosted on ThingsBoard's infrastructure. This eliminates the need for separate infrastructure costs and maintenance efforts.</p><p>For example, the on-premises Pilot subscription costs $99, whereas the ThingsBoard Cloud Pilot subscription is priced at $149. The price difference is due to the hosting fee included in the Cloud subscription.</p>",
			},
			{
				q: 'Are there any additional costs beyond the subscription fee?',
				a: '<p>No, all standard features are included in the subscription. However, additional services such as application configuration, integrations, or consulting may incur extra costs. In addition, if you exceed the limits of your selected plan, you can purchase extra entity packs and API call packs for an additional fee.</p>',
			},
			{
				q: "What happens if I exceed my plan's limits?",
				a: '<p>If you exceed your limits, you may need to upgrade to a higher plan or reduce your usage. You can also purchase additional entity packs and API call packs; however, extra devices can only be purchased with the Business plan. If you reach the device limit, you will need to upgrade your plan.</p>',
			},
			{
				q: 'Can I create a custom plan with the ability to choose limits for devices, assets, users, etc.?',
				a: '<p>ThingsBoard Cloud offers predefined base plans that can be further customized with additional entity packs and API call packs.</p>',
			},
			{
				q: 'Can I purchase ThingsBoard Cloud for a short-term project?',
				a: '<p>Yes, you can subscribe for a single month and cancel anytime.</p>',
			},
			{
				q: 'How to cancel my subscription?',
				a: `<p>Kindly refer to the <a href="${SUBSCRIPTIONS}#cancel-subscription">subscription cancellation guide</a>.</p>`,
			},
			{
				q: 'How to migrate from the Cloud to an on-premises platform instance?',
				a: `<p>We recommend using the <a href="/docs/pe/user-guide/version-control/">Version control</a> feature to migrate your configurations. Telemetry data export can be achieved via REST API. Please, <a href="${CONTACT}">contact us</a> in case migration assistance is needed.</p>`,
			},
			{
				q: 'I need to move from US cloud to EU. How to achieve that?',
				a: `<p>Technically, you have to follow the same flow as for the migration from the Cloud to an on-premises platform instance. Please, <a href="${CONTACT}">contact us</a> in case migration assistance is needed.</p>`,
			},
			{
				q: 'What is included in the White-Labeled Mobile App add-on?',
				a: "<p>The White-Labeled Mobile App add-on provides you with a branded version of the ThingsBoard Mobile application. This includes your company's name, logo, colors, and other branding elements. The cost is $99 per month, plus a one-time setup fee of $1,000 to cover branding and configuration.</p>",
			},
		],
	},
	{
		title: 'Billing & Payments',
		items: [
			{
				q: 'How does billing work for ThingsBoard Cloud?',
				a: `<p>Billing is handled via Stripe and is charged monthly based on your selected plan. You can also pay annually with card or wire transfer. Please <a href="${CONTACT}">contact us</a> to receive a custom invoice.</p>`,
			},
			{
				q: 'What payment methods do you accept?',
				a: `<p>We accept credit and debit cards through Stripe. You can also pay annually with card or wire transfer. Please <a href="${CONTACT}">contact us</a> to receive a custom invoice.</p>`,
			},
			{
				q: 'I cannot pay by card, may we use wire instead?',
				a: `<p>Sure. In this case, you must reach out to our sales team via <a href="${CONTACT}">contact us</a>. If you have ongoing communication with the account manager or success manager on our end, please refer your request to that person.</p>`,
			},
			{
				q: 'Can I pay monthly or annually?',
				a: `<p>We currently offer only a monthly subscription with automatic payments via Stripe. For annual payments, please <a href="${CONTACT}">contact</a> our team to arrange a wire transfer invoice.</p>`,
			},
			{
				q: 'Do you offer volume discounts for large deployments?',
				a: `<p>We offer Private Cloud plans for large-scale deployments with 10% discounts for annual payments; <a href="${CONTACT}">contact us</a> for details.</p>`,
			},
			{
				q: 'How do I view my billing history and invoices?',
				a: '<p>You can access invoices and payment history via your ThingsBoard Cloud account dashboard.</p>',
			},
			{
				q: 'What happens if my payment fails?',
				a: '<p>If a payment fails, Stripe will retry the charge. If unresolved, your account may be suspended until payment is completed.</p>',
			},
			{
				q: 'Are there any hidden fees?',
				a: '<p>No, there are no hidden fees—pricing is transparent and includes all standard features.</p>',
			},
			{
				q: 'Do you charge for data transfer, API calls, or message processing?',
				a: `<p>Each plan includes predefined usage limits that you can find <a href="${SUBSCRIPTIONS}">on the subscription plans page</a>. You can also purchase additional entity and API call packs if required.</p>`,
			},
			{
				q: 'Can I create a custom plan with the ability to choose limits for devices, assets, users, etc.?',
				a: '<p>ThingsBoard Cloud offers predefined base plans that can be further customized with additional entity packs and API call packs.</p>',
			},
			{
				q: 'Can I get a refund if I cancel my subscription?',
				a: '<p>ThingsBoard Cloud does not offer refunds for unused time if you cancel before the billing cycle ends.</p>',
			},
			{
				q: 'How does proration work when upgrading or downgrading my plan?',
				a: '<p>When you change plans, Stripe automatically calculates the prorated charge based on your usage.</p>',
			},
			{
				q: 'How to bill my customers on Cloud?',
				a: `<p>Currently, ThingsBoard Cloud does not provide a built-in billing module to charge end customers. However, you can create custom dashboards with backend integration between ThingsBoard and the payment system of your choice to set up billing for your application. If you would like our assistance with setting up billing, please <a href="${CONTACT}">contact us</a>, and we'll be happy to propose such a configuration as an additional service.</p>`,
			},
		],
	},
	{
		title: 'Usage & Limits',
		items: [
			{
				q: 'What are the device, message, and data storage limits for each plan?',
				a: `<p>Limits vary by plan; details can be found on our plans definition <a href="${SUBSCRIPTIONS}">page</a>.</p>`,
			},
			{
				q: 'How is device usage calculated?',
				a: '<p>Device usage is determined by the number of device entities created within your account.</p>',
			},
			{
				q: 'Do you charge for inactive devices?',
				a: '<p>Yes, ThingsBoard Cloud charges for all created device entities, whether active or inactive, since telemetry and attribute data for inactive devices are also stored.</p>',
			},
			{
				q: 'How does ThingsBoard Cloud handle overages?',
				a: '<p>If you exceed your limits, you may need to upgrade to a higher plan or purchase additional entity and API call packs.</p>',
			},
			{
				q: 'Can I increase my resource limits if needed?',
				a: '<p>Yes, you can upgrade your plan at any time to increase your limits, or you can purchase additional entity and API call packs as needed.</p>',
			},
			{
				q: 'Is white labeling available out of the box?',
				a: '<p>Brand the platform as your own. Fully customize it with your own logo, domain, color scheme, and menu items.</p>',
			},
			{
				q: 'What support options are available for migrating to an on-premises system instead of switching to the Enterprise plan?',
				a: `<p>You can perform the migration on your own using the Version Control feature to transfer your configurations. Telemetry data can be exported via the REST API. Alternatively, the ThingsBoard team can provide additional migration assistance. Please <a href="${CONTACT}">contact us</a> for more details.</p>`,
			},
			{
				q: 'How is telemetry data storage billed?',
				a: `<p>Storage is included in your plan, but exceeding the limits may require upgrading your subscription or purchasing an additional storage pack. Storage limits vary by plan, you may see details <a href="${SUBSCRIPTIONS}">on the subscription plans page</a>.</p>`,
			},
			{
				q: 'Are there additional costs for dashboards and visualization?',
				a: '<p>No, dashboards are included in all plans.</p>',
			},
			{
				q: 'Do you charge for API requests?',
				a: '<p>API usage is included in your plan, but rate limits apply based on your selected tier. If needed, you can purchase additional API call packs to extend these limits.</p>',
			},
			{
				q: "What happens if I exceed my plan's API limits?",
				a: '<p>API access may be throttled until the next billing cycle, or you can upgrade to a higher plan. Alternatively, you can purchase additional API call packs to extend your access.</p>',
			},
			{
				q: 'Is there a limit on the number of users per account?',
				a: `<p>Each plan has a predefined number of users. Limits vary by plan; details can be found on our <a href="${SUBSCRIPTIONS}">plans definition page</a>. If needed, you can purchase additional user packs to increase the number of users.</p>`,
			},
			{
				q: 'Where can I put a domain certificate?',
				a: `<p>ThingsBoard automatically provisions certificates for your domain name using Let's Encrypt. Refer to the <a href="/docs/paas/user-guide/security/domains/">domain configuration guide</a>. Custom certificate provisioning is available exclusively for Enterprise Cloud subscribers upon request.</p>`,
			},
			{
				q: 'How can I track the uptime of my tenant?',
				a: '<p>The status page is in progress. While we continuously monitor system performance and strive to maintain SLA, our team remains dedicated to delivering high availability and reliability. Updates regarding service status will be available as we develop the status page further.</p>',
			},
		],
	},
	{
		title: 'Security & Compliance',
		items: [
			{
				q: 'How is my data secured in ThingsBoard Cloud?',
				a: '<p>We use encryption, access controls, and best security practices to protect your data.</p>',
			},
			{
				q: 'Are you ISO compliant?',
				a: '<p>The ThingsBoard Cloud is hosted in an IaaS asset compliant with multiple standards, including SOC II, and ISO 27001.</p>',
			},
			{
				q: 'Where is my data stored, and can I choose the region?',
				a: '<p>Your data is stored in either North America or the EU, depending on the cloud region (US or European) you choose. With the Enterprise subscription, you can choose any region or specific country for data storage.</p>',
			},
			{
				q: 'Are there additional costs for compliance-related features?',
				a: '<p>No, security and compliance features are included in all plans.</p>',
			},
			{
				q: 'Do you support multi-tenancy in ThingsBoard Cloud?',
				a: '<p>Yes, ThingsBoard Cloud supports multi-tenancy, with each tenant requiring its own subscription. Within a tenant, a customer hierarchy can be established, allowing tenant administrators to manage multiple customers under a single subscription. This structure provides sufficient flexibility and access control for most use cases, ensuring a well-organized and efficient management model. ThingsBoard Enterprise subscription offers multi-tenancy within a single plan.</p>',
			},
			{
				q: 'Can I export my data at any time?',
				a: '<p>Yes, you can export data via APIs or the ThingsBoard dashboard.</p>',
			},
			{
				q: 'What happens to my data if I cancel my subscription?',
				a: '<p>Your data will be retained for a short period before being permanently deleted.</p>',
			},
		],
	},
	{
		title: 'Trials, Cancellations & Refunds',
		items: [
			{
				q: 'How do I start a free trial?',
				a: '<p>Simply sign up on our website—no credit card required (<a href="https://thingsboard.cloud/signup" target="_blank" rel="noopener noreferrer">North America</a> or <a href="https://eu.thingsboard.cloud/signup" target="_blank" rel="noopener noreferrer">EU</a>).</p>',
			},
			{
				q: 'What happens when my free trial ends?',
				a: '<p>Once your free trial ends, you will need to add billing details so the system can automatically charge you for the new monthly renewal period after the initial free month expires.</p>',
			},
			{
				q: 'Can I switch from a free trial to a paid plan without losing my data?',
				a: '<p>Yes, all your data and configurations remain intact when upgrading.</p>',
			},
			{
				q: 'How to cancel my subscription?',
				a: `<p>Kindly refer to the <a href="${SUBSCRIPTIONS}#cancel-subscription">subscription cancellation guide</a>.</p>`,
			},
			{
				q: 'What happens if I cancel my subscription before the billing period ends?',
				a: '<p>Canceling your subscription before the end of the billing cycle will result in the loss of funds allocated for the unused period.</p>',
			},
			{
				q: 'Do you offer refunds for unused subscription time?',
				a: '<p>No, refunds are not provided for mid-cycle cancellations.</p>',
			},
		],
	},
	{
		title: 'Support & Assistance',
		items: [
			{
				q: 'What support is included in my plan?',
				a: '<p>All paid subscriptions provide access to the ThingsBoard Support Portal, allowing customers to submit support tickets and communicate directly with the support team. Startup and Business plans also include priority support.</p>',
			},
			{
				q: 'Do you offer 24/7 customer support?',
				a: `<p>Yes, we do provide 24/7 support. If this is what you're looking for, please <a href="${CONTACT}">contact us</a> for a more detailed discussion about your specific needs.</p>`,
			},
			{
				q: 'How can I contact ThingsBoard support for billing-related issues?',
				a: `<p>You can use the <a href="${CONTACT}">contact us</a> form and select the "Other" topic. Our account managers will assist you with any billing-related issues.</p>`,
			},
			{
				q: 'Is there a knowledge base or self-service support portal?',
				a: '<p>All of our <a href="/docs/paas/">documentation</a> is available on our website, with no hidden information. Additionally, you can use our Github issues for community support.</p>',
			},
			{
				q: 'Can I get priority support with my plan?',
				a: '<p>Priority support is included with the Startup and Business plans.</p>',
			},
			{
				q: 'What response times can I expect for support tickets?',
				a: '<p>Response times vary by plan; Private Cloud customers receive better SLAs.</p>',
			},
			{
				q: 'Can you provide an IoT development service tailored to my specific needs?',
				a: '<p>Yes, we offer custom <a href="/services/development-services/">IoT development services</a> designed to match your exact requirements. Whether you need a full-featured IoT platform, scalable architecture, or specific integrations, our IoT development team can help you accelerate time-to-market and reduce internal workload while ensuring long-term maintainability.</p>',
			},
		],
	},
	{
		title: 'Private Cloud',
		items: [
			{
				q: 'What does “ThingsBoard Private Cloud” stand for?',
				a: '<p>ThingsBoard Private Cloud is a fully managed, isolated ThingsBoard cluster that our team deploys and operates for you. We provision the infrastructure, keep the platform patched and monitored 24×7, run automated backups, and provide an SLA-backed uptime guarantee (99%–99.99%, depending on plan). During onboarding, you choose the region that best fits your compliance or latency requirements—EU, North America, or APAC. All environments are hosted in ISO 27001/PCI-DSS-certified data centers. Your engineers can stay focused on building IoT applications instead of managing DevOps.</p>',
			},
			{
				q: 'How Private Cloud compares to ThingsBoard Cloud and On-premises?',
				a: '<ul><li>On-premises deployments live on infrastructure you operate; you gain total control and customisation, yet you also own every patch, backup and compliance task.</li><li>ThingsBoard Cloud is the quickest way to try ThingsBoard: a SaaS environment that we maintain for you, but shared with other tenants.</li><li>Private Cloud is a fully managed, isolated cluster run by the ThingsBoard team, with a contractual 99.9–99.99 % SLA and your choice of region—ideal when you need zero DevOps and hard uptime guarantees.</li></ul>',
			},
			{
				q: 'What are the benefits of Private Cloud versus self-hosting?',
				a: '<ul><li>Zero DevOps overhead – no servers to set up, patch or monitor.</li><li>Guaranteed availability – written SLA of 99.9 – 99.99 %, with service-credit remedies.</li><li>Faster time-to-market – we stand up production clusters in 1-2 hours, not weeks.</li><li>Scalability – Kubernetes-based plans grow as device traffic spikes.</li><li>Predictable cost – one all-inclusive monthly fee replaces cap-ex plus staffing.</li></ul>',
			},
			{
				q: 'What is ‘uptime’ and how do you calculate it?',
				a: '<p>Uptime (%) = ((Total Time – Downtime) / Total Time) × 100.</p><p>Total Time – number of minutes in the billing month.</p><p>Downtime – minutes when core platform services are unavailable for the tenant (device endpoints, REST/WebSocket APIs, Rule Engine infrastructure, dashboards, telemetry DB).</p><p>We measure Downtime from incident detection to full service restoration.</p><p>Excluded from Downtime:</p><ul><li>Scheduled maintenance announced ≥ 48 h in advance</li><li>Emergency security patches</li><li>Force-majeure events or upstream cloud failures (e.g., cloud provider region outage)</li><li>Issues caused by customer-side logic (mis-configured Rule Chains, custom JS, connector errors, abusive API use, edge gateways, etc.)</li></ul>',
			},
			{
				q: 'What deployment options are available within Private Cloud?',
				a: '<p>Private Cloud is offered in three fixed tiers—Launch, Growth, and Scale—each designed to support different stages of your IoT deployment journey. The Enterprise plan is tailored for your use case and offers flexible architecture, pricing and custom SLA.</p><p>All plans are powered by Kubernetes, with built-in load balancers to ensure resilient, scalable operations. AWS is our first-choice IaaS, but Azure or GCP regions are also supported on request.</p>',
			},
			{
				q: 'What is Automatic Backup?',
				a: '<p>It is a configured process that regularly creates secure copies of the database with all telemetry, configurations, entities, and related data to avoid data loss in case of failure and enable recovery.</p>',
			},
			{
				q: 'What support is included?',
				a: '<p>All plans include access to the ThingsBoard Support Portal for direct communication with the support team in case of questions related to ThingsBoard functionality.</p>',
			},
			{
				q: 'Who should choose Private Cloud?',
				a: '<p>Private Cloud ideal for companies that want to avoid investing in DevOps resources, reduce operational risk, and accelerate time to market. They are particularly beneficial for startups, SMBs, or enterprises scaling production systems who prefer to offload platform operations and upgrades to the ThingsBoard team under a clear SLA.</p>',
			},
			{
				q: 'How do I determine the right Private Cloud plan for my workload?',
				a: '<p>To select an appropriate Private Cloud plan, you’ll need to estimate your expected platform usage based on three key indicators:</p><p>1. Number of devices:</p><ul><li>Navigate to the Home page of your ThingsBoard Tenant account.</li><li>Check the total number of devices currently connected.</li></ul><p>2. Number of Messages per Day per Device:</p><ul><li>Navigate to API Usage → Transport Messages chart</li><li>Find the monthly total of transport messages</li><li>Use this formula: Messages per day per device = (Monthly Transport Messages) / (Number of devices × Number of Days in Month)</li></ul><p>3. Number of Data Points per Message:</p><ul><li>In the same API Usage → Transport Messages chart</li><li>Identify the Data Points per Month figure</li><li>Use this formula: Data Points per Message = Data Points per Month / Transport Messages per Month</li></ul><p>Once you’ve collected these three values, you can match your usage against the limits defined in each Private Cloud plan tier (Launch, Growth, Scale, Enterprise) to determine the best fit.</p><p>For more guidance, you can share these metrics with our team, we’ll be happy to help you size your environment.</p>',
			},
			{
				q: 'Is there a minimum commitment?',
				a: '<p>No long-term lock-in. We simply ask for a 30-day written notice before shutdown so we can decommission resources cleanly.</p>',
			},
			{
				q: 'Where will my data be hosted?',
				a: '<p>During onboarding you pick the region that best fits compliance or latency needs (EU, North America, or APAC). All sites reside in ISO 27001/PCI-DSS-certified data centres.</p>',
			},
			{
				q: 'How can I get my data in line with GDPR requirements?',
				a: '<p>You can request a complete encrypted database dump at any time. We generate a full PostgreSQL dump of all tenant-level tables (entities, telemetry, audit logs, custom metadata) and transfer it to you over a secure channel (SFTP or your own cloud bucket).</p><p>Because the export is a raw DB dump, you retain 100 % data fidelity and can immediately restore it in another PostgreSQL instance or transform it into any machine-readable format you need. We normally fulfill export requests within 5 business days, and—in line with GDPR—can also execute verified deletion of all tenant data within 30 days of your erase request.</p>',
			},
			{
				q: 'Is your Private Cloud service GDPR-compliant?',
				a: '<p>Yes. You remain the sole Data Controller; ThingsBoard acts as a Data Processor under a standard DPA. Data never leaves the region you select, and you have the right to access, port or delete it at will.</p>',
			},
			{
				q: 'Will I have a sysadmin user?',
				a: '<p>For security and SLA integrity we do not expose Sysadmin by default. If your workflow truly needs low-level access, we can provide read-only credentials to metrics/Kubernetes dashboards under an additional NDA.</p>',
			},
			{
				q: 'What kind of security measurements do you provide?',
				a: '<p>Private Cloud is designed with enterprise-grade security at its core. Access to the infrastructure is limited to authorized ThingsBoard personnel only, with regular audits and monitoring in place. We follow industry best practices for patch management, vulnerability scanning, and secure software development. For added protection, customers may also enable 2FA, dedicated VPN tunnels, and audit logging depending on their plan.</p>',
			},
			{
				q: 'How often are upgrades conducted?',
				a: '<p>All Private Cloud upgrades—whether minor patches or major version releases—are scheduled in coordination with the customer. This ensures full transparency, minimizes disruption, and allows your team to prepare in advance. Our team handles the entire upgrade process and provides clear communication before and after each change to maintain operational continuity and SLA compliance.</p>',
			},
			{
				q: 'Can I upgrade my plan at any time?',
				a: '<p>Upgrades are possible at any time, but they are not initiated automatically. The ThingsBoard team continuously monitors your resource usage and data point throughput. If your consumption exceeds the thresholds defined for your current tier, our team will notify you and guide the process of upgrading to a higher plan. This ensures uninterrupted service and compliance with SLA guarantees. You can also request an upgrade proactively if you anticipate growth or require additional capabilities.</p>',
			},
			{
				q: 'What is included in service reviews and architecture consultations?',
				a: '<p>Service reviews and architecture consultations are a specialized, ongoing service available exclusively to ThingsBoard Private Cloud customers. These sessions provide structured, high-level guidance from a senior ThingsBoard engineer who collaborates with your team regularly. You’ll receive proactive recommendations on best practices, performance tuning, and scalable architecture design tailored to your evolving use case.</p><p>This service is not included by default and can be purchased separately for customers who require advanced architectural guidance and regular expert engagement. <a href="/contact-us/?subject=Private%20Cloud&amp;message=Architecture%20reviews%20and%20consults">Contact us</a> for more details.</p>',
			},
		],
	},
];

/**
 * The exit to the third deployment.
 *
 * This page says "on-premises" a dozen times — the Why section defines Cloud as the option for
 * people who do not want to host their own instance, and five FAQ answers compare the two — and
 * until now linked to it zero times. A reader who decides the other way had nowhere to go.
 *
 * A line, not a card: the band's job is to drive its two calls to action, and a third option in the
 * grid would flatten the choice it has just set up. The href is the homepage's own action for this
 * product; the mark says what the deployment IS — a server you run — which the two cards above it
 * answer with clouds. No colour of its own: white puts it on the line's own ink rather than making
 * a third accent out of a one-line aside.
 */
export const paasOnPremises = {
	lead: 'Prefer to run it yourself?',
	text: 'ThingsBoard On-premises',
	href: '/products/thingsboard-pe/',
	icon: 'tabler:server',
};

/**
 * The two calls to action the develop page repeats in its hero and closing band.
 *
 * `primary` does NOT keep develop's href. There it points at `/installations/`, the guide to
 * installing ThingsBoard on your own infrastructure — which is the opposite of what a "try the
 * managed cloud for free" button on the Cloud page should do, and looks like a copy-paste from a
 * self-hosted page rather than a decision. It does what the homepage's own "Try for free" does:
 * `attrs` opens the region dialog the header renders (`CloudRegionDialog`), which asks North
 * America or Europe before leaving the site, and the href is the no-script fallback.
 */
/**
 * The line under the hero's buttons: the two things a reader weighs before pressing "Try Cloud for
 * free". Both are this page's own claims, restated rather than new — the Public Cloud card's
 * "No card required to start" and "Under 5 minutes, self-serve", the matrix's setup-time row and the
 * FAQ's "no credit card required" — so the hero cannot promise what the page below does not.
 */
export const paasHeroCaption = ['No credit card', 'Running in under 5 minutes'];

export const paasCtas = {
	primary: {
		text: 'Try Cloud for free',
		href: 'https://thingsboard.cloud/signup',
		attrs: { 'data-cloud-auth': 'signup' } as Record<string, string>,
	},
	secondary: {
		text: 'Talk to an expert',
		href: '/contact-us/?subject=ThingsBoard%20Products&message=I%20have%20a%20question%20about%20ThingsBoard%20Cloud',
	},
	privacy: { text: 'ThingsBoard Cloud Privacy policy', href: '/products/paas/privacy-policy/' },
};
