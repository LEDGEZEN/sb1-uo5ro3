import React, { useState } from 'react';
import { Calendar, Upload } from 'lucide-react';

interface BookingQuote {
  name: string;
  email: string;
  phone: string;
  services: string[];
  message: string;
  image: File | null;
}

const BookingQuoteForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingQuote>({
    name: '',
    email: '',
    phone: '',
    services: [],
    message: '',
    image: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      services: checked
        ? [...prev.services, value]
        : prev.services.filter(service => service !== value),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      services: [],
      message: '',
      image: null,
    });
    alert('Booking request submitted successfully!');
  };

  return (
    <section id="booking" className="py-16 md:py-24 gradient-bg">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl md:text-4xl text-white">Book a Service</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 md:p-8 rounded-lg shadow-xl">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Services</label>
            {['Saints Internal Valet & Detail', 'External Maintenance Valet', 'Saints Silver Package', 'Additional Services'].map((service) => (
              <div key={service} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={service}
                  name="services"
                  value={service}
                  checked={formData.services.includes(service)}
                  onChange={handleServiceChange}
                  className="mr-2"
                />
                <label htmlFor={service} className="text-sm">{service}</label>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-sm"
              rows={4}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block mb-2 text-sm font-medium">Upload Car Image (optional)</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded text-sm"
            />
          </div>
          <button type="submit" className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 flex items-center justify-center text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            Submit Booking Request
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingQuoteForm;