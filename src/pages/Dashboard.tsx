// Main dashboard page
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { 
    selectedCourse, 
    getStudentsForCourse, 
    getAssignmentsForCourse, 
    submissions 
  } = useApp();

  if (!selectedCourse) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to the University Dashboard
        </h2>
        <p className="text-gray-600">Please select a course to continue.</p>
      </div>
    );
  }

  const courseStudents = getStudentsForCourse(selectedCourse.id);
  const courseAssignments = getAssignmentsForCourse(selectedCourse.id);
  
  const totalSubmissions = submissions.filter(sub => 
    courseAssignments.some(assignment => assignment.id === sub.assignmentId)
  ).length;
  
  const gradedSubmissions = submissions.filter(sub => 
    courseAssignments.some(assignment => assignment.id === sub.assignmentId) && 
    sub.status === 'graded'
  ).length;

  const pendingGrading = totalSubmissions - gradedSubmissions;
  const lateSubmissions = submissions.filter(sub => 
    courseAssignments.some(assignment => assignment.id === sub.assignmentId) && 
    sub.isLate
  ).length;

  const stats = [
    {
      title: 'Total Students',
      value: courseStudents.length,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Assignments',
      value: courseAssignments.filter(a => a.status === 'open').length,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Pending Grading',
      value: pendingGrading,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Late Submissions',
      value: lateSubmissions,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const recentAssignments = courseAssignments
    .filter(a => a.status === 'open')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          {selectedCourse.code} - {selectedCourse.name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Assignments and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Upcoming Assignments
            </CardTitle>
            <CardDescription>
              Assignments due soon for {selectedCourse.code}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentAssignments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No upcoming assignments
              </p>
            ) : (
              <div className="space-y-4">
                {recentAssignments.map((assignment) => (
                  <div 
                    key={assignment.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {assignment.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {assignment.totalSubmissions} submissions
                        </Badge>
                        {assignment.lateSubmissions > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {assignment.lateSubmissions} late
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm"
                    >
                      <Link to={`/assignments/${assignment.id}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks for course management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/assignments">
                <FileText className="h-4 w-4 mr-2" />
                Manage Assignments
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/students">
                <Users className="h-4 w-4 mr-2" />
                View Students
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/analytics">
                <BookOpen className="h-4 w-4 mr-2" />
                Course Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;