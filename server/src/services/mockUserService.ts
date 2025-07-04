import { mockUser } from "../data/mockData.js";
import { User } from "../types";

export const getMockUserById = (id: string): User | null => {
	if (mockUser.id === id) return mockUser;
	return null;
};
