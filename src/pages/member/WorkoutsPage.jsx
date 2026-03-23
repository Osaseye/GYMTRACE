import React, { useState, useEffect } from 'react';
import {
  Play,
  Clock,
  Flame,
  Dumbbell,
  CalendarDays,
  ChevronRight,
  Trophy,
  Target,
  Plus,
  Trash2,
  Loader2,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { logWorkout, getWorkoutsByMember, getWorkoutsForWeek, deleteWorkout } from '../../services/workoutService';

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function startOfWeek(d) {
  const copy = new Date(d);
  const day = copy.getDay();
  const diff = day === 0 ? 6 : day - 1;
  copy.setDate(copy.getDate() - diff);
  return copy;
}
function fmtDate(d) {
  return d.toISOString().slice(0, 10);
}

const WorkoutsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('today');
  const [workouts, setWorkouts] = useState([]);
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // form state for logging a workout
  const [form, setForm] = useState({
    title: '',
    duration: '',
    calories: '',
    difficulty: 'Intermediate',
    exercises: [{ name: '', sets: '', reps: '', weight: '' }],
  });

  const fetchData = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const all = await getWorkoutsByMember(user.uid);
      setWorkouts(all);

      const now = new Date();
      const ws = startOfWeek(now);
      const we = new Date(ws);
      we.setDate(we.getDate() + 6);
      const weekW = await getWorkoutsForWeek(user.uid, fmtDate(ws), fmtDate(we));

      // Build weekly view
      const schedule = dayLabels.map((label, i) => {
        const d = new Date(ws);
        d.setDate(d.getDate() + i);
        const dateStr = fmtDate(d);
        const match = weekW.find((w) => w.date === dateStr);
        const isToday = dateStr === fmtDate(now);
        return {
          day: label,
          date: dateStr,
          title: match ? match.title : 'Rest Day',
          type: match ? (match.difficulty || 'Strength') : 'Rest',
          status: isToday ? 'Today' : 'Upcoming',
        };
      });
      setWeeklySchedule(schedule);
    } catch (error) { console.error(error);
      toast.error('Failed to load workouts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  // today's workout
  const todayStr = fmtDate(new Date());
  const todaysWorkout = workouts.find((w) => w.date === todayStr) || null;

  const thisWeekCount = weeklySchedule.filter((d) => d.title !== 'Rest Day').length;

  // --- Form handlers ---
  const addExercise = () =>
    setForm((f) => ({ ...f, exercises: [...f.exercises, { name: '', sets: '', reps: '', weight: '' }] }));
  const removeExercise = (i) =>
    setForm((f) => ({ ...f, exercises: f.exercises.filter((_, idx) => idx !== i) }));
  const updateExercise = (i, field, value) =>
    setForm((f) => ({
      ...f,
      exercises: f.exercises.map((ex, idx) => (idx === i ? { ...ex, [field]: value } : ex)),
    }));

  const handleLogWorkout = async () => {
    if (!form.title.trim()) {
      toast.error('Workout title is required');
      return;
    }
    try {
      await logWorkout({
        memberId: user.uid,
        title: form.title,
        duration: form.duration || '45 mins',
        calories: form.calories || '0 kcal',
        difficulty: form.difficulty,
        date: todayStr,
        exercises: form.exercises.filter((e) => e.name.trim()),
      });
      toast.success('Workout logged!');
      setShowModal(false);
      setForm({ title: '', duration: '', calories: '', difficulty: 'Intermediate', exercises: [{ name: '', sets: '', reps: '', weight: '' }] });
      await fetchData();
    } catch (error) { console.error(error);
      toast.error('Failed to log workout');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWorkout(id);
      toast.success('Workout removed');
      await fetchData();
    } catch (error) { console.error(error);
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Workouts</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your training schedule and track progress.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
        >
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
          <button
            onClick={() => setActiveTab('history')}
            className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'history'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Clock size={18} />
            History
          </button>
        </nav>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
          <p className="text-gray-500 text-sm">Loading workouts…</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
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
                              Today's Workout
                            </span>
                            <h2 className="text-3xl font-bold">{todaysWorkout.title}</h2>
                          </div>
                          <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/10 hidden sm:block">
                            <Dumbbell className="text-emerald-400" size={32} />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm text-gray-300">
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
                      </div>
                    </div>

                    {/* Exercise List */}
                    {todaysWorkout.exercises?.length > 0 && (
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
                              {exercise.weight && (
                                <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">{exercise.weight}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <Dumbbell size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No Workout Logged Today</h3>
                    <p className="text-gray-500 mt-2 max-w-sm">
                      Log a workout to track your progress and build your streak.
                    </p>
                    <button onClick={() => setShowModal(true)} className="mt-6 px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                      Log Workout
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
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Today</span>
                        ) : (
                          <ChevronRight size={18} className="text-gray-400" />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">No scheduled workouts for this week.</div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Workout History</h3>
                </div>
                {workouts.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {workouts.map((w) => (
                      <div key={w.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <Dumbbell size={18} />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{w.title}</h4>
                            <p className="text-sm text-gray-500">
                              {w.date} · {w.duration} · {w.exercises?.length || 0} exercises
                            </p>
                          </div>
                        </div>
                        <button onClick={() => handleDelete(w.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-lg hover:bg-red-50">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">No workouts logged yet.</div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Goal */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Weekly Goal</h3>
                <span className="text-sm text-emerald-600 font-medium">{thisWeekCount}/5 Workouts</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${Math.min((thisWeekCount / 5) * 100, 100)}%` }}></div>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Logged</span>
                <span className="font-bold text-gray-900">{workouts.length}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Stats Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs text-blue-600 font-medium uppercase">This Week</p>
                  <p className="text-xl font-bold text-blue-900">{thisWeekCount}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <p className="text-xs text-purple-600 font-medium uppercase">All Time</p>
                  <p className="text-xl font-bold text-purple-900">{workouts.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Workout Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Log Workout</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Upper Body Power"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Duration</label>
                  <input
                    value={form.duration}
                    onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                    placeholder="45 mins"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Calories</label>
                  <input
                    value={form.calories}
                    onChange={(e) => setForm((f) => ({ ...f, calories: e.target.value }))}
                    placeholder="320 kcal"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Difficulty</label>
                  <select
                    value={form.difficulty}
                    onChange={(e) => setForm((f) => ({ ...f, difficulty: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>

              {/* Exercises */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Exercises</label>
                  <button onClick={addExercise} className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                    <Plus size={14} /> Add
                  </button>
                </div>
                <div className="space-y-3">
                  {form.exercises.map((ex, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        value={ex.name}
                        onChange={(e) => updateExercise(i, 'name', e.target.value)}
                        placeholder="Exercise name"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                      <input
                        value={ex.sets}
                        onChange={(e) => updateExercise(i, 'sets', e.target.value)}
                        placeholder="Sets"
                        className="w-16 px-3 py-2 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                      <input
                        value={ex.reps}
                        onChange={(e) => updateExercise(i, 'reps', e.target.value)}
                        placeholder="Reps"
                        className="w-16 px-3 py-2 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                      <input
                        value={ex.weight}
                        onChange={(e) => updateExercise(i, 'weight', e.target.value)}
                        placeholder="Weight"
                        className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                      {form.exercises.length > 1 && (
                        <button onClick={() => removeExercise(i)} className="text-gray-400 hover:text-red-500 p-1">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={handleLogWorkout} className="px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
                Save Workout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutsPage;
