import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockFetchStudents } from '../utils/api';
import { Student } from '../types';
import toast from 'react-hot-toast';

interface StudentsContextType {
  students: Student[];
  filteredStudents: Student[];
  loading: boolean;
  error: string | null;
  addStudent: (student: Omit<Student, 'id'>) => void;
  filterByCourse: (course: string | null) => void;
  courses: string[];
  activeCourse: string | null;
}

const StudentsContext = createContext<StudentsContextType | null>(null);

export const useStudents = () => {
  const context = useContext(StudentsContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentsProvider');
  }
  return context;
};

export const StudentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCourse, setActiveCourse] = useState<string | null>(null);

  // Extract unique courses from students
  const courses = [...new Set(students.map(student => student.course))];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await mockFetchStudents();
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        setError('Failed to fetch students');
        toast.error('Failed to fetch students');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent = {
      ...student,
      id: Date.now().toString()
    };
    
    setStudents(prev => [...prev, newStudent]);
    setFilteredStudents(prev => 
      !activeCourse || activeCourse === newStudent.course
        ? [...prev, newStudent]
        : prev
    );
    
    toast.success('Student added successfully!');
  };

  const filterByCourse = (course: string | null) => {
    setActiveCourse(course);
    if (!course) {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(students.filter(student => student.course === course));
    }
  };

  const value = {
    students,
    filteredStudents,
    loading,
    error,
    addStudent,
    filterByCourse,
    courses,
    activeCourse
  };

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
};