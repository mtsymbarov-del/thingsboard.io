/**
 * The hero's switches: what `sections/hero.astro` can change about the homepage's hero, the footage it
 * can play, and the screens it shows the page at.
 *
 * EVERY SWITCH'S FIRST OPTION IS WHAT SHIPS. A page with no query is the homepage as it is, and the
 * address carries only what differs from it, so a link to a combination is short enough to paste.
 *
 * The candidates themselves are CSS, in `_hero-lab.scss`, keyed to `data-lab-<switch>` on `#hero`.
 * Footage and phone video are the two the stylesheet cannot do: the page's script swaps the `<video>`.
 */

export interface LabOption {
	value: string;
	label: string;
	/** What it does, for the button's tooltip. */
	note?: string;
}

export interface LabSwitch {
	key: string;
	label: string;
	/** Where it shows, when that is not everywhere. */
	scope?: string;
	options: LabOption[];
}

export interface Footage {
	id: string;
	label: string;
	note?: string;
	webm?: string;
	mp4?: string;
	/** The still shown until the video plays, and instead of it on a phone. None means black. */
	poster?: string;
}

/** A candidate is one entry here: it gets a button. The first is what ships. */
export const FOOTAGE: Footage[] = [
	{
		id: 'slider',
		label: 'Horizontal slider',
		note: 'On the homepage now: the dashboards tour · 1920×924, 30 fps, 40.5 s, the black fades cut so the loop is a hard cut · VP9 2.3 MB, H.264 3.3 MB',
		webm: '/videos/horizontal-slider.webm',
		mp4: '/videos/horizontal-slider.mp4',
		// Its exact first frame, 64 KB.
		poster: '/images/hero/horizontal-slider.webp',
	},
	{
		id: 'cover2',
		label: 'tb-cover2',
		note: 'The homepage before it · 1920×1080, 25 fps, 40 s · VP9 7.5 MB, H.264 12.8 MB',
		webm: 'https://video.thingsboard.io/tb-cover2.webm',
		mp4: 'https://video.thingsboard.io/tb-cover2.mp4',
		poster: '/images/hero/tb-cover.webp',
	},
	{
		id: 'cover',
		label: 'tb-cover',
		note: 'The earlier cut, still on the CDN. No poster of its own, so black until it plays',
		webm: 'https://video.thingsboard.io/tb-cover.webm',
		mp4: 'https://video.thingsboard.io/tb-cover.mp4',
	},
];

/** `footage=url` plays whatever address is pasted into the field beside the buttons. */
export const PASTED = 'url';

export const SWITCHES: LabSwitch[] = [
	{
		key: 'brand',
		label: 'Brand line',
		options: [
			{ value: 'now', label: 'As now', note: '“ThingsBoard” at the headline’s size, in half white' },
			{ value: 'none', label: 'Removed', note: 'The headline alone' },
			{ value: 'kicker', label: 'Kicker', note: '“ThingsBoard” as an eyebrow over the headline, still inside the H1' },
		],
	},
	{
		key: 'fill',
		label: 'Headline',
		options: [
			{ value: 'flat', label: 'Flat', note: 'As now: no gradient' },
			{ value: 'gradient', label: 'Gradient', note: 'White at the top, darker toward the bottom' },
		],
	},
	{
		key: 'fade',
		label: 'Edge fade',
		scope: 'side by side',
		options: [
			{ value: 'on', label: 'On', note: 'The footage reaches under the copy and fades in out of the black' },
			{ value: 'off', label: 'Off', note: 'The footage starts beside the copy, with a hard edge' },
		],
	},
	{
		key: 'footage',
		label: 'Footage',
		options: [
			...FOOTAGE.map((f) => ({ value: f.id, label: f.label, note: f.note })),
			{ value: PASTED, label: 'Pasted', note: 'The address in the field' },
		],
	},
	{
		key: 'phone',
		label: 'Phone',
		scope: 'under 600px',
		options: [
			{ value: 'panel', label: 'Panel below', note: 'The footage under the copy' },
			{ value: 'backdrop', label: 'Backdrop', note: 'The footage behind the copy, darkened, and the hero to the fold' },
		],
	},
	{
		key: 'motion',
		label: 'Phone video',
		scope: 'under 768px',
		options: [
			{ value: 'still', label: 'Still', note: 'Phones get the poster and never load the video' },
			{ value: 'video', label: 'Video', note: 'Phones play the footage too' },
		],
	},
];

export interface Screen {
	id: string;
	label: string;
	w: number;
	h: number;
	/** Shown until the reader picks their own set. */
	on?: boolean;
}

/**
 * Viewports, not devices: each height is what the browser leaves once its own bars are drawn, since
 * that is what the hero's `svh` fold is measured against. One per composition by default: side by
 * side, the two stacked copy columns, and the phone's single one.
 */
export const SCREENS: Screen[] = [
	{ id: 'wide', label: 'Wide', w: 1920, h: 960 },
	{ id: 'laptop', label: 'Laptop', w: 1440, h: 780, on: true },
	{ id: 'short', label: 'Short laptop', w: 1366, h: 645 },
	{ id: 'tablet', label: 'Tablet', w: 1024, h: 698 },
	{ id: 'upright', label: 'Tablet, upright', w: 820, h: 1110, on: true },
	{ id: 'sideways', label: 'Phone, sideways', w: 740, h: 360 },
	{ id: 'phone', label: 'Phone', w: 390, h: 664, on: true },
	{ id: 'small', label: 'Small phone', w: 360, h: 640 },
];

export const SCALES = [0.33, 0.5, 0.75, 1];
const DEFAULT_SCALE = 0.5;

export type View = 'screens' | 'window';

export interface LabState {
	/** Each switch's value, by key. */
	on: Record<string, string>;
	/** The pasted footage address. */
	src: string;
	screens: string[];
	scale: number;
	view: View;
}

const DEFAULT_SCREENS = SCREENS.filter((s) => s.on).map((s) => s.id);

/** The state an address describes. Anything missing or unknown is what ships. */
export function readState(query: URLSearchParams): LabState {
	const on: Record<string, string> = {};
	for (const s of SWITCHES) {
		const asked = query.get(s.key);
		on[s.key] = s.options.some((o) => o.value === asked) ? asked! : s.options[0].value;
	}
	const src = query.get('src')?.trim() ?? '';
	// Pasted footage with nothing pasted is the footage that ships.
	if (on.footage === PASTED && !src) on.footage = FOOTAGE[0].id;
	const screens = query
		.get('screens')
		?.split(',')
		.filter((id) => SCREENS.some((s) => s.id === id));
	const scale = Number(query.get('scale'));
	return {
		on,
		src,
		screens: screens ?? DEFAULT_SCREENS,
		scale: SCALES.includes(scale) ? scale : DEFAULT_SCALE,
		view: query.get('view') === 'window' ? 'window' : 'screens',
	};
}

/** The query for a state: only what differs from the defaults, in a fixed order. */
export function writeState(state: LabState): string {
	const query = new URLSearchParams();
	for (const s of SWITCHES) if (state.on[s.key] !== s.options[0].value) query.set(s.key, state.on[s.key]);
	if (state.src) query.set('src', state.src);
	if (state.screens.join() !== DEFAULT_SCREENS.join()) query.set('screens', state.screens.join());
	if (state.scale !== DEFAULT_SCALE) query.set('scale', String(state.scale));
	if (state.view !== 'screens') query.set('view', state.view);
	// Commas are legal in a query, and `screens=laptop,phone` is a link someone can read.
	const out = query.toString().replace(/%2C/g, ',');
	return out ? `?${out}` : '';
}
