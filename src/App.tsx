import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppProvider } from "@/contexts/AppContext";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import LoginPage from "@/components/auth/LoginPage";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Assignments from "@/pages/Assignments";
import AssignmentDetail from "@/pages/AssignmentDetail";
import Students from "@/pages/Students";
import Analytics from "@/pages/Analytics";
import NotFound from "./pages/NotFound";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo/client";
const queryClient = new QueryClient();

const App = () => (
	<ApolloProvider client={client}>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem
				disableTransitionOnChange
			>
				<TooltipProvider>
					<AuthProvider>
						<AppProvider>
							<Toaster />
							<Sonner />
							<BrowserRouter>
								<Routes>
									<Route path="/" element={<Navigate to="/login" replace />} />
									<Route path="/login" element={<LoginPage />} />
									<Route path="/" element={<DashboardLayout />}>
										<Route path="dashboard" element={<Dashboard />} />
										<Route path="assignments" element={<Assignments />} />
										<Route
											path="assignments/:assignmentId"
											element={<AssignmentDetail />}
										/>
										<Route path="students" element={<Students />} />
										<Route path="analytics" element={<Analytics />} />
									</Route>
									<Route path="*" element={<NotFound />} />
								</Routes>
							</BrowserRouter>
						</AppProvider>
					</AuthProvider>
				</TooltipProvider>
			</ThemeProvider>
		</QueryClientProvider>
	</ApolloProvider>
);

export default App;
