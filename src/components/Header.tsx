
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-hotel-navy">
                <span className="text-hotel-gold">Luxury</span> Hotel
              </h1>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-hotel-navy hover:text-hotel-gold transition-colors">
              Home
            </Link>
            <Link to="/" className="text-hotel-navy hover:text-hotel-gold transition-colors">
              Rooms
            </Link>
            <Link to="/" className="text-hotel-navy hover:text-hotel-gold transition-colors">
              Dining
            </Link>
            <Link to="/" className="text-hotel-navy hover:text-hotel-gold transition-colors">
              Facilities
            </Link>
            <Link to="/" className="text-hotel-navy hover:text-hotel-gold transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
