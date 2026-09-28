/**
 * The keyframes of `FilterChart`'s loop, for a given limit. One function for both sides: the page
 * renders the default limit's with it, and the chart's script rewrites them with it when the limit
 * is dragged, so the replay and the first play cannot be timed differently.
 *
 * THE CLIMB HAS ONE PACE: the live bar would take 6s to reach the top of its range (`peak`), and it
 * stops a few seconds of open time past the limit — the moment the rule has fired — rather than
 * climbing on. So a lower limit is a shorter climb and a shorter loop; a limit above the peak climbs
 * the full 6s and fires nothing. After it stops: the alarm holds, then the live bar and what it raised
 * fade, and the loop starts over.
 *
 * Built by concatenation, not template literals: the component also builds strings in its
 * frontmatter, and Astro's frontmatter scanner loses its place in nested template literals.
 */

export interface FilterChartGeo {
	/** The plot's floor and top, in the frame's units, and the open time at its top, in seconds. */
	base: number;
	top: number;
	yMax: number;
}

export interface FilterChartFrames {
	css: string;
	/** The climb as [loop %, open seconds], for the live reading. */
	climb: [number, number][];
	/** Where the live bar stops, in seconds. */
	end: number;
	/** The loop's length, in seconds. */
	loop: number;
	/** Whether the live bar crosses the limit at all. */
	fires: boolean;
}

/** Seconds: the pause before the climb, the full climb, the hold after it, the fade. */
const START = 0.3;
const FULL = 6;
const HOLD = 2.2;
const FADE = 0.35;
/** How far past the limit, in seconds of open time, the bar climbs before it stops. */
const OVER = 6;

export function filterChartFrames(uid: string, limit: number, peak: number, geo: FilterChartGeo): FilterChartFrames {
	const r2 = (v: number) => Math.round(v * 100) / 100;
	const yOf = (s: number) => geo.base - (s / geo.yMax) * (geo.base - geo.top);
	const rate = peak / FULL;
	const fires = limit < peak;
	const end = fires ? Math.min(peak, limit + OVER) : peak;
	const tStop = START + end / rate;
	const tCross = START + limit / rate;
	const tHold = tStop + HOLD;
	const loop = r2(tHold + FADE);
	const p = (t: number) => r2(Math.min(100, (t / loop) * 100));
	const liveTop = yOf(peak);
	const ring = (spread: number, alpha: number) =>
		'0 0 0 ' + spread + 'px color-mix(in srgb, var(--fch-alarm) ' + alpha + '%, transparent)';
	const k = (name: string, body: string) => '@keyframes ' + uid + '-' + name + ' { ' + body + ' } ';
	const at = (t: number) => p(tCross + t);

	let css =
		k(
			'grow',
			'0%, ' +
				p(START) +
				'% { transform: scaleY(0); } ' +
				p(tStop) +
				'%, 100% { transform: scaleY(' +
				r2(end / peak) +
				'); }'
		) +
		k(
			'ride',
			'0%, ' +
				p(START) +
				'% { transform: translateY(' +
				r2(yOf(0) - liveTop) +
				'px); } ' +
				p(tStop) +
				'%, 100% { transform: translateY(' +
				r2(yOf(end) - liveTop) +
				'px); }'
		) +
		k('fade', '0%, ' + p(tHold) + '% { opacity: 1; } 100% { opacity: 0; }');

	css += fires
		? k(
				'turn',
				'0%, ' + p(tCross) + '% { fill: var(--fch-hue); } ' + at(0.08) + '%, 100% { fill: var(--fch-alarm); }'
			) +
			k(
				'dot',
				'0%, ' +
					p(tCross) +
					'% { transform: scale(0); } ' +
					at(0.16) +
					'% { transform: scale(1.4); } ' +
					at(0.32) +
					'%, 100% { transform: scale(1); }'
			) +
			k('link', '0%, ' + at(0.08) + '% { transform: scaleX(0); } ' + at(0.4) + '%, 100% { transform: scaleX(1); }') +
			k(
				'alarm',
				'0%, ' +
					at(0.16) +
					'% { opacity: 0; transform: translateY(8px) scale(0.97); box-shadow: ' +
					ring(0, 0) +
					'; } ' +
					at(0.56) +
					'% { opacity: 1; transform: none; box-shadow: ' +
					ring(0, 0) +
					'; } ' +
					at(0.8) +
					'% { box-shadow: ' +
					ring(6, 20) +
					'; } ' +
					at(1.6) +
					'%, 100% { opacity: 1; transform: none; box-shadow: ' +
					ring(12, 0) +
					'; }'
			)
		: k('turn', '0%, 100% { fill: var(--fch-hue); }') +
			k('dot', '0%, 100% { transform: scale(0); }') +
			k('link', '0%, 100% { transform: scaleX(0); }') +
			k('alarm', '0%, 100% { opacity: 0; }');

	const on = "[data-fch='" + uid + "'] ";
	// The resting picture, outside the motion query: where the climb ends and whether it fired. The
	// animations override it; without motion (and after a drag's replay) it is what shows.
	css +=
		on +
		'.fch__live { transform: scaleY(' +
		r2(end / peak) +
		'); fill: ' +
		(fires ? 'var(--fch-alarm)' : 'var(--fch-hue)') +
		'; } ' +
		on +
		'.fch__reading { transform: translateY(' +
		r2(yOf(end) - liveTop) +
		'px); } ' +
		on +
		'.fch__readout { fill: ' +
		(fires ? 'var(--fch-alarm)' : 'var(--fch-hue)') +
		'; } ';
	const run = (name: string, ease = 'linear') => uid + '-' + name + ' var(--fch-loop) ' + ease + ' infinite';
	css +=
		'@media (prefers-reduced-motion: no-preference) { ' +
		on +
		'.fch__live { animation: ' +
		run('grow') +
		', ' +
		run('turn') +
		', ' +
		run('fade') +
		'; } ' +
		on +
		'.fch__reading { animation: ' +
		run('ride') +
		', ' +
		run('fade') +
		'; } ' +
		on +
		'.fch__readout { animation: ' +
		run('turn') +
		'; } ' +
		on +
		'.fch__fade { animation: ' +
		run('fade') +
		'; } ' +
		on +
		'.fch__fired { animation: ' +
		run('dot', 'ease-out') +
		', ' +
		run('fade') +
		'; } ' +
		on +
		'.fch__link { animation: ' +
		run('link', 'ease-out') +
		', ' +
		run('fade') +
		'; } ' +
		on +
		'.fch__alarm-move { animation: ' +
		run('alarm', 'cubic-bezier(0.2, 0.8, 0.2, 1)') +
		'; } ' +
		on +
		':is(.fch__live, .fch__reading, .fch__readout, .fch__fade, .fch__fired, .fch__link, .fch__alarm-move) { animation-play-state: var(--flow-play, running); } }';

	return {
		css,
		climb: [
			[p(START), 0],
			[p(tStop), end],
		],
		end,
		loop,
		fires,
	};
}
