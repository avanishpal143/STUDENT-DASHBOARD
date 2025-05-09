import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-indigo-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">StudentHub</h3>
            <p className="text-indigo-200 text-sm mt-1">Empowering education management</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm">© {year} StudentHub. All rights reserved.</p>
            <div className="mt-2 text-xs space-x-4 text-indigo-200">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;