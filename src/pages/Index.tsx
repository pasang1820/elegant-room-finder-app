
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RoomCard, { RoomType } from '@/components/RoomCard';

const Index: React.FC = () => {
  // Room data
  const rooms: RoomType[] = [
    {
      id: 1,
      name: "Standard Twin",
      bedType: "Two Single Beds",
      size: "28m²",
      maxOccupancy: 2,
      price: 189,
      facilities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Safe", "Mini Fridge", "Tea/Coffee Making"],
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Our comfortable Standard Twin room offers a cozy retreat with essential amenities for a pleasant stay."
    },
    {
      id: 2,
      name: "Executive Twin",
      bedType: "Two Double Beds",
      size: "32m²",
      maxOccupancy: 2,
      price: 219,
      facilities: ["Free Wi-Fi", "Air Conditioning", "43\" Smart TV", "Safe", "Mini Bar", "Coffee Machine", "Workspace"],
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Upgrade your stay with our Executive Twin room featuring premium amenities and additional space to relax or work."
    },
    {
      id: 3,
      name: "Superior Suite",
      bedType: "King Size Bed",
      size: "45m²",
      maxOccupancy: 3,
      price: 289,
      facilities: ["Free Wi-Fi", "Air Conditioning", "50\" Smart TV", "Safe", "Mini Bar", "Nespresso Machine", "Sitting Area", "Bathtub"],
      image: "https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Enjoy superior comfort in our stylish suite with a separate sitting area and luxurious amenities."
    },
    {
      id: 4,
      name: "Deluxe Suite",
      bedType: "King Size Bed",
      size: "55m²",
      maxOccupancy: 3,
      price: 349,
      facilities: ["Free Wi-Fi", "Air Conditioning", "55\" Smart TV", "Safe", "Mini Bar", "Nespresso Machine", "Lounge Area", "Spa Bath", "Premium Toiletries"],
      image: "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Indulge in our spacious Deluxe Suite featuring premium furnishings, a comfortable lounge area and luxury bathroom with spa bath."
    },
    {
      id: 5,
      name: "Executive Suite",
      bedType: "King Size Bed + Sofa Bed",
      size: "68m²",
      maxOccupancy: 3,
      price: 429,
      facilities: ["Free Wi-Fi", "Air Conditioning", "65\" Smart TV", "Safe", "Full Mini Bar", "Nespresso Machine", "Separate Living Room", "Spa Bath", "Premium Toiletries", "Bathrobe & Slippers"],
      image: "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Experience elevated luxury with our Executive Suite featuring a separate living room, premium amenities and VIP services."
    },
    {
      id: 6,
      name: "Presidential Suite",
      bedType: "King Size Bed + 2 Queen Beds",
      size: "120m²",
      maxOccupancy: 5,
      price: 899,
      facilities: ["Free Wi-Fi", "Air Conditioning", "75\" Smart TV", "Safe", "Full Mini Bar", "Nespresso Machine", "Dining Area", "Living Room", "Jacuzzi", "Premium Toiletries", "Bathrobe & Slippers", "Butler Service"],
      image: "https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Our most luxurious accommodation offers unparalleled elegance with two bedrooms, spacious living areas, premium amenities and personalized butler service."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[500px]">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)" }}
          ></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
              Luxury Accommodation
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto animate-slide-up">
              Experience unparalleled comfort and elegance in our exquisite rooms and suites
            </p>
          </div>
        </section>
        
        {/* Intro Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="hotel-heading mb-6">Our Accommodations</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Discover the perfect space for your stay at Luxury Hotel. 
              From comfortable standard rooms to lavish suites, each accommodation 
              is thoughtfully designed to provide you with an exceptional experience.
            </p>
          </div>
        </section>
        
        {/* Rooms Section */}
        <section className="py-16 bg-hotel-light-gray">
          <div className="container mx-auto px-4">
            {rooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
