
interface BookingData {
  fullName: string;
  email: string;
  phone: string;
  checkInDate: Date;
  roomType: string;
  guests: string;
}

// Mock API response - in a real app, this would call a backend service
export const submitBooking = async (bookingData: BookingData): Promise<{success: boolean; message: string}> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Simple logic to simulate some bookings being successful and others failing
      // In a real app, this would check actual database availability
      const randomSuccess = Math.random() > 0.2;
      
      if (randomSuccess) {
        resolve({
          success: true,
          message: "The below booking has been successful!"
        });
      } else {
        resolve({
          success: false,
          message: "Sorry! There is no available room!"
        });
      }
    }, 1000);
  });
};
