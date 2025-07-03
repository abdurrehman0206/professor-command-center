// Mock data for the university dashboard
import {
	User,
	Course,
	Student,
	Assignment,
	Submission,
	Notification,
	AnalyticsData,
} from "@/types";

export let mockUser: User = {
	id: "1",
	name: "Professor John Doe",
	email: "john.doe@university.edu",
	role: "professor",
};

export let mockCourses: Course[] = [
	{
		id: "1",
		code: "CS101",
		name: "Introduction to Computer Science",
		semester: "Fall",
		year: 2024,
	},
	{
		id: "2",
		code: "ENG205",
		name: "Advanced English Composition",
		semester: "Fall",
		year: 2024,
	},
	{
		id: "3",
		code: "MATH301",
		name: "Calculus III",
		semester: "Fall",
		year: 2024,
	},
];

export let mockStudents: Student[] = [
	{
		id: "1",
		name: "Alice Johnson",
		email: "alice.j@student.edu",
		courseId: "1",
	},
	{ id: "2", name: "Bob Smith", email: "bob.s@student.edu", courseId: "1" },
	{ id: "3", name: "Carol Davis", email: "carol.d@student.edu", courseId: "1" },
	{
		id: "4",
		name: "David Wilson",
		email: "david.w@student.edu",
		courseId: "1",
	},
	{ id: "5", name: "Emma Brown", email: "emma.b@student.edu", courseId: "2" },
	{
		id: "6",
		name: "Frank Miller",
		email: "frank.m@student.edu",
		courseId: "2",
	},
	{
		id: "7",
		name: "Grace Taylor",
		email: "grace.t@student.edu",
		courseId: "3",
	},
	{
		id: "8",
		name: "Henry Anderson",
		email: "henry.a@student.edu",
		courseId: "3",
	},
];

export let mockAssignments: Assignment[] = [
	{
		id: "1",
		title: "Hello World Program",
		description: "Create a simple Hello World program in Java",
		dueDate: "2024-12-15T23:59:00",
		courseId: "1",
		status: "open",
		totalSubmissions: 3,
		lateSubmissions: 1,
	},
	{
		id: "2",
		title: "Data Structures Lab",
		description: "Implement basic data structures",
		dueDate: "2024-12-20T23:59:00",
		courseId: "1",
		status: "open",
		totalSubmissions: 2,
		lateSubmissions: 0,
	},
	{
		id: "3",
		title: "Essay on Modern Literature",
		description: "Write a 5-page essay on contemporary themes",
		dueDate: "2024-12-10T23:59:00",
		courseId: "2",
		status: "closed",
		totalSubmissions: 2,
		lateSubmissions: 1,
	},
	{
		id: "4",
		title: "Calculus Problem Set",
		description: "Solve integration problems",
		dueDate: "2024-12-25T23:59:00",
		courseId: "3",
		status: "draft",
		totalSubmissions: 0,
		lateSubmissions: 0,
	},
];

export let mockSubmissions: Submission[] = [
	{
		id: "1",
		assignmentId: "1",
		studentId: "1",
		submittedAt: "2024-12-14T14:30:00",
		isLate: false,
		grade: 95,
		feedback: "Excellent work! Clean code and good documentation.",
		fileUrl: "hello-world-alice.java",
		status: "graded",
	},
	{
		id: "2",
		assignmentId: "1",
		studentId: "2",
		submittedAt: "2024-12-16T10:15:00",
		isLate: true,
		grade: 85,
		feedback: "Good work but submitted late.",
		fileUrl: "hello-world-bob.java",
		status: "graded",
	},
	{
		id: "3",
		assignmentId: "1",
		studentId: "3",
		submittedAt: "2024-12-15T20:45:00",
		isLate: false,
		status: "submitted",
	},
	{
		id: "4",
		assignmentId: "2",
		studentId: "1",
		submittedAt: "2024-12-19T16:20:00",
		isLate: false,
		status: "submitted",
	},
	{
		id: "5",
		assignmentId: "2",
		studentId: "2",
		submittedAt: "2024-12-18T22:10:00",
		isLate: false,
		grade: 92,
		feedback: "Great implementation of linked list!",
		status: "graded",
	},
	{
		id: "6",
		assignmentId: "3",
		studentId: "5",
		submittedAt: "2024-12-09T18:30:00",
		isLate: false,
		grade: 88,
		feedback: "Well-structured essay with good analysis.",
		status: "graded",
	},
	{
		id: "7",
		assignmentId: "3",
		studentId: "6",
		submittedAt: "2024-12-11T09:15:00",
		isLate: true,
		grade: 78,
		feedback: "Good content but needs better organization.",
		status: "graded",
	},
];

export let mockNotifications: Notification[] = [
	{
		id: "1",
		message: 'Assignment "Hello World Program" due tomorrow',
		type: "warning",
		timestamp: "2024-12-14T09:00:00",
		read: false,
	},
	{
		id: "2",
		message: "Student Alice Johnson submitted assignment early",
		type: "success",
		timestamp: "2024-12-14T14:30:00",
		read: false,
	},
	{
		id: "3",
		message: "Student Bob Smith submitted late",
		type: "warning",
		timestamp: "2024-12-16T10:15:00",
		read: true,
	},
	{
		id: "4",
		message: "3 assignments pending grading",
		type: "info",
		timestamp: "2024-12-16T15:00:00",
		read: false,
	},
];

export let mockAnalytics: AnalyticsData = {
	submissionRates: {
		onTime: 65,
		late: 20,
		missing: 15,
	},
	gradeDistribution: [
		{ grade: "A (90-100)", count: 8 },
		{ grade: "B (80-89)", count: 12 },
		{ grade: "C (70-79)", count: 6 },
		{ grade: "D (60-69)", count: 2 },
		{ grade: "F (0-59)", count: 1 },
	],
	assignmentCompletion: [
		{ assignment: "Hello World", completion: 75 },
		{ assignment: "Data Structures", completion: 50 },
		{ assignment: "Literature Essay", completion: 100 },
		{ assignment: "Calculus Problems", completion: 0 },
	],
};
