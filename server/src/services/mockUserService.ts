import { mockUser } from "../data/mockData.js";
import { User } from "../types";

export const getMockUserById = (id: number): User | null => {
	if (mockUser.id === id.toString()) return mockUser;
	return null;
};
