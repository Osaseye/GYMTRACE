import React from 'react';
import { Users, Calendar, Star, Clock, ArrowRight } from 'lucide-react';

const TrainerDashboard = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in-up">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
                        Welcome back, <span className="text-emerald-600">John</span>
                    </h1>
                    <p className="text-gray-500 mt-1">Here's what's happening today.</p>
                </div>
                <div className="text-sm text-gray-500 font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', index: 'long', day: 'numeric', year: 'numeric' })}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Active Clients</p>
                        <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                     <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Sessions Today</p>
                        <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                     <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                        <Star size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Rating</p>
                        <p className="text-2xl font-bold text-gray-900">5.0</p>
                    </div>
                </div>
            </div>

            {/* Upcoming Sessions Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Upcoming Sessions</h2>
                    <button className="text-emerald-600 text-sm font-semibold hover:text-emerald-700 flex items-center gap-1">
                        View Schedule <ArrowRight size={16} />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Session Type</th>
                                <th className="px-6 py-4">Time</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {/* Empty state for now */}
                             <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                   No upcoming sessions.
                                </td>
                             </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TrainerDashboard;
