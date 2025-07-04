import { gql } from "@apollo/client";

export const CREATE_MOCK_ASSIGNMENT = gql`
	mutation CreateMockAssignment($input: CreateMockAssignmentInput!) {
		createMockAssignment(input: $input) {
			id
			title
			description
			dueDate
			courseId
			status
			totalSubmissions
			lateSubmissions
		}
	}
`;
