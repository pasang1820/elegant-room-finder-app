
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BookingData {
  fullName: string;
  email: string;
  phone: string;
  checkInDate: Date;
  roomType: string;
  guests: string;
}

interface LocationState {
  bookingData: BookingData;
  success: boolean;
  message: string;
}

const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  
  useEffect(() => {
    // If no booking data is present, redirect to home
    if (!state?.bookingData) {
      navigate('/');
    }
  }, [state, navigate]);
  
  // If no booking data, show loading until redirect happens
  if (!state?.bookingData) {
    return <div>Loading...</div>;
  }
  
  const { bookingData, success, message } = state;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-hotel-light-gray py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            {success ? (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-hotel-navy">{message}</h2>
                  <p className="text-gray-600 mt-2">Your booking reference: #{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
                
                <div className="border-t border-b border-gray-200 py-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500">Guest Name</p>
                      <p className="font-medium">{bookingData.fullName}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="font-medium">{bookingData.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500">Phone</p>
                      <p className="font-medium">{bookingData.phone}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500">Check-in Date</p>
                      <p className="font-medium">{format(new Date(bookingData.checkInDate), 'MMMM dd, yyyy')}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500">Room Type</p>
                      <p className="font-medium">{bookingData.roomType}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500">Number of Guests</p>
                      <p className="font-medium">{bookingData.guests}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="mb-6">A confirmation has been sent to your email address.</p>
                  <Button onClick={() => navigate('/')} className="navy-button">
                    Return to Home
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-hotel-navy mb-4">{message}</h2>
                <p className="mb-6">Please try selecting a different date or room type.</p>
                <Button onClick={() => navigate('/booking')} className="gold-button">
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConfirmationPage;
