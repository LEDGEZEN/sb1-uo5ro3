import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const QuoteForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newQuote = {
      id: Date.now().toString(),
      name,
      email,
      service,
      message,
      imageUrl: image ? URL.createObjectURL(image) : undefined,
      status: 'pending',
    };

    // Get existing quotes from localStorage
    const existingQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    
    // Add new quote to the array
    const updatedQuotes = [...existingQuotes, newQuote];
    
    // Save updated quotes to localStorage
    localStorage.setItem('quotes', JSON.stringify(updatedQuotes));

    // Reset form fields
    setName('');
    setEmail('');
    setService('');
    setMessage('');
    setImage(null);

    alert('Quote submitted successfully!');
  };

  return (
    <section id="quote" className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="section-title">Get a Quote</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="service" className="block mb-2">Service</label>
            <select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select a service</option>
              <option value="Saints Internal Valet & Detail">Saints Internal Valet & Detail</option>
              <option value="External Maintenance Valet">External Maintenance Valet</option>
              <option value="Saints Silver Package">Saints Silver Package</option>
              <option value="Additional Services">Additional Services</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block mb-2">Upload Car Image (optional)</label>
            <div className="flex items-center">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="hidden"
              />
              <label htmlFor="image" className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300 transition-colors">
                <Upload className="w-5 h-5 mr-2" />
                Choose File
              </label>
              <span className="ml-3">{image ? image.name : 'No file chosen'}</span>
            </div>
          </div>
          <button type="submit" className="btn w-full">
            Get Quote
          </button>
        </form>
      </div>
    </section>
  );
};

export default QuoteForm;