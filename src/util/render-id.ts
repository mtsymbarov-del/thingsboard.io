/**
 * A unique id per render, for a component that writes its own keyframes or CSS scoped by an attribute
 * and may appear more than once on a page (the sandbox renders a drawing in several variants).
 *
 * A counter rather than `Math.random()`, so a build renders the same ids every time it runs — the
 * same page, the same HTML — while two instances on one page still never share one. Text-derived ids
 * (`slugId`) cannot do this: two instances of one drawing have the same text.
 */
let count = 0;

export function renderId(prefix: string): string {
	count += 1;
	return `${prefix}-${count.toString(36)}`;
}
