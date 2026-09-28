import { CLOUD_REGIONS, type CloudRegionId } from '@util/cloud-regions';
import { homeProducts } from './homeProducts';
import { homeEcosystem } from './homeEcosystem';

/**
 * Data for the installations hub (`/installations/`): one section per product with its sign-up or
 * installation guide, install options and pricing links. Marks, colours, labels and descriptions come
 * from the homepage entries, so changes there follow here.
 */
export interface InstallLink {
	label: string;
	href: string;
}

/** One way to install: its logo and the guide for it. */
export interface InstallOption {
	label: string;
	/** Qualifier shown in grey after the label, e.g. "Windows". */
	note?: string;
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
	/** Where the data is stored. */
	note: string;
	signup: string;
}

/** Cloud's Private Cloud panel, with the cloud-provider options under it. */
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
	/** Platforms only: tile fill (the mark is knocked out white) and button colour. */
	badgeFill?: string;
	/** Icon on the primary button. */
	cornerIcon?: string;
	/** Primary button. Cloud has none: its regions are the way in. */
	primary?: InstallLink;
	/** Text links beside the button: pricing, product page. */
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

/** One sign-up per Cloud region; returning users sign in from the header. */
const regions: InstallRegion[] = CLOUD_REGIONS.map((r) => ({
	id: r.id,
	name: r.name,
	note: REGION_NOTES[r.id],
	signup: `https://${r.host}/signup`,
}));

/** Self-hosted install guides for each cloud provider, listed under Private Cloud. */
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
		// "Cluster setup" links to the guide index, which lists the cluster guides.
		options: [
			{
				title: 'On your servers',
				items: [
					{ label: 'Ubuntu Server', logo: logo('ubuntu.svg'), href: '/docs/installation/ubuntu/' },
					{ label: 'CentOS / RHEL Server', logo: logo('cenos-rhel.svg'), href: '/docs/installation/rhel/' },
					{ label: 'Raspberry Pi', logo: logo('raspberry-pi.svg'), href: '/docs/installation/rpi/' },
					{
						label: 'Docker',
						note: 'Linux / macOS',
						logo: logo('docker-linux-mac.svg'),
						href: '/docs/installation/docker/',
					},
					{
						label: 'Docker',
						note: 'Windows',
						logo: logo('docker-windows.svg'),
						href: '/docs/installation/docker-windows/',
					},
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
					{ label: 'CentOS / RHEL Server', logo: logo('cenos-rhel.svg'), href: '/docs/edge/installation/rhel/' },
					{
						label: 'Docker',
						note: 'Linux / macOS',
						logo: logo('docker-linux-mac.svg'),
						href: '/docs/edge/installation/docker/',
					},
					{
						label: 'Docker',
						note: 'Windows',
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
					{ label: 'CentOS / RHEL Server', logo: logo('cenos-rhel.svg'), href: '/docs/trendz/installation/rhel/' },
					{
						label: 'Docker',
						note: 'Linux / macOS',
						logo: logo('docker-linux-mac.svg'),
						href: '/docs/trendz/installation/docker/',
					},
					{
						label: 'Docker',
						note: 'Windows',
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
		options: [
			{
				title: 'Install on',
				items: [
					{
						label: 'Docker',
						note: 'Linux / macOS',
						logo: logo('docker-linux-mac.svg'),
						href: '/docs/iot-gateway/installation/docker-installation/',
					},
					{
						label: 'Docker',
						note: 'Windows',
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
