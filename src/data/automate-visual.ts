/**
 * Content for the Automate switch: the "Turn IoT data into action" row as three drawings on one
 * skeleton, chosen by a switch over the row's media.
 *
 * `normalize-visual.ts` has said since it was written that this row makes two arguments — "any
 * protocol, one model" and "then act on it" — and that the second needed a picture of its own. These
 * are that picture, split in the order data actually moves: NORMALIZE (the shipped `NormalizeSeries`,
 * untouched), FILTER (a day of door openings, and the one that becomes an alarm) and NOTIFY (that one
 * alarm, and everyone it reaches). The row's paragraph already names all three, so it stays as it is.
 *
 * ONE FREEZER, ALL THE WAY DOWN. The AI demo above asks to "email the manager if a freezer stays
 * open" and creates a CRITICAL alarm rule called ‘Freezer Door Open’ that fires past five minutes.
 * Filter and Notify are that rule running: the same name, the same threshold, the same manager. Keep
 * them in step with `AI_ASSISTANT_DEMO` if either changes.
 */

export type AutomateStageId = 'normalize' | 'filter' | 'notify';

export interface AutomateStage {
	id: AutomateStageId;
	/** The switch's label. One word: three share a pill that has to fit a phone. */
	label: string;
	/** A Tabler name, drawn before the label. */
	icon: string;
}

export const AUTOMATE_STAGES: AutomateStage[] = [
	{
		id: 'normalize',
		label: 'Normalize',
		icon: 'tabler:transform',
	},
	{
		id: 'filter',
		label: 'Filter',
		icon: 'tabler:filter',
	},
	{
		id: 'notify',
		label: 'Notify',
		icon: 'tabler:bell-ringing',
	},
];

/** Names the switch for assistive tech: what is being chosen between. */
export const AUTOMATE_SWITCH_LABEL = 'What the platform does with your data';

/** The alarm both drawings are about: the one the AI demo creates. */
export const FREEZER_ALARM = {
	severity: 'CRITICAL',
	name: 'Freezer Door Open',
	source: 'Freezer 3',
	/** The rule's threshold, in seconds. Above it, an opening becomes an alarm. */
	over: 5 * 60,
};

// --- filter -----------------------------------------------------------------------------------

export const FILTER_STAGES = { in: 'Door openings', out: 'One alarm' };

/** What the node says it does. Visible, unlike Normalize's: the rule IS the argument here. */
export const FILTER_NODE = { label: 'Over 5 min' };

/**
 * A morning's openings on one freezer door, in seconds.
 *
 * Which ones pass is DERIVED from `FREEZER_ALARM.over`, never marked by hand, so the drawing cannot
 * highlight an opening the rule would have let go. Three short ones and one long one, the long one
 * third, so the path that survives is not the obvious top or bottom curve.
 */
export const DOOR_OPENINGS = [42, 75, 450, 55];

export const passes = (seconds: number) => seconds > FREEZER_ALARM.over;

/**
 * The chart direction (`FilterChart`, a candidate, 2026-09-27): the morning so far as a live dashboard
 * line — six short openings, then the one still open, the same long opening (7:30) the flow keeps and
 * the only one over the limit, so Notify's SMS still quotes it. The last is live: the chart runs up
 * to "now" while that door stands open, and the rest of the morning is still to come.
 */
export const DOOR_MORNING = [36, 64, 28, 52, 41, 30, 450];

/** What the chart's own header says, and its time axis: a morning, 06:00 to 12:00. */
export const FILTER_CHART = {
	title: `${FREEZER_ALARM.source} · Door open time`,
	from: 6 * 60,
	to: 12 * 60,
	/** The alarm as the product lists one, under its name. */
	status: 'Active · Unacknowledged',
};

if (DOOR_MORNING.filter(passes).join() !== DOOR_OPENINGS.filter(passes).join()) {
	throw new Error(
		'automate-visual: the chart keeps a different opening from the flow, so Notify would disagree with it'
	);
}

/** `m:ss`, the way a door sensor's open time reads in a dashboard table. */
export const openFor = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

// --- notify -----------------------------------------------------------------------------------

export const NOTIFY_STAGES = { in: 'One alarm', out: 'Delivered to' };

export const NOTIFY_NODE = { label: 'Notify' };

export interface NotifyMessage {
	/** Tabler or Simple Icons names; two for a destination two products share. */
	icons: string[];
	/** The channel, for the accessible name: the glyph alone says it to a sighted reader. */
	channel: string;
	/** The message as it arrives — a subject, a text, a post. One line at 15 units in a 200-unit card. */
	text: string;
	/** Who or where it lands, under the message. */
	to: string;
}

/** The survivor Filter lets through, so the SMS cannot quote an open time Filter did not keep. */
const KEPT = DOOR_OPENINGS.find(passes);
if (KEPT === undefined) {
	throw new Error('automate-visual: no door opening passes the rule, so there is no alarm to deliver');
}

/**
 * The one alarm, as the four messages it becomes. Each card shows what arrived rather than a
 * channel's name, so the drawing says "this is what your people get".
 *
 * ONLY WHAT THE PLATFORM ACTUALLY DOES. Email, SMS and Slack are three of the Notification Center's
 * delivery methods (`user-guide/notifications` lists Web, Mobile app, SMS, Email, Slack and
 * Microsoft Teams, and has a recipe for each on an alarm), and each text is what that channel would
 * carry for the AI demo's rule. The fourth is the row's "your CRM": Salesforce and HubSpot are the
 * two CRMs the ThingsBoard n8n node's docs name for CRM sync (`user-guide/n8n-node`), which is how an
 * alarm reaches one without writing an integration — so the card says "via n8n" rather than
 * implying a built-in connector. The manager is the AI demo's store manager.
 */
export const NOTIFY_MESSAGES: NotifyMessage[] = [
	{ icons: ['tabler:mail'], channel: 'Email', text: FREEZER_ALARM.name, to: 'Store manager' },
	{
		icons: ['tabler:device-mobile-message'],
		channel: 'SMS',
		text: `${FREEZER_ALARM.source} · open ${openFor(KEPT)}`,
		to: 'On-call tech',
	},
	{
		icons: ['simple-icons:slack'],
		channel: 'Slack',
		text: `${FREEZER_ALARM.severity} · ${FREEZER_ALARM.source}`,
		to: '#cold-chain',
	},
	{ icons: ['simple-icons:salesforce', 'simple-icons:hubspot'], channel: 'CRM', text: 'Ticket opened', to: 'via n8n' },
];
