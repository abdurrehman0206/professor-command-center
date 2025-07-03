import {
	getMockStudents,
	getMockStudentById,
} from "@/services/mockStudentsService";

export const mockStudentsResolvers = {
	Query: {
		getMockStudents: (_: unknown) => {
			return getMockStudents();
		},
		getMockStudentById: (_: unknown, { id }: { id: number }) => {
			return getMockStudentById(id);
		},
	},
};
