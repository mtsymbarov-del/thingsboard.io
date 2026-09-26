/**
 * The use cases section's heading, its lede and its way out to the rest — for `UseCasesSection` and
 * the section's sandbox tile, so the two cannot word it differently.
 */
export const DASHBOARDS_COPY = {
	title: 'Build real-time IoT dashboards',
	subtitle:
		'Assemble the view your users need from 600+ widgets, and control devices from the same screen. No front-end code required.',
	link: { text: 'Browse all use cases', href: '/use-cases/' },
};

/**
 * The use cases section's badge ("Build real-time IoT dashboards").
 *
 * BERRY, #b3268f, in the orders that colour each section by its badge (`hues: 'section'`). It was
 * #006bc7, the platform loop's own blue — two sections on one hue — and under the section colours it
 * sat straight below the indigo Solution row, a second blue band in a row. Every other hue on the
 * page was taken (teal, violet, orange, indigo, the loop's blue, green) and red means an alarm, so
 * this is the one gap on the wheel: 339° against the twin's violet at 310° and the alarm red at 32°,
 * at the badge set's lightness (L* 42.7 against the set's 42–47) and 5.85:1 with the white glyph.
 * It also breaks the run of cool grounds from Solution through the trust band into Products.
 *
 * The handoff keeps the blue it shipped with (`DASHBOARDS_BADGE_HANDOFF`), so that order is still
 * the page it was.
 */
export const DASHBOARDS_BADGE = { icon: 'tabler:layout-dashboard', color: '#b3268f' };

export const DASHBOARDS_BADGE_HANDOFF = { icon: 'tabler:layout-dashboard', color: '#006bc7' };
