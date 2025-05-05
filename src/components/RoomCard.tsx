
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvailabilityModal from './AvailabilityModal';

export interface RoomType {
  id: number;
  name: string;
  bedType: string;
  size: string;
  maxOccupancy: number;
  price: number;
  facilities: string[];
  image: string;
  description: string;
}

interface RoomCardProps {
  room: RoomType;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleBookNow = () => {
    navigate('/booking', { state: { roomType: room } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in mb-8">
      <div className="md:flex">
        {/* Room Image */}
        <div className="md:w-2/5">
          <img 
            src={room.image} 
            alt={room.name} 
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        
        {/* Room Details */}
        <div className="md:w-3/5 p-6">
          <h3 className="hotel-subheading mb-2">{room.name}</h3>
          <p className="text-gray-600 mb-4">{room.description}</p>
          
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="room-amenity">
                <span className="font-semibold mr-2">Bed Type:</span> {room.bedType}
              </div>
              <div className="room-amenity">
                <span className="font-semibold mr-2">Room Size:</span> {room.size}
              </div>
              <div className="room-amenity">
                <span className="font-semibold mr-2">Max Occupancy:</span> {room.maxOccupancy} persons
              </div>
              <div className="room-amenity">
                <span className="font-semibold mr-2">Price:</span> ${room.price} per night
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Room Facilities:</h4>
            <div className="flex flex-wrap gap-2">
              {room.facilities.map((facility, index) => (
                <span key={index} className="bg-hotel-light-gray px-2 py-1 rounded text-sm">
                  {facility}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="navy-button"
            >
              Check Availability
            </button>
            <button 
              onClick={handleBookNow}
              className="gold-button"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Availability Modal */}
      <AvailabilityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        roomType={room.name} 
      />
    </div>
  );
};

export default RoomCard;
