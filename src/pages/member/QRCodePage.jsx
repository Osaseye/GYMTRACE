import React, { useState, useEffect } from 'react';
import { QRCodeCanvas as QRCode } from 'qrcode.react';
import { 
  RefreshCw, 
  Shield, 
  User,
  Clock,
  Lightbulb,
  CalendarCheck,
  Headset
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const QRCodePage = () => {
  const { user, userData } = useAuth();
  const [timeLeft, setTimeLeft] = useState(60);
  const [qrValue, setQrValue] = useState("");

  const generateQRCallback = () => {
    if (!user?.uid) return;
    const secureData = JSON.stringify({
      userId: user?.uid,
      timestamp: Date.now(),
      validity: "60s"
    });
    setQrValue(secureData);
    setTimeLeft(60);
  };

  // Initial generation
  useEffect(() => {
    if (user?.uid) generateQRCallback();
  }, [user]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { generateQRCallback(); return 60; }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-8">
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="flex justify-between items-center p-6 bg-white border-b border-slate-100 shadow-sm">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="GymTrace" className="h-8 w-auto" />
          <span className="font-bold text-slate-800 tracking-tight">GYMTRACE</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800">{userData?.name || 'Member'}</p>
            <p className="text-xs text-slate-500">Member ID: {user?.uid?.slice(0, 8)}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-emerald-500 shadow-sm">
            <User className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 mt-8 flex flex-col items-center">
        
        {/* 2. PAGE HEADER */}
        <div className="text-center mb-8 max-w-lg">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Access QR Code</h1>
          <p className="text-slate-500 font-medium">
            Scan at the turnstile. Codes refresh automatically.
          </p>
        </div>

        {/* 3. THE QR CODE CARD */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl w-full max-w-sm flex flex-col items-center relative overflow-hidden">
          
          <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full flex items-center space-x-2 mb-8">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>VALID ACCESS</span>
          </div>

          {/* --- QR CODE SECTION --- */}
          <div className="relative p-4 border-2 border-dashed border-slate-200 rounded-2xl mb-8 bg-white shadow-inner">
            <div className="bg-white p-2 rounded-xl">
                {qrValue && (
                    <QRCode
                        value={qrValue}
                        size={200}
                        className="w-full h-full object-contain"
                        level="H" 
                    />
                )}
            </div>
          </div>

          <div className="text-center mb-6 w-full">
            <div className="flex items-center justify-center gap-2 mb-2">
                <Clock size={16} className="text-slate-400" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Code Expires In</p>
            </div>
            <h2 className={`text-4xl font-black font-mono tracking-tighter ${timeLeft <= 10 ? 'text-red-500' : 'text-slate-900'}`}>
              0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </h2>
          </div>

          <button 
            onClick={generateQRCallback}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-lg shadow-slate-200"
          >
            <RefreshCw className={`w-5 h-5 ${timeLeft === 60 ? 'animate-spin' : ''}`} />
            <span>Regenerate Now</span>
          </button>

          <div className="w-full border-t border-slate-100 mt-6 pt-4 flex items-center justify-center space-x-2 text-slate-400">
            <Shield className="w-3 h-3" />
            <p className="text-[10px] font-bold uppercase tracking-wider">Encrypted Access Token</p>
          </div>
        </div>

        {/* 4. INFO CARDS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8 max-w-4xl">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <Lightbulb className="w-8 h-8 text-emerald-500 mb-3 bg-emerald-50 p-1.5 rounded-lg" />
            <h3 className="font-bold text-slate-800 text-sm mb-1">Scanning Tip</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Max brightness helps scanning.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <CalendarCheck className="w-8 h-8 text-emerald-500 mb-3 bg-emerald-50 p-1.5 rounded-lg" />
            <h3 className="font-bold text-slate-800 text-sm mb-1">Status</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Active • Gold • Exp 2025
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <Headset className="w-8 h-8 text-emerald-500 mb-3 bg-emerald-50 p-1.5 rounded-lg" />
            <h3 className="font-bold text-slate-800 text-sm mb-1">Help</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Staff is available at the desk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
