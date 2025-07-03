import {
	getMockAssignments,
	getMockAssignmentById,
	createMockAssignment,
} from "@/services/mockAssignmentsService";
import { AssignmentInput } from "@/types";

export const mockAssignmentsResolvers = {
	Query: {
		getMockAssignments: (_: unknown) => {
			return getMockAssignments();
		},
		getMockAssignmentById: (_: unknown, { id }: { id: number }) => {
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
