// Students overview page
import React, { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Users, Search, FileText, GraduationCap, Clock } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Student, Submission } from '@/types';

const Students: React.FC = () => {
  const { 
    selectedCourse, 
    getStudentsForCourse, 
    getAssignmentsForCourse, 
    submissions 
  } = useApp();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  if (!selectedCourse) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          No Course Selected
        </h2>
        <p className="text-gray-600">Please select a course to view students.</p>
      </div>
    );
  }

  const students = getStudentsForCourse(selectedCourse.id);
  const assignments = getAssignmentsForCourse(selectedCourse.id);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStudentStats = (student: Student) => {
    const studentSubmissions = submissions.filter(sub => 
      sub.studentId === student.id &&
      assignments.some(assignment => assignment.id === sub.assignmentId)
    );

    const totalAssignments = assignments.length;
    const submittedCount = studentSubmissions.length;
    const missingCount = totalAssignments - submittedCount;
    
    const gradedSubmissions = studentSubmissions.filter(sub => sub.grade !== undefined);
    const averageGrade = gradedSubmissions.length > 0
      ? gradedSubmissions.reduce((sum, sub) => sum + (sub.grade || 0), 0) / gradedSubmissions.length
      : null;

    return {
      submitted: submittedCount,
      missing: missingCount,
      total: totalAssignments,
      averageGrade,
      submissions: studentSubmissions
    };
  };

  const getStudentSubmissionHistory = (student: Student) => {
    const studentSubmissions = submissions.filter(sub => 
      sub.studentId === student.id &&
      assignments.some(assignment => assignment.id === sub.assignmentId)
    );

    return assignments.map(assignment => {
      const submission = studentSubmissions.find(sub => sub.assignmentId === assignment.id);
      return {
        assignment,
        submission,
        status: submission 
          ? (submission.isLate ? 'late' : 'submitted')
          : 'missing'
      };
    });
  };

  const getGradeColor = (grade: number | null) => {
    if (grade === null) return 'text-gray-400';
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatGrade = (grade: number | null) => {
    if (grade === null) return 'N/A';
    return `${grade.toFixed(1)}%`;
  };

  const getStatusBadge = (status: string, submission?: Submission) => {
    switch (status) {
      case 'submitted':
        return (
          <Badge className="bg-green-100 text-green-800">
            {submission?.status === 'graded' ? 'Graded' : 'Submitted'}
          </Badge>
        );
      case 'late':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            {submission?.status === 'graded' ? 'Graded (Late)' : 'Late'}
          </Badge>
        );
      case 'missing':
        return (
          <Badge className="bg-red-100 text-red-800">
            Missing
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Students</h1>
        <p className="text-gray-600 mt-2">
          {selectedCourse.code} - {selectedCourse.name}
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search students by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Course Enrollment ({filteredStudents.length} students)
          </CardTitle>
          <CardDescription>
            Student progress and submission overview
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredStudents.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'No students found' : 'No students enrolled'}
              </h3>
              <p className="text-gray-600">
                {searchTerm 
                  ? 'Try adjusting your search terms.'
                  : 'Students will appear here once they are enrolled in the course.'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead className="text-center">Submitted</TableHead>
                    <TableHead className="text-center">Missing</TableHead>
                    <TableHead className="text-center">Average Grade</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => {
                    const stats = getStudentStats(student);
                    return (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-600">{student.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <FileText className="h-4 w-4 text-green-600" />
                            <span className="font-medium">
                              {stats.submitted}/{stats.total}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {stats.missing > 0 ? (
                            <div className="flex items-center justify-center gap-1 text-red-600">
                              <Clock className="h-4 w-4" />
                              <span className="font-medium">{stats.missing}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">0</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`font-medium ${getGradeColor(stats.averageGrade)}`}>
                            {formatGrade(stats.averageGrade)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedStudent(student)}
                              >
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <GraduationCap className="h-5 w-5" />
                                  {student.name}
                                </DialogTitle>
                                <DialogDescription>
                                  {student.email} • {selectedCourse.code}
                                </DialogDescription>
                              </DialogHeader>
                              
                              {selectedStudent && (
                                <div className="space-y-6">
                                  {/* Student Stats */}
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                      <div className="text-2xl font-bold text-blue-600">
                                        {getStudentStats(selectedStudent).submitted}
                                      </div>
                                      <div className="text-sm text-gray-600">Submitted</div>
                                    </div>
                                    <div className="text-center p-4 bg-red-50 rounded-lg">
                                      <div className="text-2xl font-bold text-red-600">
                                        {getStudentStats(selectedStudent).missing}
                                      </div>
                                      <div className="text-sm text-gray-600">Missing</div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                      <div className={`text-2xl font-bold ${getGradeColor(getStudentStats(selectedStudent).averageGrade)}`}>
                                        {formatGrade(getStudentStats(selectedStudent).averageGrade)}
                                      </div>
                                      <div className="text-sm text-gray-600">Average</div>
                                    </div>
                                  </div>

                                  {/* Submission History */}
                                  <div>
                                    <h4 className="text-lg font-medium mb-4">Submission History</h4>
                                    <div className="space-y-3">
                                      {getStudentSubmissionHistory(selectedStudent).map(({ assignment, submission, status }) => (
                                        <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                                          <div className="flex-1">
                                            <div className="font-medium text-gray-900">{assignment.title}</div>
                                            <div className="text-sm text-gray-600">
                                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-4">
                                            {getStatusBadge(status, submission)}
                                            {submission?.grade !== undefined && (
                                              <div className={`font-medium ${getGradeColor(submission.grade)}`}>
                                                {formatGrade(submission.grade)}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Students;