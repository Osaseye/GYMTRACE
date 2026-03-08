// src/pages/trainer/SchedulePage.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, MapPin, User, Search } from 'lucide-react';

const SchedulePage = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date("2024-02-26")); // Starting Monday of the sample week
  
  // Weekly Schedule Data Mock
  const timeSlots = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", 
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", 
    "18:00", "19:00", "20:00"
  ];

  const days = [
    { name: 'Mon', date: 24 },
    { name: 'Tue', date: 25 },
    { name: 'Wed', date: 26 },
    { name: 'Thu', date: 27 },
    { name: 'Fri', date: 28 },
    { name: 'Sat', date: 1 },
    { name: 'Sun', date: 2 },
  ];

  const events = [];
  // [
  //   { day: 'Mon', time: '09:00', duration: 1, title: 'HIIT Class', type: 'class', attendees: 12, color: 'bg-orange-100 text-orange-700 border-orange-200' },
  //   { day: 'Mon', time: '14:00', duration: 1, title: 'PT with Sarah', type: 'pt', client: 'Sarah M.', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  //   { day: 'Tue', time: '07:00', duration: 1, title: 'Morning Yoga', type: 'class', attendees: 8, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  //   { day: 'Wed', time: '10:00', duration: 1, title: 'PT with Mike', type: 'pt', client: 'Mike R.', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  //   { day: 'Thu', time: '18:00', duration: 1, title: 'Strength Training', type: 'class', attendees: 15, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  //   { day: 'Fri', time: '08:00', duration: 1, title: 'PT with Jen', type: 'pt', client: 'Jen K.', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  //   { day: 'Sat', time: '09:00', duration: 2, title: 'Weekend Bootcamp', type: 'class', attendees: 20, color: 'bg-red-100 text-red-700 border-red-200' },
  // ];

  const getEventForSlot = (dayName, time) => {
    return events.find(e => e.day === dayName && e.time === time);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 bg-gray-50 min-h-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 tracking-tight">Weekly Schedule</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your classes and personal training sessions.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
          <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-600 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-medium px-2 min-w-[140px] text-center">Feb 24 - Mar 2, 2024</span>
          <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-600 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
        
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md">
          <Plus size={18} />
          <span>Add New Session</span>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Days Header */}
            <div className="grid grid-cols-8 border-b border-gray-100">
              <div className="p-4 border-r border-gray-100 bg-gray-50/50"></div> {/* Time column header */}
              {days.map((day) => (
                <div key={day.name} className="p-4 text-center border-r border-gray-100 last:border-r-0">
                  <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">{day.name}</span>
                  <span className={`block text-lg font-bold mt-1 ${day.name === 'Wed' ? 'text-emerald-600' : 'text-gray-900'}`}>
                    {day.date}
                  </span>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-8 border-b border-gray-50 last:border-none min-h-[80px]">
                  {/* Time Label */}
                  <div className="p-3 border-r border-gray-100 bg-gray-50/30 text-xs font-medium text-gray-500 text-center flex items-start justify-center pt-4">
                    {time}
                  </div>

                  {/* Day Slots */}
                  {days.map((day) => {
                    const event = getEventForSlot(day.name, time);
                    return (
                      <div key={`${day.name}-${time}`} className="border-r border-gray-100 last:border-r-0 p-1 relative group">
                        {event && (
                          <div className={`
                            absolute inset-1 rounded-lg p-2 text-xs border cursor-pointer hover:shadow-md transition-all z-10
                            ${event.color}
                          `}
                          style={{ height: `calc(${event.duration * 100}% + ${(event.duration - 1) * 1}px - 8px)` }} // Adjust height for merged cells
                          >
                            <div className="font-bold truncate">{event.title}</div>
                            <div className="flex items-center gap-1 mt-1 opacity-90 truncate">
                              {event.type === 'class' ? (
                                <>
                                  <User size={10} />
                                  <span>{event.attendees} / 25</span>
                                </>
                              ) : (
                                <>
                                  <User size={10} />
                                  <span>{event.client}</span>
                                </>
                              )}
                            </div>
                            <div className="flex items-center gap-1 mt-0.5 opacity-75">
                                <Clock size={10} />
                                <span>{event.duration}h</span> 
                            </div>
                          </div>
                        )}
                        {!event && (
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
      </div>
    </div>
  );
};

export default SchedulePage;
