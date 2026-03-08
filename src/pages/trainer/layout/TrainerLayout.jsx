import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  ClipboardList, 
  LogOut,
  Settings
} from 'lucide-react';
import logo from '../../../assets/logo.png';

const TrainerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/trainer/dashboard', icon: LayoutDashboard },
    { name: 'Schedule', path: '/trainer/schedule', icon: Calendar },
    { name: 'Clients', path: '/trainer/clients', icon: Users },
    { name: 'Sessions', path: '/trainer/sessions', icon: ClipboardList },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-full">
        {/* Logo Section */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-gray-100">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center p-2">
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-gray-900 text-xl leading-none tracking-tight">GYM<span className="text-emerald-500">TRACE</span></h1>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-1">TRAINER PORTAL</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Menu</p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <Icon size={20} className={isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.name}</span>
                {isActive && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section - Trainer Profile */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-all group">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm border-2 border-white shadow-sm">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                Senior Trainer
              </p>
            </div>
            <LogOut size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative h-full">
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-30 flex-shrink-0">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center p-1.5">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-bold text-gray-900 text-lg">GYMTRACE</span>
          </div>
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center border border-emerald-200">
             <span className="text-xs font-bold text-emerald-700">JD</span>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 relative pb-20 md:pb-0">
            <div className="min-h-full">
                <Outlet />
            </div>
        </main>
        
        {/* Mobile Bottom Navigation - Fixed */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)] z-50 h-16 flex items-center">
          <div className="flex w-full justify-around items-center px-2">
          {navItems.map((item) => {
               const isActive = location.pathname === item.path;
               const Icon = item.icon;
               return (
                  <NavLink
                      key={item.path}
                      to={item.path}
                      className={`
                          flex flex-col items-center justify-center gap-1 w-14 h-full relative py-1
                          ${isActive ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'}
                      `}
                  >
                      <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                      <span className={`text-[10px] font-medium leading-none ${isActive ? 'font-semibold' : ''}`}>
                        {item.name.includes(' ') ? item.name.split(' ')[0] : item.name}
                      </span>
                  </NavLink>
               )
          })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default TrainerLayout;
