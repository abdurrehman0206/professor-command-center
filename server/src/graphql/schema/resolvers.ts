import { mockUserResolvers } from "../resolvers/mockUser";
import { mockSubmissionsResolvers } from "../resolvers/mockSubmissions";
import { mockStudentsResolvers } from "../resolvers/mockStudents";
import { mockNotificationsResolvers } from "../resolvers/mockNotifications";
import { mockCoursesResolvers } from "../resolvers/mockCourses";
import { mockAssignmentsResolvers } from "../resolvers/mockAssignments";
import { mockAnalyticsResolvers } from "../resolvers/mockAnalytics";

const resolvers = {
	Query: {
		...mockAnalyticsResolvers.Query,
		...mockAssignmentsResolvers.Query,
		...mockCoursesResolvers.Query,
		...mockNotificationsResolvers.Query,
		...mockStudentsResolvers.Query,
		...mockSubmissionsResolvers.Query,
		...mockUserResolvers.Query,
	},
	Mutation: {
		...mockAssignmentsResolvers.Mutation,
		...mockNotificationsResolvers.Mutation,
		...mockSubmissionsResolvers.Mutation,
	},
};

export default resolvers;
