import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  Moon, 
  Sun, 
  CreditCard, 
  CalendarCheck, 
  Clock, 
  Activity,
  Zap,
  ChevronRight,
  TrendingUp,
  Wallet
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { getAttendanceByMember, getWeeklyAttendance } from '../../services/attendanceService';
import { getBookingsByMember } from '../../services/bookingService';

const MemberDashboard = () => {
    const { user, userData } = useAuth();
    const firstName = userData?.name?.split(' ')[0] || 'Member';
    const isPremium = userData?.isPremium === true;

    const [weeklyData, setWeeklyData] = useState([
      { name: 'Mon', visits: 0 },
      { name: 'Tue', visits: 0 },
      { name: 'Wed', visits: 0 },
      { name: 'Thu', visits: 0 },
      { name: 'Fri', visits: 0 },
      { name: 'Sat', visits: 0 },
      { name: 'Sun', visits: 0 },
    ]);
    const [lastCheckIn, setLastCheckIn] = useState(null);
    const [totalVisits, setTotalVisits] = useState(0);
    const [nextBooking, setNextBooking] = useState(null);

    useEffect(() => {
      if (!user) return;
      const load = async () => {
        try {
          const [weekly, all, bookings] = await Promise.all([
            getWeeklyAttendance(user.uid),
            getAttendanceByMember(user.uid),
            getBookingsByMember(user.uid),
          ]);
          setWeeklyData(weekly);
          setTotalVisits(all.length);
          if (all.length > 0 && all[0].checkIn?.toDate) {
            setLastCheckIn(all[0].checkIn.toDate());
          }
          // Find the nearest upcoming booking
          const todayStr = new Date().toISOString().slice(0, 10);
          const upcoming = bookings
            .filter((b) => b.status === 'upcoming' && b.date >= todayStr)
            .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
          if (upcoming.length > 0) setNextBooking(upcoming[0]);
        } catch (error) { console.error(error);
          // silent
        }
      };
      load();
    }, [user]);
  
    return (
      <div className="p-6 space-y-8 font-sans max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">
              Welcome back, {firstName}! 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">Here's what's happening today.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Moon size={20} />
            </button>
            <Link 
              to="/member/qr" 
              className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 active:scale-95"
            >
              <QrCode size={20} />
              <span>Generate Qr</span>
            </Link>
          </div>
        </header>
  
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Subscription Plan */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Zap size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${isPremium ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                {isPremium ? 'ACTIVE' : 'FREE'}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Subscription Plan</p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">{isPremium ? 'Premium' : 'Basic Member'}</h3>
              <p className="text-xs text-gray-400 mt-1">{isPremium ? 'Active Subscription' : 'Upgrade for full access'}</p>
            </div>
          </div>
  
          {/* Sessions Remaining */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                <Activity size={24} />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Sessions Remaining</p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">0 <span className="text-sm text-gray-400 font-medium">/ 0</span></h3>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
  
          {/* Last Check-In */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Clock size={24} />
              </div>
            </div>
            <div>
               <p className="text-sm text-gray-500 font-medium">Last Check-In</p>
               <h3 className="text-lg font-bold text-gray-900 mt-1">{lastCheckIn ? lastCheckIn.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '-'}</h3>
               <p className="text-xs text-gray-400 mt-0.5">{lastCheckIn ? lastCheckIn.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No recent check-ins'}</p>
            </div>
          </div>
  
          {/* Next Booking */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
             <div className="flex justify-between items-start">
                <div className="p-3 bg-pink-50 text-pink-600 rounded-xl">
                  <CalendarCheck size={24} />
                </div>
                <Link to="/member/booking" className="text-gray-400 hover:text-gray-600">
                  <ChevronRight size={20} />
                </Link>
             </div>
             <div>
               <p className="text-sm text-gray-500 font-medium">Next Booking</p>
               {nextBooking ? (
                 <>
                   <h3 className="text-lg font-bold text-gray-900 mt-1">{nextBooking.trainerName}</h3>
                   <p className="text-xs text-gray-400 mt-0.5">{nextBooking.date} · {nextBooking.time}</p>
                 </>
               ) : (
                 <>
                   <h3 className="text-lg font-bold text-gray-900 mt-1">-</h3>
                   <p className="text-xs text-gray-400 mt-0.5">No upcoming bookings</p>
                 </>
               )}
             </div>
          </div>
        </div>
  
        {/* Charts & Balance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account Balance */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg text-white flex flex-col justify-between h-64 lg:col-span-1 relative overflow-hidden group">
             {/* Decorative Elements */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
             <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                     <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                        <Wallet size={20} className="text-emerald-400"/>
                     </div>
                     <span className="text-gray-300 font-medium text-sm">Main Balance</span>
                </div>
                <h2 className="text-4xl font-mono font-bold tracking-tight mb-2">₦ 0.00</h2>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium bg-emerald-400/10 w-fit px-2 py-1 rounded-full">
                     <TrendingUp size={12} />
                     <span>+0% this month</span>
                </div>
             </div>
             
             <div className="flex gap-3 relative z-10 mt-auto">
                 <button className="flex-1 bg-white text-gray-900 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors shadow-sm">
                     Top Up
                 </button>
                 <button className="flex-1 bg-white/10 text-white backdrop-blur-sm py-2.5 rounded-xl text-sm font-semibold hover:bg-white/20 transition-colors border border-white/10">
                     History
                 </button>
             </div>
          </div>
  
          {/* Weekly Activity Chart */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <div>
                  <h3 className="text-lg font-bold text-gray-900">Weekly Activity</h3>
                  <p className="text-sm text-gray-500">Your gym visits this week</p>
               </div>
               <select className="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block px-3 py-1.5 outline-none">
                  <option>This Week</option>
                  <option>Last Week</option>
               </select>
            </div>
            
            <div className="flex-1 w-full min-h-[200px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                     <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#9ca3af', fontSize: 12 }} 
                        dy={10}
                     />
                     <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#9ca3af', fontSize: 12 }} 
                        ticks={[0, 1, 2, 3, 4]}
                     />
                     <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: '#f9fafb' }}
                     />
                     <Bar dataKey="visits" radius={[4, 4, 0, 0]} barSize={32}>
                        {weeklyData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.visits > 0 ? '#10b981' : '#e5e7eb'} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default MemberDashboard;
