export interface ProductChoice {
	name: string;
	label: string;
	description: string;
	/** Plain ThingsBoard mark — the qualifier moves to the corner badge. */
	icon: string;
	/** The deployment's line glyph, riding the filled button (in the title before 2026-09-24). */
	cornerIcon: string;
	/** Squircle fill; the mark is knocked out white on top of it. */
	badgeFill: string;
	/** Part of `name` tinted with `badgeFill` — the word that tells the two apart. */
	nameHighlight?: string;
	/**
	 * The card's filled button, in `badgeFill`. `action` + `href` sit beside it as the
	 * quiet link — the same button-then-link pair as the Cloud and On-premises pages'
	 * choice cards, so the card is two actions rather than one click target.
	 */
	primary: { label: string; href: string };
	/**
	 * The bare step this side asks of you, under the filled button. The test the words passed:
	 * nothing both sides could claim — "minutes", "free" and "no credit card" all failed it.
	 */
	primaryNote: string;
	/** Monochrome marks under the copy, naming where the product can run. */
	targets?: { label: string; icon: string }[];
	href: string;
	action: string;
	accent: string;
}

// Two deployments, one decision: who runs it. Community Edition is reachable
// from the nav and the docs — here it answered a different question.
export const homeProducts: ProductChoice[] = [
	{
		name: 'ThingsBoard Cloud',
		// "shared or dedicated" rather than "SaaS": with no Private Cloud card of its own, this
		// card is the whole managed family, and the label is where a reader learns there are two
		// of them. The fork itself stays on the Cloud page, which is built around exactly that
		// comparison — see `paasChoice`.
		label: 'Fully managed, shared or dedicated',
		// No figure. It said 99.9 for a while, but the card covers both tiers and they carry
		// different ones (develop's comparison row: "Uptime SLA — 99.9% / 99.9%–99.99%"), so it names
		// the contract instead, as thingsboard.one's copy does (2026-09-24).
		//
		// The residency sentence came out to make room. It was saying what the two region buttons
		// under it were already saying, and those are gone now as well.
		// No "in 5 minutes": it rode on the button for a while ("Sign up and start in 5 min"), and
		// the button now takes the Cloud page's "Start for free" so the pair reads the same on both
		// pages. The estimate still lives there, in the Public Cloud card's points.
		description:
			'We run the servers, scaling, backups and upgrades, with a contractual uptime SLA. Start free on shared infrastructure, or move to Private Cloud for a dedicated cluster.',
		icon: '/src/assets/images/landings/thingsboard-mark.svg',
		cornerIcon: 'tabler:cloud',
		badgeFill: 'var(--color-product-cloud)',
		nameHighlight: 'Cloud',
		href: '/products/paas/',
		// The link names the fork the Cloud page is built around, not the page itself. "Explore
		// Cloud" asked the reader to go and read; this says what they will find there, and it is
		// the one question this card raises and cannot answer — the description names Private
		// Cloud, the label says "shared or dedicated". "Compare Public & Private" says the same in
		// eight more characters, and would wrap beside the button on a phone.
		action: 'Public vs Private',
		// One action, not two regions. Which host your data lives on is a real decision, but it is
		// not the decision this section is for — the section asks who runs the platform, and a
		// card that answers with two buttons makes the reader choose a continent before they have
		// chosen a product. The regions are not lost: the header's sign-in menu lists both, and
		// the Cloud page carries them too.
		//
		// "Start for free", the Public Cloud card's own label on the Cloud page, so the button
		// promises the same thing in both places. The href is `/signup`: the reader this card is
		// written for has no account yet, and a returning user signs in from the header.
		primary: { label: 'Start for free', href: 'https://thingsboard.cloud/signup' },
		primaryNote: 'Sign up and build.',
		accent: '#6e7481',
	},
	{
		name: 'ThingsBoard On-premises',
		label: 'Self-managed, on your infrastructure',
		// The list is gone, and that is the point: "in AWS, Azure, GCP, or on Kubernetes" named
		// the same four things the `targets` marks name directly underneath, so the card said its
		// targets twice and its reason not at all. The marks are better at the list than a
		// sentence is; the sentence is better at what the list cannot say.
		//
		// So it now says the two things nothing else on this page says. WHO RUNS IT is the
		// decision the section is built on, and it is the only line where this card can answer
		// it. OFFLINE is the capability no managed option has at any price — develop's own
		// On-premises hero leads on it, "Your own cloud, on-premises, or fully offline". Since
		// thingsboard.one's pass (2026-09-24) it says so as "fully air-gapped", and adds the one thing
		// we still do for a deployment we don't run: LTS releases and security patches.
		//
		// It also no longer says "your private cloud". ThingsBoard sells a product by that name —
		// a dedicated cluster OUR team runs — and it is the opposite of this card. Develop's
		// On-premises page never uses the phrase either.
		description:
			'You host it in your cloud, data center, or fully air-gapped, so data location and compliance stay in your hands. We ship LTS releases and security patches.',
		icon: '/src/assets/images/landings/thingsboard-mark.svg',
		// A server, not the rotated square that was here. The rhombus named nothing —
		// it was a shape holding the badge colour next to the word, while Cloud's
		// glyph opposite it says exactly what Cloud is. This one does the same job
		// on this side: racks you own.
		//
		// `server-2` RATHER THAN `server`, WHICH IS BROKEN. Tabler's `server` leaves
		// its top rack an open subpath — it strokes (3,7) round to (3,9) and then
		// `m`oves away with no `z`, so the left edge between those two points is
		// never drawn and the rack renders with a slot cut out of its side. Only the
		// top one: the lower rack ends `-3-3z` and closes. `server-2` closes both,
		// and its two racks have the same bounding box, so the sizing and baseline
		// numbers in `EcosystemCard` carry over untouched. The extra pair of vent
		// lines is the whole visible difference.
		cornerIcon: 'tabler:server',
		badgeFill: 'var(--brand-pe)',
		nameHighlight: 'On-premises',
		href: '/products/thingsboard-pe/',
		// Generic on purpose, unlike Cloud's "Public vs Private": the licence fork is one section of
		// the On-premises page, not what the page is built around, and a link that named it promised
		// a comparison the page mostly isn't. "Explore" oversells nothing.
		action: 'Explore On-premises',
		// "Install for free" rather than "Install", matching the On-premises hero's and choice
		// card's primary word for word — the card promises the action and the page delivers the
		// same one, and "for free" is the half that answers the reader's actual hesitation about
		// self-hosting. Green because `badgeFill` is the On-premises page's own accent, so it is
		// the button that page puts under its own choice. No download glyph: that page's choice
		// card has none, and Cloud's button beside it carries none either.
		primary: { label: 'Install for free', href: '/installations/' },
		// "One command" is true of Docker alone (the guide's own `docker compose up -d`);
		// Kubernetes is real but multi-step — CE ships Minikube/OpenShift/EKS/AKS/GKE
		// guides — so it rides as readiness, not as a command claim.
		primaryNote: 'One Docker command. Kubernetes-ready.',
		// NO VENDOR MARKS. The row read AWS · Azure · Google Cloud · Kubernetes, and checked against
		// develop that is not this product's story — it is the other one's:
		//
		//   - Develop's On-premises page says "Kubernetes" ZERO times. Its AWS, Azure and GCP
		//     mentions are all something else: "REST, Kafka, RabbitMQ, AWS, Azure and GCP nodes to
		//     push data into ERP, CRM or billing systems" is the rule engine's integration nodes,
		//     and "OAuth2 SSO (Google, Azure AD, Okta…)" is identity. Not one names a place to
		//     deploy. That page's deployment words are data centre, virtual machine and Docker.
		//   - Kubernetes appears 7 times on develop, every one of them PRIVATE CLOUD: "Dedicated,
		//     isolated Kubernetes cluster", "All plans are powered by Kubernetes… AWS is our
		//     first-choice IaaS, but Azure or GCP regions are also supported on request".
		//   - Even `/docs/pe/installation/` never says "Kubernetes". Its two Recommended options
		//     are Docker; the K8s-flavoured entries are Minikube and OpenShift; and its cloud list
		//     includes DigitalOcean, which the row left out.
		//
		// So the marks were Private Cloud's infrastructure narrative pinned to the card that means
		// the opposite, and they narrowed the claim besides: this card's argument is that YOU pick
		// where it runs, which four logos contradict by implying the four are the list.
		accent: '#6e7481',
	},
];
