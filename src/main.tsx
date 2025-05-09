import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { StudentsProvider } from './contexts/StudentsContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StudentsProvider>
          <App />
          <Toaster position="top-right" />
        </StudentsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);