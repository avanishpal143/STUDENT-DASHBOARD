import React from 'react';
import { useStudents } from '../contexts/StudentsContext';
import StudentCard from './StudentCard';
import Loading from './ui/Loading';
import { SearchX } from 'lucide-react';

const StudentList: React.FC = () => {
  const { filteredStudents, loading } = useStudents();

  if (loading) {
    return <Loading />;
  }

  if (filteredStudents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <SearchX size={64} className="text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No students found</h3>
        <p className="text-gray-500">
          No students match the current filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredStudents.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
};

export default StudentList;