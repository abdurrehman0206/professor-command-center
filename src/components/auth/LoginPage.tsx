// Login page component
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const LoginPage: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { login, isAuthenticated } = useAuth();
	const { toast } = useToast();

	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace />;
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const success = await login(email, password);
			if (success) {
				toast({
					title: "Login successful",
					description: "Welcome to the University Dashboard",
				});
			} else {
				toast({
					title: "Login failed",
					description: "Invalid email or password",
					variant: "destructive",
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Something went wrong. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center text-blue-900">
						University Portal
					</CardTitle>
					<CardDescription className="text-center">
						Sign in to access the assignment dashboard
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="professor@university.edu"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className="text-sm text-muted-foreground bg-muted p-3 rounded">
							<strong>Demo credentials:</strong>
							<br />
							Email: john.doe@university.edu
							<br />
							Password: password
						</div>
					</CardContent>
					<CardFooter>
						<Button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700"
							disabled={isLoading}
						>
							{isLoading ? "Signing in..." : "Sign In"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
};

export default LoginPage;
