import React, { useState } from 'react';
import { 
  MapPin, Briefcase, Users, Phone, Mail, Calendar, Factory, Navigation
} from 'lucide-react';

// --- Mock Data for Company About Section ---
const companyAbout = {
  overview:
    "InnovateTech Global is a leading force in developing cutting-edge artificial intelligence solutions and enterprise software since 2015. Our mission is to empower businesses to achieve unprecedented efficiency and innovation through smart technology. We specialize in scalable cloud platforms, machine learning services, and bespoke software development, serving clients across finance, healthcare, and logistics sectors globally. We believe in continuous learning, sustainability, and fostering a collaborative culture where bold ideas come to life.",
  
  keyInfo: [
    { label: "Headquarters", value: "Seattle, WA, USA", icon: MapPin },
    { label: "Industry", value: "Enterprise Software & AI", icon: Briefcase },
    { label: "Company Size", value: "501 - 1,000 employees", icon: Users },
    { label: "Founded", value: "October 2015", icon: Calendar },
    { label: "Primary Contact", value: "+1 (555) 123-4567", icon: Phone },
    { label: "Sales Email", value: "sales@innovatetech.com", icon: Mail },
    { label: "Revenue Class", value: "$50M - $100M USD", icon: Factory },
  ],

  location: {
    title: "Our Location",
    address: "123 Innovation Drive, Seattle, WA 98101, USA",
    coordinates: {
      lat: 47.6062,
      lng: -122.3321
    }
  }
};

// Component to display a single key information item
interface KeyInfoItemProps {
  label: string;
  value: string;
  Icon: React.ComponentType<{ className: string }>;
}

const KeyInfoItem = ({ label, value, Icon }: KeyInfoItemProps) => (
  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg transition duration-150 hover:bg-indigo-50">
    <Icon className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" />
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base font-semibold text-gray-900 break-words">{value}</p>
    </div>
  </div>
);

export default function CompanyOverviewCard() {
  const { overview, keyInfo, location } = companyAbout;
  const [mapLoaded, setMapLoaded] = useState(false);

  // Generate Google Maps embed URL
  const getMapEmbedUrl = () => {
    const { lat, lng } = location.coordinates;
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.5343471156895!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDM2JzIyLjMiTiAxMjLCsDIwJzAwLjgiVw!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus`;
  };

  const openInGoogleMaps = () => {
    const { lat, lng } = location.coordinates;
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 bg-white shadow-xl rounded-2xl font-sans">
      
      {/* Overview Section */}
      <section className="mb-8 border-b pb-6 border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 flex items-center">
          Company Overview
        </h2>
        <div className="text-gray-700 leading-relaxed space-y-4 text-base">
          <p>{overview}</p>
          <p>
            Our commitment to innovation is supported by a global team of expert developers, data scientists, and business strategists, all dedicated to shaping the future of enterprise technology.
          </p>
        </div>
      </section>

      {/* Key Information Section */}
      <section className="mb-8 border-b pb-6 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Key Public Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyInfo.map((item, index) => (
            <KeyInfoItem 
              key={index}
              label={item.label}
              value={item.value}
              Icon={item.icon}
            />
          ))}
        </div>
      </section>

      {/* Location Section with Map */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-indigo-500" />
            {location.title}
          </h2>
          <button
            onClick={openInGoogleMaps}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            <Navigation className="w-4 h-4" />
            Get Directions
          </button>
        </div>

        {/* Address Display */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-500 mb-1">Address</p>
          <p className="text-base font-semibold text-gray-900">{location.address}</p>
          <p className="text-sm text-gray-600 mt-2">
            Coordinates: {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
          </p>
        </div>

        {/* Google Maps Embed */}
        <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden shadow-lg">
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading map...</p>
              </div>
            </div>
          )}
          <iframe
            src={getMapEmbedUrl()}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setMapLoaded(true)}
            className="w-full h-full"
            title="Company Location Map"
          ></iframe>
        </div>

        {/* Additional Location Info */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-semibold text-gray-900">Business Hours</h3>
            </div>
            <p className="text-sm text-gray-700">Mon - Fri: 9:00 AM - 6:00 PM</p>
            <p className="text-sm text-gray-700">Sat - Sun: Closed</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <h3 className="font-semibold text-gray-900">Parking</h3>
            </div>
            <p className="text-sm text-gray-700">Free parking available</p>
            <p className="text-sm text-gray-700">Visitor spaces on site</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <h3 className="font-semibold text-gray-900">Accessibility</h3>
            </div>
            <p className="text-sm text-gray-700">Wheelchair accessible</p>
            <p className="text-sm text-gray-700">Elevator available</p>
          </div>
        </div>
      </section>
    </div>
  );
}