import React from 'react';
import { useStudents } from '../contexts/StudentsContext';
import { Filter } from 'lucide-react';

const CourseFilter: React.FC = () => {
  const { courses, filterByCourse, activeCourse } = useStudents();

  return (
    <div className="mb-8">
      <div className="flex items-center mb-3">
        <Filter size={18} className="text-indigo-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-700">Filter by Course</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => filterByCourse(null)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${!activeCourse
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          All Courses
        </button>
        
        {courses.map((course) => (
          <button
            key={course}
            onClick={() => filterByCourse(course)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeCourse === course
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            {course}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseFilter;