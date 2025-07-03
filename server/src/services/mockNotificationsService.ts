import { mockNotifications } from "../data/mockData.js";
import { Notification } from "../types";

export const getMockNotifications = (): Notification[] => {
	return mockNotifications;
};
export const markMockNotificationAsRead = (id: number): Notification | null => {
	const notificationIndex = mockNotifications.findIndex(
		(notif) => notif.id === id.toString(),
	);
	if (notificationIndex !== -1) {
		mockNotifications[notificationIndex].read = true;
		return mockNotifications[notificationIndex];
	}
	return null;
};
