/**
 * Checks, in the built output, that pages with a YouTube video contact neither
 * YouTube nor Google before the visitor clicks play. Breaking this is silent:
 * the page builds, typechecks, lints and renders fine, and only the browser's
 * network panel shows the early requests.
 *
 * On every page, no <iframe>, <script src>, <img>/<source> or resource-hint
 * <link> (preconnect, dns-prefetch, preload, prefetch, modulepreload) may
 * point at a YouTube or Google host. Links the visitor follows (<a href>) and
 * inline script bodies are not requests on load, so they don't count.
 *
 * On every page with a <YouTubeVideo> poster, each poster has a play button
 * with an accessible name, and the page keeps the video's print fallback.
 *
 * Every video ID passed to <YouTubeVideo> in src/ must have a poster in the
 * build. Posters are found by markup copied from the component, so a renamed
 * attribute would otherwise make every page skip the poster checks and pass.
 *
 * Usage:
 *   pnpm lint:youtube          (after a build)
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = 'dist';
const SRC = 'src';

const BLOCKED_HOSTS = ['youtube.com', 'youtube-nocookie.com', 'ytimg.com', 'googlevideo.com', 'google.com'];
const HINT_RELS = new Set(['preconnect', 'dns-prefetch', 'preload', 'prefetch', 'modulepreload']);

function walk(dir: string, extensions: string[]): string[] {
	const files: string[] = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) files.push(...walk(fullPath, extensions));
		else if (extensions.some((ext) => entry.name.endsWith(ext))) files.push(fullPath);
	}
	return files;
}

/** Video IDs the source passes to <YouTubeVideo>. */
function sourceVideoIds(): Set<string> {
	const ids = new Set<string>();
	for (const file of walk(SRC, ['.astro', '.md', '.mdx'])) {
		for (const [tag] of readFileSync(file, 'utf-8').matchAll(/<YouTubeVideo\b[^>]*>/g)) {
			const id = attr(tag, 'videoId');
			if (id) ids.add(id);
		}
	}
	return ids;
}

const stripComments = (html: string): string => html.replace(/<!--[\s\S]*?-->/g, '');

const attr = (tag: string, name: string): string | undefined =>
	tag
		.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'))
		?.slice(1)
		.find(Boolean);

function blockedHost(url: string): string | undefined {
	let host: string;
	try {
		host = new URL(url, 'https://thingsboard.io/').hostname;
	} catch {
		return undefined;
	}
	return BLOCKED_HOSTS.find((blocked) => host === blocked || host.endsWith(`.${blocked}`));
}

/** URLs a tag makes the browser request on load. */
function requestedUrls(tag: string, name: string): string[] {
	switch (name) {
		case 'iframe':
		case 'script':
			return [attr(tag, 'src')].filter((u): u is string => !!u);
		case 'img':
		case 'source': {
			const srcset =
				attr(tag, 'srcset')
					?.split(',')
					.map((c) => c.trim().split(/\s+/)[0]) ?? [];
			return [attr(tag, 'src'), ...srcset].filter((u): u is string => !!u);
		}
		case 'link': {
			const rels = (attr(tag, 'rel') ?? '').toLowerCase().split(/\s+/);
			const href = attr(tag, 'href');
			return href && rels.some((r) => HINT_RELS.has(r)) ? [href] : [];
		}
		default:
			return [];
	}
}

let hasErrors = false;
const fail = (msg: string): void => {
	console.error(msg);
	hasErrors = true;
};

try {
	statSync(ROOT);
} catch {
	console.error(`No ${ROOT}/ directory — run a build first.`);
	process.exit(1);
}

const pages = walk(ROOT, ['.html']);
let videoPages = 0;
let posters = 0;
const builtVideoIds = new Set<string>();

for (const page of pages) {
	const html = stripComments(readFileSync(page, 'utf-8'));
	const where = relative(ROOT, page);

	for (const match of html.matchAll(/<(iframe|script|img|source|link)\b[^>]*>/gi)) {
		const [tag, name] = match;
		for (const url of requestedUrls(tag, name.toLowerCase())) {
			const host = blockedHost(url);
			if (host) fail(`${where}: <${name.toLowerCase()}> requests ${host} on load (${url})`);
		}
	}

	const roots = [...html.matchAll(/<div\b[^>]*\sdata-yt-video="([^"]+)"[^>]*>/g)];
	if (roots.length === 0) continue;
	videoPages += 1;

	for (const [index, root] of roots.entries()) {
		posters += 1;
		const videoId = root[1];
		builtVideoIds.add(videoId);
		const end = roots[index + 1]?.index ?? html.length;
		const body = html.slice(root.index, end);
		const button = body.match(/<button\b[^>]*\sdata-yt-play\b[^>]*>/)?.[0];
		if (!button) fail(`${where}: video ${videoId} has no play button`);
		else if (!attr(button, 'aria-label')?.trim())
			fail(`${where}: video ${videoId}'s play button has no accessible name`);
		if (!html.includes(`https://www.youtube.com/watch?v=${videoId}`)) {
			fail(`${where}: video ${videoId} has no print fallback with its watch URL`);
		}
	}
}

const expectedVideoIds = sourceVideoIds();
if (posters === 0) fail('No video posters found in the build — the component markup and this script are out of step.');
for (const id of expectedVideoIds) {
	if (!builtVideoIds.has(id)) fail(`video ${id} is used in ${SRC}/ but has no poster in the build`);
}

if (hasErrors) {
	console.error(`
Error: the invariant(s) above no longer hold. A request to YouTube or Google on
load usually means a template embeds the player, a thumbnail or a resource hint
directly — videos go through <YouTubeVideo>, which loads the player only on
click and serves its poster from our own origin.`);
	process.exit(1);
}

console.log(
	`✓ no YouTube or Google requests on load across ${pages.length} pages; ` +
		`${posters} video poster(s) on ${videoPages} page(s), covering all ${expectedVideoIds.size} video IDs in ${SRC}/, ` +
		'have a named play button and a print fallback.'
);
