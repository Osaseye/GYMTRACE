import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Dumbbell, 
  DollarSign, 
  Activity, 
  TrendingUp,
  ArrowUpRight,
  Loader2,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAdminStats, getRecentActivity, getMonthlyGrowth, getWeeklyCheckIns } from '../../services/adminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalMembers: 0, totalTrainers: 0, todayCheckIns: 0, totalBookings: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, activity, growth, weekly] = await Promise.all([
          getAdminStats(),
          getRecentActivity(10),
          getMonthlyGrowth(),
          getWeeklyCheckIns(),
        ]);
        setStats(s);
        setRecentActivity(activity);
        setGrowthData(growth);
        setWeeklyData(weekly);
      } catch (error) {
        console.error(error);
        // silent
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings?.toString() || '0',
      change: 'All time',
      icon: Activity,
      color: 'bg-green-500',
    },
    {
      title: 'Active Members',
      value: stats.totalMembers.toString(),
      change: 'All time',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Trainers',
      value: stats.totalTrainers.toString(),
      change: 'All time',
      icon: Dumbbell,
      color: 'bg-orange-500',
    },
    {
      title: 'Today\'s Check-ins',
      value: stats.todayCheckIns.toString(),
      change: 'Today',
      icon: Activity,
      color: 'bg-purple-500',
    },
  ];

  const formatTime = (date) => {
    if (!date) return '';
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <div className="text-sm text-slate-500">
          Last updated: Today, {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin text-slate-400" /> : stat.value}
                </h3>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white opacity-90`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-slate-500 font-medium flex items-center">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Check-ins Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Check-ins (Last 7 Days)</h3>
            <div className="h-64">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} allowDecimals={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={32} name="Check-ins" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Member Growth Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Member Growth (Last 6 Months)</h3>
            <div className="h-64">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} allowDecimals={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} name="New Members" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-fit">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
              </div>
            ) : recentActivity.length === 0 ? (
              <div className="text-center text-slate-400 py-8">
                No recent activity
              </div>
            ) : (
              recentActivity.map((activity) => (
                <div key={activity.id + activity.type} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
                    ${activity.type === 'checkin' ? 'bg-green-100 text-green-600' : 
                      activity.type === 'register' ? 'bg-blue-100 text-blue-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                    {activity.type === 'checkin' ? <Activity className="w-4 h-4" /> :
                     activity.type === 'register' ? <Users className="w-4 h-4" /> :
                     <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800 truncate">{activity.user}</p>
                    <p className="text-xs text-slate-500">{activity.action}</p>
                  </div>
                  <div className="ml-auto text-xs text-slate-400 whitespace-nowrap">
                    {formatTime(activity.time)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
