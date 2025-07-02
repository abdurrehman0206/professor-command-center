// Notification dropdown component
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

export const NotificationDropdown: React.FC = () => {
  const { notifications, markNotificationAsRead } = useApp();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-600';
      case 'success':
        return 'text-green-600';
      case 'info':
      default:
        return 'text-blue-600';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          Notifications
          {unreadCount > 0 && (
            <Badge variant="secondary">{unreadCount} new</Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No notifications
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex flex-col items-start p-3 cursor-pointer",
                  !notification.read && "bg-blue-50"
                )}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex-1">
                    <p className={cn(
                      "text-sm",
                      getNotificationColor(notification.type),
                      !notification.read && "font-medium"
                    )}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTimeAgo(notification.timestamp)}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full ml-2 mt-1" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};