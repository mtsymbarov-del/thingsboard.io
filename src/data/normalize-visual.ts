/**
 * Content for the third key visual: mixed payloads becoming one data model.
 *
 * The design pairs this with a second idea — a rule chain raising an alarm and notifying — under
 * one heading. They are two arguments ("any protocol, one model" and "then act on it") and each
 * needs its own picture, so they are being drafted separately; this file holds the first only.
 *
 * The copy below is the section's as written. It covers both halves, so it will need splitting
 * once the second visual exists — noted here rather than silently trimmed.
 */

export const NORMALIZE_COPY = {
	title: 'Turn IoT data into action',
	body: 'Normalize data from any device or protocol. Spot anomalies before they hit production. Filter signals from noise before alerts reach your team. Push data and notifications into your CRM, ERP, or other external app — your data, your workflows.',
	link: { text: 'Data processing concepts', href: '/docs/pe/concepts/data-processing/' },
	// #b44100, not #c2703a. The biggest move in the set — dE 10.6, and visibly deeper. The old one was
	// invented and was the outlier that made the row of badges look unsystematic: L* 62.6 against the
	// others' 52-56, and 3.70:1 with a white glyph, the only one under the text threshold. This is the
	// IoT Hub orange's hue at the set's weight, and 5.68:1.
	// `binary-tree`, the glyph the AUTOMATE stage carries in the platform overview — this section is
	// the one Automate is coded to, so they now say the same thing. It was `database-search`, which
	// described the mechanism rather than the section.
	badge: { icon: 'tabler:binary-tree', color: '#b44100' },
};

/** The two sides, as the design labels them. */
export const NORMALIZE_STAGES = { in: 'Mixed payloads', out: 'One data model' };

/** What the platform does in the middle. */
export const NORMALIZE_NODE = { label: 'Normalize' };

export type TokenRole = 'key' | 'punct' | 'num' | 'unit';

export interface PayloadToken {
	t: string;
	role: TokenRole;
}

/** How a device chooses to express a temperature. */
export type PayloadFormat = 'fahrenheit' | 'json-comma' | 'hex-register' | 'kelvin';

export interface NormalizeCase {
	/**
	 * The reading in °C, and the ONLY number stored.
	 *
	 * Both the raw payload and the normalised row are derived from it, which is what keeps the
	 * translation honest: there is no second value to fall out of step, so whatever the payload
	 * says, the row beside it is that same reading in °C by construction. An earlier draft stored
	 * the two sides separately and they were only equal because they had been typed that way.
	 */
	celsius: number;
	format: PayloadFormat;
	/** How far the reading may wander from its starting value while animating, in °C. */
	drift: number;
	/** What makes this payload awkward. Carried as a title attribute, not drawn. */
	note: string;
}

/**
 * Four devices, four incompatible ways of saying what they measured — and four different
 * measurements, because they are four devices in four places.
 *
 * The readings deliberately do NOT agree. Identical values on both sides read as a trick, and the
 * claim is not that every sensor reports the same temperature; it is that whatever they report,
 * and however they encode it, what you build on is one key, one unit and one shape.
 *
 * Drifts are small enough that no reading changes its digit count as it moves — a payload that
 * grew from `99.9` to `100.4` would push the rest of its line along, and the chips are a fixed
 * width.
 */
export const NORMALIZE_CASES: NormalizeCase[] = [
	{ celsius: 24.5, format: 'fahrenheit', drift: 1.4, note: 'Fahrenheit' },
	{ celsius: 21.8, format: 'json-comma', drift: 1.4, note: 'JSON, decimal comma' },
	{ celsius: 24, format: 'hex-register', drift: 3, note: 'raw register, whole degrees in hex' },
	{ celsius: 19.3, format: 'kelvin', drift: 1.4, note: 'Kelvin' },
];

/**
 * A register reports whole degrees, so its reading is snapped before anything is derived from it.
 *
 * Both sides go through this, which is the point: the payload shows `0x18` and the model shows
 * `24.0 °C`, and the model is not pretending to a precision the device never sent. Normalising a
 * format is not the same as inventing detail.
 */
export function canonical(c: NormalizeCase, celsius: number): number {
	return c.format === 'hex-register' ? Math.round(celsius) : celsius;
}

/**
 * The payload as the device would send it, split into syntax tokens.
 *
 * Tokens rather than one string so the component can colour each part; the numeric token is the
 * only one that changes as the reading moves, so it is the only one the client has to touch.
 */
/*
 * Spaces that belong to a payload are non-breaking, and that is not cosmetic.
 *
 * Each token renders as its own flex item, and a flex item's leading and trailing whitespace is
 * trimmed. That trimming is wanted — the template puts newlines and tabs inside every span, since
 * Prettier breaks the JSX across lines — but it took the real space with it, turning `"t": "21,8"`
 * into `"t":"21,8"` and ` °F` into `°F`.
 *
 * A non-breaking space survives both the collapsing and the trim, so the noise goes and the intent
 * stays. Setting `white-space: pre` instead would have kept the intent AND rendered every tab in
 * the template — it took the chips from 148px to over 3000px wide.
 */
export function payloadTokens(c: NormalizeCase, celsius = c.celsius): PayloadToken[] {
	const v = canonical(c, celsius);
	switch (c.format) {
		case 'fahrenheit':
			return [
				{ t: (v * (9 / 5) + 32).toFixed(1), role: 'num' },
				{ t: '\u00a0°F', role: 'unit' },
			];
		case 'json-comma':
			return [
				{ t: '"t"', role: 'key' },
				{ t: ':\u00a0', role: 'punct' },
				{ t: '"', role: 'punct' },
				// The comma is the awkward part: a decimal separator inside a quoted string.
				{ t: v.toFixed(1).replace('.', ','), role: 'num' },
				{ t: '"', role: 'punct' },
			];
		case 'hex-register':
			return [
				{ t: '0x', role: 'punct' },
				{ t: v.toString(16), role: 'num' },
			];
		case 'kelvin':
			return [
				{ t: 'TEMP_K', role: 'key' },
				{ t: '=', role: 'punct' },
				{ t: (v + 273.15).toFixed(1), role: 'num' },
			];
	}
}

/** The same reading as the model holds it: one key, one unit, one shape. */
export function readingText(c: NormalizeCase, celsius = c.celsius): string {
	return `${canonical(c, celsius).toFixed(1)} °C`;
}

/** The key every payload ends up under, whatever it called itself. */
export const NORMALIZE_KEY = 'temperature';

// --- history, for the candidate that plots each reading -----------------------------------------

/**
 * How many readings the model card carries behind the current one.
 *
 * Long enough that the line has a shape rather than a couple of kinks, short enough that at phone
 * scale each segment is still more than a pixel wide.
 */
export const NORMALIZE_WINDOW = 24;

/**
 * A bounded walk around the case's own starting reading — never a climb, never off its axis.
 *
 * Shared by the history the server seeds and the steps the client takes afterwards, so the line
 * that arrives after a tick is the same kind of line as the one that was there at first paint. The
 * random source is a parameter precisely so the server can pass a seeded one and stay deterministic.
 */
export function nextCelsius(c: NormalizeCase, current: number, rnd: () => number = Math.random): number {
	const step = c.drift * 0.5 * (rnd() - 0.5) * 2;
	return Math.min(c.celsius + c.drift, Math.max(c.celsius - c.drift, current + step));
}

/**
 * mulberry32, so a build is reproducible.
 *
 * `Math.random()` at render time would give every build a different set of lines — a diff in the
 * generated HTML on every deploy, and no way to tell a real change from noise.
 */
function prng(seed: number): () => number {
	let a = seed >>> 0;
	return () => {
		a = (a + 0x6d2b79f5) >>> 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/**
 * The readings this device has already sent, oldest first, ending at the one on the card.
 *
 * Seeded off the case's index and its own starting value, so the four lines differ from each other
 * and neither one changes when a neighbour is edited.
 */
export function seedSeries(c: NormalizeCase, i: number, n: number = NORMALIZE_WINDOW): number[] {
	const rnd = prng(0x9e3779b9 ^ Math.imul(i + 1, 2654435761) ^ Math.round(c.celsius * 10));
	const out = [c.celsius];
	while (out.length < n) out.push(nextCelsius(c, out[out.length - 1], rnd));
	return out;
}

/**
 * The band the line is plotted against: the walk's own bounds, not the window's min and max.
 *
 * Fitting each window to its own extremes would rescale the line every tick — a reading that had
 * not moved would appear to swing, because the frame moved under it. The walk cannot leave
 * `celsius ± drift`, so that IS the axis, and a still device draws a still line.
 */
export function sparkDomain(c: NormalizeCase): [number, number] {
	const pad = c.drift * 0.25;
	return [c.celsius - c.drift - pad, c.celsius + c.drift + pad];
}
