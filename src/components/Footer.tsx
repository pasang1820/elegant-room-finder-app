
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-hotel-navy text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Hotel Info */}
          <div>
            <h3 className="text-hotel-gold text-xl font-semibold mb-4">Luxury Hotel</h3>
            <p className="mb-4">123 Elegant Street<br />Sydney, NSW 2000<br />Australia</p>
            <p className="mb-2">Phone: +61 2 1234 5678</p>
            <p>Email: info@luxuryhotel.com</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-hotel-gold text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-hotel-gold transition-colors">Home</Link></li>
              <li><Link to="/" className="hover:text-hotel-gold transition-colors">Rooms & Suites</Link></li>
              <li><Link to="/" className="hover:text-hotel-gold transition-colors">Dining</Link></li>
              <li><Link to="/" className="hover:text-hotel-gold transition-colors">Facilities</Link></li>
              <li><Link to="/" className="hover:text-hotel-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-hotel-gold text-xl font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="py-2 px-3 rounded-l text-hotel-navy flex-grow" 
              />
              <button className="bg-hotel-gold hover:bg-amber-500 px-4 py-2 rounded-r transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Luxury Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
