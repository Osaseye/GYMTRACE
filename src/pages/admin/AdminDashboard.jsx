import React from 'react';
import { 
  Users, 
  Dumbbell, 
  DollarSign, 
  Activity, 
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$0',
      change: 'No data',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Active Members',
      value: '0',
      change: 'No data',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Trainers',
      value: '0',
      change: 'No data',
      icon: Dumbbell,
      color: 'bg-orange-500',
    },
    {
      title: 'Total Check-ins',
      value: '0',
      change: 'Today',
      icon: Activity,
      color: 'bg-purple-500',
    },
  ];

  const recentActivity = []; // Emptied for backend integration

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <div className="text-sm text-slate-500">
          Last updated: Today, {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white opacity-90`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`text-green-600 font-medium flex items-center`}>
                <TrendingUp className="w-4 h-4 mr-1" />
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Placeholders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Revenue Overview</h3>
            <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-200">
               <div className="text-center text-slate-400">
                  <Activity className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>Revenue Chart Placeholder</p>
               </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Member Growth</h3>
            <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-200">
               <div className="text-center text-slate-400">
                  <Users className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>Member Growth Chart Placeholder</p>
               </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-fit">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
               <div className="text-center text-slate-400 py-8">
                  No recent activity
               </div>
            ) : (
            recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
                  ${activity.type === 'checkin' ? 'bg-green-100 text-green-600' : 
                    activity.type === 'register' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'payment' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                  {activity.type === 'checkin' ? <Activity className="w-4 h-4" /> :
                   activity.type === 'register' ? <Users className="w-4 h-4" /> :
                   activity.type === 'payment' ? <DollarSign className="w-4 h-4" /> :
                   <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{activity.user}</p>
                  <p className="text-xs text-slate-500">{activity.action}</p>
                </div>
                <div className="ml-auto text-xs text-slate-400">
                  {activity.time}
                </div>
              </div>
            )))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
