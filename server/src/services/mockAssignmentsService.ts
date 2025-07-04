import { mockAssignments } from "../data/mockData.js";
import { Assignment, AssignmentInput } from "../types";

export const getMockAssignments = (): Assignment[] => {
	return mockAssignments;
};

export const getMockAssignmentById = (id: string): Assignment | null => {
	const mockAssignment = mockAssignments.find(
		(assignment) => assignment.id === id,
	);
	if (mockAssignment) return mockAssignment;
	return null;
};

export const createMockAssignment = (input: AssignmentInput): Assignment => {
	const newId = mockAssignments.length + 1;
	const newAssignment: Assignment = {
		id: newId.toString(),
		...input,
		totalSubmissions: 0,
		lateSubmissions: 0,
	};
	mockAssignments.push(newAssignment);
	return newAssignment;
};
