import React from 'react';
import { APIProvider, Map, Marker, MapCameraChangedEvent } from '@vis.gl/react-google-maps';

const Footer = () => {
  const location = { lat: -33.860664, lng: 151.208138 };

  const handleMarkerClick = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <footer className="bg-[#2D2D2D] text-white py-12 mt-auto shadow-lg rounded-t-2xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top nav section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-700 pb-6">
          <h2 className="text-3xl font-bold tracking-tight text-[#FFC145]">K store</h2>
          <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <a href="/" className="text-gray-400 hover:text-[#FFC145] transition-colors duration-200">Home</a>
            <a href="#" className="text-gray-400 hover:text-[#FFC145] transition-colors duration-200">About Us</a>
            <a href="#" className="text-gray-400 hover:text-[#FFC145] transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-[#FFC145] transition-colors duration-200">Terms & Conditions</a>
          </nav>
        </div>

        {/* Bottom copyright/contact section */}
        <div className="mt-10 text-center text-xs text-gray-400">
          <div>© 2025 K store. All rights reserved.</div>
          <div className="mt-4 text-sm">
            <a href="#" className="text-gray-400 hover:text-[#FFC145] transition-colors duration-200">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
