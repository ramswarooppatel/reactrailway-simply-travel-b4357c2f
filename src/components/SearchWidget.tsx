
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Map, ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

const popularCities = [
  'New Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bengaluru',
  'Hyderabad', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow'
];

const SearchWidget = () => {
  const navigate = useNavigate();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSourceFocused, setIsSourceFocused] = useState(false);
  const [isDestFocused, setIsDestFocused] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSearch = () => {
    if (source && destination && date) {
      navigate('/train-listing', { 
        state: { 
          source, 
          destination, 
          date: date ? format(date, 'yyyy-MM-dd') : ''
        } 
      });
    }
  };

  const swapLocations = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  const renderCitySuggestions = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    <div className="absolute z-20 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
      <div className="p-2">
        <p className="text-xs text-gray-500 mb-2">Popular Cities</p>
        <div className="grid grid-cols-2 gap-1">
          {popularCities.map((city) => (
            <div
              key={city}
              className="text-sm py-1.5 px-2 hover:bg-gray-100 rounded cursor-pointer transition-colors"
              onClick={() => {
                setter(city);
                setIsSourceFocused(false);
                setIsDestFocused(false);
              }}
            >
              {city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0 animate-slide-up">
      <CardContent className="p-5 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Source */}
          <div className="relative md:col-span-5">
            <div className="flex items-center bg-gray-50 rounded-lg p-3 border focus-within:border-primary transition-all">
              <Map className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                onFocus={() => setIsSourceFocused(true)}
                onBlur={() => setTimeout(() => setIsSourceFocused(false), 200)}
                placeholder="From"
                className="w-full bg-transparent border-none outline-none text-sm"
              />
            </div>
            {isSourceFocused && renderCitySuggestions(setSource)}
          </div>

          {/* Swap Button */}
          <div className="hidden md:flex md:col-span-2 justify-center items-center">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={swapLocations}
              className="rounded-full h-12 w-12 border border-gray-200 hover:border-primary hover:bg-white transition-all"
            >
              <ArrowRight className="absolute h-4 w-4 text-gray-500 transition-all transform translate-x-1 group-hover:translate-x-2" />
              <ArrowLeft className="h-4 w-4 text-gray-500" />
            </Button>
          </div>

          {/* Destination */}
          <div className="relative md:col-span-5">
            <div className="flex items-center bg-gray-50 rounded-lg p-3 border focus-within:border-primary transition-all">
              <Map className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => setIsDestFocused(true)}
                onBlur={() => setTimeout(() => setIsDestFocused(false), 200)}
                placeholder="To"
                className="w-full bg-transparent border-none outline-none text-sm"
              />
            </div>
            {isDestFocused && renderCitySuggestions(setDestination)}
          </div>

          {/* Mobile Swap Button */}
          <div className="flex md:hidden justify-center items-center">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={swapLocations}
              className="rounded-full h-10 w-10 border border-gray-200"
            >
              <ArrowLeft className="h-4 w-4 text-gray-500 rotate-90" />
              <ArrowRight className="h-4 w-4 text-gray-500 -rotate-90" />
            </Button>
          </div>

          {/* Date Picker */}
          <div className="md:col-span-6">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <button className="flex items-center bg-gray-50 rounded-lg p-3 w-full border focus:border-primary transition-all">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm">
                    {date ? format(date, 'PPP') : 'Select date'}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setIsCalendarOpen(false);
                  }}
                  disabled={(date) => date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 120))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Search Button */}
          <div className="md:col-span-6">
            <Button 
              onClick={handleSearch} 
              className="w-full bg-primary hover:bg-primary/90 text-white transition-all"
            >
              <Search className="mr-2 h-4 w-4" />
              Find Trains
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchWidget;
