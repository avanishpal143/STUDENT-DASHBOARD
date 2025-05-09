import React, { useEffect } from 'react';
import StudentList from '../components/StudentList';
import CourseFilter from '../components/CourseFilter';
import { useStudents } from '../contexts/StudentsContext';
import { Users, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { filteredStudents, loading } = useStudents();
  const { currentUser } = useAuth();
  
  // Update page title
  useEffect(() => {
    document.title = 'StudentHub - Dashboard';
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <Users size={28} className="text-indigo-600 mr-2" />
            Student Dashboard
          </h1>
          <p className="text-gray-600">
            {!loading && `Showing ${filteredStudents.length} student${filteredStudents.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        
        {currentUser && (
          <div className="mt-4 sm:mt-0">
            <Link to="/add-student">
              <Button
                variant="primary"
                className="flex items-center justify-center"
              >
                <Plus size={18} className="mr-1" />
                Add Student
              </Button>
            </Link>
          </div>
        )}
      </div>

      <CourseFilter />
      <StudentList />
    </div>
  );
};

export default Dashboard;