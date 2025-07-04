// Application context for managing global state
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import {
	Course,
	Student,
	Assignment,
	Submission,
	Notification,
	AssignmentInput,
	SubmissionInput,
	AnalyticsData,
} from "@/types";
import {
	mockCourses,
	mockStudents,
	mockAssignments,
	mockSubmissions,
	mockNotifications,
} from "@/data/mockData";
import { useMutation, useQuery } from "@apollo/client";
import { GET_MOCK_ASSIGNMENT } from "@/graphql/queries/mockAssignmentsQueries";
import { GET_MOCK_COURSES } from "@/graphql/queries/mockCoursesQueries";
import { GET_MOCK_STUDENTS } from "@/graphql/queries/mockStudentsQueries";
import { GET_MOCK_SUBMISSIONS } from "@/graphql/queries/mockSubmissionsQueries";
import { GET_MOCK_NOTIFICATIONS } from "@/graphql/queries/mockNotificationsQueries";
import { CREATE_MOCK_ASSIGNMENT } from "@/graphql/mutations/mockAssignmentsMutations";
import { MARK_MOCK_NOTIFICATION_AS_READ } from "@/graphql/mutations/mockNotificationsMutations";
import { UPDATE_MOCK_SUBMISSIONS } from "@/graphql/mutations/mockSubmissionsMutations";
import { GET_MOCK_ANALYTICS } from "@/graphql/queries/mockAnalyticsQueries";

interface AppContextType {
	selectedCourse: Course | null;
	courses: Course[];
	students: Student[];
	assignments: Assignment[];
	submissions: Submission[];
	notifications: Notification[];
	analytics: AnalyticsData;
	setSelectedCourse: (course: Course) => void;
	updateSubmission: (submission: SubmissionInput) => void;
	addAssignment: (assignment: AssignmentInput) => void;
	markNotificationAsRead: (notificationId: string) => void;
	getStudentsForCourse: (courseId: string) => Student[];
	getAssignmentsForCourse: (courseId: string) => Assignment[];
	getSubmissionsForAssignment: (assignmentId: string) => Submission[];
	getSubmissionForStudent: (
		assignmentId: string,
		studentId: string,
	) => Submission | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useApp must be used within an AppProvider");
	}
	return context;
};

interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const {
		data: mockCourses,
		error: mockCoursersError,
		loading: mockCoursesLoading,
	} = useQuery(GET_MOCK_COURSES);
	const {
		data: mockStudents,
		error: mockStudentsError,
		loading: mockStudentsLoading,
	} = useQuery(GET_MOCK_STUDENTS);
	const {
		data: mockAssignments,
		error: mockAssignmentsError,
		loading: mockAssignmentsLoading,
	} = useQuery(GET_MOCK_ASSIGNMENT);
	const {
		data: mockSubmissions,
		error: mockSubmissionsError,
		loading: mockSubmissionsLoading,
	} = useQuery(GET_MOCK_SUBMISSIONS);
	const {
		data: mockNotifications,
		error: mockNotificationsError,
		loading: mockNotificationsLoading,
	} = useQuery(GET_MOCK_NOTIFICATIONS);

	const {
		data: mockAnalytics,
		error: mockAnalyticsError,
		loading: mockAnalyticsLoading,
	} = useQuery(GET_MOCK_ANALYTICS);

	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
	const [courses, setCourses] = useState<Course[]>([]);
	const [students, setStudents] = useState<Student[]>([]);
	const [assignments, setAssignments] = useState<Assignment[]>([]);
	const [submissions, setSubmissions] = useState<Submission[]>([]);
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

	useEffect(() => {
		if (mockAssignments?.getMockAssignments) {
			setAssignments(mockAssignments.getMockAssignments);
		}
		if (mockCourses?.getMockCourses) {
			setCourses(mockCourses.getMockCourses);
			setSelectedCourse(mockCourses.getMockCourses[0]);
		}
		if (mockStudents?.getMockStudents) {
			setStudents(mockStudents.getMockStudents);
		}
		if (mockSubmissions?.getMockSubmissions) {
			setSubmissions(mockSubmissions.getMockSubmissions);
		}
		if (mockNotifications?.getMockNotifications) {
			setNotifications(mockNotifications.getMockNotifications);
		}
		if (mockAnalytics?.getMockAnalytics) {
			setAnalytics(mockAnalytics.getMockAnalytics);
		}
	}, [
		mockAssignments,
		mockCourses,
		mockStudents,
		mockSubmissions,
		mockNotifications,
		mockAnalytics,
	]);
	const [
		updateMockSubmission,
		{
			data: updateMockSubmissionData,
			error: updateMockSubmissionError,
			loading: updateMockSubmissionLoading,
		},
	] = useMutation(UPDATE_MOCK_SUBMISSIONS);
	const updateSubmission = async (updatedSubmission: SubmissionInput) => {
		console.log(updatedSubmission);
		try {
			const { data } = await updateMockSubmission({
				variables: {
					input: {
						id: updatedSubmission.id,
						grade: updatedSubmission.grade,
						feedback: updatedSubmission.feedback,
						status: updatedSubmission.status,
					},
				},
			});
			setSubmissions((prev) =>
				prev.map((sub) =>
					sub.id === updatedSubmission.id ? data.updateMockSubmission : sub,
				),
			);
		} catch (err) {
			console.error("Failed to update submission:", err);
			if (err.graphQLErrors) {
				err.graphQLErrors.forEach((e: any) =>
					console.error("GraphQL error:", e.message, e.extensions),
				);
			}
		}
	};

	const [
		createMockAssignment,
		{
			data: createMockAssignmentData,
			loading: createMockAssignmentLoading,
			error: createMockAssignmentError,
		},
	] = useMutation(CREATE_MOCK_ASSIGNMENT);
	const addAssignment = async (assignment: AssignmentInput) => {
		try {
			const { data } = await createMockAssignment({
				variables: {
					input: assignment,
				},
			});
			setAssignments((prev) => [...prev, data?.createMockAssignment]);
		} catch (err) {
			console.error("Failed to create assignment : ", err);
		}
	};

	const [
		markMockNotificationAsRead,
		{
			data: markMockNotificationAsReadData,
			error: markMockNotificationAsReadError,
			loading: markMockNotificationAsReadLoading,
		},
	] = useMutation(MARK_MOCK_NOTIFICATION_AS_READ);

	const markNotificationAsRead = async (notificationId: string) => {
		try {
			const { data } = await markMockNotificationAsRead({
				variables: {
					markMockNotificationAsReadId: notificationId,
				},
			});
			setNotifications((prev) =>
				prev.map((notification) =>
					notification.id === notificationId
						? { ...notification, read: true }
						: notification,
				),
			);
		} catch (err) {
			console.error("Failed to mark as read : ", err);
		}
	};

	const getStudentsForCourse = (courseId: string) => {
		return students.filter((student) => student.courseId === courseId);
	};

	const getAssignmentsForCourse = (courseId: string) => {
		return assignments.filter((assignment) => assignment.courseId === courseId);
	};

	const getSubmissionsForAssignment = (assignmentId: string) => {
		return submissions.filter(
			(submission) => submission.assignmentId === assignmentId,
		);
	};

	const getSubmissionForStudent = (assignmentId: string, studentId: string) => {
		return submissions.find(
			(submission) =>
				submission.assignmentId === assignmentId &&
				submission.studentId === studentId,
		);
	};

	return (
		<AppContext.Provider
			value={{
				selectedCourse,
				courses,
				students,
				assignments,
				submissions,
				notifications,
				analytics,
				setSelectedCourse,
				updateSubmission,
				addAssignment,
				markNotificationAsRead,
				getStudentsForCourse,
				getAssignmentsForCourse,
				getSubmissionsForAssignment,
				getSubmissionForStudent,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
