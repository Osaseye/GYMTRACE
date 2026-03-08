import React, { useState } from 'react';
import { 
  Play, 
  Clock, 
  Flame, 
  Dumbbell, 
  CalendarDays, 
  ChevronRight,
  Trophy,
  Target
} from 'lucide-react';

const WorkoutsPage = () => {
  const [activeTab, setActiveTab] = useState('today');

  // Mock Data
  const todaysWorkout = null;
  // {
  //   title: "Upper Body Power",
  //   duration: "45 mins",
  //   calories: "320 kcal",
  //   difficulty: "Intermediate",
  //   exercises: [
  //     { name: "Bench Press", sets: "3", reps: "10-12", weight: "135 lbs" },
  //     { name: "Bent Over Rows", sets: "3", reps: "12", weight: "95 lbs" },
  //     { name: "Overhead Press", sets: "3", reps: "10", weight: "65 lbs" },
  //     { name: "Lateral Raises", sets: "3", reps: "15", weight: "15 lbs" },
  //     { name: "Tricep Pushdowns", sets: "3", reps: "12", weight: "40 lbs" },
  //   ]
  // };

  const weeklySchedule = [];
  // [
  //   { day: "Mon", title: "Upper Body Power", type: "Strength", status: "Today" },
  //   { day: "Tue", title: "HIIT Cardio", type: "Cardio", status: "Upcoming" },
  //   { day: "Wed", title: "Lower Body Focus", type: "Strength", status: "Upcoming" },
  //   { day: "Thu", title: "Active Recovery / Yoga", type: "Flexibility", status: "Upcoming" },
  //   { day: "Fri", title: "Full Body Circuit", type: "Endurance", status: "Upcoming" },
  //   { day: "Sat", title: "Core & Abs", type: "Strength", status: "Upcoming" },
  //   { day: "Sun", title: "Rest Day", type: "Rest", status: "Upcoming" },
  // ];

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Workouts</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your training schedule and track progress.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm">
          <Dumbbell size={16} />
          <span>Log Custom Workout</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('today')}
            className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'today'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Target size={18} />
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'schedule'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <CalendarDays size={18} />
            Weekly Schedule
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area (Left 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {activeTab === 'today' && (
            <>
              {todaysWorkout ? (
                <>
                {/* Featured Workout Card */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-emerald-300 mb-2 border border-white/10">
                          Daily Recommendation
                        </span>
                        <h2 className="text-3xl font-bold">{todaysWorkout.title}</h2>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/10 hidden sm:block">
                        <Dumbbell className="text-emerald-400" size={32} />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-emerald-400" />
                        {todaysWorkout.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <Flame size={18} className="text-orange-400" />
                        {todaysWorkout.calories}
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy size={18} className="text-yellow-400" />
                        {todaysWorkout.difficulty}
                      </div>
                    </div>

                    <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-emerald-500/20">
                      <Play size={20} fill="currentColor" />
                      Start Workout
                    </button>
                  </div>
                </div>

                {/* Exercise List */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Exercises</h3>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{todaysWorkout.exercises.length} Movements</span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {todaysWorkout.exercises.map((exercise, index) => (
                      <div key={index} className="p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                            <p className="text-sm text-gray-500">{exercise.sets} sets × {exercise.reps} reps</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">{exercise.weight}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Dumbbell size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">No Workout Assigned Today</h3>
                  <p className="text-gray-500 mt-2 max-w-sm">
                    Enjoy your rest day or select a custom workout from the library.
                  </p>
                  <button className="mt-6 px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                    Browse Workouts
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === 'schedule' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
               <div className="p-5 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">This Week's Plan</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {weeklySchedule.length > 0 ? (
                    weeklySchedule.map((day, index) => (
                    <div key={index} className={`p-5 flex items-center justify-between hover:bg-gray-50 transition-colors ${day.status === 'Today' ? 'bg-emerald-50/50' : ''}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center ${
                          day.status === 'Today' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          <span className="text-xs font-bold uppercase">{day.day}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{day.title}</h4>
                          <p className="text-sm text-gray-500">{day.type}</p>
                        </div>
                      </div>
                      
                       {day.status === 'Today' ? (
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                           Today
                         </span>
                       ) : (
                          <ChevronRight size={18} className="text-gray-400" />
                       )}
                    </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      No scheduled workouts for this week.
                    </div>
                  )}
                </div>
            </div>
          )}
        </div>

        {/* Sidebar (Right 1/3) */}
        <div className="space-y-6">
          {/* Weekly Goal */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Weekly Goal</h3>
              <span className="text-sm text-emerald-600 font-medium">3/5 Workouts</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
               <span className="text-sm text-gray-500">Streak</span>
               <div className="flex items-center gap-1 text-orange-500 font-bold">
                  <Flame size={16} fill="currentColor" />
                  <span>12 Days</span>
               </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <h3 className="font-semibold text-gray-900 mb-4">Stats Overview</h3>
             <div className="grid grid-cols-2 gap-4">
               <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs text-blue-600 font-medium uppercase">Volume</p>
                  <p className="text-xl font-bold text-blue-900">12k lbs</p>
               </div>
               <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <p className="text-xs text-purple-600 font-medium uppercase">Time</p>
                  <p className="text-xl font-bold text-purple-900">4.5 hrs</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutsPage;
