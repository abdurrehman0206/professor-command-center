import { gql } from "@apollo/client";

export const MARK_MOCK_NOTIFICATION_AS_READ = gql`
	mutation MarkMockNotificationAsRead($markMockNotificationAsReadId: String!) {
		markMockNotificationAsRead(id: $markMockNotificationAsReadId) {
			id
			message
			type
			timestamp
			read
		}
	}
`;
