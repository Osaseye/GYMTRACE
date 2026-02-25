import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, User, LogOut } from 'lucide-react';
import logo from '../../../assets/logo.png';

const MemberNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/member/dashboard" className="flex items-center space-x-2">
              <img className="h-10 w-auto" src={logo} alt="GymTrace" />
              <span className="font-display font-bold text-xl text-slate-900 tracking-tight">GYM<span className="text-emerald-500">TRACE</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/member/dashboard" className="text-slate-600 hover:text-emerald-500 font-medium transition-colors">Dashboard</Link>
            <Link to="/member/schedule" className="text-slate-600 hover:text-emerald-500 font-medium transition-colors">Schedule</Link>
            <Link to="/member/history" className="text-slate-600 hover:text-emerald-500 font-medium transition-colors">History</Link>
            
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            
            <button className="text-slate-500 hover:text-emerald-500 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
            </button>
            
            <div className="flex items-center space-x-3 pl-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold border border-emerald-200">
                JD
              </div>
              <div className="hidden lg:block text-sm">
                <p className="font-bold text-slate-800">John Doe</p>
                <p className="text-slate-500 text-xs">Member</p>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-emerald-500 transition-colors p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-lg px-4 py-6 space-y-4">
          <Link to="/member/dashboard" className="block text-slate-600 hover:text-emerald-500 font-medium py-2">Dashboard</Link>
          <Link to="/member/schedule" className="block text-slate-600 hover:text-emerald-500 font-medium py-2">Schedule</Link>
          <Link to="/member/history" className="block text-slate-600 hover:text-emerald-500 font-medium py-2">History</Link>
          <div className="border-t border-slate-100 pt-4 mt-2">
             <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold border border-emerald-200">
                JD
              </div>
              <div className="text-sm">
                <p className="font-bold text-slate-800">John Doe</p>
                <p className="text-slate-500 text-xs">Member</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 text-red-500 font-medium w-full py-2 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MemberNavbar;
