import { gql } from "@apollo/client";

export const GET_MOCK_NOTIFICATIONS = gql`
	query GetMockNotifications {
		getMockNotifications {
			id
			message
			read
			timestamp
			type
		}
	}
`;
