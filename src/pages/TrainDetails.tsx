
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Train } from '@/components/TrainCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Utensils, 
  Wifi, 
  BatteryCharging,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Train as TrainIcon,
  Ticket
} from 'lucide-react';

interface ClassOption {
  id: string;
  name: string;
  price: number;
  available: number;
}

const mockTrainData: Train = {
  id: 1,
  name: 'Rajdhani Express',
  number: '12309',
  departureTime: '16:50',
  arrivalTime: '10:15',
  duration: '17h 25m',
  source: 'New Delhi',
  destination: 'Mumbai Central',
  price: {
    sleeper: 1245,
    ac3Tier: 2850,
    ac2Tier: 3950,
  },
  seatsAvailable: {
    sleeper: 56,
    ac3Tier: 24,
    ac2Tier: 12,
  },
  amenities: ['WiFi', 'Catering', 'Charging Points', 'Fast'],
  daysOfOperation: ['M', 'W', 'F', 'S'],
};

const stationSchedule = [
  { station: 'New Delhi', arrival: '-', departure: '16:50', day: 1, distance: 0, platform: 5 },
  { station: 'Mathura Junction', arrival: '18:33', departure: '18:35', day: 1, distance: 141, platform: 3 },
  { station: 'Agra Cantt', arrival: '19:23', departure: '19:28', day: 1, distance: 188, platform: 1 },
  { station: 'Gwalior', arrival: '21:13', departure: '21:15', day: 1, distance: 305, platform: 2 },
  { station: 'Jhansi', arrival: '22:35', departure: '22:40', day: 1, distance: 403, platform: 4 },
  { station: 'Bhopal', arrival: '03:00', departure: '03:10', day: 2, distance: 703, platform: 1 },
  { station: 'Ratlam', arrival: '06:48', departure: '06:50', day: 2, distance: 968, platform: 3 },
  { station: 'Vadodara', arrival: '09:42', departure: '09:47', day: 2, distance: 1269, platform: 2 },
  { station: 'Mumbai Central', arrival: '10:15', departure: '-', day: 2, distance: 1386, platform: 7 },
];

const classOptions: ClassOption[] = [
  { id: 'SL', name: 'Sleeper', price: 1245, available: 56 },
  { id: '3A', name: 'AC 3 Tier', price: 2850, available: 24 },
  { id: '2A', name: 'AC 2 Tier', price: 3950, available: 12 },
  { id: '1A', name: 'AC First Class', price: 5900, available: 0 },
];

const amenityDetails = [
  { name: 'WiFi', icon: <Wifi className="h-5 w-5 text-primary" />, description: 'Free WiFi available throughout the journey' },
  { name: 'Catering', icon: <Utensils className="h-5 w-5 text-primary" />, description: 'Meals included in ticket price' },
  { name: 'Charging Points', icon: <BatteryCharging className="h-5 w-5 text-primary" />, description: 'Available at every seat' },
];

const TrainDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<string>('3A');
  const [expandedSchedule, setExpandedSchedule] = useState(false);
  
  // Use train data from location state or fall back to mock data
  const train = (location.state?.train as Train) || mockTrainData;
  
  const handleBooking = () => {
    navigate('/booking', { 
      state: { 
        train,
        travelClass: selectedClass,
        passengers: []
      } 
    });
  };
  
  const getAvailabilityColor = (seats: number) => {
    if (seats > 20) return 'text-green-600';
    if (seats > 0) return 'text-amber-600';
    return 'text-destructive';
  };
  
  const getAvailabilityText = (seats: number) => {
    if (seats > 20) return 'Available';
    if (seats > 0) return 'Limited seats';
    return 'Waitlist';
  };
  
  return (
    <Layout>
      <AnimatedTransition>
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            {/* Back button */}
            <Button 
              variant="ghost" 
              className="mb-4"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to search results
            </Button>
            
            {/* Train Overview */}
            <Card className="border-0 shadow-md mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <h1 className="text-2xl font-display font-bold">{train.name}</h1>
                      <Badge variant="outline" className="ml-2">
                        {train.number}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{train.duration}</span>
                      <span className="mx-2">•</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Runs on {train.daysOfOperation.join(', ')}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {train.amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-4 pt-4 border-t">
                  <div className="flex justify-between w-full lg:w-auto space-x-8 lg:space-x-16 mb-4 lg:mb-0">
                    <div>
                      <p className="text-sm text-gray-500">Departs</p>
                      <p className="text-2xl font-semibold">{train.departureTime}</p>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                        <p className="text-sm">{train.source}</p>
                      </div>
                    </div>
                    
                    <div className="flex-1 max-w-[150px] hidden md:flex justify-center items-center">
                      <div className="w-full px-4 flex items-center">
                        <div className="h-0.5 flex-1 bg-gray-300 relative">
                          <div className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-primary"></div>
                          <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Arrives</p>
                      <p className="text-2xl font-semibold">{train.arrivalTime}</p>
                      <div className="flex items-center justify-end">
                        <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                        <p className="text-sm">{train.destination}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-auto">
                    <Button 
                      onClick={handleBooking}
                      className="bg-primary hover:bg-primary/90 text-white w-full lg:w-auto"
                    >
                      <Ticket className="mr-2 h-4 w-4" />
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Content Tabs */}
            <Tabs defaultValue="availability" className="mb-6">
              <TabsList className="w-full">
                <TabsTrigger value="availability" className="flex-1">Availability</TabsTrigger>
                <TabsTrigger value="schedule" className="flex-1">Schedule</TabsTrigger>
                <TabsTrigger value="amenities" className="flex-1">Amenities & Info</TabsTrigger>
              </TabsList>
              
              {/* Availability Tab */}
              <TabsContent value="availability">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Select Travel Class</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {classOptions.map((option) => (
                        <div 
                          key={option.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedClass === option.id 
                              ? 'border-primary bg-primary/5' 
                              : 'hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedClass(option.id)}
                        >
                          <div className="flex justify-between">
                            <div>
                              <div className="font-medium">{option.name}</div>
                              <div className="text-sm text-gray-500">{option.id}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">₹{option.price}</div>
                              <div className={`text-sm ${getAvailabilityColor(option.available)}`}>
                                {option.available > 0 ? `${option.available} seats` : 'Waitlist'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex items-center justify-between">
                            <div className={`text-sm ${getAvailabilityColor(option.available)}`}>
                              {getAvailabilityText(option.available)}
                            </div>
                            <Button 
                              variant={selectedClass === option.id ? "default" : "outline"} 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (option.available > 0) {
                                  setSelectedClass(option.id);
                                  handleBooking();
                                }
                              }}
                              disabled={option.available === 0}
                            >
                              {selectedClass === option.id ? "Selected" : "Select"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-amber-800">Important Information</h4>
                          <p className="text-sm text-amber-700 mt-1">
                            Ticket booking closes 5 minutes before the scheduled departure. 
                            Tatkal booking opens at 10:00 AM one day prior to the journey date.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Schedule Tab */}
              <TabsContent value="schedule">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Train Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="py-2 px-3 text-left font-medium text-gray-700 text-sm">Station</th>
                            <th className="py-2 px-3 text-left font-medium text-gray-700 text-sm">Arrival</th>
                            <th className="py-2 px-3 text-left font-medium text-gray-700 text-sm">Departure</th>
                            <th className="py-2 px-3 text-left font-medium text-gray-700 text-sm">Day</th>
                            <th className="py-2 px-3 text-left font-medium text-gray-700 text-sm">Distance</th>
                            <th className="py-2 px-3 text-left font-medium text-gray-700 text-sm">Platform</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stationSchedule
                            .slice(0, expandedSchedule ? stationSchedule.length : 4)
                            .map((stop, index) => (
                              <tr 
                                key={index} 
                                className={`border-b hover:bg-gray-50 ${
                                  index === 0 || index === stationSchedule.length - 1 
                                    ? 'bg-gray-50' 
                                    : ''
                                }`}
                              >
                                <td className="py-3 px-3">
                                  <div className="font-medium">{stop.station}</div>
                                </td>
                                <td className="py-3 px-3">{stop.arrival}</td>
                                <td className="py-3 px-3">{stop.departure}</td>
                                <td className="py-3 px-3">Day {stop.day}</td>
                                <td className="py-3 px-3">{stop.distance} km</td>
                                <td className="py-3 px-3">
                                  <Badge variant="outline" className="font-normal">
                                    P{stop.platform}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {stationSchedule.length > 4 && (
                      <button 
                        className="mt-4 text-primary flex items-center w-full justify-center py-2 border-t"
                        onClick={() => setExpandedSchedule(!expandedSchedule)}
                      >
                        {expandedSchedule ? (
                          <>
                            <span className="mr-1">Show less</span>
                            <ChevronUp className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            <span className="mr-1">Show all {stationSchedule.length} stops</span>
                            <ChevronDown className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Amenities Tab */}
              <TabsContent value="amenities">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Amenities & Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-4">Amenities</h3>
                        <div className="space-y-4">
                          {amenityDetails.map((amenity, index) => (
                            <div key={index} className="flex">
                              <div className="mr-4">{amenity.icon}</div>
                              <div>
                                <div className="font-medium">{amenity.name}</div>
                                <div className="text-sm text-gray-600">{amenity.description}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-4">Train Information</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Train Number</span>
                            <span className="font-medium">{train.number}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Train Type</span>
                            <span className="font-medium">Rajdhani (Premium)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Distance</span>
                            <span className="font-medium">1,386 km</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Avg. Speed</span>
                            <span className="font-medium">80 km/h</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Pantry Car</span>
                            <span className="font-medium">Available</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Runs On</span>
                            <span className="font-medium">{train.daysOfOperation.join(', ')}</span>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="font-medium mb-4">Cancellation Policy</h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p>• More than 48 hours before departure: 25% charge</p>
                            <p>• 12-48 hours before departure: 50% charge</p>
                            <p>• Less than 12 hours before departure: No refund</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* Similar Trains */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Similar Trains</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: 'Duronto Express',
                    number: '12426',
                    departure: '13:30',
                    arrival: '05:05',
                    duration: '15h 35m',
                    price: 2350,
                  },
                  {
                    name: 'August Kranti',
                    number: '12953',
                    departure: '17:40',
                    arrival: '10:55',
                    duration: '17h 15m',
                    price: 2450,
                  },
                  {
                    name: 'Punjab Mail',
                    number: '12137',
                    departure: '19:15',
                    arrival: '13:10',
                    duration: '17h 55m',
                    price: 2150,
                  },
                ].map((similarTrain, index) => (
                  <Card 
                    key={index} 
                    className="border hover:shadow-md cursor-pointer transition-all"
                    onClick={() => navigate(`/train-details/${index + 2}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{similarTrain.name}</h3>
                          <div className="text-xs text-gray-500">{similarTrain.number}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₹{similarTrain.price}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-center">
                          <div className="text-lg font-medium">{similarTrain.departure}</div>
                          <div className="text-xs text-gray-500">{train.source}</div>
                        </div>
                        
                        <div className="flex-1 px-2 flex flex-col items-center">
                          <div className="text-xs text-gray-500">{similarTrain.duration}</div>
                          <div className="w-full h-0.5 bg-gray-200 relative">
                            <div className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-gray-400"></div>
                            <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-gray-400"></div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-medium">{similarTrain.arrival}</div>
                          <div className="text-xs text-gray-500">{train.destination}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedTransition>
    </Layout>
  );
};

export default TrainDetails;
