
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Search, Calendar as CalendarIcon, Check, X, Train, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface AvailabilityData {
  date: string;
  day: string;
  availability: {
    sleeper: string;
    ac3Tier: string;
    ac2Tier: string;
    acFirstClass: string;
  };
  fare: {
    sleeper: number;
    ac3Tier: number;
    ac2Tier: number;
    acFirstClass: number;
  };
}

const SeatAvailability = () => {
  const { toast } = useToast();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [trainNumber, setTrainNumber] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [travelClass, setTravelClass] = useState('SL');
  const [quota, setQuota] = useState('GN');
  
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData[] | null>(null);
  const [trainDetails, setTrainDetails] = useState<{
    trainNumber: string;
    trainName: string;
    runsOn: string[];
  } | null>(null);
  
  const handleCheckAvailability = () => {
    if (!source || !destination || !trainNumber || !date) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate fetching availability data
    setTrainDetails({
      trainNumber: trainNumber,
      trainName: 'Rajdhani Express',
      runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    });
    
    const mockData: AvailabilityData[] = [];
    const currentDate = date ? new Date(date) : new Date();
    
    for (let i = 0; i < 6; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      
      const dayOfWeek = format(nextDate, 'EEE');
      const dateString = format(nextDate, 'dd MMM yyyy');
      
      // Generate random availability based on day
      const getRandomAvailability = () => {
        const options = ['Available', 'RAC', 'WL 5', 'WL 15', 'WL 30'];
        return options[Math.floor(Math.random() * options.length)];
      };
      
      mockData.push({
        date: dateString,
        day: dayOfWeek,
        availability: {
          sleeper: getRandomAvailability(),
          ac3Tier: getRandomAvailability(),
          ac2Tier: getRandomAvailability(),
          acFirstClass: getRandomAvailability(),
        },
        fare: {
          sleeper: 450,
          ac3Tier: 1200,
          ac2Tier: 2100,
          acFirstClass: 3600,
        }
      });
    }
    
    setAvailabilityData(mockData);
    
    toast({
      title: "Availability Checked",
      description: `Showing availability for ${trainNumber} between ${source} and ${destination}`,
    });
  };
  
  const getAvailabilityColor = (status: string) => {
    if (status === 'Available') return 'text-green-600';
    if (status.startsWith('RAC')) return 'text-amber-600';
    return 'text-red-600';
  };
  
  const getAvailabilityIcon = (status: string) => {
    if (status === 'Available') return <Check className="h-4 w-4 text-green-600" />;
    return null;
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pt-24 pb-12">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className="text-3xl font-display font-bold mb-6">Check Seat Availability</h1>
          
          <Card className="border-0 shadow-sm mb-6">
            <CardHeader>
              <CardTitle>Search Train</CardTitle>
              <CardDescription>Check availability for a specific train and date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Station
                  </label>
                  <Input 
                    placeholder="Enter source station" 
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To Station
                  </label>
                  <Input 
                    placeholder="Enter destination station" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Train Number
                  </label>
                  <Input 
                    placeholder="Enter train number" 
                    value={trainNumber}
                    onChange={(e) => setTrainNumber(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Journey
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Travel Class
                  </label>
                  <Select value={travelClass} onValueChange={setTravelClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select travel class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SL">Sleeper (SL)</SelectItem>
                      <SelectItem value="3A">AC 3 Tier (3A)</SelectItem>
                      <SelectItem value="2A">AC 2 Tier (2A)</SelectItem>
                      <SelectItem value="1A">AC First Class (1A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quota
                  </label>
                  <Select value={quota} onValueChange={setQuota}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quota" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GN">General (GN)</SelectItem>
                      <SelectItem value="LD">Ladies (LD)</SelectItem>
                      <SelectItem value="TQ">Tatkal (TQ)</SelectItem>
                      <SelectItem value="PT">Premium Tatkal (PT)</SelectItem>
                      <SelectItem value="SS">Senior Citizen (SS)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={handleCheckAvailability} className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Check Availability
              </Button>
            </CardContent>
          </Card>
          
          {trainDetails && availabilityData && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Train className="h-5 w-5 mr-2" />
                      {trainDetails.trainNumber} - {trainDetails.trainName}
                    </CardTitle>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {trainDetails.runsOn.map((day) => (
                        <Badge key={day} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <div className="flex items-center text-gray-700">
                      <span className="font-medium">{source}</span>
                      <ArrowRight className="h-4 w-4 mx-2" />
                      <span className="font-medium">{destination}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-4 py-3 text-sm font-medium text-gray-500">Date</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-500">Sleeper</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-500">AC 3 Tier</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-500">AC 2 Tier</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-500">AC First Class</th>
                      </tr>
                    </thead>
                    <tbody>
                      {availabilityData.map((data, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-3">
                            <div className="font-medium">{data.date}</div>
                            <div className="text-sm text-gray-500">{data.day}</div>
                          </td>
                          
                          <td className="px-4 py-3">
                            <div className={`font-medium flex items-center ${getAvailabilityColor(data.availability.sleeper)}`}>
                              {getAvailabilityIcon(data.availability.sleeper)}
                              <span className="ml-1">{data.availability.sleeper}</span>
                            </div>
                            <div className="text-sm text-gray-500">₹{data.fare.sleeper}</div>
                          </td>
                          
                          <td className="px-4 py-3">
                            <div className={`font-medium flex items-center ${getAvailabilityColor(data.availability.ac3Tier)}`}>
                              {getAvailabilityIcon(data.availability.ac3Tier)}
                              <span className="ml-1">{data.availability.ac3Tier}</span>
                            </div>
                            <div className="text-sm text-gray-500">₹{data.fare.ac3Tier}</div>
                          </td>
                          
                          <td className="px-4 py-3">
                            <div className={`font-medium flex items-center ${getAvailabilityColor(data.availability.ac2Tier)}`}>
                              {getAvailabilityIcon(data.availability.ac2Tier)}
                              <span className="ml-1">{data.availability.ac2Tier}</span>
                            </div>
                            <div className="text-sm text-gray-500">₹{data.fare.ac2Tier}</div>
                          </td>
                          
                          <td className="px-4 py-3">
                            <div className={`font-medium flex items-center ${getAvailabilityColor(data.availability.acFirstClass)}`}>
                              {getAvailabilityIcon(data.availability.acFirstClass)}
                              <span className="ml-1">{data.availability.acFirstClass}</span>
                            </div>
                            <div className="text-sm text-gray-500">₹{data.fare.acFirstClass}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button onClick={() => window.location.href = `/train-details/${trainDetails.trainNumber}`}>
                    Book This Train
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SeatAvailability;
