import {
	getMockNotifications,
	markMockNotificationAsRead,
} from "../../services/mockNotificationsService.js";

export const mockNotificationsResolvers = {
	Query: {
		getMockNotifications: (_: unknown) => {
			return getMockNotifications();
		},
	},
	Mutation: {
		markMockNotificationAsRead: (_: unknown, { id }: { id: string }) => {
			return markMockNotificationAsRead(id);
		},
	},
};
