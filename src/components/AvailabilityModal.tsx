
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface AvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomType: string;
}

interface AvailabilityData {
  date: string;
  available: number;
}

// Mock data - In a real application, this would come from the database
const mockAvailabilityData: Record<string, AvailabilityData[]> = {
  "Standard Twin": [
    { date: "2025-05-06", available: 2 },
    { date: "2025-05-07", available: 1 },
    { date: "2025-05-08", available: 2 },
    { date: "2025-05-09", available: 0 },
    { date: "2025-05-10", available: 1 },
  ],
  "Executive Twin": [
    { date: "2025-05-06", available: 2 },
    { date: "2025-05-07", available: 2 },
    { date: "2025-05-08", available: 1 },
    { date: "2025-05-09", available: 0 },
    { date: "2025-05-10", available: 2 },
  ],
  "Superior Suite": [
    { date: "2025-05-06", available: 1 },
    { date: "2025-05-07", available: 2 },
    { date: "2025-05-08", available: 2 },
    { date: "2025-05-09", available: 1 },
    { date: "2025-05-10", available: 0 },
  ],
  "Deluxe Suite": [
    { date: "2025-05-06", available: 2 },
    { date: "2025-05-07", available: 1 },
    { date: "2025-05-08", available: 0 },
    { date: "2025-05-09", available: 2 },
    { date: "2025-05-10", available: 2 },
  ],
  "Executive Suite": [
    { date: "2025-05-06", available: 1 },
    { date: "2025-05-07", available: 0 },
    { date: "2025-05-08", available: 1 },
    { date: "2025-05-09", available: 2 },
    { date: "2025-05-10", available: 2 },
  ],
  "Presidential Suite": [
    { date: "2025-05-06", available: 2 },
    { date: "2025-05-07", available: 2 },
    { date: "2025-05-08", available: 1 },
    { date: "2025-05-09", available: 1 },
    { date: "2025-05-10", available: 0 },
  ],
};

const AvailabilityModal: React.FC<AvailabilityModalProps> = ({ isOpen, onClose, roomType }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Function to get availability for the selected date
  const getAvailability = (date: Date | undefined): number => {
    if (!date) return 0;
    
    const formattedDate = format(date, "yyyy-MM-dd");
    const roomData = mockAvailabilityData[roomType] || [];
    const dateData = roomData.find(item => item.date === formattedDate);
    
    return dateData ? dateData.available : 2; // Default to 2 if no data found
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Room Availability</DialogTitle>
        </DialogHeader>
        <div className="p-4 text-center">
          <h3 className="font-semibold mb-2">{roomType}</h3>
          <p className="mb-4 text-sm text-gray-600">Select a date to check availability</p>
          
          <div className="flex justify-center mb-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="p-3 pointer-events-auto border rounded-md"
              disabled={(date) => date < new Date()}
            />
          </div>
          
          {selectedDate && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="font-semibold">
                Availability for {format(selectedDate, "MMMM d, yyyy")}:
              </p>
              <p className="text-lg mt-2">
                {getAvailability(selectedDate)} rooms available
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvailabilityModal;
