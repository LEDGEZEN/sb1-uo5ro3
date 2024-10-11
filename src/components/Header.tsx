import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollingBanner from './ScrollingReviews';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full z-50">
      <div className={`transition-all duration-300 ${isScrolled ? 'bg-gray-900' : 'bg-gray-800'}`}>
        <div className="container mx-auto flex justify-between items-center py-4 px-4">
          <h1 className="text-xl md:text-2xl font-bold text-white">Saints Valet & Detailing</h1>
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent`}>
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0">
              <li><a href="#services" className="text-white hover:text-red-500 transition-colors block py-2 md:py-0" onClick={() => setIsMenuOpen(false)}>Services</a></li>
              <li><a href="#booking" className="text-white hover:text-red-500 transition-colors block py-2 md:py-0" onClick={() => setIsMenuOpen(false)}>Book Now</a></li>
              <li><a href="#gallery" className="text-white hover:text-red-500 transition-colors block py-2 md:py-0" onClick={() => setIsMenuOpen(false)}>Gallery</a></li>
              <li><a href="#contact" className="text-white hover:text-red-500 transition-colors block py-2 md:py-0" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
              <li><Link to="/admin" className="text-white hover:text-red-500 transition-colors block py-2 md:py-0" onClick={() => setIsMenuOpen(false)}>Admin</Link></li>
            </ul>
          </nav>
        </div>
      </div>
      <ScrollingBanner />
    </header>
  );
};

export default Header;