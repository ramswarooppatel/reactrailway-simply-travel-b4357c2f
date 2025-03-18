
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import AnimatedTransition from '@/components/AnimatedTransition';
import TrainCard, { Train } from '@/components/TrainCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Filter, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Loader2, 
  Train as TrainIcon,
  Zap
} from 'lucide-react';
import { format, addDays, parseISO } from 'date-fns';

const mockTrains: Train[] = [
  {
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
  },
  {
    id: 2,
    name: 'Duronto Express',
    number: '12426',
    departureTime: '13:30',
    arrivalTime: '05:05',
    duration: '15h 35m',
    source: 'New Delhi',
    destination: 'Mumbai Central',
    price: {
      sleeper: 1050,
      ac3Tier: 2550,
      ac2Tier: 3650,
    },
    seatsAvailable: {
      sleeper: 120,
      ac3Tier: 45,
      ac2Tier: 0,
    },
    amenities: ['Catering', 'Charging Points'],
    daysOfOperation: ['M', 'T', 'W', 'T', 'F'],
  },
  {
    id: 3,
    name: 'Garib Rath Express',
    number: '12909',
    departureTime: '06:30',
    arrivalTime: '23:55',
    duration: '17h 25m',
    source: 'New Delhi',
    destination: 'Mumbai Central',
    price: {
      sleeper: 975,
      ac3Tier: 1950,
      ac2Tier: 2850,
    },
    seatsAvailable: {
      sleeper: 0,
      ac3Tier: 3,
      ac2Tier: 5,
    },
    amenities: ['WiFi', 'Charging Points'],
    daysOfOperation: ['S', 'S'],
  },
  {
    id: 4,
    name: 'Punjab Mail',
    number: '12137',
    departureTime: '19:15',
    arrivalTime: '13:10',
    duration: '17h 55m',
    source: 'New Delhi',
    destination: 'Mumbai Central',
    price: {
      sleeper: 1150,
      ac3Tier: 2350,
      ac2Tier: 3450,
    },
    seatsAvailable: {
      sleeper: 75,
      ac3Tier: 18,
      ac2Tier: 8,
    },
    amenities: ['WiFi', 'Catering', 'Charging Points'],
    daysOfOperation: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  },
  {
    id: 5,
    name: 'August Kranti Express',
    number: '12953',
    departureTime: '17:40',
    arrivalTime: '10:55',
    duration: '17h 15m',
    source: 'New Delhi',
    destination: 'Mumbai Central',
    price: {
      sleeper: 1180,
      ac3Tier: 2450,
      ac2Tier: 3550,
    },
    seatsAvailable: {
      sleeper: 45,
      ac3Tier: 25,
      ac2Tier: 15,
    },
    amenities: ['WiFi', 'Catering', 'Charging Points', 'Fast'],
    daysOfOperation: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  },
];

const TrainListing = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [trains, setTrains] = useState<Train[]>([]);
  const [filteredTrains, setFilteredTrains] = useState<Train[]>([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    departureTime: [] as string[],
    amenities: [] as string[],
    availability: [] as string[],
  });
  const [sortOption, setSortOption] = useState('departEarly');
  const [selectedDate, setSelectedDate] = useState<string>(
    location.state?.date || format(new Date(), 'yyyy-MM-dd')
  );
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTrains(mockTrains);
      setFilteredTrains(mockTrains);
      setLoading(false);
    }, 1500);
  }, []);
  
  useEffect(() => {
    let result = [...trains];
    
    // Apply sorting
    if (sortOption === 'departEarly') {
      result.sort((a, b) => {
        const timeA = a.departureTime.split(':').map(Number);
        const timeB = b.departureTime.split(':').map(Number);
        return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
      });
    } else if (sortOption === 'departLate') {
      result.sort((a, b) => {
        const timeA = a.departureTime.split(':').map(Number);
        const timeB = b.departureTime.split(':').map(Number);
        return timeB[0] * 60 + timeB[1] - (timeA[0] * 60 + timeA[1]);
      });
    } else if (sortOption === 'durationShort') {
      result.sort((a, b) => {
        const durationA = a.duration.includes('h') 
          ? parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split('h')[1].replace('m', '')) 
          : parseInt(a.duration.replace('m', ''));
        const durationB = b.duration.includes('h') 
          ? parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split('h')[1].replace('m', '')) 
          : parseInt(b.duration.replace('m', ''));
        return durationA - durationB;
      });
    } else if (sortOption === 'priceAsc') {
      result.sort((a, b) => a.price.sleeper - b.price.sleeper);
    }
    
    setFilteredTrains(result);
  }, [sortOption, trains]);
  
  const handlePrevDate = () => {
    const currentDate = parseISO(selectedDate);
    const prevDate = addDays(currentDate, -1);
    if (prevDate >= new Date(new Date().setHours(0,0,0,0))) {
      setSelectedDate(format(prevDate, 'yyyy-MM-dd'));
    }
  };
  
  const handleNextDate = () => {
    const currentDate = parseISO(selectedDate);
    const nextDate = addDays(currentDate, 1);
    if (nextDate <= addDays(new Date(), 120)) {
      setSelectedDate(format(nextDate, 'yyyy-MM-dd'));
    }
  };
  
  return (
    <Layout>
      <AnimatedTransition>
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl font-display font-bold">{location.state?.source} to {location.state?.destination}</h1>
                    {location.state?.isRoundTrip && (
                      <Badge variant="outline" className="ml-2">Round Trip</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">
                    {location.state?.date ? format(new Date(location.state.date), 'EEEE, MMMM d, yyyy') : 'Select a date'} • {filteredTrains.length} trains found
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  className="mt-2 md:mt-0"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Modify Search
                </Button>
              </div>
            </div>
            
            {/* Date Navigation */}
            <div className="mb-6">
              <Card className="border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="ghost" 
                      onClick={handlePrevDate}
                      disabled={parseISO(selectedDate) <= new Date(new Date().setHours(0,0,0,0))}
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Prev Day
                    </Button>
                    
                    <div className="flex space-x-3 overflow-x-auto py-2 px-1">
                      {Array.from({ length: 5 }).map((_, index) => {
                        const date = addDays(parseISO(selectedDate), index - 2);
                        const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                        const isSelected = format(date, 'yyyy-MM-dd') === selectedDate;
                        
                        return (
                          <div 
                            key={index}
                            className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                              isSelected 
                                ? 'bg-primary text-white' 
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={() => setSelectedDate(format(date, 'yyyy-MM-dd'))}
                          >
                            <span className="text-xs font-medium">{format(date, 'EEE')}</span>
                            <span className="text-lg font-semibold">{format(date, 'd')}</span>
                            <span className="text-xs">{format(date, 'MMM')}</span>
                            {isToday && (
                              <span className={`text-xs mt-1 ${isSelected ? 'text-white' : 'text-primary'}`}>Today</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      onClick={handleNextDate}
                      disabled={parseISO(selectedDate) >= addDays(new Date(), 120)}
                    >
                      Next Day
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters */}
              <div className="hidden lg:block">
                <Card className="border shadow-sm sticky top-24">
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </h2>
                    
                    <div className="space-y-6">
                      {/* Departure Time */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">Departure Time</h3>
                        <div className="space-y-2">
                          {[
                            { label: 'Early Morning (12AM - 6AM)', value: 'earlyMorning' },
                            { label: 'Morning (6AM - 12PM)', value: 'morning' },
                            { label: 'Afternoon (12PM - 6PM)', value: 'afternoon' },
                            { label: 'Night (6PM - 12AM)', value: 'night' },
                          ].map((time) => (
                            <div key={time.value} className="flex items-center">
                              <input
                                type="checkbox"
                                id={time.value}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <label htmlFor={time.value} className="ml-2 text-sm text-gray-700">
                                {time.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Train Class */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">Class</h3>
                        <div className="space-y-2">
                          {[
                            { label: 'Sleeper', value: 'SL' },
                            { label: 'AC 3 Tier', value: '3A' },
                            { label: 'AC 2 Tier', value: '2A' },
                          ].map((cls) => (
                            <div key={cls.value} className="flex items-center">
                              <input
                                type="checkbox"
                                id={cls.value}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <label htmlFor={cls.value} className="ml-2 text-sm text-gray-700">
                                {cls.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Availability */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">Availability</h3>
                        <div className="space-y-2">
                          {[
                            { label: 'Available', value: 'available' },
                            { label: 'Waitlist', value: 'waitlist' },
                          ].map((availability) => (
                            <div key={availability.value} className="flex items-center">
                              <input
                                type="checkbox"
                                id={availability.value}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <label htmlFor={availability.value} className="ml-2 text-sm text-gray-700">
                                {availability.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Train Types */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">Train Type</h3>
                        <div className="space-y-2">
                          {[
                            { label: 'Rajdhani', value: 'rajdhani' },
                            { label: 'Shatabdi', value: 'shatabdi' },
                            { label: 'Duronto', value: 'duronto' },
                            { label: 'Superfast', value: 'superfast' },
                            { label: 'Express', value: 'express' },
                            { label: 'Passenger', value: 'passenger' },
                          ].map((type) => (
                            <div key={type.value} className="flex items-center">
                              <input
                                type="checkbox"
                                id={type.value}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <label htmlFor={type.value} className="ml-2 text-sm text-gray-700">
                                {type.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Train Listings */}
              <div className="lg:col-span-3">
                {/* Mobile Filters/Sort */}
                <Card className="border shadow-sm mb-4 lg:hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-2 divide-x">
                      <button className="flex items-center justify-center py-3 font-medium hover:bg-gray-50 transition-colors">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </button>
                      <button className="flex items-center justify-center py-3 font-medium hover:bg-gray-50 transition-colors">
                        <Clock className="h-4 w-4 mr-2" />
                        Sort
                      </button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Sort Options - Desktop */}
                <Card className="border shadow-sm mb-4 hidden lg:block">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-gray-500 mr-2">Sort by:</span>
                        <Tabs value={sortOption} onValueChange={setSortOption} className="inline-flex">
                          <TabsList>
                            <TabsTrigger value="departEarly" className="text-xs">Departure (Early)</TabsTrigger>
                            <TabsTrigger value="departLate" className="text-xs">Departure (Late)</TabsTrigger>
                            <TabsTrigger value="durationShort" className="text-xs">Duration</TabsTrigger>
                            <TabsTrigger value="priceAsc" className="text-xs">Price</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="hidden md:flex">
                          <Zap className="h-3 w-3 mr-1" />
                          Tatkal Booking
                        </Button>
                        <Button variant="outline" size="sm" className="hidden md:flex">
                          <Calendar className="h-3 w-3 mr-1" />
                          Flexible with dates
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Train Listings */}
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
                    <p className="text-gray-600">Finding the best trains for you...</p>
                  </div>
                ) : filteredTrains.length > 0 ? (
                  <div className="space-y-4">
                    {filteredTrains.map((train) => (
                      <TrainCard key={train.id} train={train} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <TrainIcon className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No trains found</h3>
                    <p className="text-gray-600 max-w-md">
                      We couldn't find any trains matching your criteria. Try adjusting your filters or selecting a different date.
                    </p>
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

export default TrainListing;
