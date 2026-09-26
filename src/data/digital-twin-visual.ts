/**
 * Content for the second key visual: a physical asset mirrored by its digital twin.
 *
 * Taken from the design and held here as data rather than baked into a component, so the
 * composition can be drafted against it and the copy can move to a marketing page unchanged. Where
 * the flow visual has cases that rotate, this one has a single asset — the point is the mirror, not
 * the variety.
 */

export const DIGITAL_TWIN_COPY = {
	title: 'Model your real world',
	body: 'Organize devices, assets, customers, and hierarchies that match your case. Control data, permissions, and processing at every level — site, machine, or single sensor. Aggregate, transform, and act on data wherever it makes sense.',
	link: { text: 'Digital twin model', href: '/docs/pe/concepts/digital-twin-model/' },
	// #7a37e7, a dE 1.3 nudge off #7b3fe4 — same violet, brought onto the set's L* 53 and the brand's
	// chroma. It is worth knowing this hue is the GATEWAY's in `homeEcosystem`, which this row has
	// always borrowed; the normalisation does not change that, it just stops the two being identical.
	// `box-model`, the glyph the twin visual itself uses and the one the Model stage carries in the
	// platform overview — so the section, its drawing and its stage in the loop are one mark. It was
	// `binary-tree`, which the AUTOMATE stage also uses; that glyph now belongs to the normalize
	// section, whose stage Automate is.
	badge: { icon: 'tabler:box-model', color: '#7a37e7' },
};

/** The two halves, as the design labels them. */
export const DIGITAL_TWIN_STAGES = { physical: 'Physical world', twin: 'Digital twin' };

/** A device on a unit: what it is called and the glyph that stands for it. */
export interface UnitDevice {
	label: string;
	icon: string;
}

/** A physical unit: an asset, its glyph, and the devices attached to it. */
export interface UnitSpec {
	name: string;
	icon: string;
	devices: UnitDevice[];
}

/** The real thing in the composition: the cold storage unit and what is bolted to it. */
export const PHYSICAL_ASSET = {
	name: 'Cold storage unit',
	icon: 'tabler:cpu',
	kind: 'asset',
	id: 'CS-04',
	/** Where it sits in the customer's hierarchy, root first. Drawn as a frame around the unit by the nested variant. */
	path: ['Warehouse 3', 'Zone B'],
	devices: [
		{ label: 'Temp probe', icon: 'tabler:temperature' },
		{ label: 'Door sensor', icon: 'tabler:door' },
		{ label: 'Compressor', icon: 'tabler:engine' },
		{ label: 'Power meter', icon: 'tabler:bolt' },
	],
} satisfies UnitSpec & Record<string, unknown>;

/**
 * Other units the composition could hold, each with the devices a real one carries. Kept to three
 * or four devices so any of them sits against the twin the way the cold storage unit does. Shown
 * in the sandbox gallery without a twin; the twin's rows would change with the unit.
 */
export const UNIT_GALLERY: UnitSpec[] = [
	{
		name: 'Solar array',
		icon: 'tabler:solar-panel',
		devices: [
			{ label: 'Inverter', icon: 'tabler:bolt' },
			{ label: 'Irradiance sensor', icon: 'tabler:sun' },
			{ label: 'String meter', icon: 'tabler:gauge' },
		],
	},
	{
		name: 'Pump station',
		icon: 'tabler:droplet',
		devices: [
			{ label: 'Pump', icon: 'tabler:engine' },
			{ label: 'Flow meter', icon: 'tabler:wave-sine' },
			{ label: 'Pressure sensor', icon: 'tabler:gauge' },
			{ label: 'Level sensor', icon: 'tabler:ruler-measure' },
		],
	},
	{
		name: 'Rooftop HVAC',
		icon: 'tabler:wind',
		devices: [
			{ label: 'Thermostat', icon: 'tabler:temperature' },
			{ label: 'Supply fan', icon: 'tabler:propeller' },
			{ label: 'Compressor', icon: 'tabler:engine' },
			{ label: 'Filter sensor', icon: 'tabler:filter' },
		],
	},
	{
		name: 'Delivery truck',
		icon: 'tabler:truck',
		devices: [
			{ label: 'GPS tracker', icon: 'tabler:map-pin' },
			{ label: 'Fuel sensor', icon: 'tabler:gauge' },
			{ label: 'Cargo temp', icon: 'tabler:temperature' },
			{ label: 'Door sensor', icon: 'tabler:door' },
		],
	},
	{
		name: 'Production line',
		icon: 'tabler:building-factory-2',
		devices: [
			{ label: 'Spindle motor', icon: 'tabler:engine' },
			{ label: 'Vibration sensor', icon: 'tabler:activity' },
			{ label: 'Power meter', icon: 'tabler:bolt' },
		],
	},
	{
		name: 'EV charger',
		icon: 'tabler:charging-pile',
		devices: [
			{ label: 'Charge point', icon: 'tabler:plug' },
			{ label: 'Energy meter', icon: 'tabler:bolt' },
			{ label: 'Battery state', icon: 'tabler:battery-charging' },
			{ label: 'Connector lock', icon: 'tabler:lock' },
		],
	},
];

/**
 * Its twin: the same asset as the platform sees it. Values are the latest state; the alarm row
 * is the one that carries colour, and it is the platform's link colour, not a severity — "none"
 * is a good state.
 */
export const TWIN = {
	name: 'CS-04 twin',
	attributes: [
		{ key: 'temperature', value: '−18.4 °C' },
		{ key: 'door', value: 'closed' },
		{ key: 'duty cycle', value: '62 %' },
		{ key: 'alarm', value: 'none', accent: true },
	],
};

/** What crosses between the halves, and which way. */
export const TWIN_FLOWS = [
	{ label: 'telemetry', from: 'physical', to: 'twin' },
	{ label: 'commands', from: 'twin', to: 'physical' },
] as const;

/**
 * The twin's history: today so far. Half-hourly samples from midnight up to `now`, so the line
 * fills that share of the box and the rest stays empty — the empty part is what says where in the
 * day we are. Domain is the freezer's working band — the axis reads -16 / -18 / -20 — rather than
 * the series' own extent, for the same reason the flow visual's axes are explicit.
 *
 * Precalculated, deterministically: a slow cycle over the day, a faster wobble, and a defrost bump
 * every six hours, which is the shape a freezer actually draws.
 */
const TAU = Math.PI * 2;
const HOURS = 24;
const NOW_H = 16;
const STEP_H = 0.5;

export const TWIN_HISTORY = {
	// Lowercase like the twin's attribute keys it sits beneath.
	title: 'temperature, last 24 h',
	unit: '°C',
	domain: [-20, -16] as [number, number],
	ticks: [-16, -18, -20],
	/** Only the day's ends: the line's own stopping point marks the present. */
	labels: ['00:00', '24:00'],
	hours: HOURS,
	now: NOW_H,
	/** How many samples a full day would hold; the series spans this share of the box. */
	pointsPerDay: HOURS / STEP_H + 1,
	series: Array.from({ length: NOW_H / STEP_H + 1 }, (_, i) => {
		const t = i * STEP_H;
		const v =
			-18.3 +
			0.9 * Math.sin((TAU * t) / 9 + 0.6) +
			0.3 * Math.sin((TAU * t) / 2.3) +
			1.1 * Math.pow(Math.max(0, Math.sin((TAU * t) / 6)), 6);
		return Math.round(v * 100) / 100;
	}),
};
