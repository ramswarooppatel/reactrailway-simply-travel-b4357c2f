
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, Clock, Check, Train, Map, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'delay' | 'platform' | 'booking' | 'cancellation' | 'offer' | 'general';
  title: string;
  content: string;
  trainNumber?: string;
  trainName?: string;
  dateTime: string;
  read: boolean;
}

const Notifications = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'n1',
      type: 'delay',
      title: 'Train Delayed',
      content: 'Your train 12301 Rajdhani Express is delayed by 45 minutes. New expected arrival time is 17:35.',
      trainNumber: '12301',
      trainName: 'Rajdhani Express',
      dateTime: '10 minutes ago',
      read: false
    },
    {
      id: 'n2',
      type: 'platform',
      title: 'Platform Change',
      content: 'Platform changed for train 12951 Mumbai Rajdhani. New platform: Platform 5.',
      trainNumber: '12951',
      trainName: 'Mumbai Rajdhani',
      dateTime: '45 minutes ago',
      read: false
    },
    {
      id: 'n3',
      type: 'booking',
      title: 'Booking Confirmed',
      content: 'Your booking for train 12259 Duronto Express has been confirmed. PNR: 5678901234.',
      trainNumber: '12259',
      trainName: 'Duronto Express',
      dateTime: '2 hours ago',
      read: true
    },
    {
      id: 'n4',
      type: 'offer',
      title: 'Special Discount',
      content: 'Get 10% off on your next booking using code TRAIN10.',
      dateTime: '1 day ago',
      read: true
    },
    {
      id: 'n5',
      type: 'cancellation',
      title: 'Train Cancelled',
      content: 'Train 13050 Amritsar Express has been cancelled due to operational reasons.',
      trainNumber: '13050',
      trainName: 'Amritsar Express',
      dateTime: '2 days ago',
      read: true
    }
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, read: true} : notification
    ));
    
    toast({
      title: "Notification marked as read",
    });
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({...notification, read: true})));
    
    toast({
      title: "All notifications marked as read",
    });
  };
  
  const filteredNotifications = activeTab === 'all' ? 
    notifications : 
    activeTab === 'unread' ? 
      notifications.filter(n => !n.read) : 
      notifications.filter(n => n.read);
  
  const getIconByType = (type: Notification['type']) => {
    switch (type) {
      case 'delay':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'platform':
        return <Map className="h-5 w-5 text-blue-500" />;
      case 'booking':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'cancellation':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'offer':
        return <Badge className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getBadgeByType = (type: Notification['type']) => {
    switch (type) {
      case 'delay':
        return <Badge className="bg-amber-100 text-amber-800 border-0">Delayed</Badge>;
      case 'platform':
        return <Badge className="bg-blue-100 text-blue-800 border-0">Platform Change</Badge>;
      case 'booking':
        return <Badge className="bg-green-100 text-green-800 border-0">Booking</Badge>;
      case 'cancellation':
        return <Badge className="bg-red-100 text-red-800 border-0">Cancelled</Badge>;
      case 'offer':
        return <Badge className="bg-purple-100 text-purple-800 border-0">Offer</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">Update</Badge>;
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pt-24 pb-12">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-display font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={handleMarkAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
          
          <Card className="border-0 shadow-sm">
            <CardHeader className="px-6 py-5">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <div className="flex justify-between items-center">
                  <TabsList className="grid w-60 grid-cols-3">
                    <TabsTrigger value="all">
                      All
                      <Badge className="ml-2 bg-gray-100 text-gray-800">{notifications.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="unread">
                      Unread
                      <Badge className="ml-2 bg-primary text-white">{unreadCount}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="read">Read</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </CardHeader>
            <CardContent className="px-0 py-0">
              <TabsContent value="all" className="m-0">
                <NotificationList 
                  notifications={filteredNotifications} 
                  onMarkAsRead={handleMarkAsRead}
                  getIconByType={getIconByType}
                  getBadgeByType={getBadgeByType}
                />
              </TabsContent>
              <TabsContent value="unread" className="m-0">
                <NotificationList 
                  notifications={filteredNotifications} 
                  onMarkAsRead={handleMarkAsRead}
                  getIconByType={getIconByType}
                  getBadgeByType={getBadgeByType}
                />
              </TabsContent>
              <TabsContent value="read" className="m-0">
                <NotificationList 
                  notifications={filteredNotifications} 
                  onMarkAsRead={handleMarkAsRead}
                  getIconByType={getIconByType}
                  getBadgeByType={getBadgeByType}
                />
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  getIconByType: (type: Notification['type']) => React.ReactNode;
  getBadgeByType: (type: Notification['type']) => React.ReactNode;
}

const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications, 
  onMarkAsRead,
  getIconByType,
  getBadgeByType
}) => {
  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center">
        <Bell className="h-10 w-10 mb-3 mx-auto text-gray-400" />
        <h3 className="text-lg font-medium mb-1">No notifications</h3>
        <p className="text-gray-500">You don't have any notifications here</p>
      </div>
    );
  }
  
  return (
    <div className="divide-y">
      {notifications.map((notification) => (
        <div 
          key={notification.id} 
          className={`p-6 ${!notification.read ? 'bg-blue-50' : ''}`}
        >
          <div className="flex">
            <div className="flex-shrink-0 mr-4">
              {getIconByType(notification.type)}
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{notification.title}</h3>
                    {getBadgeByType(notification.type)}
                    {!notification.read && (
                      <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mt-1 mb-2">{notification.content}</p>
                  
                  {notification.trainNumber && (
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Train className="h-4 w-4 mr-1" />
                      {notification.trainNumber} - {notification.trainName}
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {notification.dateTime}
                  </div>
                </div>
                
                {!notification.read && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 sm:mt-0"
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
