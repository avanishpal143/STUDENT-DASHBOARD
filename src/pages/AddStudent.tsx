import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { useStudents } from '../contexts/StudentsContext';
import { UserPlus, CheckCircle, ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';

const courses = [
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
];

const AddStudent: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: 'Computer Science',
    enrollmentDate: new Date().toISOString().split('T')[0],
    grade: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { addStudent } = useStudents();
  const navigate = useNavigate();
  
  // Update page title
  useEffect(() => {
    document.title = 'StudentHub - Add Student';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.course) {
      newErrors.course = 'Course is required';
    }
    
    if (!formData.enrollmentDate) {
      newErrors.enrollmentDate = 'Enrollment date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      addStudent({
        name: formData.name,
        email: formData.email,
        course: formData.course,
        enrollmentDate: formData.enrollmentDate,
        grade: formData.grade || undefined,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=4F46E5&color=fff`,
      });
      
      setSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        course: 'Computer Science',
        enrollmentDate: new Date().toISOString().split('T')[0],
        grade: '',
      });
      
      // Redirect after a delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Dashboard
        </button>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <UserPlus size={28} className="text-indigo-600 mr-2" />
          Add New Student
        </h1>
        <p className="text-gray-600">
          Fill in the form below to add a new student to the system.
        </p>
      </div>
      
      <Card>
        {success ? (
          <div className="p-8 text-center">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Student Added Successfully!</h2>
            <p className="text-gray-600 mb-6">
              The student has been added to the system. Redirecting to dashboard...
            </p>
            <Button
              onClick={() => navigate('/')}
              fullWidth
            >
              Return to Dashboard
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="name"
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student's full name"
                error={errors.name}
              />
              
              <Input
                id="email"
                name="email"
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter student's email"
                error={errors.email}
              />
              
              <Select
                id="course"
                name="course"
                label="Course"
                value={formData.course}
                onChange={handleChange}
                options={courses}
                error={errors.course}
              />
              
              <Input
                id="enrollmentDate"
                name="enrollmentDate"
                type="date"
                label="Enrollment Date"
                value={formData.enrollmentDate}
                onChange={handleChange}
                error={errors.enrollmentDate}
              />
              
              <Input
                id="grade"
                name="grade"
                label="Grade (Optional)"
                value={formData.grade}
                onChange={handleChange}
                placeholder="e.g., A, B+, C"
              />
            </div>
            
            <div className="mt-8">
              <Button
                type="submit"
                fullWidth
                isLoading={loading}
              >
                <UserPlus size={18} className="mr-2" />
                Add Student
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default AddStudent;