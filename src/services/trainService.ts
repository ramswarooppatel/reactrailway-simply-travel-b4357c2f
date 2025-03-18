
import { supabase } from '../lib/supabase';
import { Train } from '../types';

// Helper to format train data from Supabase to our app model
const formatTrainData = (data: any): Train => {
  return {
    id: data.id,
    number: data.number,
    name: data.name,
    from: {
      name: data.from_station,
      code: data.from_code
    },
    to: {
      name: data.to_station,
      code: data.to_code
    },
    departureTime: data.departure_time,
    arrivalTime: data.arrival_time,
    duration: data.duration,
    distance: data.distance,
    price: {
      sleeper: data.sleeper_price,
      ac3Tier: data.ac3tier_price,
      ac2Tier: data.ac2tier_price,
      acFirstClass: data.acfirstclass_price
    },
    availability: {
      sleeper: data.sleeper_availability,
      ac3Tier: data.ac3tier_availability,
      ac2Tier: data.ac2tier_availability,
      acFirstClass: data.acfirstclass_availability
    }
  };
};

export const fetchTrains = async (
  source: string,
  destination: string,
  date: string
): Promise<{ data: Train[] | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('trains')
      .select('*')
      .eq('from_code', source)
      .eq('to_code', destination);
    
    if (error) throw error;
    
    return { 
      data: data ? data.map(train => formatTrainData(train)) : null, 
      error: null 
    };
  } catch (error) {
    console.error('Error fetching trains:', error);
    return { data: null, error };
  }
};

export const fetchTrainById = async (id: string): Promise<{ data: Train | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('trains')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { 
      data: data ? formatTrainData(data) : null, 
      error: null 
    };
  } catch (error) {
    console.error('Error fetching train details:', error);
    return { data: null, error };
  }
};

export const fetchPopularStations = async (): Promise<{ data: any[] | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('stations')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching stations:', error);
    return { data: null, error };
  }
};

export const searchPnrStatus = async (pnrNumber: string): Promise<{ data: any | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, trains(*)')
      .eq('pnr_number', pnrNumber)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching PNR status:', error);
    return { data: null, error };
  }
};

export const fetchUserBookings = async (userId: string): Promise<{ data: any[] | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, trains(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return { data: null, error };
  }
};

export const createBooking = async (bookingData: any): Promise<{ data: any | null; error: any }> => {
  try {
    // Generate PNR number - 10 digit alphanumeric
    const pnrNumber = Math.random().toString(36).substring(2, 5).toUpperCase() + 
                       Math.floor(10000000 + Math.random() * 90000000).toString();
    
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        ...bookingData,
        pnr_number: pnrNumber,
        status: 'Confirmed'
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { data: null, error };
  }
};
