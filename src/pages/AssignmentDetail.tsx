// Assignment detail page with student submissions
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ArrowLeft, 
  Download, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  FileText,
  Users
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Submission } from '@/types';

const AssignmentDetail: React.FC = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const { 
    selectedCourse, 
    assignments, 
    getStudentsForCourse, 
    getSubmissionsForAssignment,
    getSubmissionForStudent,
    updateSubmission 
  } = useApp();
  const { toast } = useToast();
  
  const [filter, setFilter] = useState<'all' | 'submitted' | 'missing' | 'late'>('all');
  const [grades, setGrades] = useState<{ [key: string]: string }>({});
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

  if (!assignmentId || !selectedCourse) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Assignment Not Found
        </h2>
        <Button asChild variant="outline">
          <Link to="/assignments">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Assignments
          </Link>
        </Button>
      </div>
    );
  }

  const assignment = assignments.find(a => a.id === assignmentId);
  if (!assignment) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Assignment Not Found
        </h2>
        <Button asChild variant="outline">
          <Link to="/assignments">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Assignments
          </Link>
        </Button>
      </div>
    );
  }

  const students = getStudentsForCourse(selectedCourse.id);
  const submissions = getSubmissionsForAssignment(assignmentId);

  const getStudentData = () => {
    return students.map(student => {
      const submission = getSubmissionForStudent(assignmentId, student.id);
      return {
        student,
        submission,
        status: submission 
          ? (submission.isLate ? 'late' : 'submitted')
          : 'missing'
      };
    });
  };

  const studentData = getStudentData();
  
  const filteredData = studentData.filter(data => {
    if (filter === 'all') return true;
    return data.status === filter;
  });

  const stats = {
    total: students.length,
    submitted: studentData.filter(d => d.submission).length,
    missing: studentData.filter(d => !d.submission).length,
    late: studentData.filter(d => d.submission?.isLate).length,
    graded: studentData.filter(d => d.submission?.status === 'graded').length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Submitted
          </Badge>
        );
      case 'late':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Late
          </Badge>
        );
      case 'missing':
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Missing
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleGradeChange = (submissionId: string, grade: string) => {
    setGrades(prev => ({ ...prev, [submissionId]: grade }));
  };

  const handleFeedbackChange = (submissionId: string, feedbackText: string) => {
    setFeedback(prev => ({ ...prev, [submissionId]: feedbackText }));
  };

  const handleSaveGrade = (submission: Submission) => {
    const gradeValue = parseFloat(grades[submission.id] || submission.grade?.toString() || '');
    const feedbackText = feedback[submission.id] || submission.feedback || '';

    if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 100) {
      toast({
        title: "Invalid Grade",
        description: "Please enter a grade between 0 and 100",
        variant: "destructive",
      });
      return;
    }

    const updatedSubmission: Submission = {
      ...submission,
      grade: gradeValue,
      feedback: feedbackText,
      status: 'graded'
    };

    updateSubmission(updatedSubmission);
    
    // Clear local state
    setGrades(prev => ({ ...prev, [submission.id]: '' }));
    setFeedback(prev => ({ ...prev, [submission.id]: '' }));

    toast({
      title: "Grade Saved",
      description: "Grade and feedback have been saved successfully",
    });
  };

  const handleMarkAllGraded = () => {
    const ungradedSubmissions = submissions.filter(sub => sub.status !== 'graded');
    
    ungradedSubmissions.forEach(submission => {
      const updatedSubmission: Submission = {
        ...submission,
        status: 'graded'
      };
      updateSubmission(updatedSubmission);
    });

    toast({
      title: "Bulk Update Complete",
      description: `Marked ${ungradedSubmissions.length} submissions as graded`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/assignments">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{assignment.title}</h1>
            <p className="text-gray-600 mt-1">
              {selectedCourse.code} • Due: {new Date(assignment.dueDate).toLocaleString()}
            </p>
          </div>
        </div>
        
        {stats.submitted > stats.graded && (
          <Button onClick={handleMarkAllGraded} variant="outline">
            Mark All as Graded
          </Button>
        )}
      </div>

      {/* Assignment Description */}
      {assignment.description && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Assignment Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{assignment.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.submitted}</div>
            <div className="text-sm text-gray-600">Submitted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.missing}</div>
            <div className="text-sm text-gray-600">Missing</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
            <div className="text-sm text-gray-600">Late</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.graded}</div>
            <div className="text-sm text-gray-600">Graded</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Student Submissions
            </CardTitle>
            <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="missing">Missing</SelectItem>
                <SelectItem value="late">Late</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Feedback</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map(({ student, submission, status }) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-600">{student.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(status)}</TableCell>
                    <TableCell>
                      {submission ? (
                        <div className="text-sm">
                          <div>{new Date(submission.submittedAt).toLocaleDateString()}</div>
                          <div className="text-gray-500">
                            {new Date(submission.submittedAt).toLocaleTimeString()}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Not submitted</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {submission ? (
                        <div className="w-20">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="Grade"
                            value={grades[submission.id] || submission.grade || ''}
                            onChange={(e) => handleGradeChange(submission.id, e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {submission ? (
                        <div className="w-48">
                          <Textarea
                            placeholder="Feedback..."
                            value={feedback[submission.id] || submission.feedback || ''}
                            onChange={(e) => handleFeedbackChange(submission.id, e.target.value)}
                            rows={2}
                            className="text-sm"
                          />
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {submission && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSaveGrade(submission)}
                              disabled={submission.status === 'graded' && 
                                !grades[submission.id] && !feedback[submission.id]}
                            >
                              Save Grade
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentDetail;