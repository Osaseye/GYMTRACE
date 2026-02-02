import React, { useState, useEffect } from 'react';
import { Mail, Lock, LogIn, Moon, Sun } from 'lucide-react'; // Import Sun for the toggle
import logo from '../assets/logo.png';

const LoginPage = () => {
  // 1. JS LOGIC: State to track the mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 2. JS LOGIC: When 'isDarkMode' changes, update the HTML tag
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 3. JS LOGIC: The toggle function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    // CONTAINER:
    // dark:bg-slate-900 -> Changes background to dark blue-grey
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4 relative transition-colors duration-300">
      
      {/* Dark Mode Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 rounded-full bg-white dark:bg-slate-800 shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
      >
        {/* Switch Icon based on mode */}
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-slate-600" />
        )}
      </button>

      {/* 1. Header Section */}
      <div className="mb-4">
        {/* Added invert for dark mode if your logo is black transparent */}
        <img src={logo} alt="GymTrace" className="w-auto h-36" /> 
      </div>

      {/* 2. Login Card */}
      {/* dark:bg-slate-800 -> Card turns dark grey */}
      {/* dark:border-slate-700 -> Border becomes subtle dark line */}
      <div className="bg-white dark:bg-slate-800 w-full max-w-md p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 transition-colors duration-300">
        
        {/* TEXT: dark:text-white */}
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Welcome Back</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 mb-8 font-medium">
          Access your Babcock University gym account
        </p>

        <form className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
              <input 
                type="email" 
                placeholder="name@babcock.edu.ng"
                // INPUT STYLING:
                // dark:bg-slate-700 -> Input background darkens
                // dark:text-white -> Typing becomes white
                // dark:border-slate-600 -> Border darkens
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:text-white transition-all outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
              <a href="#" className="text-sm text-emerald-600 dark:text-emerald-400 font-bold hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:text-white transition-all outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Remember Me checkbox */}
          <div className="flex items-center space-x-3">
            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-emerald-500 focus:ring-emerald-500" />
            <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Remember me for 30 days</span>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-emerald-200 dark:shadow-none transition-all active:scale-95">
            <LogIn className="w-5 h-5" />
            <span>Login to Dashboard</span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            Don't have an account? <a href="#" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">Register as Student/Staff</a>
          </p>
        </div>
      </div>

      {/* 3. Footer */}
      <div className="mt-12 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
        <p> Secure Access Portal • Babcock University Gym Management</p>
        <p className="mt-2 uppercase tracking-widest">© 2024 GYMTRACE PLATFORM</p>
      </div>
    </div>
  );
};

export default LoginPage;