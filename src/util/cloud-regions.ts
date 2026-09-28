/** ThingsBoard Cloud's two regions: separate sites, with an account on only one of them. */
export const CLOUD_REGIONS = [
	{ id: 'us', name: 'North America', note: 'Data stored in North America', host: 'thingsboard.cloud' },
	{ id: 'eu', name: 'Europe', note: 'Data stored in the European Union', host: 'eu.thingsboard.cloud' },
] as const;

export type CloudRegion = (typeof CLOUD_REGIONS)[number];
