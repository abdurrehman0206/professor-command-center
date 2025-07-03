import { getMockUserById } from "@/services/mockUserService";

export const mockUserResolvers = {
	Query: {
		getMockUserById: (_: unknown, { id }: { id: number }) => {
			return getMockUserById(id);
		},
	},
};
