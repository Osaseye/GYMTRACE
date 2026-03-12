import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Timer, 
  Search,
  Filter,
  ArrowUpDown,
  History
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAttendanceByMember } from '../../services/attendanceService';

const AttendancePage = () => {
  const { user } = useAuth();
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      try {
        const records = await getAttendanceByMember(user.uid);
        setAttendanceHistory(records);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  const totalVisits = attendanceHistory.length;
  const thisMonth = attendanceHistory.filter((r) => {
    const d = r.checkIn?.toDate?.();
    if (!d) return false;
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const formatTime = (ts) => {
    if (!ts?.toDate) return '—';
    return ts.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };
  const formatDate = (ts) => {
    if (!ts?.toDate) return '—';
    return ts.toDate().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Active':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance History</h1>
          <p className="text-sm text-gray-500 mt-1">Track your gym visits and duration.</p>
        </div>
        
        <div className="flex items-center gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm">
            <Calendar size={16} />
            <span>Select Date</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Visits</p>
              <h3 className="text-2xl font-bold text-gray-900">{totalVisits}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">This Month</p>
              <h3 className="text-2xl font-bold text-gray-900">{thisMonth}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <Timer size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Duration</p>
              <h3 className="text-2xl font-bold text-gray-900">—</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-semibold text-gray-900">Recent Activity</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search history..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
                    Date
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Check-in / Out
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {attendanceHistory.length > 0 ? (
                attendanceHistory.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                          <Calendar size={16} />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{formatDate(record.checkIn)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900 font-medium">{formatTime(record.checkIn)}</span>
                        <span className="text-xs text-gray-500">to {record.checkOut ? formatTime(record.checkOut) : '—'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} className="text-gray-400" />
                        —
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="text-gray-400" />
                        Main Gym
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${record.status === 'Active' ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <History size={32} />
                      </div>
                      <p className="text-lg font-medium text-gray-900">No attendance records found</p>
                      <p className="text-sm text-gray-500 mt-1">Your check-in history will appear here once you visit the gym.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing <span className="font-medium">{attendanceHistory.length}</span> results</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-gray-200 rounded bg-white text-gray-600 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded bg-white text-gray-600 hover:bg-gray-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
