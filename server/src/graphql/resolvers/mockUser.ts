import { getMockUserById } from "../../services/mockUserService.js";

export const mockUserResolvers = {
	Query: {
		getMockUserById: (_: unknown, { id }: { id: string }) => {
			return getMockUserById(id);
		},
	},
};
