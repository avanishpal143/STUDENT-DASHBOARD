import React from 'react';
import { Student } from '../types';
import Card from './ui/Card';
import { Calendar, BookOpen, GraduationCap } from 'lucide-react';

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <Card className="h-full">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <img 
              src={student.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=4F46E5&color=fff`} 
              alt={student.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
            />
            {student.grade && (
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white text-xs font-bold py-1 px-2 rounded-full">
                {student.grade}
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
            <p className="text-gray-600 text-sm">{student.email}</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-700">
            <BookOpen size={16} className="mr-2 text-indigo-600" />
            <span className="font-medium">Course:</span>
            <span className="ml-2">{student.course}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Calendar size={16} className="mr-2 text-indigo-600" />
            <span className="font-medium">Enrolled:</span>
            <span className="ml-2">
              {new Date(student.enrollmentDate).toLocaleDateString()}
            </span>
          </div>
          
          {student.grade && (
            <div className="flex items-center text-gray-700">
              <GraduationCap size={16} className="mr-2 text-indigo-600" />
              <span className="font-medium">Grade:</span>
              <span className="ml-2">{student.grade}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StudentCard;