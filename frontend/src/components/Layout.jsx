import { Link, useLocation } from 'react-router-dom';
import { Scissors, Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const navLinks = isAdmin ? [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/services', label: 'Services' },
    { to: '/admin/employees', label: 'Employees' },
    { to: '/admin/gallery', label: 'Gallery' },
  ] : [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-barber-800 border-b border-barber-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={isAdmin ? '/admin' : '/'} className="flex items-center gap-2">
              <Scissors className="w-6 h-6 text-barber-gold" />
              <span className="font-display text-xl font-bold text-white">
                {isAdmin ? 'Admin Panel' : 'Classic Cuts'}
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-300 hover:text-barber-gold transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-barber-800 border-t border-barber-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-gray-300 hover:text-barber-gold hover:bg-barber-700 rounded-md"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-barber-800 border-t border-barber-700 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-xl font-bold text-white mb-4">Classic Cuts</h3>
          <p className="text-gray-400">
            Premium barbershop experience with expert stylists and traditional techniques.
          </p>
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-white mb-4">Contact</h3>
          <div className="space-y-2 text-gray-400">
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 123 Main St, Downtown</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 123-4567</p>
            <p className="flex items-center gap-2"><Clock className="w-4 h-4" /> Mon-Sat: 9AM-7PM</p>
          </div>
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-white mb-4">Quick Links</h3>
          <div className="space-y-2">
            <Link to="/services" className="block text-gray-400 hover:text-barber-gold">Our Services</Link>
            <Link to="/gallery" className="block text-gray-400 hover:text-barber-gold">Gallery</Link>
            <Link to="/contact" className="block text-gray-400 hover:text-barber-gold">Contact Us</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-barber-700 mt-8 pt-8 text-center text-gray-500">
        <p>&copy; 2024 Classic Cuts Barber Shop. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export { Navbar, Footer };
