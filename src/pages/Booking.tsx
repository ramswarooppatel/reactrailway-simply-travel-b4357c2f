
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Train } from '@/components/TrainCard';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  UserRound, 
  CreditCard, 
  Calendar, 
  ChevronRight, 
  X, 
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Passenger {
  id: string;
  name: string;
  age: string;
  gender: string;
  berth: string;
}

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get train data from location state
  const train = location.state?.train as Train;
  const travelClass = location.state?.travelClass || '3A';
  
  const [passengers, setPassengers] = useState<Passenger[]>([
    { id: '1', name: '', age: '', gender: 'male', berth: 'no_preference' }
  ]);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  if (!train) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">No booking information</h2>
                <p className="text-gray-600 mb-6">Please select a train first to proceed with booking.</p>
                <Button onClick={() => navigate('/train-search')}>Find Trains</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
  
  const handleAddPassenger = () => {
    if (passengers.length < 6) {
      setPassengers([
        ...passengers,
        { 
          id: (passengers.length + 1).toString(),
          name: '',
          age: '',
          gender: 'male',
          berth: 'no_preference'
        }
      ]);
    } else {
      toast({
        title: "Maximum passengers reached",
        description: "You can book up to 6 passengers in a single transaction.",
        variant: "destructive"
      });
    }
  };
  
  const handleRemovePassenger = (id: string) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter(p => p.id !== id));
    } else {
      toast({
        title: "Cannot remove",
        description: "At least one passenger is required for booking.",
        variant: "destructive"
      });
    }
  };
  
  const handlePassengerChange = (id: string, field: keyof Passenger, value: string) => {
    setPassengers(
      passengers.map(passenger => 
        passenger.id === id ? { ...passenger, [field]: value } : passenger
      )
    );
  };
  
  const handleSubmitBooking = () => {
    // Validate inputs
    const isValid = passengers.every(p => p.name && p.age) && contactEmail && contactPhone;
    
    if (!isValid) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate successful booking
    toast({
      title: "Booking Successful!",
      description: "Your ticket has been booked. Check your email for confirmation.",
      variant: "default"
    });
    
    // Navigate to success page or profile
    navigate('/profile');
  };
  
  const getClassLabel = (code: string) => {
    switch (code) {
      case 'SL': return 'Sleeper';
      case '3A': return 'AC 3 Tier';
      case '2A': return 'AC 2 Tier';
      case '1A': return 'AC First Class';
      default: return code;
    }
  };
  
  const calculateTotal = () => {
    const basePrice = train.price[travelClass === 'SL' ? 'sleeper' : travelClass === '3A' ? 'ac3Tier' : 'ac2Tier'];
    return basePrice * passengers.length;
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
              Back to train details
            </Button>
            
            <h1 className="text-3xl font-display font-bold mb-6">Book Your Ticket</h1>
            
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left column - Booking form */}
              <div className="lg:w-2/3">
                {/* Train information */}
                <Card className="border-0 shadow-sm mb-6">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row justify-between mb-4">
                      <div>
                        <div className="flex items-center">
                          <h2 className="text-xl font-semibold">{train.name}</h2>
                          <Badge variant="outline" className="ml-2">
                            {train.number}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          {train.source} to {train.destination} • {train.duration}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0 text-right">
                        <div className="text-sm text-gray-600">Travel Class</div>
                        <div className="font-semibold">
                          {getClassLabel(travelClass)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <div className="text-sm text-gray-500">Date</div>
                        <div className="font-medium">Wed, 15 Dec 2023</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Departure</div>
                        <div className="font-medium">{train.departureTime}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Arrival</div>
                        <div className="font-medium">{train.arrivalTime}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Price</div>
                        <div className="font-medium">₹{calculateTotal()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Passenger Information */}
                <Card className="border-0 shadow-sm mb-6">
                  <CardHeader>
                    <CardTitle>Passenger Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-0">
                    {passengers.map((passenger, index) => (
                      <div
                        key={passenger.id}
                        className="mb-6 pb-6 border-b last:border-0 last:pb-0 last:mb-0"
                      >
                        <div className="flex justify-between mb-4">
                          <h3 className="font-medium">Passenger {index + 1}</h3>
                          {passengers.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemovePassenger(passenger.id)}
                              className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <Input
                              value={passenger.name}
                              onChange={(e) => handlePassengerChange(passenger.id, 'name', e.target.value)}
                              placeholder="Enter name as per ID"
                              className="w-full"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Age
                            </label>
                            <Input
                              type="number"
                              value={passenger.age}
                              onChange={(e) => handlePassengerChange(passenger.id, 'age', e.target.value)}
                              placeholder="Age"
                              min="1"
                              max="120"
                              className="w-full"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Gender
                            </label>
                            <select
                              value={passenger.gender}
                              onChange={(e) => handlePassengerChange(passenger.id, 'gender', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Berth Preference
                            </label>
                            <select
                              value={passenger.berth}
                              onChange={(e) => handlePassengerChange(passenger.id, 'berth', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            >
                              <option value="no_preference">No Preference</option>
                              <option value="lower">Lower</option>
                              <option value="middle">Middle</option>
                              <option value="upper">Upper</option>
                              <option value="side_lower">Side Lower</option>
                              <option value="side_upper">Side Upper</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      variant="outline"
                      onClick={handleAddPassenger}
                      disabled={passengers.length >= 6}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Passenger ({passengers.length}/6)
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Contact Information */}
                <Card className="border-0 shadow-sm mb-6">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="For e-ticket and updates"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile Number
                        </label>
                        <Input
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="For important alerts"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Payment Information */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="card" value={paymentMethod} onValueChange={setPaymentMethod}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="card">Credit Card</TabsTrigger>
                        <TabsTrigger value="upi">UPI</TabsTrigger>
                        <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="card" className="pt-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <Input
                              placeholder="1234 5678 9012 3456"
                              className="w-full"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date
                              </label>
                              <Input
                                placeholder="MM/YY"
                                className="w-full"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                              </label>
                              <Input
                                type="password"
                                placeholder="123"
                                maxLength={3}
                                className="w-full"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Cardholder Name
                            </label>
                            <Input
                              placeholder="Name as on card"
                              className="w-full"
                            />
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="upi" className="pt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            UPI ID
                          </label>
                          <Input
                            placeholder="yourname@upi"
                            className="w-full"
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            You'll receive a payment request on your UPI app.
                          </p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="netbanking" className="pt-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {['SBI', 'HDFC', 'ICICI', 'Axis', 'PNB', 'Kotak'].map((bank) => (
                            <div 
                              key={bank}
                              className="border rounded-lg p-3 text-center cursor-pointer hover:border-primary transition-colors"
                            >
                              {bank} Bank
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-4">
                          You will be redirected to your bank's website to complete the payment.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right column - Fare Summary */}
              <div className="lg:w-1/3">
                <div className="sticky top-24">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Fare Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Base Fare</span>
                          <span>₹{calculateTotal()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reservation Charges</span>
                          <span>₹{passengers.length * 40}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Superfast Charges</span>
                          <span>₹{passengers.length * 30}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">GST (5%)</span>
                          <span>₹{Math.round(calculateTotal() * 0.05)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Convenience Fee</span>
                          <span>₹25</span>
                        </div>
                        
                        <Separator className="my-3" />
                        
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total Amount</span>
                          <span>₹{calculateTotal() + (passengers.length * 70) + Math.round(calculateTotal() * 0.05) + 25}</span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleSubmitBooking}
                        className="w-full mt-6 bg-primary hover:bg-primary/90 text-white"
                        size="lg"
                      >
                        Pay & Confirm Booking
                      </Button>
                      
                      <div className="mt-6 space-y-3">
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                          <span className="text-sm text-gray-600">Instant confirmation</span>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                          <span className="text-sm text-gray-600">Free cancellation up to 48 hours before departure</span>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                          <span className="text-sm text-gray-600">Secure payment</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="mt-4 bg-amber-50 border border-amber-100 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 text-amber-600 mr-2" />
                      <span className="font-medium text-amber-800">Important Dates</span>
                    </div>
                    <div className="text-sm text-amber-700">
                      <p>• Booking closes: 5 minutes before departure</p>
                      <p>• Free cancellation until: Dec 13, 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedTransition>
    </Layout>
  );
};

export default Booking;
