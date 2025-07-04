// Assignments page with table and management
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Plus, FileText, Clock, Users, AlertTriangle } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { Assignment, AssignmentInput } from "@/types";
import { useToast } from "@/hooks/use-toast";

const Assignments: React.FC = () => {
	const { selectedCourse, getAssignmentsForCourse, addAssignment } = useApp();
	const { toast } = useToast();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [newAssignment, setNewAssignment] = useState({
		title: "",
		description: "",
		dueDate: "",
		status: "draft" as "draft" | "open" | "closed",
	});

	if (!selectedCourse) {
		return (
			<div className="text-center py-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">
					No Course Selected
				</h2>
				<p className="text-gray-600">
					Please select a course to view assignments.
				</p>
			</div>
		);
	}

	const assignments = getAssignmentsForCourse(selectedCourse.id);

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "open":
				return <Badge className="bg-green-100 text-green-800">Open</Badge>;
			case "closed":
				return <Badge className="bg-red-100 text-red-800">Closed</Badge>;
			case "draft":
				return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
			default:
				return <Badge variant="outline">{status}</Badge>;
		}
	};

	const formatDueDate = (dateString: string) => {
		const date = new Date(dateString);
		const now = new Date();
		const isOverdue = date < now;

		return (
			<div className={`flex flex-col ${isOverdue ? "text-red-600" : ""}`}>
				<span>{date.toLocaleDateString()}</span>
				<span className="text-xs text-muted-foreground">
					{date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
				</span>
			</div>
		);
	};

	const handleCreateAssignment = async () => {
		if (!newAssignment.title || !newAssignment.dueDate) {
			toast({
				title: "Error",
				description: "Please fill in all required fields",
				variant: "destructive",
			});
			return;
		}

		const assignment: AssignmentInput = {
			title: newAssignment.title,
			description: newAssignment.description,
			dueDate: newAssignment.dueDate,
			courseId: selectedCourse.id,
			status: newAssignment.status,

		};

		addAssignment(assignment);
		setIsDialogOpen(false);
		setNewAssignment({
			title: "",
			description: "",
			dueDate: "",
			status: "draft",
		});

		toast({
			title: "Success",
			description: "Assignment created successfully",
		});
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
					<p className="text-gray-600 mt-2">
						{selectedCourse.code} - {selectedCourse.name}
					</p>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button className="bg-blue-600 hover:bg-blue-700">
							<Plus className="h-4 w-4 mr-2" />
							New Assignment
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Create New Assignment</DialogTitle>
							<DialogDescription>
								Add a new assignment for {selectedCourse.code}
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div>
								<Label htmlFor="title">Title *</Label>
								<Input
									id="title"
									value={newAssignment.title}
									onChange={(e) =>
										setNewAssignment((prev) => ({
											...prev,
											title: e.target.value,
										}))
									}
									placeholder="Assignment title"
								/>
							</div>
							<div>
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									value={newAssignment.description}
									onChange={(e) =>
										setNewAssignment((prev) => ({
											...prev,
											description: e.target.value,
										}))
									}
									placeholder="Assignment description"
									rows={3}
								/>
							</div>
							<div>
								<Label htmlFor="dueDate">Due Date *</Label>
								<Input
									id="dueDate"
									type="datetime-local"
									value={newAssignment.dueDate}
									onChange={(e) =>
										setNewAssignment((prev) => ({
											...prev,
											dueDate: e.target.value,
										}))
									}
								/>
							</div>
							<div>
								<Label htmlFor="status">Status</Label>
								<Select
									value={newAssignment.status}
									onValueChange={(value: "draft" | "open" | "closed") =>
										setNewAssignment((prev) => ({ ...prev, status: value }))
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="draft">Draft</SelectItem>
										<SelectItem value="open">Open</SelectItem>
										<SelectItem value="closed">Closed</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<DialogFooter>
							<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
								Cancel
							</Button>
							<Button onClick={handleCreateAssignment}>
								Create Assignment
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			{/* Assignments Table */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<FileText className="h-5 w-5" />
						Course Assignments
					</CardTitle>
					<CardDescription>
						Manage assignments for {selectedCourse.code}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{assignments.length === 0 ? (
						<div className="text-center py-12">
							<FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								No assignments yet
							</h3>
							<p className="text-gray-600 mb-4">
								Create your first assignment to get started.
							</p>
							<Button
								onClick={() => setIsDialogOpen(true)}
								className="bg-blue-600 hover:bg-blue-700"
							>
								<Plus className="h-4 w-4 mr-2" />
								Create Assignment
							</Button>
						</div>
					) : (
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Title</TableHead>
										<TableHead>Due Date</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="text-center">Submissions</TableHead>
										<TableHead className="text-center">Late</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{assignments.map((assignment) => (
										<TableRow key={assignment.id}>
											<TableCell className="font-medium">
												<div>
													<div className="font-medium text-gray-900">
														{assignment.title}
													</div>
													{assignment.description && (
														<div className="text-sm text-gray-600 truncate max-w-xs">
															{assignment.description}
														</div>
													)}
												</div>
											</TableCell>
											<TableCell>{formatDueDate(assignment.dueDate)}</TableCell>
											<TableCell>{getStatusBadge(assignment.status)}</TableCell>
											<TableCell className="text-center">
												<div className="flex items-center justify-center gap-1">
													<Users className="h-4 w-4 text-gray-400" />
													{assignment.totalSubmissions}
												</div>
											</TableCell>
											<TableCell className="text-center">
												{assignment.lateSubmissions > 0 ? (
													<div className="flex items-center justify-center gap-1 text-red-600">
														<AlertTriangle className="h-4 w-4" />
														{assignment.lateSubmissions}
													</div>
												) : (
													<span className="text-gray-400">0</span>
												)}
											</TableCell>
											<TableCell>
												<div className="flex gap-2">
													<Button asChild variant="outline" size="sm">
														<Link to={`/assignments/${assignment.id}`}>
															View Details
														</Link>
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Assignments;
