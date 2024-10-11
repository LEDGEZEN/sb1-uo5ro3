import React from 'react';
import { Sparkles, Droplet, Brush, Car } from 'lucide-react';

const services = [
  { 
    name: 'Saints Internal Valet & Detail', 
    icon: Brush, 
    description: 'Thorough interior cleaning and detailing.',
    price: 'From £25'
  },
  { 
    name: 'External Maintenance Valet', 
    icon: Droplet, 
    description: 'Comprehensive exterior cleaning and maintenance.',
    price: 'From £30'
  },
  { 
    name: 'Saints Silver Package', 
    icon: Sparkles, 
    description: 'Combination of External and Internal Valet for a complete refresh.',
    price: 'From £40'
  },
  { 
    name: 'Additional Services', 
    icon: Car, 
    description: 'Deep cleaning of seats, air vents, headliner, engine bay, and more.',
    price: 'From £10'
  },
];

const Services = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl md:text-4xl">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="card p-4 md:p-6 cursor-pointer group"
              onClick={scrollToBooking}
            >
              <service.icon className="w-12 h-12 md:w-16 md:h-16 mb-4 text-red-600 group-hover:text-red-700 transition-colors" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4 text-sm md:text-base">{service.description}</p>
              <p className="text-red-600 font-semibold group-hover:text-red-700 transition-colors">{service.price}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 md:mt-12 p-4 md:p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">Extra Services</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-sm md:text-base">
            <li className="flex items-center"><span className="w-2 h-2 md:w-3 md:h-3 bg-red-600 rounded-full mr-2"></span>Seats Deep Cleaned: £15</li>
            <li className="flex items-center"><span className="w-2 h-2 md:w-3 md:h-3 bg-red-600 rounded-full mr-2"></span>Air Vents Steam Flushed: £10</li>
            <li className="flex items-center"><span className="w-2 h-2 md:w-3 md:h-3 bg-red-600 rounded-full mr-2"></span>Headliner Steam Cleaned: £10</li>
            <li className="flex items-center"><span className="w-2 h-2 md:w-3 md:h-3 bg-red-600 rounded-full mr-2"></span>Vehicle Decontamination: £20</li>
            <li className="flex items-center"><span className="w-2 h-2 md:w-3 md:h-3 bg-red-600 rounded-full mr-2"></span>Engine-Bay Deep Clean: £15</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;