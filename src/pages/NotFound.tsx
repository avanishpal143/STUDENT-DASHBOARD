import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  // Update page title
  useEffect(() => {
    document.title = 'StudentHub - Page Not Found';
  }, []);

  return (
    <div className="max-w-md mx-auto text-center py-16">
      <AlertTriangle size={64} className="text-amber-500 mx-auto mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary" className="inline-flex items-center">
          <Home size={18} className="mr-2" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;