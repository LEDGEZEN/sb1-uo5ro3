import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Contact Us</h2>
        <div className="flex flex-col md:flex-row justify-around items-start">
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-red-600" />
                <span className="text-sm md:text-base">+447543926862</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-red-600" />
                <span className="text-sm md:text-base">info@saintsvaletdetailing.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-600" />
                <span className="text-sm md:text-base">Based in MK, Covering Bucks/Beds/Northants/Herts</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>Monday - Friday: 8:00 AM - 6:00 PM</li>
              <li>Saturday: 9:00 AM - 5:00 PM</li>
              <li>Sunday: By appointment only</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;