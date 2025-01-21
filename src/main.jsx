import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/route.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnnouncementProvider } from './hooks/announcementContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}> 
      <AuthProvider>
      <AnnouncementProvider>
      <RouterProvider router={router} />
      </AnnouncementProvider>      
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
