import {
	getMockCourses,
	getMockCourseById,
} from "../../services/mockCoursesService.js";

export const mockCoursesResolvers = {
	Query: {
		getMockCourses: (_: unknown) => {
			return getMockCourses();
		},
		getMockCourseById: (_: unknown, { id }: { id: string }) => {
			return getMockCourseById(id);
		},
	},
};
