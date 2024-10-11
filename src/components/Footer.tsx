import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm md:text-base">&copy; 2023 Saints Valet & Detailing. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/SaintsValetDetailing" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
              <Facebook className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a href="https://www.instagram.com/Saints_valetdetailing" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
              <Instagram className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a href="https://www.tiktok.com/@saints.valet.detailing" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;