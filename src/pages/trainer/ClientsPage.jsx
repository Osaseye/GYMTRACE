// src/pages/trainer/ClientsPage.jsx
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, MessageSquare, User, TrendingUp, Calendar } from 'lucide-react';

const ClientsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const clients = []; // Emptied for backend integration
    // [
    //     {
    //         id: 1,
    //         name: "Sarah Miller",
    //         avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    //         goal: "Weight Loss",
    //         nextSession: "Feb 26, 2:00 PM",
    //         lastSession: "Feb 23",
    //         attendance: 92,
    //         plan: "Premium Member",
    //         status: "Active"
    //     },
    // ]

    const filteredClients = clients.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        client.goal.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="p-6 md:p-8 space-y-8 bg-gray-50 min-h-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 tracking-tight">My Clients</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track your assigned clients.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search clients..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all w-full sm:w-64"
                />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                <Filter size={18} />
                <span>Filter</span>
            </button>
        </div>
      </div>

      {/* Grid of Clients */}
      {filteredClients.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
            <div key={client.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                        <img src={client.avatar} alt={client.name} className="w-12 h-12 rounded-full object-cover border-2 border-emerald-100" />
                        <div>
                            <h3 className="font-bold text-gray-900">{client.name}</h3>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">{client.plan}</span>
                        </div>
                    </div>
                     <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50">
                        <MoreHorizontal size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                             <TrendingUp size={16} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Goal</p>
                            <p className="text-sm font-semibold text-gray-900">{client.goal}</p>
                        </div>
                    </div>
                </div>

                 <div className="mt-6 space-y-3">
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-2">
                            <Calendar size={14} />
                            Next Session
                        </span>
                        <span className="font-medium text-gray-900">{client.nextSession}</span>
                     </div>
                     
                     <div className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Attendance</span>
                            <span className={`font-bold ${
                                client.attendance >= 90 ? 'text-emerald-600' : 
                                client.attendance >= 75 ? 'text-orange-600' : 'text-red-600'
                            }`}>{client.attendance}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${
                                    client.attendance >= 90 ? 'bg-emerald-500' : 
                                    client.attendance >= 75 ? 'bg-orange-500' : 'bg-red-500'
                                }`} 
                                style={{ width: `${client.attendance}%` }}
                            ></div>
                        </div>
                     </div>
                 </div>

                 <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-100">
                    <button className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gray-50 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors">
                        <User size={16} />
                        View Profile
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm hover:shadow">
                        <MessageSquare size={16} />
                        Message
                    </button>
                 </div>
            </div>
        ))}
      </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
           <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
               <User size={32} />
           </div>
           <h3 className="text-lg font-bold text-gray-900">No Clients Assigned</h3>
           <p className="text-gray-500 mt-2">You don't have any clients assigned yet.</p>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;
