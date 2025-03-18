
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, Train, Clock, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StationStop {
  station: string;
  code: string;
  arrivalTime: string;
  departureTime: string;
  haltTime: string;
  day: number;
  distance: number;
  platform?: number;
}

const TrainSchedules = () => {
  const { toast } = useToast();
  const [trainNumber, setTrainNumber] = useState('');
  const [schedule, setSchedule] = useState<{
    trainNumber: string;
    trainName: string;
    runningDays: string[];
    stops: StationStop[];
  } | null>(null);

  const handleCheckSchedule = () => {
    if (!trainNumber) {
      toast({
        title: "Train number required",
        description: "Please enter a valid train number",
        variant: "destructive",
      });
      return;
    }

    // Simulate fetching schedule - in a real app, this would be an API call
    setSchedule({
      trainNumber: trainNumber,
      trainName: 'Rajdhani Express',
      runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      stops: [
        {
          station: 'New Delhi',
          code: 'NDLS',
          arrivalTime: '16:50',
          departureTime: '17:00',
          haltTime: '10 mins',
          day: 1,
          distance: 0,
          platform: 5
        },
        {
          station: 'Kanpur Central',
          code: 'CNB',
          arrivalTime: '21:30',
          departureTime: '21:35',
          haltTime: '5 mins',
          day: 1,
          distance: 440,
          platform: 1
        },
        {
          station: 'Allahabad Junction',
          code: 'ALD',
          arrivalTime: '23:55',
          departureTime: '00:00',
          haltTime: '5 mins',
          day: 1,
          distance: 642,
          platform: 6
        },
        {
          station: 'Mughal Sarai Junction',
          code: 'MGS',
          arrivalTime: '01:18',
          departureTime: '01:23',
          haltTime: '5 mins',
          day: 2,
          distance: 792,
          platform: 7
        },
        {
          station: 'Gaya Junction',
          code: 'GAYA',
          arrivalTime: '03:15',
          departureTime: '03:20',
          haltTime: '5 mins',
          day: 2,
          distance: 997,
          platform: 1
        },
        {
          station: 'Dhanbad Junction',
          code: 'DHN',
          arrivalTime: '05:10',
          departureTime: '05:15',
          haltTime: '5 mins',
          day: 2,
          distance: 1193,
          platform: 3
        },
        {
          station: 'Asansol Junction',
          code: 'ASN',
          arrivalTime: '06:05',
          departureTime: '06:10',
          haltTime: '5 mins',
          day: 2,
          distance: 1280,
          platform: 2
        },
        {
          station: 'Durgapur',
          code: 'DGR',
          arrivalTime: '06:37',
          departureTime: '06:38',
          haltTime: '1 min',
          day: 2,
          distance: 1316,
          platform: 1
        },
        {
          station: 'Howrah Junction',
          code: 'HWH',
          arrivalTime: '09:45',
          departureTime: '09:45',
          haltTime: '-',
          day: 2,
          distance: 1451,
          platform: 9
        },
      ]
    });

    toast({
      title: "Schedule Fetched",
      description: `Showing schedule for ${trainNumber} - Rajdhani Express`,
    });
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pt-24 pb-12">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className="text-3xl font-display font-bold mb-6">Train Schedule</h1>
          
          <Card className="border-0 shadow-sm mb-6">
            <CardHeader>
              <CardTitle>Find Train Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input 
                    type="text" 
                    placeholder="Enter Train Number" 
                    value={trainNumber}
                    onChange={(e) => setTrainNumber(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button onClick={handleCheckSchedule} className="flex-shrink-0">
                  <Search className="mr-2 h-4 w-4" />
                  Find Schedule
                </Button>
              </div>
              
              <Tabs defaultValue="trainNumber" className="mt-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="trainNumber">By Train Number</TabsTrigger>
                  <TabsTrigger value="trainName">By Train Name</TabsTrigger>
                </TabsList>
                <TabsContent value="trainNumber" className="pt-4">
                  <div className="text-gray-500 py-2">
                    <p>Enter the train number to see its complete schedule</p>
                  </div>
                </TabsContent>
                <TabsContent value="trainName" className="pt-4">
                  <div className="text-gray-500 py-2">
                    <Input placeholder="Enter Train Name" className="mb-4" />
                    <Button className="w-full">Search</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {schedule && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{schedule.trainNumber} - {schedule.trainName}</CardTitle>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {schedule.runningDays.map((day) => (
                        <Badge key={day} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-sm text-gray-500 mr-2">Distance:</div>
                    <div className="font-medium">{schedule.stops[schedule.stops.length - 1].distance} km</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-4 py-3 font-medium text-gray-500">#</th>
                        <th className="px-4 py-3 font-medium text-gray-500">Station</th>
                        <th className="px-4 py-3 font-medium text-gray-500">Arrives</th>
                        <th className="px-4 py-3 font-medium text-gray-500">Departs</th>
                        <th className="px-4 py-3 font-medium text-gray-500">Halt</th>
                        <th className="px-4 py-3 font-medium text-gray-500">Day</th>
                        <th className="px-4 py-3 font-medium text-gray-500">Distance</th>
                        <th className="px-4 py-3 font-medium text-gray-500">Platform</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.stops.map((stop, index) => (
                        <tr 
                          key={stop.code} 
                          className={`border-t ${index === 0 || index === schedule.stops.length - 1 ? 'bg-green-50' : ''}`}
                        >
                          <td className="px-4 py-3">{index + 1}</td>
                          <td className="px-4 py-3 font-medium">
                            {stop.station} ({stop.code})
                            {index === 0 && <Badge className="ml-2 bg-green-100 text-green-800 border-0">Origin</Badge>}
                            {index === schedule.stops.length - 1 && <Badge className="ml-2 bg-red-100 text-red-800 border-0">Destination</Badge>}
                          </td>
                          <td className="px-4 py-3">
                            {index === 0 ? '-' : stop.arrivalTime}
                          </td>
                          <td className="px-4 py-3">
                            {index === schedule.stops.length - 1 ? '-' : stop.departureTime}
                          </td>
                          <td className="px-4 py-3">{stop.haltTime}</td>
                          <td className="px-4 py-3">{stop.day}</td>
                          <td className="px-4 py-3">{stop.distance} km</td>
                          <td className="px-4 py-3">
                            {stop.platform && <Badge variant="outline" className="bg-gray-100">{stop.platform}</Badge>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-gray-600 mr-2" />
                    <span className="font-medium">Journey Information</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Total Distance:</span>
                      <span className="ml-2 font-medium">{schedule.stops[schedule.stops.length - 1].distance} km</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Journey Time:</span>
                      <span className="ml-2 font-medium">16h 45m</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Average Speed:</span>
                      <span className="ml-2 font-medium">86 km/h</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TrainSchedules;
