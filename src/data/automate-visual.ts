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
 * open" and creates a CRITICAL alarm rule called ‘Freezer Door Open’ that fires past three minutes.
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
	over: 3 * 60,
};

// --- filter -----------------------------------------------------------------------------------

export const FILTER_STAGES = { in: 'Door openings', out: 'One alarm' };

/** What the node says it does. Visible, unlike Normalize's: the rule IS the argument here. */
export const FILTER_NODE = { label: 'Over 3 min' };

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
 * The chart-and-feed drawings (`FilterChart` and `NotifyFeed`, the homepage's since 2026-09-27), which draw
 * the rule without the mark. Filter is the live minute of the one opening that runs over: the door
 * opened at 08:38:00, so its open time reaches the 3:00 limit at 08:41:00, which is when the alarm
 * fires and the time both drawings print on it.
 */
export const FILTER_CHART = {
	title: `${FREEZER_ALARM.source} · Door open time`,
	/** When the door opened, in seconds since midnight. */
	openedAt: 8 * 3600 + 38 * 60,
	/**
	 * The chart's default limit: the rule's own, 3:00 (`FREEZER_ALARM.over`, which the AI demo sets
	 * up). In the chart it is a handle anyone can move.
	 */
	limit: FREEZER_ALARM.over,
	/** The alarm as the product lists one, under its name. */
	status: 'Active · Unacknowledged',
};

/**
 * The morning's other openings on the same door, for the chart: minutes after 06:00 and how long the
 * door stood open, in seconds. All short — the argument is that the rule leaves these alone. The
 * one that runs over is the live one, opened at `openedAt`; asserted below to be the only one over.
 */
export const FILTER_HISTORY: { at: number; open: number }[] = [
	{ at: 92, open: 42 },
	{ at: 103, open: 64 },
	{ at: 114, open: 35 },
	{ at: 124, open: 90 },
	{ at: 134, open: 48 },
	{ at: 146, open: 72 },
];

if (FILTER_HISTORY.some((o) => o.open > FILTER_CHART.limit)) {
	throw new Error('automate-visual: a past opening passes the rule, so the chart would show two alarms');
}

/** `hh:mm:ss` from seconds since midnight, as a live chart's clock axis reads. */
export const clock = (seconds: number) =>
	[Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60]
		.map((n) => String(n).padStart(2, '0'))
		.join(':');

/** The moment the rule fires: the door's opening plus the chart and feed's limit. */
export const ALARM_FIRED_AT = clock(FILTER_CHART.openedAt + FILTER_CHART.limit);

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

/**
 * The same four messages for `NotifyFeed`, shown one at a time and large enough to
 * carry a second line. The SMS quotes the limit rather than the flow's 7:30: in the chart direction
 * the alarm fires at the limit, and that is when the text goes out.
 */
export interface NotifyFeedMessage extends NotifyMessage {
	detail: string;
}

const FEED_DETAIL: Record<string, string> = {
	Email: `A critical alarm on ${FREEZER_ALARM.source}, raised at ${ALARM_FIRED_AT}.`,
	SMS: `${FREEZER_ALARM.name} · ${FREEZER_ALARM.severity.toLowerCase()}`,
	Slack: `${FREEZER_ALARM.name}, raised at ${ALARM_FIRED_AT}`,
	CRM: `${FREEZER_ALARM.name} · ${FREEZER_ALARM.source}`,
};

export const NOTIFY_FEED: NotifyFeedMessage[] = NOTIFY_MESSAGES.map((m) => ({
	...m,
	text: m.channel === 'SMS' ? `${FREEZER_ALARM.source} · open over ${openFor(FILTER_CHART.limit)}` : m.text,
	detail: FEED_DETAIL[m.channel] ?? '',
}));
