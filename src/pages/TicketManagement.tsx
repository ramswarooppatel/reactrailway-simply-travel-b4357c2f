
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Train, Calendar, Users, X, FileText, AlertTriangle, Ticket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Ticket {
  id: string;
  pnr: string;
  trainNumber: string;
  trainName: string;
  source: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  passengerCount: number;
  status: 'Confirmed' | 'Waiting' | 'RAC' | 'Cancelled';
  class: string;
}

const TicketManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [pnrForCancel, setPnrForCancel] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  
  // Sample data for tickets
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'T1001',
      pnr: '1234567890',
      trainNumber: '12301',
      trainName: 'Rajdhani Express',
      source: 'New Delhi',
      destination: 'Mumbai Central',
      departureDate: '15 Dec 2023',
      departureTime: '16:50',
      passengerCount: 2,
      status: 'Confirmed',
      class: '3A'
    },
    {
      id: 'T1002',
      pnr: '9876543210',
      trainNumber: '12951',
      trainName: 'Mumbai Rajdhani',
      source: 'Mumbai Central',
      destination: 'New Delhi',
      departureDate: '20 Dec 2023',
      departureTime: '17:00',
      passengerCount: 1,
      status: 'Confirmed',
      class: '2A'
    },
    {
      id: 'T1003',
      pnr: '5678901234',
      trainNumber: '12259',
      trainName: 'Duronto Express',
      source: 'Sealdah',
      destination: 'New Delhi',
      departureDate: '10 Nov 2023',
      departureTime: '20:05',
      passengerCount: 3,
      status: 'Confirmed',
      class: 'SL'
    }
  ]);
  
  const upcomingTickets = tickets.filter(ticket => 
    ticket.status !== 'Cancelled' && 
    new Date(`${ticket.departureDate} ${ticket.departureTime}`) > new Date()
  );
  
  const completedTickets = tickets.filter(ticket => 
    ticket.status !== 'Cancelled' && 
    new Date(`${ticket.departureDate} ${ticket.departureTime}`) < new Date()
  );
  
  const cancelledTickets = tickets.filter(ticket => 
    ticket.status === 'Cancelled'
  );
  
  const handleCancelTicket = (ticketId: string) => {
    // In a real app, this would make an API call to cancel the ticket
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? {...ticket, status: 'Cancelled'} : ticket
    ));
    
    toast({
      title: "Ticket Cancelled",
      description: "Your refund has been initiated and will be credited within 5-7 working days",
    });
  };
  
  const handleCancelByPNR = () => {
    if (!pnrForCancel || pnrForCancel.length !== 10) {
      toast({
        title: "Invalid PNR",
        description: "Please enter a valid 10-digit PNR number",
        variant: "destructive",
      });
      return;
    }
    
    const ticket = tickets.find(t => t.pnr === pnrForCancel);
    if (!ticket) {
      toast({
        title: "PNR not found",
        description: "No ticket found with this PNR number",
        variant: "destructive",
      });
      return;
    }
    
    if (ticket.status === 'Cancelled') {
      toast({
        title: "Already Cancelled",
        description: "This ticket has already been cancelled",
        variant: "destructive",
      });
      return;
    }
    
    // Cancel the ticket
    handleCancelTicket(ticket.id);
    
    // Reset inputs
    setPnrForCancel('');
    setCancelReason('');
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pt-24 pb-12">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className="text-3xl font-display font-bold mb-6">Ticket Management</h1>
          
          <Card className="border-0 shadow-sm mb-6">
            <CardHeader>
              <CardTitle>Cancel Ticket</CardTitle>
              <CardDescription>Enter your PNR number to cancel your ticket</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Input 
                    placeholder="Enter 10-digit PNR Number" 
                    value={pnrForCancel}
                    onChange={(e) => setPnrForCancel(e.target.value)}
                    maxLength={10}
                  />
                </div>
                <div className="md:col-span-1">
                  <Input 
                    placeholder="Reason for Cancellation (Optional)" 
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                </div>
                <div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full">Cancel Ticket</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Ticket</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to cancel this ticket? This action cannot be undone and refund will be processed as per cancellation policy.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No, Keep Ticket</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCancelByPNR}>Yes, Cancel Ticket</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardHeader className="px-6 py-5">
              <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="upcoming">Upcoming Journeys</TabsTrigger>
                  <TabsTrigger value="completed">Completed Journeys</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled Tickets</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="px-0 py-0">
              <TabsContent value="upcoming" className="m-0">
                <div className="divide-y">
                  {upcomingTickets.length > 0 ? (
                    upcomingTickets.map((ticket) => (
                      <div key={ticket.id} className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <Train className="h-4 w-4 mr-2 text-gray-600" />
                              <h3 className="font-medium">{ticket.trainNumber} - {ticket.trainName}</h3>
                              <Badge className="ml-3 bg-green-100 text-green-800 border-0">
                                {ticket.status}
                              </Badge>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 gap-x-6 mb-3">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {ticket.departureDate}, {ticket.departureTime}
                              </div>
                              <div>
                                {ticket.source} to {ticket.destination}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {ticket.passengerCount} {ticket.passengerCount > 1 ? 'Passengers' : 'Passenger'}
                              </div>
                              <div>
                                Class: {ticket.class}
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-500">
                              PNR: <span className="font-medium">{ticket.pnr}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              View Ticket
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                  <X className="h-4 w-4 mr-1" />
                                  Cancel
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Cancel Ticket</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to cancel this booking for {ticket.trainName} on {ticket.departureDate}? Cancellation charges may apply as per policy.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>No, Keep Ticket</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleCancelTicket(ticket.id)}>
                                    Yes, Cancel Ticket
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <Ticket className="h-10 w-10 mb-3 mx-auto text-gray-400" />
                      <h3 className="text-lg font-medium mb-1">No upcoming journeys</h3>
                      <p className="text-gray-500 mb-4">You don't have any upcoming train journeys</p>
                      <Button variant="outline" onClick={() => window.location.href = '/train-search'}>
                        Book a New Ticket
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="m-0">
                <div className="divide-y">
                  {completedTickets.length > 0 ? (
                    completedTickets.map((ticket) => (
                      <div key={ticket.id} className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <Train className="h-4 w-4 mr-2 text-gray-600" />
                              <h3 className="font-medium">{ticket.trainNumber} - {ticket.trainName}</h3>
                              <Badge className="ml-3 bg-gray-100 text-gray-800 border-0">
                                Completed
                              </Badge>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 gap-x-6 mb-3">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {ticket.departureDate}, {ticket.departureTime}
                              </div>
                              <div>
                                {ticket.source} to {ticket.destination}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {ticket.passengerCount} {ticket.passengerCount > 1 ? 'Passengers' : 'Passenger'}
                              </div>
                              <div>
                                Class: {ticket.class}
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-500">
                              PNR: <span className="font-medium">{ticket.pnr}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              View Ticket
                            </Button>
                            <Button variant="outline" size="sm">
                              Book Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <Ticket className="h-10 w-10 mb-3 mx-auto text-gray-400" />
                      <h3 className="text-lg font-medium mb-1">No completed journeys</h3>
                      <p className="text-gray-500">Your completed journeys will appear here</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="cancelled" className="m-0">
                <div className="divide-y">
                  {cancelledTickets.length > 0 ? (
                    cancelledTickets.map((ticket) => (
                      <div key={ticket.id} className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <Train className="h-4 w-4 mr-2 text-gray-600" />
                              <h3 className="font-medium">{ticket.trainNumber} - {ticket.trainName}</h3>
                              <Badge className="ml-3 bg-red-100 text-red-800 border-0">
                                Cancelled
                              </Badge>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 gap-x-6 mb-3">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {ticket.departureDate}, {ticket.departureTime}
                              </div>
                              <div>
                                {ticket.source} to {ticket.destination}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {ticket.passengerCount} {ticket.passengerCount > 1 ? 'Passengers' : 'Passenger'}
                              </div>
                              <div>
                                Class: {ticket.class}
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-500">
                              PNR: <span className="font-medium">{ticket.pnr}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                              Refund Status
                            </Button>
                            <Button variant="outline" size="sm">
                              Book Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <AlertTriangle className="h-10 w-10 mb-3 mx-auto text-gray-400" />
                      <h3 className="text-lg font-medium mb-1">No cancelled tickets</h3>
                      <p className="text-gray-500">Your cancelled tickets will appear here</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TicketManagement;
