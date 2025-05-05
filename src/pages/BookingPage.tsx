
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { RoomType } from '@/components/RoomCard';

const BookingPage: React.FC = () => {
  const location = useLocation();
  const { roomType } = location.state as { roomType?: RoomType } || {};
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-hotel-light-gray py-12">
        <div className="container mx-auto px-4">
          <h1 className="hotel-heading text-center mb-8">Book Your Stay</h1>
          
          {roomType && (
            <div className="mb-8 max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
              <h2 className="hotel-subheading mb-4">Selected Room</h2>
              <div className="flex items-center">
                <img 
                  src={roomType.image} 
                  alt={roomType.name} 
                  className="w-24 h-24 object-cover rounded mr-4"
                />
                <div>
                  <h3 className="font-semibold">{roomType.name}</h3>
                  <p className="text-gray-600">${roomType.price} per night</p>
                </div>
              </div>
            </div>
          )}
          
          <BookingForm preSelectedRoom={roomType} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingPage;
