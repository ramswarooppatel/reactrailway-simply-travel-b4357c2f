
export type StackParamList = {
  HomeTabs: undefined;
  Login: undefined;
  Register: undefined;
  TrainListing: { 
    source: string;
    destination: string;
    date: string;
    returnDate?: string;
    isRoundTrip?: boolean;
  };
  TrainDetails: { id: string };
  Booking: undefined;
  TrainSchedules: undefined;
  TicketManagement: undefined | { bookingId?: string };
  SeatAvailability: undefined;
  Notifications: undefined;
  TravelHistory: undefined;
  NotFound: undefined;
  PnrStatus: undefined;
  TrainSearch: undefined;
};

export type TabParamList = {
  Home: undefined;
  TrainSearch: undefined;
  PnrStatus: undefined;
  Profile: undefined;
};

export interface Station {
  name: string;
  code: string;
}

export interface Train {
  id: string;
  number: string;
  name: string;
  from: Station;
  to: Station;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distance: number;
  price: {
    sleeper: number;
    ac3Tier: number;
    ac2Tier: number;
    acFirstClass: number;
  };
  availability: {
    sleeper: string;
    ac3Tier: string;
    ac2Tier: string;
    acFirstClass: string;
  };
}
