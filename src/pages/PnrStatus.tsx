
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Search, Calendar, Clock, Train, MapPin, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PnrStatus = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pnrNumber, setPnrNumber] = useState('');
  const [pnrResult, setPnrResult] = useState<null | {
    pnr: string;
    trainNumber: string;
    trainName: string;
    date: string;
    boardingStation: string;
    destination: string;
    class: string;
    passengers: { seat: string; status: string; coach: string }[];
    status: 'Confirmed' | 'Waiting' | 'RAC';
  }>(null);

  const handleCheckPnr = () => {
    if (!pnrNumber || pnrNumber.length !== 10) {
      toast({
        title: "Invalid PNR",
        description: "Please enter a valid 10-digit PNR number",
        variant: "destructive",
      });
      return;
    }

    // Simulate PNR check - in a real app, this would be an API call
    setPnrResult({
      pnr: pnrNumber,
      trainNumber: '12301',
      trainName: 'Rajdhani Express',
      date: '15 Dec 2023',
      boardingStation: 'New Delhi (NDLS)',
      destination: 'Mumbai Central (MMCT)',
      class: '3A',
      passengers: [
        { seat: 'LB', status: 'CNF', coach: 'B1' },
        { seat: 'MB', status: 'CNF', coach: 'B1' },
      ],
      status: 'Confirmed',
    });

    toast({
      title: "PNR Fetched Successfully",
      description: "Your ticket details have been retrieved",
    });
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pt-24 pb-12">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className="text-3xl font-display font-bold mb-6">PNR Status</h1>
          
          <Card className="border-0 shadow-sm mb-6">
            <CardHeader>
              <CardTitle>Check Your PNR Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input 
                    type="text" 
                    placeholder="Enter 10-digit PNR Number" 
                    value={pnrNumber}
                    onChange={(e) => setPnrNumber(e.target.value)}
                    maxLength={10}
                    className="w-full"
                  />
                </div>
                <Button onClick={handleCheckPnr} className="flex-shrink-0">
                  <Search className="mr-2 h-4 w-4" />
                  Check Status
                </Button>
              </div>
              
              <Tabs defaultValue="recent" className="mt-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="recent">Recent PNRs</TabsTrigger>
                  <TabsTrigger value="saved">Saved PNRs</TabsTrigger>
                </TabsList>
                <TabsContent value="recent" className="pt-4">
                  <div className="text-center text-gray-500 py-6">
                    <p>Your recent PNR enquiries will appear here</p>
                  </div>
                </TabsContent>
                <TabsContent value="saved" className="pt-4">
                  <div className="text-center text-gray-500 py-6">
                    <p>You don't have any saved PNR enquiries</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {pnrResult && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-0">
                <CardTitle>PNR: {pnrResult.pnr}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mt-4 bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center gap-2 text-green-700 font-medium">
                    <span className="text-lg">Booking Status: {pnrResult.status}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <Train className="w-5 h-5 mr-2 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Train Number/Name</div>
                        <div className="font-medium">{pnrResult.trainNumber} - {pnrResult.trainName}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Date of Journey</div>
                        <div className="font-medium">{pnrResult.date}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">From</div>
                        <div className="font-medium">{pnrResult.boardingStation}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">To</div>
                        <div className="font-medium">{pnrResult.destination}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 mr-2 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Class</div>
                        <div className="font-medium">{pnrResult.class}</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Passenger Details
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-left">
                            <th className="px-4 py-2 text-sm font-medium text-gray-500">Passenger</th>
                            <th className="px-4 py-2 text-sm font-medium text-gray-500">Booking Status</th>
                            <th className="px-4 py-2 text-sm font-medium text-gray-500">Current Status</th>
                            <th className="px-4 py-2 text-sm font-medium text-gray-500">Coach</th>
                            <th className="px-4 py-2 text-sm font-medium text-gray-500">Berth</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pnrResult.passengers.map((passenger, index) => (
                            <tr key={index} className="border-t">
                              <td className="px-4 py-3">Passenger {index + 1}</td>
                              <td className="px-4 py-3">Confirmed</td>
                              <td className="px-4 py-3 font-medium text-green-600">{passenger.status}</td>
                              <td className="px-4 py-3">{passenger.coach}</td>
                              <td className="px-4 py-3">{passenger.seat}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pt-4">
                    <Button variant="outline">
                      Share Ticket
                    </Button>
                    <Button variant="outline">
                      Download E-Ticket
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/ticket-management')}>
                      Cancel Ticket
                    </Button>
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

export default PnrStatus;
