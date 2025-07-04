// Type definitions for the university dashboard

export interface User {
	id: string;
	name: string;
	email: string;
	role: "professor" | "admin";
}

export interface Course {
	id: string;
	code: string;
	name: string;
	semester: string;
	year: number;
}

export interface Student {
	id: string;
	name: string;
	email: string;
	courseId: string;
}

export interface Assignment {
	id: string;
	title: string;
	description: string;
	dueDate: string;
	courseId: string;
	status: "draft" | "open" | "closed";
	totalSubmissions: number;
	lateSubmissions: number;
}

export interface Submission {
	id: string;
	assignmentId: string;
	studentId: string;
	submittedAt: string;
	isLate: boolean;
	grade?: number;
	feedback?: string;
	fileUrl?: string;
	status: "submitted" | "graded";
}

export interface Notification {
	id: string;
	message: string;
	type: "info" | "warning" | "success";
	timestamp: string;
	read: boolean;
}

export interface AnalyticsData {
	submissionRates: {
		onTime: number;
		late: number;
		missing: number;
	};
	gradeDistribution: {
		grade: string;
		count: number;
	}[];
	assignmentCompletion: {
		assignment: string;
		completion: number;
	}[];
}

export interface SubmissionInput {
	id: string;
	grade: number;
	feedback: string;
}

export interface AssignmentInput {
	title: string;
	description: string;
	dueDate: string;
	courseId: string;
	status: "draft" | "open" | "closed";
}
