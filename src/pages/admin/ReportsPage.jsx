import React, { useState, useEffect } from 'react';
import { DollarSign, Users, TrendingUp, Calendar, ArrowUpRight, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAdminStats, getMonthlyGrowth, getWeeklyCheckIns } from '../../services/adminService';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalMembers: 0, totalTrainers: 0, todayCheckIns: 0 });
  const [growthData, setGrowthData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, growth, weekly] = await Promise.all([
          getAdminStats(),
          getMonthlyGrowth(),
          getWeeklyCheckIns(),
        ]);
        setStats(s);
        setGrowthData(growth);
        setWeeklyData(weekly);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const tabs = [
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'growth', label: 'User Growth', icon: TrendingUp },
    { id: 'financial', label: 'Financial', icon: DollarSign },
  ];

  const chartData = activeTab === 'attendance' ? weeklyData : activeTab === 'growth' ? growthData : [];
  const dataKey = activeTab === 'attendance' ? 'count' : 'count';
  const xKey = activeTab === 'attendance' ? 'day' : 'month';
  const barColor = activeTab === 'attendance' ? '#10b981' : activeTab === 'growth' ? '#3b82f6' : '#f59e0b';

  const totalAttendance = weeklyData.reduce((sum, d) => sum + d.count, 0);
  const totalGrowth = growthData.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Reports</h1>
        <p className="text-gray-500">View analytics and performance metrics</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-900">
                {activeTab === 'financial' && 'Revenue Overview'}
                {activeTab === 'attendance' && 'Daily Attendance (Last 7 Days)'}
                {activeTab === 'growth' && 'New Registrations (Last 6 Months)'}
              </h3>
            </div>
            
            <div className="w-full h-80">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
                </div>
              ) : activeTab === 'financial' ? (
                <div className="h-full flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                  Revenue tracking is mocked — no real payment data
                </div>
              ) : chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} allowDecimals={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey={dataKey} fill={barColor} radius={[4, 4, 0, 0]} barSize={32} name={activeTab === 'attendance' ? 'Check-ins' : 'New Members'} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No data available yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side Stats */}
        <div className="space-y-6">
          {/* Key Metric Card 1 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">
                {activeTab === 'financial' ? 'Total Earnings' : activeTab === 'attendance' ? 'Week Visits' : 'Total Members'}
              </span>
              <span className="p-2 bg-green-50 text-green-600 rounded-lg">
                <ArrowUpRight size={20} />
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
              ) : activeTab === 'financial' ? (
                '₦0'
              ) : activeTab === 'attendance' ? (
                totalAttendance
              ) : (
                stats.totalMembers
              )}
            </div>
            <div className="text-sm text-gray-400 flex items-center gap-1">
              <TrendingUp size={16} />
              <span>{activeTab === 'attendance' ? 'Last 7 days' : activeTab === 'growth' ? 'All time' : 'Mocked'}</span>
            </div>
          </div>

          {/* Key Metric Card 2 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">
                {activeTab === 'attendance' ? "Today's Check-ins" : activeTab === 'growth' ? 'Recent Growth' : 'Trainers'}
              </span>
              <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Users size={20} />
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
              ) : activeTab === 'attendance' ? (
                stats.todayCheckIns
              ) : activeTab === 'growth' ? (
                totalGrowth
              ) : (
                stats.totalTrainers
              )}
            </div>
            <div className="text-sm text-gray-400 flex items-center gap-1">
              <TrendingUp size={16} />
              <span>{activeTab === 'attendance' ? 'Today' : activeTab === 'growth' ? 'Last 6 months' : 'Active'}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReportsPage;
