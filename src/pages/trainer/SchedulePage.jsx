// src/pages/trainer/SchedulePage.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, User, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getWeekTrainerBookings } from '../../services/bookingService';

const SchedulePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  // Compute the Monday of the current week
  const getMonday = (d) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = day === 0 ? 6 : day - 1;
    date.setDate(date.getDate() - diff);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));

  const timeSlots = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00"
  ];

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const days = dayNames.map((name, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return { name, date: d.getDate(), full: d.toISOString().slice(0, 10) };
  });

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const weekLabel = `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      setLoading(true);
      try {
        const startStr = weekStart.toISOString().slice(0, 10);
        const endStr = weekEnd.toISOString().slice(0, 10);
        const data = await getWeekTrainerBookings(user.uid, startStr, endStr);
        setEvents(data);
      } catch (error) { console.error(error);
        // silent
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user, weekStart]);

  const prevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
  };

  const nextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
  };

  const colorMap = {
    upcoming: 'bg-blue-100 text-blue-700 border-blue-200',
    completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200',
  };

  const getEventForSlot = (dayFull, time) => {
    return events.find((e) => e.date === dayFull && e.time === time);
  };

  const todayStr = new Date().toISOString().slice(0, 10);

  return (
    <div className="p-6 md:p-8 space-y-8 bg-gray-50 min-h-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 tracking-tight">Weekly Schedule</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your classes and personal training sessions.</p>
        </div>

        <div className="flex items-center gap-3 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
          <button onClick={prevWeek} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-600 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-medium px-2 min-w-[180px] text-center">{weekLabel}</span>
          <button onClick={nextWeek} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-600 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Days Header */}
              <div className="grid grid-cols-8 border-b border-gray-100">
                <div className="p-4 border-r border-gray-100 bg-gray-50/50"></div>
                {days.map((day) => (
                  <div key={day.name} className="p-4 text-center border-r border-gray-100 last:border-r-0">
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">{day.name}</span>
                    <span className={`block text-lg font-bold mt-1 ${day.full === todayStr ? 'text-emerald-600' : 'text-gray-900'}`}>
                      {day.date}
                    </span>
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              <div className="max-h-[600px] overflow-y-auto">
                {timeSlots.map((time) => (
                  <div key={time} className="grid grid-cols-8 border-b border-gray-50 last:border-none min-h-[80px]">
                    <div className="p-3 border-r border-gray-100 bg-gray-50/30 text-xs font-medium text-gray-500 text-center flex items-start justify-center pt-4">
                      {time}
                    </div>
                    {days.map((day) => {
                      const event = getEventForSlot(day.full, time);
                      return (
                        <div key={`${day.full}-${time}`} className="border-r border-gray-100 last:border-r-0 p-1 relative group">
                          {event ? (
                            <div className={`absolute inset-1 rounded-lg p-2 text-xs border cursor-pointer hover:shadow-md transition-all z-10 ${colorMap[event.status] || colorMap.upcoming}`}>
                              <div className="font-bold truncate">{event.sessionType || 'Training'}</div>
                              <div className="flex items-center gap-1 mt-1 opacity-90 truncate">
                                <User size={10} />
                                <span>{event.memberName}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-0.5 opacity-75">
                                <Clock size={10} />
                                <span>{event.duration || '1h'}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full hover:bg-gray-50 transition-colors cursor-pointer rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <Plus size={16} className="text-gray-300" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
