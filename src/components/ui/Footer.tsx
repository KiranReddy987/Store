import React from 'react';
import { APIProvider, Map, Marker, MapCameraChangedEvent } from '@vis.gl/react-google-maps';

const Footer = () => {
  const location = { lat: -33.860664, lng: 151.208138 };

  const handleMarkerClick = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white py-16 mt-auto shadow-inner rounded-t-2xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top nav section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-700 pb-6">
          <h2 className="text-xl font-bold tracking-tight">K store</h2>
          <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <a href="/" className="hover:text-gray-300 transition-colors duration-200">Home</a>
            <a href="/about" className="hover:text-gray-300 transition-colors duration-200">About Us</a>
            <a href="/privacy" className="hover:text-gray-300 transition-colors duration-200">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-300 transition-colors duration-200">Terms & Conditions</a>
          </nav>
        </div>

        {/* Middle section with interactive map */}
        {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white">Our Location</h3>
            <div className="w-full h-[200px] mt-4 rounded-lg overflow-hidden">
              <APIProvider apiKey={'AIzaSyC8yF6Nflr-1oP-_d1qLYblHeYvEEiEIRI'}>
                <Map
                  defaultZoom={13}
                  defaultCenter={location}
                  onCameraChanged={(ev: MapCameraChangedEvent) =>
                    console.log('Camera changed:', ev.detail.center, 'Zoom:', ev.detail.zoom)
                  }
                >
                  <Marker position={location} onClick={handleMarkerClick} title="Click to open in Google Maps" />
                </Map>
              </APIProvider>
            </div>
          </div>
        </div> */}

        {/* Bottom copyright/contact section */}
        <div className="mt-10 text-center text-xs text-gray-400">
          <div>© 2025 K store. All rights reserved.</div>
          <div className="mt-4 text-sm">
            <a href="/contact" className="hover:text-gray-300 transition-colors duration-200">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
