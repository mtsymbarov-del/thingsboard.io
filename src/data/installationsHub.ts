import { CLOUD_REGIONS, type CloudRegionId } from '@util/cloud-regions';
import { homeProducts } from './homeProducts';
import { homeEcosystem } from './homeEcosystem';

/**
 * The installations hub (`/installations/`), rebuilt 2026-09-27: one SECTION per product, in the
 * homepage's idiom — the product's mark on its squircle, its name and one line, the way in, and
 * the ways in — where the old page had a tab per product, each a hero with screenshots, a feature
 * list and a row of deployment logos. What the old page was FOR survives: every installation
 * option it linked, each to its own guide, and the pricing links. What it said about the products
 * does not; the product pages say it.
 *
 * NO PROFESSIONAL EDITION. This site sells two platforms, Cloud and On-premises, and the old
 * page's Community and Professional tabs fold into the one On-premises section: the free guide is
 * the way in, and the licence is a pricing link.
 *
 * The marks, colours, labels and descriptions come from the homepage's own entries, so a change
 * there follows here.
 */
export interface InstallLink {
	label: string;
	href: string;
}

/** One way to install, as the old page listed them: its logo, and the guide for it. */
export interface InstallOption {
	label: string;
	/** A `/src/assets/images/installation/…` wordmark, 180x36. */
	logo: string;
	href: string;
}

export interface InstallOptionGroup {
	title: string;
	items: InstallOption[];
}

export interface InstallRegion {
	id: CloudRegionId;
	name: string;
	/** Where the data stays, in the Cloud FAQ's own words. */
	note: string;
	signup: string;
}

/** A second column beside the way in: Cloud's Private Cloud, with the cloud-provider options under it. */
export interface InstallAside {
	title: string;
	text: string;
	links: InstallLink[];
	options: InstallOptionGroup[];
}

export interface InstallProduct {
	id: string;
	name: string;
	nameHighlight?: string;
	label: string;
	description: string;
	icon: string;
	accent: string;
	/** The platforms' squircle fill, with the mark knocked out white. The others keep their own mark on the light tile. */
	badgeFill?: string;
	/** The platform's glyph, on the button (the homepage's product cards carry it the same way). */
	cornerIcon?: string;
	/** The way in. Cloud has none: its regions are the way in. */
	primary?: InstallLink;
	/** The quiet links beside it: the product page, pricing. */
	links: InstallLink[];
	options?: InstallOptionGroup[];
	regions?: InstallRegion[];
	aside?: InstallAside;
}

const product = (highlight: string) => {
	const found = homeProducts.find((p) => p.nameHighlight === highlight);
	if (!found) throw new Error(`installationsHub: no homepage product highlights "${highlight}"`);
	return found;
};

const ecosystem = (name: string) => {
	const found = homeEcosystem.find((p) => p.name === name);
	if (!found) throw new Error(`installationsHub: no homepage ecosystem entry named "${name}"`);
	return found;
};

const cloud = product('Cloud');
const onPremises = product('On-premises');
const edge = ecosystem('Edge');
const trendz = ecosystem('Trendz');
const gateway = ecosystem('IoT Gateway');

const logo = (name: string) => `/src/assets/images/installation/${name}`;

const REGION_NOTES: Record<CloudRegionId, string> = {
	us: 'Data stored in North America',
	eu: 'Data stored in the European Union',
};

/**
 * THE REGIONS ARE THE WAY IN, listed on the page under "Try now" as the old page listed them — one
 * row per region, each the sign-up on that region's host. Cloud is two sites with an account on
 * only one, so the region is the one thing to decide, and it is decided here rather than behind a
 * dialog. No sign-in: a returning user has the header's.
 */
const regions: InstallRegion[] = CLOUD_REGIONS.map((r) => ({
	id: r.id,
	name: r.name,
	note: REGION_NOTES[r.id],
	signup: `https://${r.host}/signup`,
}));

/**
 * The old page's "cloud" row of the self-hosted guides — AWS, Azure, GCP, DigitalOcean — sits
 * under Cloud's Private Cloud column now (asked 2026-09-27), beside the managed offering that runs
 * on those providers. The guides themselves are still the self-hosted installs on each provider.
 */
const cloudProviders: InstallOptionGroup = {
	title: 'In a cloud of your choice',
	items: [
		{ label: 'AWS', logo: logo('aws.svg'), href: '/docs/installation/aws/' },
		{ label: 'Microsoft Azure', logo: logo('azure.svg'), href: '/docs/installation/azure/' },
		{ label: 'Google Cloud Platform', logo: logo('gcp.svg'), href: '/docs/installation/gcp/' },
		{ label: 'DigitalOcean', logo: logo('digital-ocean.svg'), href: '/docs/installation/digital-ocean/' },
	],
};

export const installProducts: InstallProduct[] = [
	{
		id: 'cloud',
		name: cloud.name,
		nameHighlight: cloud.nameHighlight,
		label: cloud.label,
		description:
			'Nothing to install. Pick the region your data lives in and start on a free plan; we run the servers, scaling, backups and upgrades.',
		icon: cloud.icon,
		accent: cloud.accent,
		badgeFill: cloud.badgeFill,
		cornerIcon: cloud.cornerIcon,
		links: [{ label: 'See plans', href: '/pricing/' }],
		regions,
		aside: {
			title: 'Private Cloud',
			text: 'A dedicated cluster we provision and operate for you, in the cloud and the region you choose.',
			// A dedicated cluster is a conversation, so the contact link leads; the comparison follows.
			links: [
				{ label: 'Contact us', href: '/contact-us/?subject=ThingsBoard%20Private%20Cloud' },
				{ label: cloud.action, href: cloud.href },
			],
			options: [cloudProviders],
		},
	},
	{
		id: 'on-premises',
		name: onPremises.name,
		nameHighlight: onPremises.nameHighlight,
		label: onPremises.label,
		description:
			'You run the deployment, on your own servers or fully offline. Free to install; the licence for the advanced features is on the pricing page.',
		icon: onPremises.icon,
		accent: onPremises.accent,
		badgeFill: onPremises.badgeFill,
		cornerIcon: onPremises.cornerIcon,
		primary: { label: 'Installation guide', href: '/docs/installation/' },
		links: [
			{ label: 'See plans', href: '/pricing/' },
			{ label: onPremises.action, href: onPremises.href },
		],
		// The old page's server row for this product, its own guides; its cloud row is under Private
		// Cloud above. "Cluster setup" goes to the guide's index, as it did: the cluster guides are
		// several, and the index lists them.
		options: [
			{
				title: 'On your servers',
				items: [
					{ label: 'Ubuntu Server', logo: logo('ubuntu.svg'), href: '/docs/installation/ubuntu/' },
					{ label: 'CentOS/RHEL Server', logo: logo('cenos-rhel.svg'), href: '/docs/installation/rhel/' },
					{ label: 'Raspberry Pi', logo: logo('raspberry-pi.svg'), href: '/docs/installation/rpi/' },
					{ label: 'Docker (Linux or Mac OS)', logo: logo('docker-linux-mac.svg'), href: '/docs/installation/docker/' },
					{ label: 'Docker (Windows)', logo: logo('docker-windows.svg'), href: '/docs/installation/docker-windows/' },
					{
						label: 'Building from source',
						logo: logo('sources.svg'),
						href: '/docs/installation/building-from-source/',
					},
					{ label: 'Cluster setup', logo: logo('kubernetes.svg'), href: '/docs/installation/' },
				],
			},
		],
	},
	{
		id: 'edge',
		name: 'ThingsBoard Edge',
		nameHighlight: 'Edge',
		label: edge.label,
		description: edge.description,
		icon: edge.icon,
		accent: edge.accent,
		primary: { label: 'Installation guide', href: '/docs/edge/installation/' },
		links: [
			{ label: 'See plans', href: '/pricing/?active=thingsboard-edge' },
			{ label: edge.action, href: edge.href },
		],
		options: [
			{
				title: 'Install on',
				items: [
					{ label: 'Ubuntu Server', logo: logo('ubuntu.svg'), href: '/docs/edge/installation/ubuntu/' },
					{ label: 'CentOS/RHEL Server', logo: logo('cenos-rhel.svg'), href: '/docs/edge/installation/rhel/' },
					{
						label: 'Docker (Linux or Mac OS)',
						logo: logo('docker-linux-mac.svg'),
						href: '/docs/edge/installation/docker/',
					},
					{
						label: 'Docker (Windows)',
						logo: logo('docker-windows.svg'),
						href: '/docs/edge/installation/docker-windows/',
					},
					{
						label: 'Building from source',
						logo: logo('sources.svg'),
						href: '/docs/edge/installation/building-from-source/',
					},
					{
						label: 'Edge cluster setup',
						logo: logo('docker-compose.svg'),
						href: '/docs/edge/installation/docker-compose-setup/',
					},
				],
			},
		],
	},
	{
		id: 'trendz',
		name: 'Trendz Analytics',
		nameHighlight: 'Trendz',
		label: trendz.label,
		description: trendz.description,
		icon: trendz.icon,
		accent: trendz.accent,
		primary: { label: 'Installation guide', href: '/docs/trendz/installation/' },
		links: [
			{ label: 'See plans', href: '/pricing/' },
			{ label: trendz.action, href: trendz.href },
		],
		options: [
			{
				title: 'Install on',
				items: [
					{ label: 'Trendz Cloud', logo: logo('trendz-cloud.svg'), href: '/docs/trendz/installation/cloud/' },
					{ label: 'Ubuntu Server', logo: logo('ubuntu.svg'), href: '/docs/trendz/installation/ubuntu/' },
					{ label: 'CentOS/RHEL Server', logo: logo('cenos-rhel.svg'), href: '/docs/trendz/installation/rhel/' },
					{
						label: 'Docker (Linux or Mac OS)',
						logo: logo('docker-linux-mac.svg'),
						href: '/docs/trendz/installation/docker/',
					},
					{
						label: 'Docker (Windows)',
						logo: logo('docker-windows.svg'),
						href: '/docs/trendz/installation/docker-windows/',
					},
				],
			},
		],
	},
	{
		id: 'gateway',
		name: 'IoT Gateway',
		nameHighlight: 'Gateway',
		label: gateway.label,
		description: gateway.description,
		icon: gateway.icon,
		accent: gateway.accent,
		primary: { label: 'Installation guide', href: '/docs/iot-gateway/installation/' },
		links: [{ label: gateway.action, href: gateway.href }],
		// Not on the old page; the guide's own options.
		options: [
			{
				title: 'Install on',
				items: [
					{
						label: 'Docker (Linux or Mac OS)',
						logo: logo('docker-linux-mac.svg'),
						href: '/docs/iot-gateway/installation/docker-installation/',
					},
					{
						label: 'Docker (Windows)',
						logo: logo('docker-windows.svg'),
						href: '/docs/iot-gateway/installation/docker-windows/',
					},
					{
						label: 'Python package',
						logo: logo('python.svg'),
						href: '/docs/iot-gateway/installation/pip-installation/',
					},
					{
						label: 'Debian package',
						logo: logo('ubuntu.svg'),
						href: '/docs/iot-gateway/installation/deb-installation/',
					},
					{ label: 'RPM package', logo: logo('cent-os.svg'), href: '/docs/iot-gateway/installation/rpm-installation/' },
				],
			},
		],
	},
];
