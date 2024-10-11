import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  { 
    id: 1, 
    name: 'Happy Customer', 
    text: 'First of our two cars cleaned. With two young kids leaving a ton of mess, it was a big job. The finished product was as good as a new car. Clean and smelling fresh. Looking forward to car number two receiving the same excellent service!', 
    rating: 5 
  },
  { 
    id: 2, 
    name: 'Satisfied Client', 
    text: 'Fab service, on time which is a good start! Car had not been cleaned in a year as I hate the car wash and standing outside whilst they do the interior... now looks like new and could carry on working from home! Love the extra touch on the interior as well! Will be booking for a regular clean.', 
    rating: 5 
  },
  { 
    id: 3, 
    name: 'Impressed Customer', 
    text: 'Super job by Nathan at the weekend. Full clean inside and out. A true Professional with a real eye for detail. Highly recommend for anyone needing a freshen up.', 
    rating: 5 
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <div className="flex mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="mb-4 italic text-sm md:text-base">"{testimonial.text}"</p>
              <p className="font-semibold text-sm md:text-base">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;