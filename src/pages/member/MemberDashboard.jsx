import React from 'react';
import { Activity, QrCode, Calendar, TrendingUp, Clock, Flame, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MemberNavbar from './components/MemberNavbar';

const MemberDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <MemberNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-display">
              Welcome back, <span className="text-emerald-500">John!</span> 👋
            </h1>
            <p className="text-slate-500 mt-1">Ready to crush your goals today?</p>
          </div>
          <Link 
            to="/member/qr" 
            className="group flex items-center justify-center space-x-2 bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 active:scale-95"
          >
            <QrCode className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="font-bold">Scan QR Access</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            icon={<Flame className="w-6 h-6 text-orange-500" />}
            bg="bg-orange-50"
            border="border-orange-100"
            label="Calories Burned"
            value="1,240"
            subtext="kcal this week"
          />
          <StatsCard 
            icon={<Activity className="w-6 h-6 text-blue-500" />}
            bg="bg-blue-50"
            border="border-blue-100"
            label="Workouts"
            value="12"
            subtext="sessions completed"
          />
           <StatsCard 
            icon={<Clock className="w-6 h-6 text-purple-500" />}
            bg="bg-purple-50"
            border="border-purple-100"
            label="Active Time"
            value="8h 30m"
            subtext="spent training"
          />
          <StatsCard 
            icon={<TrendingUp className="w-6 h-6 text-emerald-500" />}
            bg="bg-emerald-50"
            border="border-emerald-100"
            label="Current Streak"
            value="5 Days"
            subtext="Keep it up!"
          />
        </div>

        {/* Main Content Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>
            
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
                
                <ActivityItem 
                    title="Upper Body Strength"
                    time="Today, 09:30 AM"
                    score="+320 kcal"
                    type="gym"
                />
                <ActivityItem 
                    title="Cardio Session"
                    time="Yesterday, 06:15 PM"
                    score="+450 kcal"
                    type="cardio"
                />
                <ActivityItem 
                    title="Yoga Class"
                    time="Mon, 12 Oct • 05:00 PM"
                    score="+180 kcal"
                    type="yoga"
                />

                <button className="w-full text-center text-slate-500 font-medium hover:text-emerald-500 transition-colors py-2 text-sm">
                    View Full History
                </button>
            </div>
          </div>

          {/* Upcoming Schedule / Quick Actions */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Next Session</h2>
            
            <div className="bg-emerald-500 rounded-3xl p-6 shadow-lg shadow-emerald-200 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
                
                <div className="relative z-10">
                    <div className="inline-block px-3 py-1 bg-emerald-600/30 rounded-full text-xs font-bold mb-4 backdrop-blur-sm border border-emerald-400/30">
                        Tomorrow
                    </div>
                    <h3 className="text-2xl font-bold mb-1">HIIT Training</h3>
                    <p className="text-emerald-100 text-sm mb-6">with Sarah Connor</p>
                    
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-emerald-600/40 p-2 rounded-lg">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold">10:00 AM</p>
                            <p className="text-xs text-emerald-200">60 mins</p>
                        </div>
                    </div>

                    <button className="w-full py-3 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-sm">
                        View Details
                    </button>
                </div>
            </div>

            {/* Quick Stats or Promo */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4">Weekly Goal</h3>
                <div className="flex justify-between text-sm text-slate-500 mb-2">
                    <span>3/5 Workouts</span>
                    <span>60%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-3/5"></div>
                </div>
                <p className="text-xs text-slate-400 mt-4">
                    You're doing great! Just 2 more sessions to reach your weekly target.
                </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper Components
const StatsCard = ({ icon, label, value, subtext, bg, border }) => (
    <div className={`bg-white p-6 rounded-3xl border ${border} shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group`}>
        <div className={`absolute top-4 right-4 p-3 rounded-2xl ${bg} group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <div className="mt-8">
            <h3 className="text-3xl font-bold text-slate-800 font-display">{value}</h3>
            <p className="text-slate-600 font-semibold mt-1">{label}</p>
            <p className="text-slate-400 text-xs mt-1">{subtext}</p>
        </div>
    </div>
);

const ActivityItem = ({ title, time, score, type }) => (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all cursor-pointer group">
        <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm
                ${type === 'gym' ? 'bg-blue-100 text-blue-500' : 
                  type === 'cardio' ? 'bg-orange-100 text-orange-500' : 'bg-purple-100 text-purple-500'}
            `}>
                {type === 'gym' ? '💪' : type === 'cardio' ? '🏃' : '🧘'}
            </div>
            <div>
                <h4 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{title}</h4>
                <p className="text-slate-500 text-xs font-medium">{time}</p>
            </div>
        </div>
        <div className="text-right">
             <span className="block font-bold text-emerald-600">{score}</span>
        </div>
    </div>
);

export default MemberDashboard;
