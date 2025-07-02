// Application context for managing global state
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course, Student, Assignment, Submission, Notification } from '@/types';
import { 
  mockCourses, 
  mockStudents, 
  mockAssignments, 
  mockSubmissions, 
  mockNotifications 
} from '@/data/mockData';

interface AppContextType {
  selectedCourse: Course | null;
  courses: Course[];
  students: Student[];
  assignments: Assignment[];
  submissions: Submission[];
  notifications: Notification[];
  setSelectedCourse: (course: Course) => void;
  updateSubmission: (submission: Submission) => void;
  addAssignment: (assignment: Assignment) => void;
  markNotificationAsRead: (notificationId: string) => void;
  getStudentsForCourse: (courseId: string) => Student[];
  getAssignmentsForCourse: (courseId: string) => Assignment[];
  getSubmissionsForAssignment: (assignmentId: string) => Submission[];
  getSubmissionForStudent: (assignmentId: string, studentId: string) => Submission | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(mockCourses[0]);
  const [courses] = useState<Course[]>(mockCourses);
  const [students] = useState<Student[]>(mockStudents);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const updateSubmission = (updatedSubmission: Submission) => {
    setSubmissions(prev => 
      prev.map(sub => sub.id === updatedSubmission.id ? updatedSubmission : sub)
    );
  };

  const addAssignment = (assignment: Assignment) => {
    setAssignments(prev => [...prev, assignment]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const getStudentsForCourse = (courseId: string) => {
    return students.filter(student => student.courseId === courseId);
  };

  const getAssignmentsForCourse = (courseId: string) => {
    return assignments.filter(assignment => assignment.courseId === courseId);
  };

  const getSubmissionsForAssignment = (assignmentId: string) => {
    return submissions.filter(submission => submission.assignmentId === assignmentId);
  };

  const getSubmissionForStudent = (assignmentId: string, studentId: string) => {
    return submissions.find(
      submission => 
        submission.assignmentId === assignmentId && 
        submission.studentId === studentId
    );
  };

  return (
    <AppContext.Provider
      value={{
        selectedCourse,
        courses,
        students,
        assignments,
        submissions,
        notifications,
        setSelectedCourse,
        updateSubmission,
        addAssignment,
        markNotificationAsRead,
        getStudentsForCourse,
        getAssignmentsForCourse,
        getSubmissionsForAssignment,
        getSubmissionForStudent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};