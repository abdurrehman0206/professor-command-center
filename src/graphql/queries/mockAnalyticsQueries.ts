import { gql } from "@apollo/client";

export const GET_MOCK_ANALYTICS = gql`
	query GetMockAnalytics {
		getMockAnalytics {
			submissionRate {
				onTime
				late
				missing
			}
			gradeDistribution {
				grade
				count
			}
			assignmentCompletion {
				assignment
				completion
			}
		}
	}
`;
