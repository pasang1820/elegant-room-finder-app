
interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  checkInDate: Date;
  roomType: string;
  guests: string;
}

export const validateBookingForm = (formData: BookingFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  // Validate Full Name (first and last name with a space)
  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (!formData.fullName.includes(" ")) {
    errors.fullName = "Please enter both first and last name separated by a space";
  }
  
  // Validate Email (must contain @)
  if (!formData.email.trim()) {
    errors.email = "Email address is required";
  } else if (!formData.email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }
  
  // Validate Phone (10 digits starting with 04)
  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else {
    const phoneDigitsOnly = formData.phone.replace(/\D/g, '');
    if (phoneDigitsOnly.length !== 10) {
      errors.phone = "Phone number must be 10 digits";
    } else if (!phoneDigitsOnly.startsWith("04")) {
      errors.phone = "Phone number must start with 04";
    }
  }
  
  // Validate Room Type
  if (!formData.roomType) {
    errors.roomType = "Please select a room type";
  }
  
  // Validate number of guests based on room type
  const guestsCount = parseInt(formData.guests);
  if (formData.roomType) {
    let maxGuests = 2;
    
    if (["Standard Twin", "Executive Twin"].includes(formData.roomType)) {
      maxGuests = 2;
    } else if (["Superior Suite", "Deluxe Suite", "Executive Suite"].includes(formData.roomType)) {
      maxGuests = 3;
    } else if (formData.roomType === "Presidential Suite") {
      maxGuests = 5;
    }
    
    if (guestsCount > maxGuests) {
      errors.guests = `This room type can accommodate a maximum of ${maxGuests} guests`;
    }
  }
  
  return errors;
};
