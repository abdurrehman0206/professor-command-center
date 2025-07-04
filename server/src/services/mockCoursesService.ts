import { mockCourses } from "../data/mockData.js";
import { Course } from "../types";

export const getMockCourses = (): Course[] => {
	return mockCourses;
};

export const getMockCourseById = (id: string): Course | null => {
	const mockCourse = mockCourses.find((course) => course.id === id);
	if (mockCourse) return mockCourse;
	return null;
};
