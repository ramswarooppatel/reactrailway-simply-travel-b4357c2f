
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  image: string;
  description: string;
  from: string;
  popular: boolean;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'Delhi to Mumbai',
    image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=800&auto=format&fit=crop',
    description: 'The capital city to the financial hub',
    from: 'Delhi',
    popular: true,
  },
  {
    id: 2,
    name: 'Kolkata to Chennai',
    image: 'https://images.unsplash.com/photo-1554774853-b3d587d95440?q=80&w=800&auto=format&fit=crop',
    description: 'East coast to South coast journey',
    from: 'Kolkata',
    popular: false,
  },
  {
    id: 3,
    name: 'Bangalore to Hyderabad',
    image: 'https://images.unsplash.com/photo-1531501410720-c8d437636169?q=80&w=800&auto=format&fit=crop',
    description: 'Tech hubs of south India',
    from: 'Bangalore',
    popular: true,
  },
  {
    id: 4,
    name: 'Jaipur to Udaipur',
    image: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?q=80&w=800&auto=format&fit=crop',
    description: 'Royal journey through Rajasthan',
    from: 'Jaipur',
    popular: false,
  },
];

const FeaturedDestinations = () => {
  const navigate = useNavigate();

  const handleDestinationClick = (destination: Destination) => {
    navigate('/train-search', { 
      state: { 
        source: destination.from, 
        destination: destination.name.split(' to ')[1]
      } 
    });
  };

  return (
    <section className="py-12">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900">Explore Popular Routes</h2>
            <p className="text-gray-600 mt-1">Discover the most traveled routes across India</p>
          </div>
          <button className="text-primary font-medium flex items-center group">
            View all
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Card 
              key={destination.id} 
              className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all cursor-pointer"
              onClick={() => handleDestinationClick(destination)}
            >
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
                />
                {destination.popular && (
                  <div className="absolute top-3 left-3">
                    <div className="bg-primary/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                      Popular
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{destination.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{destination.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
