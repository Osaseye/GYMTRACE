import React, { useState, useEffect } from 'react';
import { Search, Calendar, Star, ChevronRight, X, Loader2, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { getAllTrainers } from '../../services/trainerService';
import { createBooking } from '../../services/bookingService';
import { createSession } from '../../services/sessionService';

const specialties = ['All', 'Bodybuilding', 'Cardio', 'Yoga', 'CrossFit', 'Rehabilitation', 'Powerlifting', 'Nutrition'];

const BookingPage = () => {
  const { user, userData } = useAuth();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingModal, setBookingModal] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllTrainers();
        setTrainers(data.filter((t) => t.status === 'active'));
      } catch {
        toast.error('Failed to load trainers');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSpecialty = selectedSpecialty === 'All' || (trainer.specialty || '').toLowerCase().includes(selectedSpecialty.toLowerCase());
    const matchesSearch = (trainer.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (trainer.specialty || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const handleBook = async () => {
    if (!bookingDate || !bookingTime) {
      toast.error('Please select a date and time');
      return;
    }
    setSubmitting(true);
    try {
      const shared = {
        memberId: user.uid,
        memberName: userData?.name || 'Member',
        trainerId: bookingModal.uid,
        trainerName: bookingModal.name,
        date: bookingDate,
        time: bookingTime,
      };
      await Promise.all([
        createBooking({ ...shared, sessionType: 'Personal Training' }),
        createSession({ ...shared, duration: '1h', type: 'Personal Training' }),
      ]);
      toast.success(`Session booked with ${bookingModal.name}!`);
      setBookingModal(null);
      setBookingDate('');
      setBookingTime('');
    } catch {
      toast.error('Failed to book session');
    } finally {
      setSubmitting(false);
    }
  };

  const getInitials = (name) => (name || '?').split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-background-light p-6 lg:p-8 font-sans">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-background-dark mb-2">Book a Trainer</h1>
        <p className="text-gray-600">Find the perfect coach to help you crush your fitness goals.</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <span className="text-gray-500 text-sm whitespace-nowrap">Filter by:</span>
            <div className="flex gap-2">
              {specialties.slice(0, 5).map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedSpecialty === spec
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trainers Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {filteredTrainers.map((trainer) => (
            <div key={trainer.uid} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden relative bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center">
                <span className="text-5xl font-bold text-emerald-600/40">{getInitials(trainer.name)}</span>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-display font-bold text-lg text-background-dark">{trainer.name}</h3>
                    <p className="text-primary text-sm font-medium">{trainer.specialty || 'General Training'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <span>5.0</span>
                </div>

                {trainer.phone && (
                  <p className="text-sm text-gray-500 mb-4">{trainer.phone}</p>
                )}

                <button
                  onClick={() => setBookingModal(trainer)}
                  className="w-full bg-background-dark text-white py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 group"
                >
                  Book Session
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}

          {filteredTrainers.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <p>No trainers found matching your criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedSpecialty('All'); }}
                className="mt-4 text-primary font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* "Not Sure" Section */}
      <div className="bg-gradient-to-r from-background-dark to-blue-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Not sure which trainer is right for you?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Take our quick 2-minute assessment and get matched with the perfect coach based on your goals, schedule, and preferences.
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
            Start Assessment
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setBookingModal(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Book Session</h2>
              <button onClick={() => setBookingModal(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                {getInitials(bookingModal.name)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{bookingModal.name}</p>
                <p className="text-sm text-gray-500">{bookingModal.specialty || 'General Training'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1 flex items-center gap-1">
                  <Calendar size={14} /> Date
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1 flex items-center gap-1">
                  <Clock size={14} /> Time
                </label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                >
                  <option value="">Select time</option>
                  {['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setBookingModal(null)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleBook}
                disabled={submitting}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
