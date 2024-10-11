import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface AvailabilityWindow {
  date: string;
  startTime: string;
  endTime: string;
}

const Booking = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [availability, setAvailability] = useState<AvailabilityWindow[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    const storedAvailability = localStorage.getItem('availability');
    if (storedAvailability) {
      setAvailability(JSON.parse(storedAvailability));
    }
  }, []);

  useEffect(() => {
    if (date) {
      const selectedDateAvailability = availability.filter(window => window.date === date);
      const times = selectedDateAvailability.flatMap(window => {
        const times = [];
        let currentTime = window.startTime;
        while (currentTime <= window.endTime) {
          times.push(currentTime);
          currentTime = incrementTime(currentTime);
        }
        return times;
      });
      setAvailableTimes(times);
    }
  }, [date, availability]);

  const incrementTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date(2000, 0, 1, hours, minutes);
    date.setHours(date.getHours() + 1);
    return `${String(date.getHours()).padStart(2, '0')}:00`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission (e.g., send data to server)
    console.log({ date, time, service });
    alert('Booking submitted successfully!');
  };

  return (
    <section id="booking" className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Book an Appointment</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="date" className="block mb-2">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block mb-2">Time</label>
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border rounded"
              required
              disabled={!date || availableTimes.length === 0}
            >
              <option value="">Select a time</option>
              {availableTimes.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="service" className="block mb-2">Service</label>
            <select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a service</option>
              <option value="saints-internal-valet">Saints Internal Valet & Detail</option>
              <option value="external-maintenance-valet">External Maintenance Valet</option>
              <option value="saints-silver-package">Saints Silver Package</option>
              <option value="additional-services">Additional Services</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 flex items-center justify-center">
            <Calendar className="w-5 h-5 mr-2" />
            Book Appointment
          </button>
        </form>
      </div>
    </section>
  );
};

export default Booking;