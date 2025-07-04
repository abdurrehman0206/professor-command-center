import { gql } from "@apollo/client";

export const GET_MOCK_COURSES = gql`
	query GetMockCourses {
		getMockCourses {
			code
			id
			name
			semester
			year
		}
	}
`;

export const GET_MOCK_COURSES_BY_ID = gql`
	query Test($getMockCourseByIdId: String!) {
		getMockCourseById(id: $getMockCourseByIdId) {
			code
			id
			name
			semester
			year
		}
	}
`;
