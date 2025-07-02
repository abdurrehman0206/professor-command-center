// Analytics page with charts and visualizations
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  FileText,
  Clock,
  Award
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { mockAnalytics } from '@/data/mockData';

const Analytics: React.FC = () => {
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
          No Course Selected
        </h2>
        <p className="text-gray-600">Please select a course to view analytics.</p>
      </div>
    );
  }

  const students = getStudentsForCourse(selectedCourse.id);
  const assignments = getAssignmentsForCourse(selectedCourse.id);
  const courseSubmissions = submissions.filter(sub => 
    assignments.some(assignment => assignment.id === sub.assignmentId)
  );

  // Calculate real analytics from current data
  const totalPossibleSubmissions = students.length * assignments.length;
  const actualSubmissions = courseSubmissions.length;
  const lateSubmissions = courseSubmissions.filter(sub => sub.isLate).length;
  const onTimeSubmissions = actualSubmissions - lateSubmissions;
  const missingSubmissions = totalPossibleSubmissions - actualSubmissions;

  const submissionRate = totalPossibleSubmissions > 0 
    ? Math.round((actualSubmissions / totalPossibleSubmissions) * 100)
    : 0;

  const gradedSubmissions = courseSubmissions.filter(sub => sub.grade !== undefined);
  const averageGrade = gradedSubmissions.length > 0
    ? gradedSubmissions.reduce((sum, sub) => sum + (sub.grade || 0), 0) / gradedSubmissions.length
    : 0;

  // Grade distribution
  const gradeDistribution = [
    { 
      grade: 'A (90-100)', 
      count: gradedSubmissions.filter(sub => (sub.grade || 0) >= 90).length,
      color: 'bg-green-500'
    },
    { 
      grade: 'B (80-89)', 
      count: gradedSubmissions.filter(sub => (sub.grade || 0) >= 80 && (sub.grade || 0) < 90).length,
      color: 'bg-blue-500'
    },
    { 
      grade: 'C (70-79)', 
      count: gradedSubmissions.filter(sub => (sub.grade || 0) >= 70 && (sub.grade || 0) < 80).length,
      color: 'bg-yellow-500'
    },
    { 
      grade: 'D (60-69)', 
      count: gradedSubmissions.filter(sub => (sub.grade || 0) >= 60 && (sub.grade || 0) < 70).length,
      color: 'bg-orange-500'
    },
    { 
      grade: 'F (0-59)', 
      count: gradedSubmissions.filter(sub => (sub.grade || 0) < 60).length,
      color: 'bg-red-500'
    },
  ];

  // Assignment completion rates
  const assignmentCompletion = assignments.map(assignment => {
    const assignmentSubmissions = courseSubmissions.filter(sub => sub.assignmentId === assignment.id);
    const completionRate = students.length > 0 
      ? Math.round((assignmentSubmissions.length / students.length) * 100)
      : 0;
    
    return {
      assignment: assignment.title,
      completion: completionRate
    };
  });

  const stats = [
    {
      title: 'Course Overview',
      items: [
        { label: 'Total Students', value: students.length, icon: Users, color: 'text-blue-600' },
        { label: 'Total Assignments', value: assignments.length, icon: FileText, color: 'text-green-600' },
        { label: 'Submission Rate', value: `${submissionRate}%`, icon: TrendingUp, color: 'text-purple-600' },
        { label: 'Average Grade', value: `${averageGrade.toFixed(1)}%`, icon: Award, color: 'text-yellow-600' },
      ]
    }
  ];

  const maxGradeCount = Math.max(...gradeDistribution.map(g => g.count));
  const maxCompletionRate = Math.max(...assignmentCompletion.map(a => a.completion));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">
          {selectedCourse.code} - {selectedCourse.name}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats[0].items.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submission Rates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Submission Rates
            </CardTitle>
            <CardDescription>
              Distribution of submission statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-sm">On Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{onTimeSubmissions}</span>
                  <Badge variant="outline" className="text-xs">
                    {totalPossibleSubmissions > 0 ? Math.round((onTimeSubmissions / totalPossibleSubmissions) * 100) : 0}%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span className="text-sm">Late</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{lateSubmissions}</span>
                  <Badge variant="outline" className="text-xs">
                    {totalPossibleSubmissions > 0 ? Math.round((lateSubmissions / totalPossibleSubmissions) * 100) : 0}%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-sm">Missing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{missingSubmissions}</span>
                  <Badge variant="outline" className="text-xs">
                    {totalPossibleSubmissions > 0 ? Math.round((missingSubmissions / totalPossibleSubmissions) * 100) : 0}%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Grade Distribution
            </CardTitle>
            <CardDescription>
              Distribution of grades across all assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gradeDistribution.map((grade) => (
                <div key={grade.grade} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-600">
                    {grade.grade}
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${grade.color}`}
                        style={{ 
                          width: maxGradeCount > 0 ? `${(grade.count / maxGradeCount) * 100}%` : '0%' 
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8 text-right">
                      {grade.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Completion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Assignment Completion Rates
          </CardTitle>
          <CardDescription>
            Completion percentage for each assignment
          </CardDescription>
        </CardHeader>
        <CardContent>
          {assignmentCompletion.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No assignments available for analysis
            </div>
          ) : (
            <div className="space-y-4">
              {assignmentCompletion.map((item) => (
                <div key={item.assignment} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-gray-600 truncate">
                    {item.assignment}
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-blue-500"
                        style={{ width: `${item.completion}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">
                      {item.completion}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;