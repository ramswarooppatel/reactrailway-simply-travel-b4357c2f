
import { supabase } from '../lib/supabase';
import { Train } from '../types';

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
    
    return { data: data as unknown as Train[], error: null };
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
    
    return { data: data as unknown as Train, error: null };
  } catch (error) {
    console.error('Error fetching train details:', error);
    return { data: null, error };
  }
};

export const searchPnrStatus = async (pnrNumber: string): Promise<{ data: any | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
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
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return { data: null, error };
  }
};

export const createBooking = async (bookingData: any): Promise<{ data: any | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { data: null, error };
  }
};
