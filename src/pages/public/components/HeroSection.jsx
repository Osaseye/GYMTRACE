import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-background-light">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 bg-primary/10 w-96 h-96 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 bg-blue-100/30 w-full h-1/2 -skew-y-3 pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-background-dark leading-tight mb-6">
              Track Your <span className="text-primary relative">Wait<svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5 L 100 0 Q 50 5 0 0 Z" fill="currentColor"/></svg></span> No More.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Real-time gym analytics at your fingertips. See live occupancy, optimize your workout schedule, and verify membership instantly with QR codes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-opacity-90 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                Get Started Today <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-semibold rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                <Play size={20} className="text-primary fill-current" /> Login to Portal
              </Link>
            </div>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> Real-time Tracking
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div> Instant Access
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
             {/* Phone Mockup using divs */}
            <div className="relative mx-auto border-gray-900 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
              <div className="w-[148px] h-[18px] bg-gray-900 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
              <div className="h-[46px] w-[3px] bg-gray-900 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-900 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-900 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white relative z-10">
                  {/* Screen Content */}
                  <div className="flex flex-col h-full bg-background-light">
                    {/* Fake Header/Status Bar */}
                    <div className="h-24 bg-primary rounded-b-[2rem] pt-8 px-6 pb-6 shadow-md relative z-10">
                        <div className="flex justify-between items-center text-white mb-4">
                            <div className="flex items-center gap-2">
                                <img src="/logo.png" alt="GYMTRACE" className="w-6 h-6 brightness-200" />
                                <div className="font-bold text-lg">GYMTRACE</div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/20 overflow-hidden">
                                <img src="https://i.pravatar.cc/100" alt="User" />
                            </div>
                        </div>
                        <div className="text-white/90 text-sm">Welcome back,</div>
                        <div className="text-white font-bold text-xl">Alex Johnson</div>
                    </div>
                    
                    {/* Fake Content */}
                    <div className="flex-1 p-4 space-y-4 overflow-hidden">
                        {/* Box 1 */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Status</div>
                                <div className="text-green-500 font-bold flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Active
                                </div>
                            </div>
                            <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            </div>
                        </div>
                        
                        {/* Box 2 - Chart */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                             <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-gray-800">Activity</h3>
                                <span className="text-xs text-gray-400">Weekly</span>
                             </div>
                             <div className="flex items-end justify-between h-24 gap-2">
                                <div className="w-full bg-gray-100 rounded-t-sm h-[40%]"></div>
                                <div className="w-full bg-primary/40 rounded-t-sm h-[70%]"></div>
                                <div className="w-full bg-primary rounded-t-sm h-[100%] shadow-lg shadow-primary/20"></div>
                                <div className="w-full bg-gray-100 rounded-t-sm h-[50%]"></div>
                                <div className="w-full bg-gray-100 rounded-t-sm h-[60%]"></div>
                             </div>
                        </div>

                         {/* Box 3 - Next Class */}
                         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Yoga Flow</h4>
                                    <p className="text-sm text-gray-500">Today, 5:00 PM</p>
                                </div>
                            </div>
                         </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
