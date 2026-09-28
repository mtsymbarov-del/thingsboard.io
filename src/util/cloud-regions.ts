/** ThingsBoard Cloud's two regions: separate sites, with an account on only one of them. */
export const CLOUD_REGIONS = [
	{ id: 'us', name: 'North America', host: 'thingsboard.cloud' },
	{ id: 'eu', name: 'Europe', host: 'eu.thingsboard.cloud' },
] as const;

export type CloudRegionId = (typeof CLOUD_REGIONS)[number]['id'];
