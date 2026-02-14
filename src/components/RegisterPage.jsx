import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react'; // Added User and ArrowRight icons
import logo from '../assets/logo.png';

const RegisterPage = () => {
  // STATE: We need to remember which role the user selected (Member or Trainer)
  const [role, setRole] = useState('member'); // Default to 'member'

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative">
      
        <div className="flex justify-center mb-4">
           <img src={logo} alt="GymTrace Logo" className="w-auto h-40 object-contain" />
        </div>
        

      {/* 2. REGISTER CARD */}
      <div className="bg-white w-full max-w-md p-8 rounded-3xl border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">Create your account</h2>
        
        <form className="space-y-5 mt-6">
          
          {/* FULL NAME INPUT (New) */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
              />
            </div>
          </div>

          {/* EMAIL INPUT */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">I am a...</label>
            <div className="grid grid-cols-2 gap-4">
              {/* Member Button */}
              <button
                type="button"
                onClick={() => setRole('member')}
                className={`py-3 rounded-xl font-medium border-2 transition-all ${
                  role === 'member' 
                    ? 'border-emerald-500 text-emerald-600 bg-emerald-50' 
                    : 'border-slate-200 text-slate-500 hover:border-emerald-200'
                }`}
              >
                Member
              </button>

              {/* Trainer Button */}
              <button
                type="button"
                onClick={() => setRole('trainer')}
                className={`py-3 rounded-xl font-medium border-2 transition-all ${
                  role === 'trainer' 
                    ? 'border-emerald-500 text-emerald-600 bg-emerald-50' 
                    : 'border-slate-200 text-slate-500 hover:border-emerald-200'
                }`}
              >
                Trainer
              </button>
            </div>
          </div>

          {/* PASSWORD INPUT */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
              />
            </div>
          </div>

          {/* TERMS CHECKBOX */}
          <div className="flex items-center space-x-3">
            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500" />
            <span className="text-sm text-slate-600">
              I agree to the <a href="#" className="text-emerald-600 font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-emerald-600 font-bold hover:underline">Privacy Policy</a>
            </span>
          </div>

          {/* SUBMIT BUTTON */}
          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-emerald-200 transition-all active:scale-95">
            <span>Create Account</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-600 text-sm font-medium">
            Already have an account? <a href="#" className="text-emerald-600 font-bold hover:underline">Sign in</a>
          </p>
        </div>
      </div>

      {/* 3. FOOTER */}
      <div className="mt-12 text-center text-xs text-slate-400 font-medium">
        <p>© 2024 GYMTRACE Platform. All rights reserved.</p>
      </div>
    </div>
  );
};

export default RegisterPage;