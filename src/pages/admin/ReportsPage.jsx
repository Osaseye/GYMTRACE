import React, { useState } from 'react';
import { BarChart, DollarSign, Users, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('financial');

  const tabs = [
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'growth', label: 'User Growth', icon: TrendingUp },
  ];

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
                {activeTab === 'attendance' && 'Daily Attendance'}
                {activeTab === 'growth' && 'New Registrations'}
              </h3>
              <select className="text-sm border-gray-200 rounded-lg p-2 bg-gray-50">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last Year</option>
              </select>
            </div>
            
            {/* Placeholder Chart */}
            <div className="w-full h-80 bg-gray-50 rounded-lg flex items-center justify-center p-4 px-8 gap-4 border-2 border-dashed border-gray-200">
               <span className="text-gray-400">Charts will appear once data is available</span>
            </div>
            {/* 
            <div className="w-full h-80 bg-gray-50 rounded-lg flex items-end justify-between p-4 px-8 gap-4">
              {[65, 40, 75, 55, 80, 60, 90, 45, 70, 85, 50, 95].map((height, i) => (
                <div key={i} className="relative w-full bg-blue-100 rounded-t-sm group hover:bg-blue-200 transition-colors" style={{ height: `${height}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {height * 10}
                  </div>
                </div>
              ))}
            </div> 
            */}
            <div className="flex justify-between mt-4 text-xs text-gray-400 px-2">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </div>
        </div>

        {/* Side Stats */}
        <div className="space-y-6">
          {/* Key Metric Card 1 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">Total {activeTab === 'financial' ? 'Earnings' : activeTab === 'attendance' ? 'Visits' : 'Members'}</span>
              <span className="p-2 bg-green-50 text-green-600 rounded-lg">
                <ArrowUpRight size={20} />
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {activeTab === 'financial' ? '₦0' : activeTab === 'attendance' ? '0' : '0'}
            </div>
            <div className="text-sm text-gray-400 flex items-center gap-1">
              <TrendingUp size={16} />
              <span>No data yet</span>
            </div>
          </div>

          {/* Key Metric Card 2 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <h4 className="font-semibold text-gray-900 mb-4">Top Performing</h4>
             <div className="space-y-4">
                 <div className="text-sm text-gray-500 text-center py-4">No data available</div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReportsPage;
