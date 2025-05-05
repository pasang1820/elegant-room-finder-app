
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { RoomType } from './RoomCard';
import { validateBookingForm } from '@/utils/validation';
import { submitBooking } from '@/utils/api';
import { toast } from '@/components/ui/sonner';

interface BookingFormProps {
  preSelectedRoom?: RoomType;
}

const BookingForm: React.FC<BookingFormProps> = ({ preSelectedRoom }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkInDate: new Date(),
    roomType: preSelectedRoom?.name || '',
    guests: '1'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing again
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, checkInDate: date }));
      if (errors.checkInDate) {
        setErrors(prev => ({ ...prev, checkInDate: '' }));
      }
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateBookingForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit booking to database
      const result = await submitBooking(formData);
      
      // Navigate to confirmation page with result
      navigate('/confirmation', { 
        state: { 
          bookingData: formData,
          success: result.success,
          message: result.message 
        } 
      });
    } catch (error) {
      console.error('Error during booking submission:', error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-hotel-navy mb-6">Booking Information</h2>
      
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Enter your first and last name"
          className={errors.fullName ? "border-red-500" : ""}
          disabled={isSubmitting}
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
      </div>
      
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="your.email@example.com"
          className={errors.email ? "border-red-500" : ""}
          disabled={isSubmitting}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      
      {/* Phone Number */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="04XX XXX XXX"
          className={errors.phone ? "border-red-500" : ""}
          disabled={isSubmitting}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>
      
      {/* Check-in Date */}
      <div className="space-y-2">
        <Label htmlFor="checkInDate">Check-in Date <span className="text-red-500">*</span></Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                errors.checkInDate ? "border-red-500" : ""
              )}
              disabled={isSubmitting}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.checkInDate ? (
                format(formData.checkInDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.checkInDate}
              onSelect={handleDateChange}
              initialFocus
              disabled={(date) => date < new Date()}
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        {errors.checkInDate && <p className="text-red-500 text-sm">{errors.checkInDate}</p>}
      </div>
      
      {/* Room Type */}
      <div className="space-y-2">
        <Label htmlFor="roomType">Room Type <span className="text-red-500">*</span></Label>
        <Select 
          value={formData.roomType} 
          onValueChange={(value) => handleSelectChange(value, 'roomType')}
          disabled={!!preSelectedRoom || isSubmitting}
        >
          <SelectTrigger className={errors.roomType ? "border-red-500" : ""}>
            <SelectValue placeholder="Select room type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Standard Twin">Standard Twin</SelectItem>
            <SelectItem value="Executive Twin">Executive Twin</SelectItem>
            <SelectItem value="Superior Suite">Superior Suite</SelectItem>
            <SelectItem value="Deluxe Suite">Deluxe Suite</SelectItem>
            <SelectItem value="Executive Suite">Executive Suite</SelectItem>
            <SelectItem value="Presidential Suite">Presidential Suite</SelectItem>
          </SelectContent>
        </Select>
        {errors.roomType && <p className="text-red-500 text-sm">{errors.roomType}</p>}
      </div>
      
      {/* Number of Guests */}
      <div className="space-y-2">
        <Label htmlFor="guests">Number of Guests <span className="text-red-500">*</span></Label>
        <Select 
          value={formData.guests} 
          onValueChange={(value) => handleSelectChange(value, 'guests')}
          disabled={isSubmitting}
        >
          <SelectTrigger className={errors.guests ? "border-red-500" : ""}>
            <SelectValue placeholder="Select number of guests" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Person</SelectItem>
            <SelectItem value="2">2 People</SelectItem>
            <SelectItem value="3">3 People</SelectItem>
            <SelectItem value="4">4 People</SelectItem>
            <SelectItem value="5">5 People</SelectItem>
          </SelectContent>
        </Select>
        {errors.guests && <p className="text-red-500 text-sm">{errors.guests}</p>}
      </div>
      
      <Button type="submit" className="w-full gold-button" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Complete Booking"}
      </Button>
    </form>
  );
};

export default BookingForm;
