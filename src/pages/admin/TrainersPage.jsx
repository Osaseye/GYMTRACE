import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Star, Users, Briefcase } from 'lucide-react';

const TrainersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock Data for Trainers
  const trainers = []; // Emptied for backend integration

  const filteredTrainers = trainers.filter(trainer =>  
    trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainer.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trainer Management</h1>
          <p className="text-gray-500">Manage trainers and their schedules</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>Add Trainer</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search trainers..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTrainers.map((trainer) => (
          <div key={trainer.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-24 h-24 rounded-full bg-gray-100 mb-4 flex items-center justify-center text-gray-400 text-2xl font-semibold">
              {trainer.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{trainer.name}</h3>
            <span className="text-sm text-gray-500 mb-4">{trainer.specialty}</span>
            
            <div className="w-full grid grid-cols-3 gap-2 py-4 border-t border-b border-gray-100 mb-4">
              <div className="flex flex-col items-center">
                <Users size={16} className="text-blue-500 mb-1" />
                <span className="text-xs text-gray-500">Clients</span>
                <span className="font-semibold text-gray-900">{trainer.activeClients}</span>
              </div>
              <div className="flex flex-col items-center border-l border-r border-gray-100">
                <Star size={16} className="text-yellow-500 mb-1" />
                <span className="text-xs text-gray-500">Rating</span>
                <span className="font-semibold text-gray-900">{trainer.rating}</span>
              </div>
              <div className="flex flex-col items-center">
                <Briefcase size={16} className="text-purple-500 mb-1" />
                <span className="text-xs text-gray-500">Status</span>
                <span className={`text-xs font-medium ${
                  trainer.status === 'Available' ? 'text-green-600' : 
                  trainer.status === 'Busy' ? 'text-orange-600' : 'text-gray-600'
                }`}>{trainer.status}</span>
              </div>
            </div>
            
            <button className="w-full py-2 px-4 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainersPage;
