import { gql } from "@apollo/client";

export const GET_MOCK_STUDENTS = gql`
	query GetMockStudents {
		getMockStudents {
			courseId
			email
			id
			name
		}
	}
`;
export const GET_MOCK_STUDENT_BY_ID = gql`
	query Test($getMockStudentByIdId: String!) {
		getMockStudentById(id: $getMockStudentByIdId) {
			courseId
			email
			id
			name
		}
	}
`;
