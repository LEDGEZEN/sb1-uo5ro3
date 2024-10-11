import React from 'react';
import { Calendar } from 'lucide-react';

const ScrollingBanner: React.FC = () => {
  return (
    <div className="bg-red-600 text-white py-1 md:py-2 overflow-hidden">
      <div className="animate-scroll whitespace-nowrap flex items-center justify-center">
        {[1, 2, 3].map((_, index) => (
          <span key={index} className="inline-flex items-center mx-4 md:mx-8 text-sm md:text-lg font-bold">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            Book Now for Premium Car Detailing Services!
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollingBanner;