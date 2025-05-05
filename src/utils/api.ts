import { supabase } from "@/integrations/supabase/client";

interface BookingData {
  fullName: string;
  email: string;
  phone: string;
  checkInDate: Date;
  roomType: string;
  guests: string;
}

export const submitBooking = async (bookingData: BookingData): Promise<{success: boolean; message: string}> => {
  try {
    // Convert the guests string to a number
    const guestsNum = parseInt(bookingData.guests, 10);
    
    // Format the date to YYYY-MM-DD format for database storage
    const formattedDate = bookingData.checkInDate.toISOString().split('T')[0];
    
    // Check if there's already a booking for this room type on this date
    const { data: existingBookings, error: checkError } = await supabase
      .from('bookings')
      .select('*')
      .eq('room_type', bookingData.roomType)
      .eq('check_in_date', formattedDate);
    
    if (checkError) {
      console.error('Error checking bookings:', checkError);
      return {
        success: false,
        message: "An error occurred while checking availability. Please try again."
      };
    }
    
    // Assume each room type has 2 rooms available (as per requirements)
    const maxRoomsPerType = 2;
    
    // If there are already 2 bookings for this room type on this date, it's full
    if (existingBookings && existingBookings.length >= maxRoomsPerType) {
      return {
        success: false,
        message: "Sorry! There is no available room!"
      };
    }
    
    // Otherwise, add the booking to the database
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        full_name: bookingData.fullName,
        email: bookingData.email,
        phone: bookingData.phone,
        check_in_date: formattedDate,
        room_type: bookingData.roomType,
        guests: guestsNum
      });
    
    if (error) {
      console.error('Error inserting booking:', error);
      return {
        success: false,
        message: "An error occurred while processing your booking. Please try again."
      };
    }
    
    return {
      success: true,
      message: "The below booking has been successful!"
    };
  } catch (error) {
    console.error('Error submitting booking:', error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again."
    };
  }
};

// Function to check room availability
export const checkRoomAvailability = async (roomType: string, date: Date): Promise<{available: number}> => {
  try {
    // Format the date to YYYY-MM-DD format for database query
    const formattedDate = date.toISOString().split('T')[0];
    
    // Query the database to count bookings for this room type on this date
    const { data, error, count } = await supabase
      .from('bookings')
      .select('*', { count: 'exact' })
      .eq('room_type', roomType)
      .eq('check_in_date', formattedDate);
    
    if (error) {
      console.error('Error checking availability:', error);
      // Return 0 available in case of error to be safe
      return { available: 0 };
    }
    
    // Each room type has 2 rooms (as per the requirements)
    const maxRoomsPerType = 2;
    const bookedRooms = count || 0;
    const availableRooms = Math.max(0, maxRoomsPerType - bookedRooms);
    
    return { available: availableRooms };
  } catch (error) {
    console.error('Error checking room availability:', error);
    return { available: 0 };
  }
};
