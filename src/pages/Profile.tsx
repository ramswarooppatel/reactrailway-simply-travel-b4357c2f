
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  Train, 
  Calendar, 
  Ticket, 
  User, 
  CreditCard, 
  Bell, 
  Settings, 
  ChevronRight, 
  LogOut, 
  CircleCheck, 
  Clock, 
  AlertCircle, 
  X,
  FileDown
} from 'lucide-react';

interface BookingItem {
  id: string;
  trainName: string;
  trainNumber: string;
  source: string;
  destination: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  pnr: string;
  passengers: number;
  departureTime: string;
  arrivalTime: string;
  class: string;
}

const bookingHistory: BookingItem[] = [
  {
    id: '1',
    trainName: 'Rajdhani Express',
    trainNumber: '12309',
    source: 'New Delhi',
    destination: 'Mumbai Central',
    date: '2023-11-22',
    status: 'confirmed',
    pnr: 'PNR8472916583',
    passengers: 2,
    departureTime: '16:50',
    arrivalTime: '10:15',
    class: 'AC 3 Tier'
  },
  {
    id: '2',
    trainName: 'Shatabdi Express',
    trainNumber: '12001',
    source: 'New Delhi',
    destination: 'Bhopal',
    date: '2023-12-05',
    status: 'pending',
    pnr: 'PNR6429107536',
    passengers: 1,
    departureTime: '06:00',
    arrivalTime: '12:10',
    class: 'AC Chair Car'
  },
  {
    id: '3',
    trainName: 'Duronto Express',
    trainNumber: '12426',
    source: 'New Delhi',
    destination: 'Jammu Tawi',
    date: '2023-09-15',
    status: 'cancelled',
    pnr: 'PNR3618472950',
    passengers: 3,
    departureTime: '22:35',
    arrivalTime: '05:45',
    class: 'AC 2 Tier'
  },
];

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('bookings');
  const [name, setName] = useState('Raj Sharma');
  const [email, setEmail] = useState('raj.sharma@example.com');
  const [phone, setPhone] = useState('9876543210');
  
  const getStatusBadge = (status: BookingItem['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CircleCheck className="h-3 w-3 mr-1" />
            Confirmed
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            <Clock className="h-3 w-3 mr-1" />
            Waitlisted
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <X className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };
  
  return (
    <Layout>
      <AnimatedTransition>
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Sidebar */}
              <div className="md:w-1/4">
                <Card className="border-0 shadow-sm mb-6">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" />
                        <AvatarFallback>RS</AvatarFallback>
                      </Avatar>
                      <h2 className="text-xl font-semibold mb-1">{name}</h2>
                      <p className="text-gray-600 text-sm mb-4">{email}</p>
                      <Badge variant="outline" className="mb-4">Premium Member</Badge>
                      <Button variant="outline" size="sm" className="w-full">
                        Edit Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex flex-col">
                      <button 
                        className={`flex items-center p-4 hover:bg-gray-50 transition-colors text-left ${
                          activeTab === 'bookings' ? 'bg-gray-50 font-medium' : ''
                        }`}
                        onClick={() => setActiveTab('bookings')}
                      >
                        <Ticket className="h-5 w-5 mr-3 text-gray-600" />
                        My Bookings
                      </button>
                      <button 
                        className={`flex items-center p-4 hover:bg-gray-50 transition-colors text-left ${
                          activeTab === 'profile' ? 'bg-gray-50 font-medium' : ''
                        }`}
                        onClick={() => setActiveTab('profile')}
                      >
                        <User className="h-5 w-5 mr-3 text-gray-600" />
                        Profile
                      </button>
                      <button 
                        className={`flex items-center p-4 hover:bg-gray-50 transition-colors text-left ${
                          activeTab === 'payments' ? 'bg-gray-50 font-medium' : ''
                        }`}
                        onClick={() => setActiveTab('payments')}
                      >
                        <CreditCard className="h-5 w-5 mr-3 text-gray-600" />
                        Saved Payments
                      </button>
                      <button 
                        className={`flex items-center p-4 hover:bg-gray-50 transition-colors text-left ${
                          activeTab === 'notifications' ? 'bg-gray-50 font-medium' : ''
                        }`}
                        onClick={() => setActiveTab('notifications')}
                      >
                        <Bell className="h-5 w-5 mr-3 text-gray-600" />
                        Notifications
                      </button>
                      <button 
                        className={`flex items-center p-4 hover:bg-gray-50 transition-colors text-left ${
                          activeTab === 'settings' ? 'bg-gray-50 font-medium' : ''
                        }`}
                        onClick={() => setActiveTab('settings')}
                      >
                        <Settings className="h-5 w-5 mr-3 text-gray-600" />
                        Settings
                      </button>
                      <button 
                        className="flex items-center p-4 hover:bg-red-50 text-destructive transition-colors text-left border-t"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        Logout
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Content */}
              <div className="md:w-3/4">
                {/* My Bookings */}
                {activeTab === 'bookings' && (
                  <div>
                    <Card className="border-0 shadow-sm mb-6">
                      <CardHeader className="pb-3">
                        <CardTitle>Upcoming Journeys</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {bookingHistory
                          .filter(booking => new Date(booking.date) >= new Date() && booking.status !== 'cancelled')
                          .length > 0 ? (
                            <div className="space-y-4">
                              {bookingHistory
                                .filter(booking => new Date(booking.date) >= new Date() && booking.status !== 'cancelled')
                                .map(booking => (
                                  <div 
                                    key={booking.id}
                                    className="p-4 border rounded-lg hover:border-primary transition-all cursor-pointer"
                                    onClick={() => navigate(`/booking-details/${booking.id}`)}
                                  >
                                    <div className="flex flex-col sm:flex-row justify-between mb-3">
                                      <div>
                                        <div className="flex items-center">
                                          <h3 className="font-semibold">{booking.trainName}</h3>
                                          <Badge variant="outline" className="ml-2 text-xs">
                                            {booking.trainNumber}
                                          </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                          {new Date(booking.date).toLocaleDateString('en-US', { 
                                            weekday: 'short', 
                                            day: 'numeric', 
                                            month: 'short', 
                                            year: 'numeric' 
                                          })}
                                        </p>
                                      </div>
                                      <div className="mt-2 sm:mt-0">
                                        {getStatusBadge(booking.status)}
                                      </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                      <div className="flex">
                                        <div className="mr-6">
                                          <div className="text-lg font-medium">{booking.departureTime}</div>
                                          <div className="text-sm text-gray-600">{booking.source}</div>
                                        </div>
                                        <div className="text-right">
                                          <div className="text-lg font-medium">{booking.arrivalTime}</div>
                                          <div className="text-sm text-gray-600">{booking.destination}</div>
                                        </div>
                                      </div>
                                      
                                      <div className="mt-3 sm:mt-0 flex gap-2">
                                        <Button variant="outline" size="sm" className="h-8">
                                          <FileDown className="h-4 w-4 mr-1" />
                                          E-Ticket
                                        </Button>
                                        <Button variant="outline" size="sm" className="h-8">
                                          View Details
                                          <ChevronRight className="h-4 w-4 ml-1" />
                                        </Button>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-3 flex flex-wrap gap-3">
                                      <div className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                                        PNR: {booking.pnr}
                                      </div>
                                      <div className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                                        {booking.passengers} Passengers
                                      </div>
                                      <div className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                                        {booking.class}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                                <Calendar className="h-8 w-8 text-gray-400" />
                              </div>
                              <h3 className="text-lg font-medium">No upcoming journeys</h3>
                              <p className="text-gray-600 mt-1 mb-4">You don't have any upcoming train journeys.</p>
                              <Button 
                                onClick={() => navigate('/train-search')}
                                className="bg-primary hover:bg-primary/90 text-white"
                              >
                                <Train className="mr-2 h-4 w-4" />
                                Find Trains
                              </Button>
                            </div>
                          )}
                      </CardContent>
                    </Card>
                    
                    <Card className="border-0 shadow-sm">
                      <CardHeader className="pb-3">
                        <CardTitle>Recent Journeys</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {bookingHistory
                            .filter(booking => new Date(booking.date) < new Date() || booking.status === 'cancelled')
                            .map(booking => (
                              <div 
                                key={booking.id}
                                className="p-4 border rounded-lg hover:border-gray-300 transition-all cursor-pointer"
                                onClick={() => navigate(`/booking-details/${booking.id}`)}
                              >
                                <div className="flex flex-col sm:flex-row justify-between mb-3">
                                  <div>
                                    <div className="flex items-center">
                                      <h3 className="font-semibold">{booking.trainName}</h3>
                                      <Badge variant="outline" className="ml-2 text-xs">
                                        {booking.trainNumber}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                      {new Date(booking.date).toLocaleDateString('en-US', { 
                                        weekday: 'short', 
                                        day: 'numeric', 
                                        month: 'short', 
                                        year: 'numeric' 
                                      })}
                                    </p>
                                  </div>
                                  <div className="mt-2 sm:mt-0">
                                    {getStatusBadge(booking.status)}
                                  </div>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                  <div className="flex items-center">
                                    <div className="mr-6">
                                      <div className="text-lg font-medium">{booking.departureTime}</div>
                                      <div className="text-sm text-gray-600">{booking.source}</div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-lg font-medium">{booking.arrivalTime}</div>
                                      <div className="text-sm text-gray-600">{booking.destination}</div>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-3 sm:mt-0">
                                    <Button variant="outline" size="sm" className="h-8">
                                      View Details
                                      <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {/* Profile */}
                {activeTab === 'profile' && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <Input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth
                          </label>
                          <Input
                            type="date"
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ID Verification
                          </label>
                          <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                            <div className="flex items-center">
                              <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                              <div>
                                <div className="font-medium">Verification Pending</div>
                                <div className="text-sm text-gray-600">Add ID proof for faster bookings</div>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Verify Now
                            </Button>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Button 
                            onClick={handleProfileUpdate}
                            className="bg-primary hover:bg-primary/90 text-white"
                          >
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {/* Saved Payments */}
                {activeTab === 'payments' && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Saved Payment Methods</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-10 w-14 bg-blue-500 rounded mr-4"></div>
                            <div>
                              <div className="font-medium">•••• •••• •••• 4532</div>
                              <div className="text-sm text-gray-600">Expires 09/25</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        </div>
                        
                        <div className="p-4 border rounded-lg flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-10 w-14 bg-red-500 rounded mr-4"></div>
                            <div>
                              <div className="font-medium">•••• •••• •••• 6789</div>
                              <div className="text-sm text-gray-600">Expires 11/24</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        </div>
                        
                        <div className="p-4 border rounded-lg flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-10 w-14 bg-gray-100 flex items-center justify-center rounded mr-4">
                              UPI
                            </div>
                            <div>
                              <div className="font-medium">raj.sharma@okbank</div>
                              <div className="text-sm text-gray-600">UPI ID</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        </div>
                        
                        <div className="pt-4">
                          <Button variant="outline">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Add Payment Method
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {/* Notifications */}
                {activeTab === 'notifications' && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { title: 'Booking confirmations', description: 'Get notified when your booking is confirmed' },
                          { title: 'Trip reminders', description: 'Receive reminders before your journey begins' },
                          { title: 'Trip updates', description: 'Get notified about delays, platform changes, and other updates' },
                          { title: 'Price alerts', description: 'Receive alerts when prices drop for your saved routes' },
                          { title: 'Special offers', description: 'Stay updated with promotions and discounts' },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{item.title}</div>
                              <div className="text-sm text-gray-600">{item.description}</div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                              </label>
                            </div>
                          </div>
                        ))}
                        
                        <div className="pt-4">
                          <Button className="bg-primary hover:bg-primary/90 text-white">
                            Save Preferences
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {/* Settings */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Language
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                              <option>English</option>
                              <option>Hindi</option>
                              <option>Tamil</option>
                              <option>Telugu</option>
                              <option>Bengali</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Currency
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                              <option>Indian Rupee (INR)</option>
                              <option>US Dollar (USD)</option>
                              <option>Euro (EUR)</option>
                              <option>British Pound (GBP)</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Time Format
                            </label>
                            <div className="flex space-x-4">
                              <label className="flex items-center">
                                <input type="radio" name="timeFormat" className="h-4 w-4 text-primary focus:ring-primary" defaultChecked />
                                <span className="ml-2 text-sm">24-hour</span>
                              </label>
                              <label className="flex items-center">
                                <input type="radio" name="timeFormat" className="h-4 w-4 text-primary focus:ring-primary" />
                                <span className="ml-2 text-sm">12-hour (AM/PM)</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle>Security</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Button variant="outline">
                              Change Password
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Two-Factor Authentication</div>
                              <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                              </label>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4 mt-4">
                            <Button variant="destructive" className="bg-red-600">
                              Delete Account
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AnimatedTransition>
    </Layout>
  );
};

export default Profile;
