import React, { useState } from 'react';
import { User, Mail, Phone, Shield, Camera, Bell, Moon, ChevronRight, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Samuel Doe',
    email: 'samuel.doe@babcock.edu.ng',
    phone: '+234 812 345 6789',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in-up">
      <h1 className="text-2xl font-display font-bold text-gray-900">My Profile</h1>

      {/* Header Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-3xl border-4 border-white shadow-md">
            SD
          </div>
          <button className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
            <Camera size={16} />
          </button>
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-xl font-bold text-gray-900">{formData.name}</h2>
          <p className="text-gray-500 text-sm">Member since Sept 2023</p>
          <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
            <Shield size={12} className="mr-1.5" />
            Premium Plan
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed outline-none"
                    />
                  </div>
                </div>
              </div>
              {isEditing && (
                <div className="pt-2 flex justify-end">
                  <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all">
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Column - Subscription & Settings */}
        <div className="space-y-6">
          {/* Subscription Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-md text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-1">Current Plan</h3>
              <div className="text-2xl font-bold mb-4">Premium Membership</div>
              <div className="flex items-center justify-between text-sm text-gray-300 mb-6">
                <span>Expires</span>
                <span className="font-semibold text-white">Dec 31, 2024</span>
              </div>
              <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-semibold transition-colors">
                Manage Subscription
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                    <Bell size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Notifications</span>
                </div>
                <div className="w-10 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Moon size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Dark Mode</span>
                </div>
                <div className="w-10 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
              <div className=" pt-2 border-t border-gray-100">
                <button className="w-full flex items-center justify-between p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-semibold">
                   <span>Sign Out</span>
                   <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
