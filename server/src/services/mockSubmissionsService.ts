import { GraphQLError } from "graphql";
import { mockSubmissions } from "../data/mockData.js";
import { Submission, SubmissionInput } from "../types";

export const getMockSubmissions = (): Submission[] => {
	return mockSubmissions;
};

export const updateMockSubmission = (input: SubmissionInput): Submission => {
	const { id, grade, feedback, status } = input;
	const mockSubmissionIndex = mockSubmissions.findIndex(
		(submission) => submission.id === id,
	);
	if (mockSubmissionIndex !== -1) {
		mockSubmissions[mockSubmissionIndex] = {
			...mockSubmissions[mockSubmissionIndex],
			grade,
			feedback,
			status,
		};
		return mockSubmissions[mockSubmissionIndex];
	}
	throw new GraphQLError(`Submission with ID ${id} not found`);
};
