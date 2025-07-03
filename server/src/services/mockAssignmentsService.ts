import { mockAssignments } from "../data/mockData.js";
import { Assignment, AssignmentInput } from "../types";

export const getMockAssignments = (): Assignment[] => {
	return mockAssignments;
};

export const getMockAssignmentById = (id: number): Assignment | null => {
	const mockAssignment = mockAssignments.find(
		(assignment) => assignment.id === id.toString(),
	);
	if (mockAssignment) return mockAssignment;
	return null;
};

export const createMockAssignment = (input: AssignmentInput): Assignment => {
	const newId = (mockAssignments.length + 1).toString();
	const newAssignment: Assignment = {
		id: newId,
		...input,
		totalSubmissions: 0,
		lateSubmissions: 0,
	};
	mockAssignments.push(newAssignment);
	return newAssignment;
};
