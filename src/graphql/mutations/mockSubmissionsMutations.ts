import { gql } from "@apollo/client";

export const UPDATE_MOCK_SUBMISSIONS = gql`
	mutation Mutation($input: UpdateMockSubmissionInput) {
		updateMockSubmission(input: $input) {
			id
			assignmentId
			studentId
			submittedAt
			isLate
			grade
			feedback
			fileUrl
			status
		}
	}
`;
