import { mockUserResolvers } from "../resolvers/mockUser.js";
import { mockSubmissionsResolvers } from "../resolvers/mockSubmissions.js";
import { mockStudentsResolvers } from "../resolvers/mockStudents.js";
import { mockNotificationsResolvers } from "../resolvers/mockNotifications.js";
import { mockCoursesResolvers } from "../resolvers/mockCourses.js";
import { mockAssignmentsResolvers } from "../resolvers/mockAssignments.js";
import { mockAnalyticsResolvers } from "../resolvers/mockAnalytics.js";

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
