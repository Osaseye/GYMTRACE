import React, { useState } from 'react';
import { Search, Filter, Calendar, Star, MapPin, ChevronRight, X } from 'lucide-react';

const specialties = [
  'All',
  'Bodybuilding',
  'Cardio',
  'Yoga',
  'CrossFit',
  'Rehabilitation',
  'Powerlifting',
  'Nutrition'
];

const trainers = [
  // Empty data for backend integration
];

const BookingPage = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSpecialty = selectedSpecialty === 'All' || trainer.specialties.includes(selectedSpecialty);
    const matchesSearch = trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          trainer.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
        {filteredTrainers.map((trainer) => (
          <div key={trainer.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
            <div className="h-48 overflow-hidden relative">
               <img 
                 src={trainer.image} 
                 alt={trainer.name} 
                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
               />
               <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-background-dark flex items-center gap-1 shadow-sm">
                 <Star className="text-yellow-400 fill-yellow-400" size={12} />
                 {trainer.rating} ({trainer.reviews})
               </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-display font-bold text-lg text-background-dark">{trainer.name}</h3>
                  <p className="text-primary text-sm font-medium">{trainer.role}</p>
                </div>
                <span className="text-gray-900 font-bold bg-gray-100 px-2 py-1 rounded text-sm">{trainer.price}</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{trainer.bio}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {trainer.specialties.map((spec, index) => (
                  <span key={index} className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-100">
                    {spec}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Calendar size={16} className="text-primary" />
                <span>Available: {trainer.availability}</span>
              </div>

              <button className="w-full bg-background-dark text-white py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 group">
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
               onClick={() => {setSearchQuery(''); setSelectedSpecialty('All');}}
               className="mt-4 text-primary font-medium hover:underline"
             >
               Clear filters
             </button>
           </div>
        )}
      </div>

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
    </div>
  );
};

export default BookingPage;
