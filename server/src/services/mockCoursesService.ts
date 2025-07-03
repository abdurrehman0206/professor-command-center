import { mockCourses } from "../data/mockData.js";
import { Course } from "../types";

export const getMockCourses = (): Course[] => {
	return mockCourses;
};

export const getMockCourseById = (id: number): Course | null => {
	const mockCourse = mockCourses.find((course) => course.id === id.toString());
	if (mockCourse) return mockCourse;
	return null;
};
