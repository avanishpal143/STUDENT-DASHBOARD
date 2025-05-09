import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, LogOut, User, LogIn, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
      console.error(error);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold flex items-center space-x-2 transition-transform duration-200 hover:scale-105"
          >
            <User size={28} />
            <span>StudentHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-indigo-200 transition-colors">Dashboard</Link>
            
            {currentUser ? (
              <>
                <Link to="/add-student" className="flex items-center space-x-1 hover:text-indigo-200 transition-colors">
                  <Plus size={18} />
                  <span>Add Student</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-indigo-200 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="h-8 w-8 bg-indigo-300 rounded-full flex items-center justify-center">
                    {currentUser.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden lg:inline-block truncate max-w-[120px]">
                    {currentUser.email}
                  </span>
                </div>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-1 hover:text-indigo-200 transition-colors"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link 
              to="/" 
              className="block py-2 hover:bg-indigo-700 px-2 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to="/add-student" 
                  className="block py-2 hover:bg-indigo-700 px-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Student
                </Link>
                <div className="flex items-center space-x-2 py-2 px-2">
                  <div className="h-8 w-8 bg-indigo-300 rounded-full flex items-center justify-center">
                    {currentUser.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="truncate">{currentUser.email}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left py-2 hover:bg-indigo-700 px-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block py-2 hover:bg-indigo-700 px-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;