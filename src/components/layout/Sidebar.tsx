// Sidebar navigation component
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  BookOpen, 
  FileText, 
  Home, 
  Users, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/assignments', icon: FileText, label: 'Assignments' },
  { to: '/students', icon: Users, label: 'Students' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Navigation items */}
        <nav className="px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )
              }
              onClick={() => {
                // Close sidebar on mobile when navigation item is clicked
                if (window.innerWidth < 1024) {
                  onClose();
                }
              }}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};