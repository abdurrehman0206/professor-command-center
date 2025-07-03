import {
	getMockSubmissions,
	updateMockSubmission,
} from "@/services/mockSubmissionsService";
import { SubmissionInput } from "@/types";

export const mockSubmissionsResolvers = {
	Query: {
		getMockSubmissions: (_: unknown) => {
			return getMockSubmissions();
		},
	},
	Mutation: {
		updateMockSubmission: (
			_: unknown,
			{ input }: { input: SubmissionInput },
		) => {
			return updateMockSubmission(input);
		},
	},
};
