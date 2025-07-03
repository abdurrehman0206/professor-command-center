import { mockStudents } from "@/data/mockData";
import { Student } from "@/types";

export const getMockStudents = (): Student[] => {
	return mockStudents;
};

export const getMockStudentById = (id: number): Student | null => {
	const mockStudent = mockStudents.find(
		(student) => student.id === id.toString(),
	);
	if (mockStudent) return mockStudent;
	return null;
};
