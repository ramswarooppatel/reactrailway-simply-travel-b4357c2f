
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Map, Shield, Users } from 'lucide-react';

const features = [
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: 'Instant Booking',
    description: 'Book your train tickets instantly with our easy-to-use platform',
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: 'Secure Payments',
    description: 'Multiple secure payment options for a safe booking experience',
  },
  {
    icon: <Map className="h-8 w-8 text-primary" />,
    title: 'Live Tracking',
    description: 'Track your train location in real-time for a stress-free journey',
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: 'Fast Refunds',
    description: 'Quick refunds processed within 24-48 hours of cancellation',
  },
];

const stats = [
  { value: '6,500+', label: 'Trains' },
  { value: '8,000+', label: 'Routes' },
  { value: '10M+', label: 'Happy Travelers' },
  { value: '98%', label: 'On-time Arrival' },
];

const Index = () => {
  return (
    <Layout>
      <Hero />
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900">Why Choose RailGo</h2>
            <p className="text-gray-600 mt-4">Experience seamless train booking with features designed for the modern traveler</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <FeaturedDestinations />
      
      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-4">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* App Download Section */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex flex-col md:flex-row">
              <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl font-display font-bold mb-4">Get the RailGo App</h2>
                <p className="text-gray-600 mb-6">
                  Download our mobile app for a seamless booking experience on the go. Access tickets, receive real-time updates, and more.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.6 6.3C16.2 4.9 14.2 4 12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8c2.2 0 4.2-.9 5.6-2.3L14 14.2c-.5.4-1.2.6-2 .6-1.7 0-3-1.3-3-3s1.3-3 3-3c.8 0 1.5.3 2 .8l3.6-3.3z"/>
                      <path d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm0 19c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
                    </svg>
                    Google Play
                  </button>
                  <button className="flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.5 12.3c0-2.4 2-3.8 2.1-3.8-.1-.4-.6-1.4-1.9-1.4-1.1-.1-2.1.7-2.6.7-.6 0-1.4-.6-2.2-.6-1.8 0-3.4 1.4-3.4 3.4 0 1.9 1 3.9 2.3 5.2.6.7 1.2 1.4 2 1.4.8-.1 1.1-.5 2.1-.5 1 0 1.3.5 2.1.5 1 0 1.6-.8 2.2-1.5.5-.7.8-1.4.8-1.4-1.8-.1-2.5-2.4-2.5-4z"/>
                      <path d="M15.2 3.6c.6-.8 1-1.9.9-3-.9.1-1.9.6-2.6 1.4-.5.7-1 1.8-.9 2.8.9.1 1.9-.4 2.6-1.2z"/>
                    </svg>
                    App Store
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop" 
                  alt="RailGo Mobile App" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900">What Our Users Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
                quote: 'RailGo made my travel planning so much easier. The interface is intuitive and booking tickets is a breeze!',
              },
              {
                name: 'Rajesh Kumar',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
                quote: 'I love the real-time train tracking feature. It helps me plan my arrivals and departures with confidence.',
              },
              {
                name: 'Ananya Patel',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
                quote: 'The seat availability predictions are surprisingly accurate. I\'ve never had issues with my bookings.',
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">Verified Traveler</div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
