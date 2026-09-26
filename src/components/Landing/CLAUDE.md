# Key visuals

The illustrations on the experimental homepage: `ConnectCloud`, `ConnectFlow`, `DigitalTwin`,
`NormalizeSeries`, `ScaleDuo`, `SolutionFlow`, `DeployFork`, `WhiteLabelApp` and their candidates.
They are drawn in CSS and SVG, not exported as images, so they take the page's tokens and stay
sharp at any size.

Two pages render them, both internal and both `noindex`:

| Page | What it is |
| --- | --- |
| `/` | The homepage. Where the visuals actually run, and the only place one is seen in context. |
| `/internal/components/` | Components › Overview. One tile per section, grouped by where it ships. |
| `/internal/sections/<id>/` | One visual, its directions as tabs at known widths; the one in use first. |
| `/internal/flows/` | Flows › Overview. One tile per flow. |
| `/internal/flows/<id>/` | Flows: the sign-up and sign-in paths, one page each, built the same way. |
| `/internal/design-system/` | Design system › Overview. One tile per page: Type, UI (Color later). |
| `/internal/library/cards/` | Components › Ecosystem. Every ecosystem card, one-wide beside two-wide. |
| `/internal/library/type/` | Design system › Type. The type scale, declared and as used. |
| `/internal/library/ui/` | Design system › UI. Every button, link and reused piece, harvested live. |

**One route per visual**, each its own file:

```
_key-visuals.ts              the copy, labels and area of each page; addressed by kv('twin'), never by index
_VisualPage.astro            the shell every visual's page shares: the area menu, the page bar
                             (promote, retire, row ground), the tabs, and the stage chrome (is:global)
_Variant.astro               one direction; `shipping` marks the one in use (the green check)
_HubGrid.astro               the overviews' tiles
_areas.ts                    the areas: the island's links and each area's top-bar tabs
_AreaBar.astro               the sticky top bar every internal page gets from the layout
components/index.astro       the Components overview, one tile per section
sections/twin.astro          one visual's directions — <VisualPage visual="twin"> … </VisualPage>
sections/hero.astro          the hero: switches applied to frames of the real homepage (below)
_hero-lab.ts, _hero-lab.scss the hero's switches, footage and screens, and the candidates' CSS
```

Add a visual: an entry in `_key-visuals.ts` and a page in `sections/`. It appears on the hub and
in every other page's menu with no further edit. Remove one: delete those two things.

This replaced a single 1346-line page holding all nine as tab panels. Opening it compiled and
rendered fifty-eight stages to look at six, and pulled the stylesheets of twenty components;
a visual's own page pulls four or five and its first compile is milliseconds rather than 2.5s.

## The design unit

Nothing in a visual is sized in pixels. Each one derives a unit from the width it is given and
expresses every number in that unit, so the whole composition scales as one drawing:

```scss
.thing {
  --thing-u: clamp(0.45px, calc(100cqw / 630), 1.15px);   // 630 = the native width
  --u: var(--thing-u);
}
@function u($n) { @return calc(#{$n} * var(--u)); }
```

`100cqw` needs a container, so the outermost wrapper is `.thing-fit { container-type: inline-size }`.
**Never a media query inside a visual.** A visual does not know what the viewport is; it knows how
much room it was handed, and the same component appears at four different widths on one page.

Geometry that has to line up — curve endpoints, arrow tips, column widths — is computed in the
frontmatter in design units and passed down as custom properties, so the drawing and the layout
cannot disagree. See `ConnectFlow.astro`.

## R — the one number that predicts a phone

```
R = native width ÷ smallest type, both in design units
```

because the rendered size of that type is exactly `container ÷ R`. Nothing else survives the
division: not the font value, not the unit cap, not how carefully the thing is laid out.

A 375px phone gives a visual about a 367px column. So:

| R | smallest type on a phone |
| --- | --- |
| 52.5 (`DigitalTwin`, 630u / 12u) | 7.0px |
| 45 | 8.2px |
| 39 (`TwinTree`, 552u / 14u — retired) | 9.4px |
| 28 (the compact family, 448u / 16u) | 13.1px |

Two consequences worth knowing before proposing anything:

- **Narrowing a visual buys nothing on its own.** If the type shrinks with the box, R is unchanged
  and the phone sees exactly what it saw before. The win only comes from narrowing the box while
  holding or raising the floor.
- **The floor is usually one or two elements**, not the whole design — an axis label, a caption, a
  connector name. Deleting those raises the floor for free; shrinking everything else does nothing.

## Rules of the work

**Never change a shipped visual to try an idea.** Add a candidate beside it — a new component, a
new panel stage — and leave the original rendering on the home preview. Several of these have been
through five or six rejected directions; the only reason that was survivable is that the page never
moved. `ConnectCloud` began this way and became the launch candidate; `TwinTree` began this way and
did not.

**Measure, don't assume.** Every claim about geometry, contrast or colour in this directory was
checked in the browser — curve endpoints via `getPointAtLength`, band centres via
`getBoundingClientRect`, weights via `document.fonts`, contrast by computing the ratio. Estimates of
text width have been wrong by 25u. The browser is the source of truth; the arithmetic is a proposal.

**Copy that carries meaning lives in `src/data/*-visual.ts`**, not in the component, so a component
can be redrawn without retyping the words and a marketing page can import the same strings.

## Gotchas, each of which has cost an hour

- **Three different things look identical from the page, and the browser cannot tell them apart.**
  A style change does not show. It is one of: your selector is wrong, the server is dead, or the
  server is alive and serving a stale stylesheet.

  The third is real and was hit independently in two sessions. Seen on `ConnectHub`: the source had
  no `margin-right`, the served stylesheet still had `margin-right:calc(8 * var(--u))`, and the
  markup from that same file was current in the same page load. Seen on `PlatformLoop`: new markup
  on every reload while the stylesheet was several edits old, so half the rules did not exist in the
  browser. Both times the server was alive and logging 200s, and a browser reload did not clear it.

  What preceded the `PlatformLoop` case is worth knowing, since it is probably the trigger: the
  component was edited several times in quick succession **while it was throwing at render** (a
  constant used before its data file exported it). Vite appears to keep the style module it had from
  before the error and never re-emit once the error clears.

  **The one command that separates the three**, since the page cannot:

  ```bash
  curl -s 'http://localhost:PORT/src/components/Landing/YourThing.astro?astro&type=style&index=0&lang.css' | grep your-new-class
  ```

  No match while the file on disk has it → stale CSS, restart the server. Connection error → the
  server is dead. A match → the CSS is fine, look at specificity.

  What this does NOT mean is "restart after every SCSS edit". That blanket rule was here once and
  was wrong: on a healthy server a single edit reaches the browser live, tested three ways —
  changing a value in a scoped block, adding a new selector, and editing a page's `is:global` block.
  Restarting costs about 31 seconds, so diagnose before reaching for it.
- **`astro check` does not compile SCSS.** It will pass over a stylesheet that cannot build. Only a
  real build or a page load proves the styles.
- **The global reset gives every `<svg>` `max-width: 100%`.** An SVG whose viewBox is wider than its
  grid track is silently scaled down — every arrow lands short and nothing reports an error. Any SVG
  that overflows its track needs `max-width: none` and an explicit width.
- **Pixels do not scale.** A `1px` border or hairline is the same size at every unit, so it breaks
  unit arithmetic — worst at phone scale, where the unit is smallest. `TwinUnit` carries 4px of
  border chrome — a border top and bottom and a hairline between each pair of rows — so the card
  measures 4px taller than unit arithmetic predicts. Two ways to absorb it, both measured in
  `08a8c189f`: give the frame the COMPUTED height and let the 4px come out of its bottom padding,
  which leaves the worst connector landing ~3px high of its row's centre; or stretch the drawing to
  the card's measured height, which trades that for ~2.9px at the other end. Neither is free.
- **Astro scoped CSS compiles to `:where(.astro-hash)` — zero specificity.** Two equal selectors are
  decided by source order, so a rule declared later wins even if it looks more specific.
- **A scoped rule cannot reach markup in another component.** This is why the sandbox's stage chrome
  (`.stage`, `.probe`, `.page-ctl`, `.unit-row`) is in its `is:global` block: the markup is in
  `_panels/*.astro`.
- **`grid-template-columns: auto` takes max-content**, so `max-width: 100%` on a child never bites
  and the row escapes its box. Use `minmax(0, 1fr)`.
- **There is no Ubuntu 600 anywhere,** and nothing synthesises one. CSS font matching walks UP from
  a desired weight above 500, so `600` selects the 700 face: measured at 40px, 'Handgloves 123' sets
  identically at 600 and 700 (301.28px) and differently at 500 (295.28px). `$font-weight-semibold`
  is therefore an alias of `$font-weight-bold`, so the declared weight is the painted one. If you
  want a weight between normal and bold, `$font-weight-medium` is the only one that exists — say so
  explicitly rather than reaching for the alias.
- **The GitHub star button is the exception, and it is deliberate.** It carries GitHub's own
  `-apple-system` stack rather than Ubuntu, and in that stack 600 IS a distinct face (290.67px
  against 283.54 at 500 and 297.92 at 700). Leave its `font-weight: 600` alone.
- **The two pages do not load the same faces**, which matters because the sandbox is where the
  decisions get made:

  | | Ubuntu | Ubuntu Mono |
  | --- | --- | --- |
  | `/` (BaseLayout → Starlight) | 300, 400, 400-italic, 500, 700 | 400, 700 |
  | `/internal/sections/` (`PlaygroundLayout`) | 300, 400, 500, 700 | **400 only** |

  So bold monospace — a chip, an axis label — is a real face on the home preview and a synthesised
  one in the sandbox. Check `document.fonts` on the page you are actually looking at.

## Verifying

```bash
npx prettier --check <files>   # separate commands, and read each exit code
npx astro check
```

Run them as separate commands. A pipe (`… | tail -2`) swallows a non-zero exit and has already
caused unformatted code to be committed. A full build is `pnpm build:fast` — bare `astro build`
OOMs — and per the root CLAUDE.md, ask before running one.

**`pnpm run dev -- --port 4322` does not work**: pnpm swallows the `--` and Astro falls back to
4321, then auto-increments if that is taken — which can land on the port you asked for and look
like success. `pnpm run dev --port 4322`, with no `--`, is correct. `.claude/launch.json` uses that
form for `tb-site-b` and `tb-site-c`.

**Astro never fails on a busy port, it moves.** Ask for 4323 while 4323–4325 are taken and it
starts on 4326 and says so in one line you did not read. So the server you are measuring may not
be the one you think, and a dev server that seems to ignore your edits is often a different
server. `lsof -nP -iTCP -sTCP:LISTEN | grep 43` lists them with pids. Note that these processes do
NOT match `pkill -f "astro dev"` — the command line is `node …/astro.js`, so that pkill silently
kills nothing and leaves the orphans holding their ports.

Measured costs, so the loop can be judged rather than guessed: dev server boot ~31s; first
compile of `/internal/sections/` 2.5s and of `/` 7.6s; afterwards
21ms and 59ms. Once it is up, it is fast — so keep it up.

Path aliases: `@root`, `@components`, `@layouts`, `@styles`, `@data`, `@util`, `@models`,
`@includes`. There is no `@assets`.

## The workflow

One visual goes through this loop, and it is the loop rather than any one step that has kept the
shipped page stable through several rejected directions:

1. **Draft as a new component**, named for its idea (`ConnectCloud`, `TwinTree`), never as an edit
   to the visual the home preview renders.
2. **Give it a canvas** — one `<Variant>` in the visual's page. That is the whole canvas: a section
   with the direction's name, the real homepage row above and the phone below. The candidate goes
   FIRST on the page and the incumbent below it; put it second and the incumbent quietly stays the
   incumbent.
3. **Measure it in the browser**, and report the numbers rather than an impression.
4. **Judge it in the row**, not in isolation.
5. **Promote or retire.** Two buttons in the section's header, and one decision per direction
   rather than one per exhibit. Promote means `index.astro` imports it; retire means a deletion
   pass later. Both are a mark, not the act.

Rejected work is committed, not discarded — with the reason in the message. `TwinTree` was drafted
in `08a8c189f`, judged on its canvas, and deleted once its direction was dropped; the commit still
holds the component and its measurements, which is what makes deleting it cheap. The compact family
went the same way, after being parked long enough to be sure.

### Several visuals at once

Components never collide; the shared files do. One git worktree per visual, on its own branch, one
session per visual, and its own dev server — `.claude/launch.json` declares `tb-site` (4321),
`tb-site-b` (4322), `tb-site-c` (4323) and `tb-site-d` (4324), because two sessions sharing one
server will restart it under each other mid-measurement.

A session per visual is also about context: these sessions get long, and a compacted one has lost
the measurements it took two hours ago. Start fresh per visual and let this file carry the method.

Merge the branches back **one at a time** — each will have touched `_key-visuals.ts`.

Shared, so coordinate before touching: `index.astro` (the homepage — the visuals ship from it now),
`_key-visuals.ts`, `_VisualPage.astro`, `_Variant.astro`, `styles/_home-rows.scss` (the homepage
row, which the sandbox now reads too), `FeatureBlockSection.astro` (which also reaches the PE and
Edge product pages) and `TwinUnit.astro`.
A visual's own page is not shared, which is the point.

## The sandbox's shape

A page is a list of DIRECTIONS, and a direction is a `<Variant>`: one section, one name, and two
views inside it — the real homepage row, and the visual alone at 335px.

`<Variant>` takes the component as a VALUE and renders it twice from that one reference, so the
desktop and phone views cannot end up testing different props. `phoneProps` exists for the few that
are genuinely about width (a rotation with no room to be noticed); it is printed on the phone label
in brand colour, because a view not testing the same thing as the one above it has to say so.

The desktop view is the real `FeatureBlockSection` inside a real `.new-rows`, reading
`styles/_home-rows.scss` — the same file `index.astro` reads. It used to be a hand-built copy of
that row, and the copy had drifted to a 1160 measure with a 72px gap, handing the visuals 673px
where the homepage hands them 525. **Every judgement made in the old sandbox was made at the wrong
width.** There is no copy now, so there is nothing to drift.

It carries the section's BADGE too, from the visual's own copy object, so the row is not judged with
a 40px hole where the homepage has a glyph. Every visual has one: five already did, and gateway,
deploy, whitelabel and platform were given one — each taking its own component's accent where the
component had one to take. A `deskWidth` direction has no row, so its badge goes in the section
header at 24px instead; no section shows it twice.

**The phone view is an iframe** at a 375px viewport, loading this same page with `?frame=<key>`.
It has to be: the row stacks below `lg` and closes up for a phone at 768 (`_home-rows.scss`), both
VIEWPORT queries, so a 375px box on a desktop viewport gets the desktop layout in a quarter of the
room — a picture of nothing. Inside a
frame the viewport really is 375, so the row stacks, the copy reflows, and the media breaks out past
the gutter to 367px, which is what the homepage actually hands it. The old probes were 335 — the
copy column's width, not the visual's — so every phone judgement was made 32px too narrow.

The picking is done in the BROWSER. These routes are prerendered (static output, no adapter), so
`Astro.url.searchParams` is empty at build time and the server cannot see which frame was asked for.
The script in `_VisualPage` reads the query and `replaceChildren`s the body down to that one row —
cutting rather than hiding, so the other phone iframes leave the document before any of them load
and a frame cannot load frames of its own. Two consequences worth knowing: the framed row renders
`props` and not `phoneProps`, and the server still renders the whole page per frame, which
`loading="lazy"` is what keeps off the critical path. A `deskWidth` direction has no row to frame and
keeps a probe.

**Row ground** is a page-level toggle, tint or white, not a per-direction prop. The homepage
alternates its rows, so which ground a visual gets depends on where its row falls, and the two are
not equally kind to a pale diagram — a chip that reads on `#f5f6ff` can go white-on-white. That
makes it a thing to flip while looking. The rule lives in `_VisualPage`, not in `_home-rows.scss`:
that file is the homepage's row, and nothing sandbox-only belongs in it. The frames follow it
through a `storage` listener — that event fires in every OTHER same-origin document, which is
exactly what an iframe is.

**The strip is the first thing in the document**, above the page's own heading, through
`PlaygroundLayout`'s `nav` slot — a page title is not navigation, and a sticky bar only reads as a
bar if it starts at the top edge rather than sliding up to it. Full bleed, by cancelling the body
padding on three sides and paying it back as its own. Sticky because these pages run to twelve
thousand pixels and it was reachable only from the top of one, which is the opposite of when you
want it.

Order is `KEY_VISUALS`, and that array is the strip and nothing else — everything is addressed by id
through `kv()`. Platform first (it is meant to open the homepage as a centred section, though it is
not on the page yet), then the five rows as `index.astro` runs them, then everything not on the
homepage at all, with a rule marking that seam. The way back to the index is an icon: it was the
word "Sandbox" in grey mono at the head of a row of pills, reading as a label for them rather than a
link out — and `InternalNav`, fixed in the corner of every one of these pages, already says
"Sandbox".

**ASTRO-ICON AND THE FRAMES.** `astro-icon` writes each glyph's `<symbol>` inline in its FIRST use on
a page and a bare `<use href="#ai:…">` everywhere after, so on a page of twelve directions every
definition sits in the first one. Lifting one row out of the middle left its `<use>` pointing at
nothing — a badge tile with no glyph, on ten of the eleven connect frames. The frame script now
carries every symbol that is not already inside the row across in a hidden sprite. If you write
anything else that moves part of one of these pages into another document, it has the same problem.

Worth knowing when auditing this: the test is whether a `<use>`'s symbol EXISTS, not whether the
icon painted. Several paint at zero on purpose — the read-more chevron is hidden by
`_home-rows.scss`, and `SolutionFlow` renders every customer's mark and shows one.

`intro` renders the homepage's CENTRED statement over the visual instead of putting it in a row —
the real `IntroSection`, the real copy from `data/home-intro.ts`, reading `styles/_home-intro.scss`,
which `index.astro` reads too. No badge, because the centred section does not carry one. It applies
to both views. Platform uses it: a centred section above the rows is where that visual is headed.

Two things are NOT a Variant. A visual that is a full-bleed section rather than a row's media takes
`deskWidth` (platform, ConnectFlow's split cut), which swaps the row for a probe — a row would hand
it 525px, where it is already in its stacked form, and judging that is judging a different picture.
And a technical EXHIBIT — a breakpoint pinned down, a component's parts laid out — stays a plain
`.stage` with no commands on it, because the way to be rid of one is to delete it.

**The hero is not a Variant either.** It answers to the whole viewport — width, height and
orientation pick its composition, and it sizes itself to the fold — so neither a row nor a probe can
show it. `sections/hero.astro` frames the REAL homepage at fixed screen sizes (or one frame the size
of the window) and applies each switch into the frames from outside, which same origin allows:
`data-lab-<switch>` on the frame's `<html>`, `_hero-lab.scss` appended after the page's own sheets,
the `<video>` swapped, and for the white menu the header held in its scrolled state. The homepage
carries none of it. Each switch's first option is what ships, and a combination is its address, so
it can be linked. A new candidate is an option in `_hero-lab.ts` and its rules in `_hero-lab.scss`;
new footage is one `FOOTAGE` entry. Promoting one means moving its rules into `Hero.astro` and
deleting them from the lab.

### Promote and retire

Two buttons in every section's header. A direction is unmarked, promoted or retired; pressing the
state it already has clears it, pressing the other moves it. Marks go to
`localStorage['launch-visuals:marks']` as `visual/name → {state, label}`, shared across every
visual's page, so the counts and the copied list cover the whole sandbox wherever you are. Copy
prints promotions first, because what to ship and what to delete are different jobs.

Retire alone was not enough. The good news had nowhere to go, so the only way to record a winner
was to retire everything else — which reads exactly like abandoning the whole visual.

Marking is not doing. To act on the list, read that key off the page; for a retirement check that
nothing outside the sandbox imports the component before removing it. **Deletion is its own
commit**, never mixed with design work, so a change of mind is one revert.

## Open, and why

Two things known to be wrong and deliberately not fixed yet. Both are cross-cutting: they touch
several visuals at once, so doing either inside a change to one visual would bury it.

### The platform visual needs optimising and revisiting

`PlatformRaised` renders the homepage's centred section above the rows, and it is the heaviest
thing in this directory — 898 lines, with `PlatformLoop` beside it at 880 for what is largely the
same drawing in a different arrangement. That is roughly twice any other visual here and about
1,800 lines carrying one idea.

What to look at, in the order it is likely to pay:

- **The two files are near-duplicates.** They were drawn as alternatives and both kept. Either
  one is the visual and the other is a retired cut that should go, or the difference between them
  is a prop and they are one component. Nobody has decided which, and until someone does, every
  fix has to be made twice or silently isn't.
- **It is the first visual on the page.** Whatever it costs is paid before anything else renders,
  and it is the one visual a reader is guaranteed to see.
- **Revisit the drawing, not only the code.** The optimisation and the design question arrived
  together and should be answered together, or the second will undo the first.

### Arrow styles need an audit

NOTHING HAS BEEN HARMONISED. This entry was recorded in `a9d8a5bdd` and is still a description of
the problem, not of any work done on it. Checked again on 2026-09-21 against every visual on the
homepage; the table below is the state as of that date.

There are at least **five different ways of drawing the same arrowhead** in this directory, and no
reason recorded for any of them being different from the others:

| Visual | How the head is drawn |
| --- | --- |
| `SolutionFlow` | CSS: two borders of a box, rotated 45°, pulled back by 1.2071 × the box |
| `NormalizeSeries`, `NormalizeFlow` | SVG `path`, a three-point chevron at fixed 6/4 units |
| `PlatformClear` | SVG `path` again, but its own three-point chevron off `STEM`/`WING`/`HEAD`, in a box deliberately taller than the path (`HEAD_BOX_H`) |
| `GatewayDiagram` | SVG `marker-end`, referencing defs |
| `ConnectHub` | none at all — the wires fade out instead |
| `DigitalTwin`, `TwinCorridor` | CSS borders again, but off their own `--twin-rail-*` tokens |

`PlatformClear` is the row this table was missing, and it is the one that matters most: it opens the
page as the centred section, so its heads are the first a reader sees. It is a SECOND, independent
SVG chevron — same technique as `NormalizeSeries`, different constants, written without reference to
it. Two copies of one idea is the cheapest thing on this list to resolve.

ONE CHANGE HAS LANDED SINCE, AND IT WENT THE OTHER WAY. `3dd0e671e` moved `SolutionFlow`'s rail from
a filled box to a `border-top` so the rail and its own head resolve to the same weight — Blink floors
a border to whole device pixels while a filled box keeps its fraction, so at the 367-unit phone
column the rail painted 1.961px against the head's 1.500px. That is a real fix and should stay, but
note what it does to this audit: it makes the CSS-border technique load-bearing in that visual for a
reason no other technique satisfies. Any proposal to move `SolutionFlow` onto SVG has to answer that
measurement first.

Five techniques means five behaviours under the things these drawings actually do: scaling with a
design unit, changing stroke weight, taking a colour from a token, and animating. The CSS
triangle's offset is a magic constant that has to be recomputed by hand whenever the head resizes;
the SVG chevron does not scale with its rail's weight; `marker-end` inherits colour differently
from both. None of that is visible until two visuals sit in the same row and their arrows disagree.

The audit is not "make them all the same" — `ConnectHub` having no heads is a decision worth
keeping, and `SolutionFlow`'s borders now have a measurement behind them. It is to find out which
differences are decisions and which are just age, and to leave one technique per reason with that
reason written down.

Where it is likely to pay, in order: the two SVG chevrons (`NormalizeSeries` and `PlatformClear`)
are one component with two sets of constants; `GatewayDiagram`'s `marker-end` is the only use of
that mechanism in the directory and inherits colour differently from everything else; and the
1.2071 constant in `SolutionFlow` is the one number here that has to be recomputed by hand whenever
a head resizes.
