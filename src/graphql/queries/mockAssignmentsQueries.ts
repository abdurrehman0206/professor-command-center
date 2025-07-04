import { gql } from "@apollo/client";

export const GET_MOCK_ASSIGNMENT = gql`
	query GetMockAssignments {
		getMockAssignments {
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

export const GET_MOCK_ASSIGNMENT_BY_ID = gql`
	query Test($getMockAssignmentByIdId: String!) {
		getMockAssignmentById(id: $getMockAssignmentByIdId) {
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
