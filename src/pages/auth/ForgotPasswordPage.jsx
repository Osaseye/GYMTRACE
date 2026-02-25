import React from 'react';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative">
      
      {/* 1. Header Section */}
      <div className="mb-4">
        <img src={logo} alt="GymTrace Logo" className="w-auto h-36" />
      </div>

      {/* 2. Forgot Password Card */}
      <div className="bg-white w-full max-w-md p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Forgot Password?</h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            No worries! Enter the email associated with your account and we'll send you a reset link.
          </p>
        </div>

        <form className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="email" 
                placeholder="name@babcock.edu.ng"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-emerald-200 transition-all active:scale-95">
            <span>Send Reset Instructions</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center bg-slate-50 py-3 rounded-xl border border-slate-100">
          <Link to="/login" className="flex items-center justify-center space-x-2 text-slate-600 font-bold hover:text-emerald-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>

      {/* 3. Footer */}
      <div className="mt-12 text-center text-xs text-slate-400 font-medium">
        <p> Secure Access Portal • Babcock University Gym Management</p>
        <p className="mt-2 uppercase tracking-widest">© 2024 GYMTRACE PLATFORM</p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
