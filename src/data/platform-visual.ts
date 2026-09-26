/**
 * Content for the platform overview: your equipment on one side, your people on the other, and
 * what runs between them in the middle.
 *
 * Adapted from a standalone HTML sandbox that carried two arrow layouts — arrows inline in the
 * gutters, and arrows routed through bands above and below the platform ("in & out"). Only the
 * second one is here. The inline version put all four runs on the same horizontal line as the
 * cards, which made the two directions read as one two-way pipe; separating them into an upper
 * band and a lower band is what turns the picture into a loop, and the loop is the argument.
 *
 * Four runs, clockwise: telemetry comes in from the equipment, views and alerts go out to the
 * people, actions come back in from the people, commands and updates go back out to the equipment.
 * Every run has a named source and a named destination, so the colour of a line is never a
 * decoration — it is the zone the line starts in.
 *
 * The icons are Tabler names, resolved by `astro-icon` at build time. The sandbox they came from
 * shipped a 40 KB inlined icon map and a picker for choosing between a dozen candidates per slot;
 * the picking is done, so what survives is the chosen name.
 */

import { CONNECT_COPY } from '@data/connect-visual';
import { DIGITAL_TWIN_COPY } from '@data/digital-twin-visual';
import { NORMALIZE_COPY } from '@data/normalize-visual';
import { SOLUTION_COPY } from '@data/solution-flow';

/** The row's copy. One claim, and the diagram is the evidence for it. */
export const PLATFORM_COPY = {
	title: 'Your equipment, your people, one platform between them',
	// "and nothing to buy as an add-on" was here and is gone, because it is not true. `homeEcosystem`
	// marks Edge and Trendz `addOn: true`, and `index.astro` renders that badge on both — roughly a
	// hundred lines below this section on the same page. What IS true is the half that is left: the
	// four steps of the loop are one product, so there is nothing to join up between them.
	body: 'Connecting what you already run is the first stage. The rest of the loop runs in one place.',
	link: { text: 'See what the platform covers', href: '/products/thingsboard-pe/' },
	// The brand's own, and by elimination: the four stages inside this visual already carry the
	// four section badges below (see STAGES), so the umbrella cannot take any of them.
	// #006bc7, the Trendz blue's hue — NOT `$color-brand` any more. It was the brand indigo, which made
	// it dE 0.0 from the solution row's badge, and put the same colour on the app squircle, the Operate
	// stage and the people zone inside this visual. A slot of its own is the whole point.
	badge: { icon: 'tabler:topology-star-3', color: '#006bc7' },
};

/**
 * The homepage's centred section: the statement between the hero and the five rows, with
 * `PlatformRaised` under it.
 *
 * It was sandbox-only and is not any more — `index.astro` renders this now, in place of the
 * statement that used to be there. That displaced `HOME_INTRO`, which was the published wording, so
 * the old copy is worth knowing about: it is in the commit that deleted `data/home-intro.ts` and one
 * revert away if this section does not survive review.
 *
 * The heading drops the link. "ThingsBoard" is the first word of a sentence here, and a link inside
 * it is a second thing to look at in the largest line on the page — which is also why the homepage
 * paints its own wordmark black rather than blue.
 *
 * The lede does NOT describe the drawing. The first draft did — three sources, four steps, three
 * audiences, both directions — and it was the caption to a picture the reader is already looking at,
 * which is the one job a lede under a diagram does not have. The drawing says what the parts are;
 * the words have to say why any of it is worth having.
 *
 * THREE LEDES HAVE BEEN CUT HERE. None of them comes back:
 *   1. It described the drawing — three sources, four steps, three audiences, both directions — and
 *      was the caption to a picture the reader is already looking at, which is the one job a lede
 *      under a diagram does not have.
 *   2. It claimed "nothing to integrate", which Connect being the first stage and `CONNECT_COPY` one
 *      section below both disprove; and "nothing to buy as an add-on", which `homeEcosystem`
 *      disproves with `addOn: true` on Edge and Trendz a hundred lines down this same page.
 *   3. It called Connect / Model / Automate / Operate "four products". They are four things the
 *      platform DOES. Never count them, never list them as parts, and never reach for the
 *      "X is A, not B" shape — it answers an accusation the reader has not made.
 *
 * What is here instead: where the data comes from, what comes out of it, and whose brand it carries
 * — which is the drawing's own left-to-right order, without captioning it. The first sentence takes
 * the left zone's own scope (`PLATFORM_ZONES`, "the equipment and systems you already run"), so
 * Connect stays real work. The second takes `homeFeatures`' white-labelling line — "Ship it under
 * your own brand" — and names the two readers the page is for: the operators who work in it, and the
 * customers an integrator ships it to.
 *
 * It does not answer the "deploy, and scale" two thirds of the heading, deliberately. The products
 * band ("Fully managed SaaS" / "Deployed on your infrastructure") and the Scale row answer both
 * within two screens, and the tested extension — "Run it on our cloud or yours." — cost a third line
 * on desktop with a stub, and a fifth line on a 375px phone.
 *
 * Measured on the live paragraph, Ubuntu 400 16px/24px: 2 lines at the 587px desktop measure, 4 at
 * the 335px phone column. The lede it replaced set 4 and 7.
 *
 * DO NOT put the broker in any parts list here. TBMQ is a separate product on this same page, and
 * `homeEcosystem` has it picking up where ThingsBoard's MQTT transport stops — so a one-platform
 * list containing it is disprovable by scrolling.
 *
 * Nothing here is a competitive claim either — "fewer products than the alternatives" would need a
 * number this repo does not have.
 */
export const PLATFORM_SECTION_COPY = {
	title: 'Build, deploy, and scale IoT solutions',
	description:
		'Data comes in from the equipment and systems you already run. ThingsBoard turns it into the apps your operators and customers use, under your own brand.',
};

/**
 * The middle column's lockup. Two fields rather than one string because the mark sits beside them
 * and the brand is set bolder than the product — "ThingsBoard Platform" as one string would have to
 * be split back apart in the component to do that.
 */
export const PLATFORM_CORE = { brand: 'ThingsBoard', product: 'Platform' };

export interface ZoneItem {
	icon: string;
	/** Two or three words. The note underneath carries the specifics. */
	name: string;
	note: string;
}

export interface Zone {
	/** Keys the run colours as well as the card, so a line and its origin cannot disagree. */
	id: 'equipment' | 'people';
	icon: string;
	title: string;
	items: ZoneItem[];
}

/**
 * The two outer zones. Three items each, deliberately: a fourth in either column makes that column
 * taller than the platform and the whole composition starts hanging off one side.
 */
export const PLATFORM_ZONES: Zone[] = [
	{
		id: 'equipment',
		icon: 'tabler:cpu',
		title: 'Your equipment and data',
		items: [
			{ icon: 'tabler:gauge', name: 'Machines and sensors', note: 'Telemetry and device state' },
			{ icon: 'tabler:server', name: 'Gateways and platforms', note: 'Existing IoT data sources' },
			{ icon: 'tabler:database', name: 'Business systems', note: 'Schedules, tariffs, context' },
		],
	},
	{
		id: 'people',
		icon: 'tabler:users-group',
		title: 'Your teams and customers',
		items: [
			{ icon: 'tabler:urgent', name: 'Operators and managers', note: 'Real-time status and KPIs' },
			{ icon: 'tabler:tool', name: 'Service teams', note: 'Act with equipment context' },
			{ icon: 'tabler:users', name: 'Customers', note: 'Branded live dashboards' },
		],
	},
];

export interface PlatformStage {
	icon: string;
	name: string;
	/**
	 * One per line in `PlatformClear`, where the note is set as a list rather than as prose.
	 *
	 * THREE, ALWAYS — the tuple type is the guard. A fourth item makes that stage a line taller than
	 * its three neighbours and the row is ragged again, which is the whole thing this fixed.
	 *
	 * THE BUDGET IS 107.5 UNITS, measured in the browser rather than computed: each item has to set
	 * on ONE line at u(14) in a stage column. "Calculated fields" is the longest at 105.4, with 2.1
	 * units to spare. Anything longer wraps, and one wrapped item undoes the arrangement.
	 */
	items: [string, string, string];
	/**
	 * The same three as prose, for `PlatformRaised` and `PlatformLoop` — sandbox cuts now that
	 * `index.astro` renders `PlatformClear`. Written out rather than joined from `items`: a join
	 * needs a lowercasing rule, which needs a special case for SCADA today and breaks on the next
	 * acronym. If those two cuts are ever deleted, this field goes with them.
	 */
	note: string;
	/**
	 * The stage's own hue, carried by its icon. Comes from the section's badge — see below.
	 *
	 * Read by `PlatformRaised`, where the card is white and the runs are grey, so the icons are the
	 * only colour in the picture. `PlatformLoop` ignores it and draws all four in the platform's
	 * indigo.
	 */
	accent: string;
}

/**
 * What the platform does, as four stages in the order you meet them. The names are verbs because
 * the column beside them is a list of nouns, and the contrast is what says one side is a thing you
 * own and the other is work being done to it.
 *
 * EACH STAGE IS CODED AS A SECTION OF THE PAGE. The colour comes from that section's badge, by
 * reference rather than by copy, so the two cannot drift apart:
 *
 *   Connect   -> the connect section        #007c7b
 *   Model     -> the digital twin section   #7a37e7
 *   Automate  -> the normalize section      #b44100
 *   Operate   -> the solution section       #3d50f5
 *
 * Whoever reads the diagram meets each of these four again further down, in the same colour. Two
 * things keep that from being the full legend it once claimed to be, and they are worth stating
 * rather than leaving to be discovered:
 *
 *   - THE ORDER DIFFERS. Left to right the stages run connect, twin, normalize, solution; top to
 *     bottom the page runs connect, solution, twin, normalize, scale. The mapping is by MEANING,
 *     which is right — Operate is dashboards, so it takes the solution row — but it means the two
 *     sequences only agree on the first one.
 *   - SCALE IS NOT HERE. The fifth row's green appears nowhere in this drawing, because there is no
 *     fifth stage for it to attach to.
 *
 * THE ICONS ARE THE STAGE'S OWN, not the section's badge glyph, and are the four the original
 * drawing chose. A section badge has to stand for a whole section in one mark; a stage here sits
 * above a verb and a line of detail and only has to stand for that. Where the two agree they are
 * the same glyph — Connect takes `plug-connected` either way — and where they do not, the stage
 * wins: `binary-tree` reads as branching logic beside "Rule chains", which is Automate's job, and
 * the twin's own box is what `DigitalTwin.astro` draws its unit with, which is Model's.
 */
export const PLATFORM_STAGES: PlatformStage[] = [
	{
		name: 'Connect',
		items: ['Devices', 'Gateways', 'Integrations'],
		note: 'Devices, gateways, integrations',
		icon: 'tabler:plug-connected',
		accent: CONNECT_COPY.badge.color,
	},
	{
		name: 'Model',
		items: ['Assets', 'Relations', 'Profiles'],
		note: 'Assets, relations, profiles',
		// The twin's own box — the glyph `DigitalTwin.astro` draws its unit with.
		icon: 'tabler:box-model',
		accent: DIGITAL_TWIN_COPY.badge.color,
	},
	{
		name: 'Automate',
		items: ['Calculated fields', 'Alarm rules', 'Rule chains'],
		note: 'Calculated fields, alarm rules, rule chains',
		icon: 'tabler:binary-tree',
		accent: NORMALIZE_COPY.badge.color,
	},
	{
		name: 'Operate',
		items: ['Dashboards', 'Reports', 'SCADA'],
		note: 'Dashboards, reports, SCADA',
		icon: 'tabler:chart-dots',
		accent: SOLUTION_COPY.badge.color,
	},
];

/**
 * Underneath the four stages, and not one of them: these are not a step you take, they are true of
 * every step. Hence the rule above the row rather than a fifth column.
 */
export const PLATFORM_FOUNDATIONS: { icon: string; label: string }[] = [
	{ icon: 'tabler:shield-check', label: 'Identity and access' },
	{ icon: 'tabler:database', label: 'Data and APIs' },
	{ icon: 'tabler:arrows-maximize', label: 'Scalable architecture' },
];

export interface PlatformRun {
	id: 'telemetry' | 'views' | 'actions' | 'commands';
	/** The zone the line leaves, which is also the zone whose colour it takes. */
	from: 'equipment' | 'platform' | 'people';
	to: 'equipment' | 'platform' | 'people';
	label: string;
}

/**
 * The four runs, in the order they go round: in at the top left, out at the top right, in at the
 * bottom right, out at the bottom left. Two words each at most — a run that needed a sentence
 * would be an argument the picture is not making.
 */
export const PLATFORM_RUNS: PlatformRun[] = [
	{ id: 'telemetry', from: 'equipment', to: 'platform', label: 'Telemetry' },
	{ id: 'views', from: 'platform', to: 'people', label: 'Views and alerts' },
	{ id: 'actions', from: 'people', to: 'platform', label: 'Actions' },
	// "Commands", not "Commands and updates". The longer form was the only label of the four that
	// needed two lines, and the "and updates" half was doing the least work in the picture — firmware
	// going down the same wire is a detail for the copy beside the visual, not for the wire.
	{ id: 'commands', from: 'platform', to: 'equipment', label: 'Commands' },
];
