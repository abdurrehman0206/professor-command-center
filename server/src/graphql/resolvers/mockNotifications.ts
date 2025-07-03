import {
	getMockNotifications,
	markNotificationAsRead,
} from "@/services/mockNotificationsService";

export const mockNotificationsResolvers = {
	Query: {
		getMockNotifications: (_: unknown) => {
			return getMockNotifications();
		},
	},
	Mutation: {
		markNotificationAsRead: (_: unknown, { id }: { id: number }) => {
			return markNotificationAsRead(id);
		},
	},
};
