import {
	getMockAssignments,
	getMockAssignmentById,
	createMockAssignment,
} from "../../services/mockAssignmentsService.js";
import { AssignmentInput } from "../../types";

export const mockAssignmentsResolvers = {
	Query: {
		getMockAssignments: (_: unknown) => {
			return getMockAssignments();
		},
		getMockAssignmentById: (_: unknown, { id }: { id: string }) => {
			return getMockAssignmentById(id);
		},
	},
	Mutation: {
		createMockAssignment: (
			_: unknown,
			{ input }: { input: AssignmentInput },
		) => {
			return createMockAssignment(input);
		},
	},
};
