import React, { useState, useEffect } from 'react';
import { Lock, Calendar, Save, X, Check, XIcon, Send, Bell, Trash, Mail, AlertTriangle, Tag, User, DollarSign, Plus, Download } from 'lucide-react';

interface AvailabilityWindow {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  services: string[];
  message: string;
  imageUrl?: string;
  tags: string[];
  status: 'pending' | 'approved' | 'cancelled';
  date?: string;
  time?: string;
}

interface MaintenanceClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastServiceDate: string;
  nextServiceDate: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookings: Booking[];
  tags: string[];
  totalValue: number;
}

interface AdminProps {
  onClose: () => void;
}

const Admin: React.FC<AdminProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'availability' | 'bookings' | 'maintenance' | 'customers'>('availability');
  const [availabilityWindows, setAvailabilityWindows] = useState<AvailabilityWindow[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [maintenanceClients, setMaintenanceClients] = useState<MaintenanceClient[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [newWindow, setNewWindow] = useState<AvailabilityWindow>({ id: '', date: '', startTime: '', endTime: '' });

  useEffect(() => {
    const storedAvailability = localStorage.getItem('availability');
    const storedBookings = localStorage.getItem('bookings');
    const storedMaintenanceClients = localStorage.getItem('maintenanceClients');

    if (storedAvailability) setAvailabilityWindows(JSON.parse(storedAvailability));
    if (storedBookings) setBookings(JSON.parse(storedBookings));
    if (storedMaintenanceClients) setMaintenanceClients(JSON.parse(storedMaintenanceClients));

    // Generate customers from bookings
    const customersMap = new Map<string, Customer>();
    if (storedBookings) {
      JSON.parse(storedBookings).forEach((booking: Booking) => {
        if (!customersMap.has(booking.email)) {
          customersMap.set(booking.email, {
            id: booking.id,
            name: booking.name,
            email: booking.email,
            phone: booking.phone,
            bookings: [],
            tags: booking.tags || [],
            totalValue: 0
          });
        }
        const customer = customersMap.get(booking.email)!;
        customer.bookings.push(booking);
        customer.totalValue += calculateBookingValue(booking);
      });
    }
    setCustomers(Array.from(customersMap.values()));
  }, []);

  const calculateBookingValue = (booking: Booking): number => {
    const basePrice = {
      'Saints Internal Valet & Detail': 25,
      'External Maintenance Valet': 30,
      'Saints Silver Package': 40,
      'Additional Services': 10
    };
    return booking.services.reduce((total, service) => total + (basePrice[service as keyof typeof basePrice] || 0), 0);
  };

  const addAvailabilityWindow = () => {
    if (newWindow.date && newWindow.startTime && newWindow.endTime) {
      const updatedWindows = [...availabilityWindows, { ...newWindow, id: Date.now().toString() }];
      setAvailabilityWindows(updatedWindows);
      localStorage.setItem('availability', JSON.stringify(updatedWindows));
      setNewWindow({ id: '', date: '', startTime: '', endTime: '' });
    }
  };

  const removeAvailabilityWindow = (id: string) => {
    const updatedWindows = availabilityWindows.filter(window => window.id !== id);
    setAvailabilityWindows(updatedWindows);
    localStorage.setItem('availability', JSON.stringify(updatedWindows));
  };

  const updateBookingStatus = (id: string, status: 'approved' | 'cancelled') => {
    const updatedBookings = bookings.map(booking =>
      booking.id === id ? { ...booking, status } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const addTag = (customerId: string, tag: string) => {
    const updatedCustomers = customers.map(customer =>
      customer.id === customerId ? { ...customer, tags: [...customer.tags, tag] } : customer
    );
    setCustomers(updatedCustomers);
    // Update tags in bookings as well
    const updatedBookings = bookings.map(booking =>
      booking.id === customerId ? { ...booking, tags: [...(booking.tags || []), tag] } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const exportCustomerList = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Total Value', 'Tags', 'Last Service Date'],
      ...customers.map(customer => [
        customer.name,
        customer.email,
        customer.phone,
        customer.totalValue.toFixed(2),
        customer.tags.join(', '),
        customer.bookings[customer.bookings.length - 1]?.date || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'customer_list.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex mb-6">
          {['availability', 'bookings', 'maintenance', 'customers'].map((tab) => (
            <button
              key={tab}
              className={`mr-4 ${activeTab === tab ? 'text-red-600 font-semibold' : ''}`}
              onClick={() => setActiveTab(tab as 'availability' | 'bookings' | 'maintenance' | 'customers')}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'availability' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Manage Availability</h3>
            <div className="mb-4 flex space-x-2">
              <input
                type="date"
                value={newWindow.date}
                onChange={(e) => setNewWindow({ ...newWindow, date: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="time"
                value={newWindow.startTime}
                onChange={(e) => setNewWindow({ ...newWindow, startTime: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="time"
                value={newWindow.endTime}
                onChange={(e) => setNewWindow({ ...newWindow, endTime: e.target.value })}
                className="border p-2 rounded"
              />
              <button onClick={addAvailabilityWindow} className="bg-green-500 text-white px-4 py-2 rounded">
                Add
              </button>
            </div>
            <ul>
              {availabilityWindows.map((window) => (
                <li key={window.id} className="flex justify-between items-center mb-2">
                  <span>{`${window.date} ${window.startTime} - ${window.endTime}`}</span>
                  <button onClick={() => removeAvailabilityWindow(window.id)} className="text-red-500">
                    <Trash className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Manage Bookings</h3>
            <ul>
              {bookings.map((booking) => (
                <li key={booking.id} className="mb-4 p-4 border rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <p><strong>Name:</strong> {booking.name}</p>
                      <p><strong>Email:</strong> {booking.email}</p>
                      <p><strong>Phone:</strong> {booking.phone}</p>
                      <p><strong>Services:</strong> {booking.services.join(', ')}</p>
                      <p><strong>Message:</strong> {booking.message}</p>
                      <p><strong>Status:</strong> {booking.status}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'approved')}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Maintenance Clients</h3>
            <ul>
              {maintenanceClients.map((client) => (
                <li key={client.id} className="mb-4 p-4 border rounded">
                  <p><strong>Name:</strong> {client.name}</p>
                  <p><strong>Email:</strong> {client.email}</p>
                  <p><strong>Phone:</strong> {client.phone}</p>
                  <p><strong>Last Service:</strong> {client.lastServiceDate}</p>
                  <p><strong>Next Service:</strong> {client.nextServiceDate}</p>
                  {new Date(client.nextServiceDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded mt-2">
                      <Bell className="w-5 h-5 inline-block mr-2" />
                      Send Reminder
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'customers' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Customer List</h3>
              <button
                onClick={exportCustomerList}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Export Customer List
              </button>
            </div>
            <ul>
              {customers.map((customer) => (
                <li key={customer.id} className="mb-4 p-4 border rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <p><strong>Name:</strong> {customer.name}</p>
                      <p><strong>Email:</strong> {customer.email}</p>
                      <p><strong>Phone:</strong> {customer.phone}</p>
                      <p><strong>Total Value:</strong> £{customer.totalValue.toFixed(2)}</p>
                      <p><strong>Tags:</strong> {customer.tags.join(', ')}</p>
                      <p><strong>Last Service:</strong> {customer.bookings[customer.bookings.length - 1]?.date || 'N/A'}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          const tag = prompt('Enter a new tag:');
                          if (tag) addTag(customer.id, tag);
                        }}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        <Tag className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;