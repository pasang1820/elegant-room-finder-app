
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { checkRoomAvailability } from '@/utils/api';
import { toast } from '@/components/ui/sonner';

interface AvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomType: string;
}

const AvailabilityModal: React.FC<AvailabilityModalProps> = ({ isOpen, onClose, roomType }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityResult, setAvailabilityResult] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCheckAvailability = async () => {
    if (!date) {
      toast.error("Please select a date to check availability");
      return;
    }

    setIsCheckingAvailability(true);
    try {
      const result = await checkRoomAvailability(roomType, date);
      setAvailabilityResult(result.available);
    } catch (error) {
      console.error('Error checking availability:', error);
      toast.error("Failed to check availability. Please try again.");
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Check {roomType} Availability</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <Button 
            className="w-full gold-button" 
            onClick={handleCheckAvailability}
            disabled={isCheckingAvailability || !date}
          >
            {isCheckingAvailability ? "Checking..." : "Check Availability"}
          </Button>
          
          {availabilityResult !== null && (
            <div className="mt-4 p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Availability for {format(date as Date, "MMMM dd, yyyy")}</h4>
              {availabilityResult > 0 ? (
                <p className="text-green-600">
                  {availabilityResult} {roomType} rooms available!
                </p>
              ) : (
                <p className="text-red-600">
                  No {roomType} rooms available for this date.
                </p>
              )}
            </div>
          )}
          
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityModal;
