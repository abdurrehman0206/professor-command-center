import { gql } from "@apollo/client";

export const GET_MOCK_SUBMISSIONS = gql`
	query GetMockSubmissions {
		getMockSubmissions {
			assignmentId
			feedback
			fileUrl
			grade
			id
			isLate
			status
			studentId
			submittedAt
		}
	}
`;
