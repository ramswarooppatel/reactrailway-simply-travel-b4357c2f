
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, Map, ArrowUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const popularCities = [
  'New Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bengaluru',
  'Hyderabad', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow',
  'Surat', 'Kanpur', 'Nagpur', 'Visakhapatnam', 'Bhopal'
];

const TrainSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize state from location if available
  const [source, setSource] = useState(location.state?.source || '');
  const [destination, setDestination] = useState(location.state?.destination || '');
  const [date, setDate] = useState<Date | undefined>(
    location.state?.date ? new Date(location.state.date) : new Date()
  );
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('oneWay');
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [returnCalendarOpen, setReturnCalendarOpen] = useState(false);
  
  const handleSearch = () => {
    if (source && destination && date) {
      navigate('/train-listing', { 
        state: { 
          source, 
          destination, 
          date: format(date, 'yyyy-MM-dd'),
          returnDate: returnDate ? format(returnDate, 'yyyy-MM-dd') : undefined,
          isRoundTrip: activeTab === 'roundTrip'
        } 
      });
    }
  };

  const handleSwap = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  return (
    <Layout>
      <AnimatedTransition>
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-display font-bold text-center mb-8">Find Your Train</h1>
              
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <Tabs defaultValue="oneWay" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="oneWay">One way</TabsTrigger>
                      <TabsTrigger value="roundTrip">Round trip</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* From Station */}
                      <div className="relative">
                        <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">From</label>
                        <div className="relative">
                          <input
                            id="source"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            placeholder="Enter city or station"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Map className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <div className="h-4 w-4 rounded-full bg-green-500"></div>
                          </div>
                          
                          {/* Suggestions dropdown */}
                          {source && (
                            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                              {popularCities
                                .filter(city => city.toLowerCase().includes(source.toLowerCase()))
                                .map((city, index) => (
                                  <div
                                    key={index}
                                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                                    onClick={() => setSource(city)}
                                  >
                                    {city}
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* To Station */}
                      <div className="relative">
                        <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">To</label>
                        <div className="relative">
                          <input
                            id="destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            placeholder="Enter city or station"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Map className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <div className="h-4 w-4 rounded-full bg-red-500"></div>
                          </div>
                          
                          {/* Suggestions dropdown */}
                          {destination && (
                            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                              {popularCities
                                .filter(city => city.toLowerCase().includes(destination.toLowerCase()))
                                .map((city, index) => (
                                  <div
                                    key={index}
                                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                                    onClick={() => setDestination(city)}
                                  >
                                    {city}
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Swap Button */}
                    <div className="flex justify-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleSwap}
                        className="rounded-full h-10 w-10 border border-gray-200 hover:border-primary hover:bg-white transition-all"
                      >
                        <ArrowUpDown className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                    
                    {/* Date Selection */}
                    <div className={`grid grid-cols-1 ${activeTab === 'roundTrip' ? 'md:grid-cols-2' : ''} gap-4`}>
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                          Departure Date
                        </label>
                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                          <PopoverTrigger asChild>
                            <button
                              id="date"
                              className="w-full flex items-center justify-between px-4 py-3 border rounded-lg hover:border-primary focus:outline-none transition-colors bg-white"
                            >
                              <div className="flex items-center">
                                <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                                {date ? format(date, 'PPP') : 'Select date'}
                              </div>
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {date ? format(date, 'EEE') : ''}
                              </span>
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(newDate) => {
                                setDate(newDate);
                                setCalendarOpen(false);
                                
                                // If round trip and return date is before new departure date, adjust it
                                if (activeTab === 'roundTrip' && returnDate && newDate && returnDate < newDate) {
                                  // Set return date to the day after departure
                                  const nextDay = new Date(newDate);
                                  nextDay.setDate(nextDay.getDate() + 1);
                                  setReturnDate(nextDay);
                                }
                              }}
                              disabled={(date) => date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 120))}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      {activeTab === 'roundTrip' && (
                        <div>
                          <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Return Date
                          </label>
                          <Popover open={returnCalendarOpen} onOpenChange={setReturnCalendarOpen}>
                            <PopoverTrigger asChild>
                              <button
                                id="returnDate"
                                className="w-full flex items-center justify-between px-4 py-3 border rounded-lg hover:border-primary focus:outline-none transition-colors bg-white"
                              >
                                <div className="flex items-center">
                                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                                  {returnDate ? format(returnDate, 'PPP') : 'Select return date'}
                                </div>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {returnDate ? format(returnDate, 'EEE') : ''}
                                </span>
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={returnDate}
                                onSelect={(newDate) => {
                                  setReturnDate(newDate);
                                  setReturnCalendarOpen(false);
                                }}
                                disabled={(currentDate) => {
                                  // Can't select dates before departure date or more than 4 months in future
                                  const fourMonthsLater = new Date();
                                  fourMonthsLater.setMonth(fourMonthsLater.getMonth() + 4);
                                  return (date && currentDate < date) || currentDate > fourMonthsLater;
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      )}
                    </div>
                    
                    {/* Search Button */}
                    <Button 
                      onClick={handleSearch} 
                      className="w-full bg-primary hover:bg-primary/90 text-white py-6 mt-4"
                      disabled={!source || !destination || !date || (activeTab === 'roundTrip' && !returnDate)}
                    >
                      Search Trains
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recent Searches */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Recent Searches</h2>
                <div className="space-y-3">
                  {[
                    { from: 'Mumbai', to: 'Delhi', date: '2023-12-10' },
                    { from: 'Bangalore', to: 'Chennai', date: '2023-12-15' },
                    { from: 'Kolkata', to: 'Hyderabad', date: '2023-12-20' },
                  ].map((search, index) => (
                    <div 
                      key={index}
                      className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all"
                      onClick={() => {
                        setSource(search.from);
                        setDestination(search.to);
                        setDate(new Date(search.date));
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-medium">{search.from} → {search.to}</div>
                            <div className="text-sm text-gray-500">{new Date(search.date).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">
                            <CalendarIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Popular Routes */}
              <div className="mt-8 pb-8">
                <h2 className="text-lg font-semibold mb-4">Popular Routes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { from: 'Delhi', to: 'Mumbai' },
                    { from: 'Mumbai', to: 'Bangalore' },
                    { from: 'Chennai', to: 'Hyderabad' },
                    { from: 'Kolkata', to: 'Delhi' },
                  ].map((route, index) => (
                    <div 
                      key={index}
                      className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm cursor-pointer hover:shadow-md hover:border-primary transition-all"
                      onClick={() => {
                        setSource(route.from);
                        setDestination(route.to);
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{route.from} → {route.to}</div>
                        <Button variant="ghost" size="sm" className="text-primary">Select</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedTransition>
    </Layout>
  );
};

export default TrainSearch;
