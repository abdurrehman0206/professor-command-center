// Main dashboard layout with navigation
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TopNavigation } from './TopNavigation';
import { Sidebar } from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 transition-all duration-300 lg:ml-64">
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;