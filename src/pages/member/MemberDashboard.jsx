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
import { Link, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { getAttendanceByMember, getWeeklyAttendance } from '../../services/attendanceService';
import { getBookingsByMember } from '../../services/bookingService';

const MemberDashboard = () => {
    const { user, userData } = useAuth();
    const navigate = useNavigate();
    const firstName = userData?.name?.split(' ')[0] || 'Member';
    const isPremium = userData?.isPremium === true;
    const isOneTimePass = userData?.oneTimePass === true || userData?.planType === 'one-time';
    
    let displayPlanName = 'Basic';
    if (isPremium) displayPlanName = 'Premium';
    else if (isOneTimePass) displayPlanName = 'One-Time Pass';
    
    const isActive = isPremium || isOneTimePass;

    const [weeklyData, setWeeklyData] = useState([
      { name: 'Mon', visits: 0 },
      { name: 'Tue', visits: 0 },
      { name: 'Wed', visits: 0 },
      { name: 'Thu', visits: 0 },
      { name: 'Fri', visits: 0 },
      { name: 'Sat', visits: 0 },
      { name: 'Sun', visits: 0 },
    ]);
    const [monthlyData, setMonthlyData] = useState([
      { name: 'Week 1', visits: 0 },
      { name: 'Week 2', visits: 0 },
      { name: 'Week 3', visits: 0 },
      { name: 'Week 4', visits: 0 },
    ]);
    const [activityView, setActivityView] = useState('This Week');
    
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

          // Calculate Monthly Data
          const now = new Date();
          const thirtyDaysAgo = new Date(now);
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
          let monthCounts = [0, 0, 0, 0];
          all.forEach(record => {
            const date = record.checkIn?.toDate();
            if (date && date >= thirtyDaysAgo) {
              const diffTime = Math.abs(now - date);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              if (diffDays <= 7) monthCounts[3]++; // Week 4 (Latest)
              else if (diffDays <= 14) monthCounts[2]++; // Week 3
              else if (diffDays <= 21) monthCounts[1]++; // Week 2
              else if (diffDays <= 28) monthCounts[0]++; // Week 1
            }
          });
          setMonthlyData([
            { name: 'Wk 1', visits: monthCounts[0] },
            { name: 'Wk 2', visits: monthCounts[1] },
            { name: 'Wk 3', visits: monthCounts[2] },
            { name: 'Wk 4', visits: monthCounts[3] },
          ]);

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
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                {isActive ? 'ACTIVE' : 'FREE'}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Subscription Plan</p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">{displayPlanName}</h3>
              <p className="text-xs text-gray-400 mt-1">{isPremium ? 'Active Subscription' : isOneTimePass ? 'Active Pass' : 'Upgrade for full access'}</p>
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
          {/* Plan Info */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg text-white flex flex-col justify-between h-64 lg:col-span-1 relative overflow-hidden group">
             {/* Decorative Elements */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
             <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                     <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                        <Zap size={20} className="text-emerald-400"/>
                     </div>
                     <span className="text-gray-300 font-medium text-sm">Target Plan</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-2 capitalize">{displayPlanName}</h2>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium bg-emerald-400/10 w-fit px-2 py-1 rounded-full">
                     <Activity size={12} />
                     <span>{isActive ? 'Active subscription/pass' : 'Limited access'}</span>
                </div>
             </div>
             
             <div className="flex gap-3 relative z-10 mt-auto">
                 <button 
                     onClick={() => navigate('/member/payments')}
                     className="flex-1 bg-white text-gray-900 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors shadow-sm block text-center"
                 >
                     Manage Payments
                 </button>
             </div>
          </div>
  
          {/* Weekly Activity Chart */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <div>
                  <h3 className="text-lg font-bold text-gray-900">{activityView === 'This Week' ? 'Weekly' : 'Monthly'} Activity</h3>
                  <p className="text-sm text-gray-500">Your gym visits {activityView === 'This Week' ? 'this week' : 'this past month'}</p>
               </div>
               <select 
                  value={activityView}
                  onChange={(e) => setActivityView(e.target.value)}
                  className="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block px-3 py-1.5 outline-none"
               >
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
               </select>
            </div>
            
            <div className="flex-1 w-full min-h-[200px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityView === 'This Week' ? weeklyData : monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                        allowDecimals={false}
                     />
                     <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: '#f9fafb' }}
                     />
                     <Bar dataKey="visits" radius={[4, 4, 0, 0]} barSize={32}>
                        {(activityView === 'This Week' ? weeklyData : monthlyData).map((entry, index) => (
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
