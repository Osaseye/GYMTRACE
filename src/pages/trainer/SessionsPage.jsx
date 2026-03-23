// src/pages/trainer/SessionsPage.jsx
import React, { useState, useEffect } from 'react';
import { Search, Filter, CheckCircle2, XCircle, Clock, Calendar, MoreVertical, Dumbbell, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { getSessionsByTrainer, completeSession, cancelSession } from '../../services/sessionService';

const SessionsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSessions = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getSessionsByTrainer(user.uid);
      setSessions(data);
    } catch {
      toast.error('Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSessions(); }, [user]);

  const filteredSessions = sessions.filter((s) => {
    const matchesTab = s.status === activeTab;
    const matchesSearch = searchQuery === '' ||
      (s.memberName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.type || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleComplete = async (id) => {
    try {
      await completeSession(id);
      toast.success('Session marked as completed');
      await fetchSessions();
    } catch {
      toast.error('Failed to update session');
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelSession(id);
      toast.success('Session cancelled');
      await fetchSessions();
    } catch {
      toast.error('Failed to cancel session');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

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
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all w-64"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date & Time</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Client</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-16 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-500 mb-2" />
                    <p className="text-gray-500 text-sm">Loading sessions…</p>
                  </td>
                </tr>
              ) : filteredSessions.length > 0 ? (
                filteredSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 text-sm">{formatDate(session.date)}</span>
                        <span className="text-xs text-gray-500 mt-0.5">{session.time} ({session.duration || '1h'})</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xs">
                          {(session.memberName || '?').charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-700 text-sm">{session.memberName || '—'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100/80 text-gray-600 text-xs font-medium">
                        <Dumbbell size={12} />
                        {session.type || 'Training'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={session.status} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      {session.status === 'upcoming' && (
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleComplete(session.id)} className="text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">
                            Mark Complete
                          </button>
                          <button onClick={() => handleCancel(session.id)} className="text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                            Cancel
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500">
                    No {activeTab} sessions found.
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
