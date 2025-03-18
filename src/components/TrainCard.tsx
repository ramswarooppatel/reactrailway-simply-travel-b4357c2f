
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Zap, 
  Calendar, 
  Wifi, 
  Coffee, 
  BatteryCharging
} from 'lucide-react';

export interface Train {
  id: number;
  name: string;
  number: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  source: string;
  destination: string;
  price: {
    sleeper: number;
    ac3Tier: number;
    ac2Tier: number;
  };
  seatsAvailable: {
    sleeper: number;
    ac3Tier: number;
    ac2Tier: number;
  };
  amenities: string[];
  daysOfOperation: string[];
}

interface TrainCardProps {
  train: Train;
}

const TrainCard: React.FC<TrainCardProps> = ({ train }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/train-details/${train.id}`, { state: { train } });
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'WiFi':
        return <Wifi className="h-3 w-3" />;
      case 'Catering':
        return <Coffee className="h-3 w-3" />;
      case 'Charging Points':
        return <BatteryCharging className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getAvailabilityColor = (seats: number) => {
    if (seats > 20) return 'text-green-600';
    if (seats > 0) return 'text-amber-600';
    return 'text-destructive';
  };

  const getSeatsText = (seats: number) => {
    if (seats > 0) return `${seats} seats`;
    return 'Waitlist';
  };

  return (
    <Card className="border shadow-sm hover:shadow-md transition-all overflow-hidden">
      <CardContent className="p-0">
        {/* Top Section - Always visible */}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <h3 className="font-semibold text-lg">{train.name}</h3>
                <Badge variant="outline" className="ml-2 text-xs">
                  {train.number}
                </Badge>
              </div>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <Clock className="h-3 w-3 mr-1" />
                <span>{train.duration}</span>
                {train.amenities.includes('Fast') && (
                  <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-100 text-[10px] py-0 h-4">
                    <Zap className="h-2.5 w-2.5 mr-1" />
                    Fastest
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Starts from</div>
              <div className="font-bold text-lg">₹{train.price.sleeper}</div>
            </div>
          </div>

          <div className="flex justify-between mt-4 items-center">
            <div className="flex-1">
              <div className="text-lg font-medium">{train.departureTime}</div>
              <div className="text-sm text-gray-600">{train.source}</div>
            </div>
            
            <div className="flex-1 flex justify-center items-center">
              <div className="w-full px-4 flex items-center">
                <div className="h-0.5 flex-1 bg-gray-300"></div>
                <span className="text-xs text-gray-500 mx-2">{train.duration}</span>
                <div className="h-0.5 flex-1 bg-gray-300"></div>
              </div>
            </div>
            
            <div className="flex-1 text-right">
              <div className="text-lg font-medium">{train.arrivalTime}</div>
              <div className="text-sm text-gray-600">{train.destination}</div>
            </div>
          </div>

          {/* Quick availability indicators */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="text-center p-2 rounded-md bg-gray-50">
              <div className="text-xs text-gray-500">Sleeper</div>
              <div className={`font-medium ${getAvailabilityColor(train.seatsAvailable.sleeper)}`}>
                {getSeatsText(train.seatsAvailable.sleeper)}
              </div>
            </div>
            <div className="text-center p-2 rounded-md bg-gray-50">
              <div className="text-xs text-gray-500">AC 3 Tier</div>
              <div className={`font-medium ${getAvailabilityColor(train.seatsAvailable.ac3Tier)}`}>
                {getSeatsText(train.seatsAvailable.ac3Tier)}
              </div>
            </div>
            <div className="text-center p-2 rounded-md bg-gray-50">
              <div className="text-xs text-gray-500">AC 2 Tier</div>
              <div className={`font-medium ${getAvailabilityColor(train.seatsAvailable.ac2Tier)}`}>
                {getSeatsText(train.seatsAvailable.ac2Tier)}
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Section */}
        <div 
          className={`overflow-hidden transition-all duration-300 ${
            expanded ? 'max-h-80' : 'max-h-0'
          }`}
        >
          <div className="p-4 pt-0 border-t mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {train.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1 text-xs">
                      {getAmenityIcon(amenity)}
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Runs on</h4>
                <div className="flex gap-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                    <span 
                      key={index}
                      className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium ${
                        train.daysOfOperation.includes(day) 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={handleViewDetails}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                View Details & Book
              </Button>
            </div>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          className="w-full py-2 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50 transition-colors border-t"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <span>Show less</span>
              <ChevronUp className="h-4 w-4 ml-1" />
            </>
          ) : (
            <>
              <span>Show more</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </>
          )}
        </button>
      </CardContent>
    </Card>
  );
};

export default TrainCard;
