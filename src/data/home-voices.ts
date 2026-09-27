/**
 * Customer voices: the numbers, then six short quotes, before the closing CTA — the page's only
 * proof that is a person rather than a logo.
 *
 * SIX, AND SHORT: a line each rather than a paragraph, from six different kinds of business, so they
 * add up instead of repeating — the build-or-buy call (Nettra, infrastructure monitoring), a solution
 * provider's reuse (Kiotera), any device (Circutor, metering), a carrier's speed (T-Mobile), a
 * hardware maker's time to market (TEKTELIC), and eighteen months saved (Enviroeye, agriculture).
 * The wireframe had nine; co.met, Farinia and Vodafone went, the last because its words are about
 * our development services rather than the platform. Two are ACCENTS, set larger on the bookends'
 * navy, in opposite corners of the grid so the eye crosses it: the build-or-buy call opens it and
 * the 18 months close it.
 *
 * THE PULL QUOTES ARE VERBATIM. Each is a substring of that customer's own words in
 * `clients-feedback`, and this module checks it as it loads — a paraphrase, a fixed typo or a
 * capital changed fails the build. So "Thingsboard" stays as Nettra wrote it. The context lines are
 * ours, and each says only what the same entry says: its tagline or its text, never a number it does
 * not contain.
 *
 * Nettra, T-Mobile and Enviroeye have no headshot in the feedback data and fall back to an initial,
 * as the feedback page does, rather than a stock silhouette.
 */

import { allFeedbackEntries } from '@data/clients-feedback';
import type { FeedbackEntry } from '@data/clients-feedback/types';
import { GITHUB_STARS, GITHUB_STARS_AS_OF } from '@data/github-stars';

interface VoicePick {
	/** The entry's id in `clients-feedback`. */
	id: string;
	/** Verbatim from the entry's text. */
	pull: string;
	/** Where the pull cuts into its sentence, so the card marks the cut with an ellipsis. */
	cut: { start: boolean; end: boolean };
	context: string;
	/** Set larger, on the bookends' navy. Two at most, or it stops being an accent. */
	accent?: boolean;
}

const PICKS: VoicePick[] = [
	{
		id: 'nettra',
		pull: 'Switching to Thingsboard was a no-brainer',
		cut: { start: false, end: false },
		context:
			'Six months into building its own platform, it found every feature it had built, and the next ones, already there.',
		accent: true,
	},
	{
		id: 'kiotera',
		pull: 'implement IoT-Solutions in a matter of days',
		cut: { start: true, end: false },
		context: 'Reuses the same gateways, sensors and rule chains as modules across its customers’ projects.',
	},
	{
		id: 'circutor',
		pull: 'accommodate most of our products in a common data platform',
		cut: { start: true, end: false },
		context: 'Forty years of energy and metering devices, proprietary protocols included, on one platform.',
	},
	{
		id: 'tmobile',
		pull: 'done in nearly no time',
		cut: { start: true, end: false },
		context: 'Proofs of concept and prototypes for NB-IoT and Sigfox devices that arrive with no app.',
	},
	{
		id: 'tektelic',
		pull: 'dramatically reduce time to market',
		cut: { start: true, end: true },
		context: 'Completed its LoRaWAN gateways and sensors into end-to-end applications for its clients.',
	},
	{
		id: 'enviroeye',
		pull: 'bring our platform to market a full 18 months sooner',
		cut: { start: true, end: true },
		context: 'Built VineHub, a vineyard management platform, on ThingsBoard instead of its own backend.',
		accent: true,
	},
];

export interface HomeVoice {
	quote: string;
	context: string;
	author: string;
	position?: string;
	company: string;
	/** The company's logo, as the clients-feedback page shows it, with its drawn size for the ratio. */
	logo: { src: string; width?: number; height?: number };
	image?: string;
	/** The case study, when the customer has one. */
	href?: string;
	accent: boolean;
}

const find = (id: string): FeedbackEntry => {
	const entry = allFeedbackEntries.find((e) => e.id === id);
	if (!entry) throw new Error(`home-voices: no feedback entry "${id}"`);
	return entry;
};

export const HOME_VOICES: HomeVoice[] = PICKS.map((p) => {
	const entry = find(p.id);
	if (!entry.text.some((paragraph) => paragraph.includes(p.pull))) {
		throw new Error(`home-voices: the quote for "${p.id}" is not verbatim from its feedback`);
	}
	return {
		quote: `${p.cut.start ? '…' : ''}${p.pull}${p.cut.end ? '…' : ''}`,
		context: p.context,
		author: entry.author,
		position: entry.position,
		// "T-Mobile Czech Republic a.s." and "TEKTELIC Communications Inc." are the legal names the
		// feedback page prints; a card this small says the name people know.
		company: entry.companyName.replace(/ (a\.s\.|Communications Inc\.)$/, ''),
		logo: { src: entry.companyImage, width: entry.companyImageWidth, height: entry.companyImageHeight },
		image: entry.authorImage,
		href: entry.caseStudySlug ? `/case-studies/${entry.caseStudySlug}/` : undefined,
		accent: !!p.accent,
	};
});

if (HOME_VOICES.filter((v) => v.accent).length > 2) {
	throw new Error('home-voices: more than two accents, and it stops being an accent');
}

// --- the numbers ------------------------------------------------------------------------------

export interface VoiceStat {
	value: string;
	label: string;
	/**
	 * Where the figure comes from. ABSENT MEANS NOBODY HAS SOURCED IT: the two without one are the
	 * old wireframe's (its "Trusted IoT deployments worldwide" band), and nothing in this repo or in
	 * thingsboard.one backs them. Confirm both before this ships, or swap them for figures that are.
	 */
	source?: string;
}

const PLATFORM_STARS = GITHUB_STARS['thingsboard/thingsboard'];
/** "ThingsBoard started in 2016", as the Company page's history puts it. */
const STARTED = 2016;

export const VOICES_STATS: VoiceStat[] = [
	{ value: '5M+', label: 'devices connected' },
	// Rounded DOWN to the thousand, like the header's button rounds to the hundred: a count that can
	// only read low. The wireframe's "20K+" predates the snapshot.
	{
		value: `${Math.floor(PLATFORM_STARS / 1000)}K+`,
		label: 'GitHub stars',
		source: `the header's GitHub button snapshot, ${PLATFORM_STARS} on ${GITHUB_STARS_AS_OF}`,
	},
	{ value: '100+', label: 'countries with deployments' },
	// A plain 10, where the wireframe said "10+": 2016 to 2026 is ten, not more.
	{
		value: String(new Date().getFullYear() - STARTED),
		label: 'years in production',
		source: 'the Company page: "ThingsBoard started in 2016"',
	},
];

/**
 * "Proven in production", which covers both halves of the section — the numbers and the people —
 * where "In production, in their words" named only the quotes.
 *
 * NO BADGE, AND NOT A SECTION COLOUR. This is not a capability, it is the page closing its case, and
 * it sits straight above the closing CTA. So it takes the BOOKENDS' colour, as the trust band does
 * above Products: the indigo that `#121425` is made from, light on the ground and dark on the two
 * accents. It wore Scale's green for a pass, which fought the navy under it.
 */
export const VOICES_COPY = {
	title: 'Proven in production',
	lede: 'Every one of these is a system someone’s business runs on.',
	all: { text: 'Read all client feedback', href: '/clients-feedback/' },
	/** Names the numbers for assistive tech: a list of four figures says nothing on its own. */
	statsLabel: 'ThingsBoard in numbers',
	/** Names the phone's swipeable strip of quotes. */
	stripLabel: 'Customer quotes',
};
