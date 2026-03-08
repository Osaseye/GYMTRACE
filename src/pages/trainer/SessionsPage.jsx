// src/pages/trainer/SessionsPage.jsx
import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, XCircle, Clock, Calendar, MoreVertical, Dumbbell } from 'lucide-react';

const SessionsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming'); // upcoming, completed, cancelled

  const sessions = []; // Emptied for backend integration

  const filteredSessions = sessions.filter(session => session.status === activeTab);

  const StatusBadge = ({ status }) => {
    switch (status) {
      case 'completed':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700"><CheckCircle2 size={14} /> Completed</span>;
      case 'upcoming':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"><Clock size={14} /> Upcoming</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700"><XCircle size={14} /> Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 bg-gray-50 min-h-full">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 tracking-tight">Session History</h1>
        <p className="text-gray-500 text-sm mt-1">Track attendance and history of your training sessions.</p>
      </div>

      {/* Controls & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex p-1 bg-gray-200/50 rounded-xl w-fit">
          {['upcoming', 'completed', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize
                ${activeTab === tab 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search history..." 
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all w-64"
            />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date & Time</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Client / Class</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 text-sm">{session.date}</span>
                        <span className="text-xs text-gray-500 mt-0.5">{session.time} ({session.duration})</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xs">
                          {session.client.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-700 text-sm">{session.client}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100/80 text-gray-600 text-xs font-medium">
                          {session.type.includes('Class') ? <Dumbbell size={12} /> : <Clock size={12} />}
                          {session.type}
                       </span>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={session.status} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      {session.status === 'upcoming' && (
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">
                            Mark Complete
                          </button>
                          <button className="text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                            Cancel
                          </button>
                        </div>
                      )}
                      {session.status !== 'upcoming' && (
                          <button className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors">
                              <MoreVertical size={18} />
                          </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan="5" className="py-12 text-center text-gray-500">
                      No sessions found.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SessionsPage;
