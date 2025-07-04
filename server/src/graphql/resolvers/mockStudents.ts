import {
	getMockStudents,
	getMockStudentById,
} from "../../services/mockStudentsService.js";

export const mockStudentsResolvers = {
	Query: {
		getMockStudents: (_: unknown) => {
			return getMockStudents();
		},
		getMockStudentById: (_: unknown, { id }: { id: string }) => {
			return getMockStudentById(id);
		},
	},
};
