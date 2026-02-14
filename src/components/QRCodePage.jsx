import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  Shield, 
  Lightbulb, 
  CalendarCheck, 
  Headset, 
  User,
  QrCode // Added this icon for the placeholder
} from 'lucide-react';
import logo from '../assets/logo.png';

const QRCodePage = () => {
  // --- REACT LOGIC: The Countdown Timer ---
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleRegenerate = () => {
    setTimeLeft(60);
    // TODO: Add backend API call here to fetch a fresh QR string 
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-8">
      
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="flex justify-between items-center p-6 bg-white border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="GymTrace" className="h-8 w-auto" />
          <span className="font-bold text-slate-800 tracking-tight">GYMTRACE</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800">Daniel Okon</p>
            <p className="text-xs text-slate-500">Babcock ID: 23/1024</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-emerald-500">
            <User className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 mt-12 flex flex-col items-center">
        
        {/* 2. PAGE HEADER */}
        <div className="text-center mb-10 max-w-lg">
          <h1 className="text-4xl font-black text-slate-900 mb-3">Access QR Code</h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Scan this code at the gym entrance turnstile to gain access. 
            For security, codes refresh every 60 seconds.
          </p>
        </div>

        {/* 3. THE QR CODE CARD */}
        <div className="bg-white p-8 rounded-[2.5rem]  border border-emerald-50 w-full max-w-sm flex flex-col items-center relative overflow-hidden">
          
          <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full flex items-center space-x-2 mb-8">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>VALID ACCESS</span>
          </div>

          {/* --- QR CODE PLACEHOLDER SECTION --- */}
          <div className="relative p-4 border-2 border-dashed border-slate-200 rounded-2xl mb-8 flex flex-col items-center justify-center">
            
            {/* The 4 green corners styling */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg"></div>
            
            {/* The Visual Placeholder */}
            <div className="w-48 h-48 bg-slate-50 flex flex-col items-center justify-center rounded-lg">
               <QrCode className="w-24 h-24 text-slate-300 mb-2" />
               <p className="text-slate-400 text-xs font-mono font-bold">AWAITING BACKEND</p>
               <p className="text-slate-400 text-[10px] text-center px-2 mt-1">
                 (The qrcode npm package will replace this box later)
               </p>
            </div>
          </div>
          {/* --- END PLACEHOLDER SECTION --- */}

          <div className="text-center mb-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Code Expires In</p>
            <h2 className={`text-4xl font-black ${timeLeft <= 10 ? 'text-red-500' : 'text-slate-900'}`}>
              0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </h2>
          </div>

          <button 
            onClick={handleRegenerate}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-lg shadow-emerald-200"
          >
            <RefreshCw className={`w-5 h-5 ${timeLeft === 0 ? 'animate-spin' : ''}`} />
            <span>Regenerate QR Code</span>
          </button>

          <div className="w-full border-t border-slate-100 mt-6 pt-4 flex items-center justify-center space-x-2 text-slate-400">
            <Shield className="w-3 h-3" />
            <p className="text-[10px] font-bold uppercase tracking-wider">Encrypted Access Token</p>
          </div>
        </div>

        {/* 4. INFO CARDS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <Lightbulb className="w-6 h-6 text-emerald-500 mb-4" />
            <h3 className="font-bold text-slate-800 mb-2">Scanning Tip</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Increase your screen brightness to maximum for the fastest scanning response at the gate.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <CalendarCheck className="w-6 h-6 text-emerald-500 mb-4" />
            <h3 className="font-bold text-slate-800 mb-2">Membership</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Active • Gold Plan<br/>Expires Oct 24, 2025
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <Headset className="w-6 h-6 text-emerald-500 mb-4" />
            <h3 className="font-bold text-slate-800 mb-2">Need Help?</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              If your code isn't scanning, please see the front desk officer for assistance.
            </p>
          </div>
        </div>

        {/* 5. FOOTER (Matching the design) */}
        <div className="mt-16 mb-4 flex flex-col items-center justify-center">
          <div className="flex items-center space-x-2 mb-2 opacity-50">
            <img src={logo} alt="" className="w-5 h-5 grayscale" />
            <span className="text-slate-500 font-bold tracking-widest text-sm uppercase">GymTrace</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            © 2024 Babcock University Gym Management Systems
          </p>
        </div>

      </div>
    </div>
  );
};

export default QRCodePage;