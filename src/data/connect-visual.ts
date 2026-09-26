/**
 * Content for the fourth key visual: every way a device can reach the platform.
 *
 * Replaces a grid of protocol logos. The logo wall showed perhaps a dozen marks and implied that
 * was the list, which undersold it and looked thin at the edges where the grid ran out. Naming the
 * protocols in type says "and the rest" far better than a partial set of logos, and it survives a
 * protocol being added without anyone having to source an SVG.
 */

export const CONNECT_COPY = {
	title: 'Connect any IoT devices',
	// The routes open the paragraph, as they did before the colour key existed: the fragment answers
	// "how do I connect?" in six words. It only moved to the end so the key could land where the
	// eye lands last, and the key is gone. Four routes rather than the original three — LoRaWAN
	// became its own family in the visual after that sentence was written, and the copy should not
	// describe less than the picture shows.
	body: "Directly, through an IoT gateway, from a LoRaWAN or LPWAN network, or via a platform integration. Mix sensors, industrial machines, and any equipment you need in one solution. Browse pre-integrated devices from IoT Hub, or use emulators when hardware isn't ready.",
	// The PE "IoT Device Connectivity Guide", as thingsboard.one links it (2026-09-24): the homepage's
	// doc links all go to the PE tree, and this one was the last on the CE page "How to Connect IoT
	// Devices".
	link: { text: 'Connectivity guide', href: '/docs/pe/connect-iot-devices/' },
	/** The section's badge. Lives with the copy so every page that renders this row gets the same one. */
	// #007c7b, not #0e7490. The old one was invented — Tailwind's cyan-700, in this repo only here and
	// on two twin splines — where this is the Edge teal's hue at the badge set's own weight. Note it
	// is the section's colour only: ConnectHub's four chip hues are texture and stay as they are.
	badge: { icon: 'tabler:plug-connected', color: '#007c7b' },
};

/** What the routes converge on. */
export const CONNECT_NODE = { label: 'ThingsBoard' };

export interface ConnectGroup {
	/** The route, as a quiet caption over the names. */
	category: string;
	/**
	 * Tints this route's chips, and nothing else. It never touches the type — a protocol reads the
	 * same whichever route it arrives by — nor the connectors, which all draw in one grey.
	 */
	accent: string;
	/** The protocols themselves. These are what the visual is about. */
	names: string[];
}

/**
 * Three routes in, and the names are the point.
 *
 * The draft had it the other way round — route titles set large with the protocols listed small
 * beneath them — which made the picture a diagram of ThingsBoard's own taxonomy. Nobody arrives
 * wondering which of three categories they fall into; they arrive wondering whether their thing is
 * supported. So the names carry the size and the route is demoted to a caption.
 *
 * Purple and green are the IoT Gateway board's own hues, reused so the two visuals agree on what a
 * field protocol and an uplink look like. Teal is this visual's alone, chosen to stay clear of the
 * platform indigo the node wears.
 *
 * SUPERSEDED by CONNECT_ROUTES below, and kept only so the two can be compared. Its third row is
 * where the merge goes wrong: "LoRaWAN" is a category rather than something you integrate with, and
 * "NB-IoT" is a radio technology rather than a connection method at all. Those two are not fixed
 * here on purpose — fixing them IS the four-route set, and patching them in place would leave two
 * near-identical taxonomies to choose between instead of one clear trade.
 */
export const CONNECT_GROUPS: ConnectGroup[] = [
	{
		category: 'Devices',
		accent: '#0e7490',
		names: ['MQTT', 'HTTP', 'CoAP', 'LwM2M', 'SNMP'],
	},
	{
		category: 'Gateways',
		accent: '#7b3fe4',
		names: ['Modbus', 'OPC UA', 'BACnet', 'KNX', 'BLE'],
	},
	{
		category: 'Networks & clouds',
		accent: '#1f9d55',
		names: ['LoRaWAN', 'Sigfox', 'NB-IoT', 'AWS'],
	},
];

/**
 * The four routes as the connectivity guide itself defines them.
 *
 * The three-group set above merges LPWAN networks with cloud integrations into "Networks & clouds".
 * That reads more simply but is not what the doc says, and it produced two real errors: "LoRaWAN"
 * as a chip (you integrate with a network SERVER — ChirpStack, TTN, LORIOT — never with LoRaWAN
 * itself) and "NB-IoT" (a radio technology, not a connection method; it appears in the docs only
 * inside the IoT Creators integration).
 *
 * Names are a PRIORITISED SUBSET, not the full lists — the gateway alone has fifteen connectors and
 * platform integrations twenty-eight, which no phone-width card can hold. Each route shows the names a
 * reader is most likely to be scanning for, and the count is capped so the widest row still fits on
 * one line. The claim the visual makes is "your thing is probably here", and a short list of
 * recognised names makes that better than a long list of unrecognised ones.
 *
 * Every name below is a page in the docs tree, so none of them is a claim this repo cannot back.
 */
export const CONNECT_ROUTES: ConnectGroup[] = [
	{
		category: 'Direct connection',
		accent: '#0e7490',
		// The five device transports the connectivity guide tables, SNMP included — it has its own
		// API reference, so it is a direct transport here and not only a gateway connector.
		names: ['MQTT', 'HTTP', 'CoAP', 'LwM2M', 'SNMP'],
	},
	{
		category: 'IoT Gateway',
		accent: '#7b3fe4',
		// Five of fifteen: the industrial names most people arrive knowing, plus BLE, which is the
		// one short-range protocol a reader is likely to be scanning for.
		names: ['Modbus', 'OPC UA', 'BACnet', 'KNX', 'BLE'],
	},
	{
		category: 'LoRaWAN & LPWAN',
		accent: '#b45309',
		// Network servers, which is what you actually integrate with — plus Sigfox, which earns the
		// "& LPWAN" half of the caption rather than leaving it unevidenced.
		names: ['ChirpStack', 'TTN', 'LORIOT', 'Sigfox'],
	},
	{
		category: 'Platform integrations',
		// Lime, not the green (#1f9d55) this was. Measured, because by eye these two only look close
		// once they are pale, and pale is how the cloud draws them.
		//
		// Composited at the chips' 18% over the row's wash and compared in OKLab, this route and the
		// direct one were dE 2.86 apart — the closest pair in the set by a distance, and near enough
		// to be one colour in a 14px squircle. #65a30d takes that pair to 4.90 (8.74 at the swatch's
		// 32%) and the set's worst pair from 2.86 to 4.02.
		//
		// It is the brightest lime that still clears 4.5:1 on white once darkened to 80% for the
		// white-chip coding: it lands at 4.60, and #77a812 — which would separate slightly better —
		// falls to 4.26 and fails. Two constraints meeting is why this is not simply "more green".
		accent: '#65a30d',
		// Four of twenty-eight. "Pub/Sub" rather than "Google Pub/Sub": the vendor was spelled out so that
		// a missing third hyperscaler beside AWS and Azure could not read as "not supported", but
		// this row's own caption is "Platform integrations" and Pub/Sub is not a name anyone meets
		// outside Google Cloud — the context carries what the word was doing.
		//
		// It was also the most expensive name here. This is the widest row, so it alone sets the
		// route column; dropping "Google" takes about 50 units off the composition, which is 50
		// units of width every other route gets to keep at phone size. Every other name is far
		// inside the limit, so nothing else moves the number.
		names: ['AWS IoT', 'Azure IoT', 'Pub/Sub', 'Kafka'],
	},
];
