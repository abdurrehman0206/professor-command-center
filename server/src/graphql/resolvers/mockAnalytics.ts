import { getMockAnalytics } from "@/services/mockAnalyticsService";

export const mockAnalyticsResolvers = {
	Query: {
		getMockAnalytics: (_: unknown) => {
			return getMockAnalytics();
		},
	},
};
