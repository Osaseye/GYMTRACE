import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img className="h-8 w-auto" src="/logo.png" alt="GYMTRACE" />
              <span className="font-display font-bold text-xl text-background-dark">
                GYMTRACE
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary transition-colors font-medium">features</a>
            <a href="#about" className="text-gray-600 hover:text-primary transition-colors font-medium">about</a>
            <a href="#testimonials" className="text-gray-600 hover:text-primary transition-colors font-medium">testimonials</a>
            <div className="flex items-center space-x-4 ml-4">
              <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition-colors">
                Login
              </Link>
              <Link to="/register" className="bg-primary text-white px-5 py-2.5 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Features</a>
            <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">About</a>
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col space-y-2 px-3">
              <Link to="/login" className="block text-center py-2 text-gray-600 hover:text-primary font-medium">
                Login
              </Link>
              <Link to="/register" className="block text-center bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
