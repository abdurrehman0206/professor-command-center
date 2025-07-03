import { getMockAnalytics } from "../../services/mockAnalyticsService.js";

export const mockAnalyticsResolvers = {
	Query: {
		getMockAnalytics: (_: unknown) => {
			return getMockAnalytics();
		},
	},
};
