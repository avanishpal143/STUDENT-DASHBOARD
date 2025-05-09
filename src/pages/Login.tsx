import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { LogIn, User } from 'lucide-react';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { login, register, currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Update page title
  useEffect(() => {
    document.title = `StudentHub - ${isLogin ? 'Login' : 'Register'}`;
  }, [isLogin]);
  
  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      if (isLogin) {
        await login(email, password);
        toast.success('Logged in successfully');
      } else {
        await register(email, password);
        toast.success('Account created successfully');
      }
      navigate('/');
    } catch (error: any) {
      let errorMessage = 'An error occurred';
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use';
      }
      
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  // For demo purposes, provide default values for test login
  const setTestAccount = () => {
    setEmail('test@example.com');
    setPassword('password123');
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card>
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-full">
              <User size={32} className="text-indigo-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="email"
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              error={errors.email}
              autoComplete="email"
            />
            
            <Input
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              error={errors.password}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
            
            <Button
              type="submit"
              fullWidth
              isLoading={loading}
              className="mt-6"
            >
              <LogIn size={18} className="mr-2" />
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-2">For demo purposes:</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={setTestAccount}
            >
              Use Test Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;