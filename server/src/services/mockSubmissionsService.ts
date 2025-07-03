import { mockSubmissions } from "../data/mockData.js";
import { Submission, SubmissionInput } from "../types";

export const getMockSubmissions = (): Submission[] => {
	return mockSubmissions;
};

export const updateMockSubmission = (
	input: SubmissionInput,
): Submission | null => {
	const { id, grade, feedback } = input;
	const mockSubmissionIndex = mockSubmissions.findIndex(
		(submission) => submission.id === id.toString(),
	);
	if (mockSubmissionIndex !== -1) {
		mockSubmissions[mockSubmissionIndex] = {
			...mockSubmissions[mockSubmissionIndex],
			grade,
			feedback,
		};
		return mockSubmissions[mockSubmissionIndex];
	}
	return null;
};
