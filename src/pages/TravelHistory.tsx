
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Train, Calendar, Clock, ArrowRight, FileText, Map, User } from 'lucide-react';

interface Journey {
  id: string;
  pnr: string;
  trainNumber: string;
  trainName: string;
  source: string;
  sourceCode: string;
  destination: string;
  destinationCode: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  travelClass: string;
  status: 'Completed' | 'Cancelled';
  distance: number;
  fare: number;
  passengers: number;
}

const TravelHistory = () => {
  const [year, setYear] = useState('2023');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data for journeys
  const allJourneys: Journey[] = [
    {
      id: 'J1001',
      pnr: '1234567890',
      trainNumber: '12301',
      trainName: 'Rajdhani Express',
      source: 'New Delhi',
      sourceCode: 'NDLS',
      destination: 'Mumbai Central',
      destinationCode: 'MMCT',
      departureDate: '15 Dec 2023',
      departureTime: '16:50',
      arrivalDate: '16 Dec 2023',
      arrivalTime: '08:35',
      travelClass: '3A',
      status: 'Completed',
      distance: 1384,
      fare: 2100,
      passengers: 2
    },
    {
      id: 'J1002',
      pnr: '9876543210',
      trainNumber: '12951',
      trainName: 'Mumbai Rajdhani',
      source: 'Mumbai Central',
      sourceCode: 'MMCT',
      destination: 'New Delhi',
      destinationCode: 'NDLS',
      departureDate: '20 Nov 2023',
      departureTime: '17:00',
      arrivalDate: '21 Nov 2023',
      arrivalTime: '08:35',
      travelClass: '2A',
      status: 'Completed',
      distance: 1384,
      fare: 2800,
      passengers: 1
    },
    {
      id: 'J1003',
      pnr: '5678901234',
      trainNumber: '12259',
      trainName: 'Duronto Express',
      source: 'Sealdah',
      sourceCode: 'SDAH',
      destination: 'New Delhi',
      destinationCode: 'NDLS',
      departureDate: '10 Oct 2023',
      departureTime: '20:05',
      arrivalDate: '11 Oct 2023',
      arrivalTime: '12:00',
      travelClass: 'SL',
      status: 'Cancelled',
      distance: 1453,
      fare: 1250,
      passengers: 3
    },
    {
      id: 'J1004',
      pnr: '4567890123',
      trainNumber: '12302',
      trainName: 'Rajdhani Express',
      source: 'New Delhi',
      sourceCode: 'NDLS',
      destination: 'Howrah Junction',
      destinationCode: 'HWH',
      departureDate: '05 Sep 2023',
      departureTime: '16:10',
      arrivalDate: '06 Sep 2023',
      arrivalTime: '10:05',
      travelClass: '1A',
      status: 'Completed',
      distance: 1451,
      fare: 4350,
      passengers: 2
    },
    {
      id: 'J1005',
      pnr: '3456789012',
      trainNumber: '12952',
      trainName: 'Mumbai Rajdhani',
      source: 'New Delhi',
      sourceCode: 'NDLS',
      destination: 'Mumbai Central',
      destinationCode: 'MMCT',
      departureDate: '25 Aug 2023',
      departureTime: '16:25',
      arrivalDate: '26 Aug 2023',
      arrivalTime: '08:15',
      travelClass: '3A',
      status: 'Completed',
      distance: 1384,
      fare: 2100,
      passengers: 2
    }
  ];
  
  // Filter journeys by year and search query
  const filteredJourneys = allJourneys.filter(journey => {
    const journeyYear = journey.departureDate.split(' ')[2];
    const matchesYear = journeyYear === year;
    
    const matchesSearch = searchQuery.length === 0 || 
      journey.trainName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      journey.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      journey.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      journey.pnr.includes(searchQuery);
    
    return matchesYear && matchesSearch;
  });
  
  // Calculate statistics
  const totalJourneys = filteredJourneys.length;
  const totalDistance = filteredJourneys.reduce((sum, journey) => 
    journey.status === 'Completed' ? sum + journey.distance : sum, 0);
  const totalFare = filteredJourneys.reduce((sum, journey) => 
    sum + journey.fare, 0);
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pt-24 pb-12">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className="text-3xl font-display font-bold mb-6">Travel History</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-50 rounded-full mr-4">
                    <Train className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total Journeys</div>
                    <div className="text-2xl font-semibold">{totalJourneys}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="p-2 bg-green-50 rounded-full mr-4">
                    <Map className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total Distance</div>
                    <div className="text-2xl font-semibold">{totalDistance} km</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="p-2 bg-amber-50 rounded-full mr-4">
                    <FileText className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total Fare</div>
                    <div className="text-2xl font-semibold">₹{totalFare}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Your Journeys</CardTitle>
              <div className="flex flex-wrap gap-4">
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input 
                  placeholder="Search journeys..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-auto max-w-sm"
                />
              </div>
            </CardHeader>
            
            <CardContent className="px-0 py-0">
              {filteredJourneys.length > 0 ? (
                <div className="divide-y">
                  {filteredJourneys.map((journey) => (
                    <div key={journey.id} className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <Badge className={`mr-2 ${journey.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} border-0`}>
                              {journey.status}
                            </Badge>
                            <h3 className="font-medium">{journey.trainNumber} - {journey.trainName}</h3>
                          </div>
                          
                          <div className="mb-2 flex items-center">
                            <div className="flex flex-col justify-center items-center">
                              <div className="text-sm font-medium">{journey.sourceCode}</div>
                              <div className="h-1 w-1 bg-gray-400 rounded-full my-1"></div>
                              <div className="text-xs text-gray-500">{journey.departureTime}</div>
                            </div>
                            
                            <div className="mx-3 flex-1 border-t border-dashed border-gray-300 relative">
                              <ArrowRight className="h-4 w-4 text-gray-400 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" />
                            </div>
                            
                            <div className="flex flex-col justify-center items-center">
                              <div className="text-sm font-medium">{journey.destinationCode}</div>
                              <div className="h-1 w-1 bg-gray-400 rounded-full my-1"></div>
                              <div className="text-xs text-gray-500">{journey.arrivalTime}</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 gap-x-6 mb-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {journey.departureDate}
                            </div>
                            <div>
                              {journey.source} to {journey.destination}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              Journey Time: ~15h 45m
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {journey.passengers} {journey.passengers > 1 ? 'Passengers' : 'Passenger'}
                            </div>
                          </div>
                          
                          <div className="text-sm flex flex-wrap gap-x-4">
                            <span className="text-gray-500">PNR: <span className="font-medium">{journey.pnr}</span></span>
                            <span className="text-gray-500">Class: <span className="font-medium">{journey.travelClass}</span></span>
                            <span className="text-gray-500">Distance: <span className="font-medium">{journey.distance} km</span></span>
                            <span className="text-gray-500">Fare: <span className="font-medium">₹{journey.fare}</span></span>
                          </div>
                        </div>
                        
                        <div>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Calendar className="h-10 w-10 mb-3 mx-auto text-gray-400" />
                  <h3 className="text-lg font-medium mb-1">No journeys found</h3>
                  <p className="text-gray-500 mb-4">You don't have any journeys for the selected criteria</p>
                  <Button variant="outline" onClick={() => setSearchQuery('')}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TravelHistory;
