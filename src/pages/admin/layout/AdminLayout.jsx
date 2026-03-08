import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  FileBarChart, 
  Settings, 
  LogOut,
  ScanLine
} from 'lucide-react';
import { toast } from 'sonner';
import logo from '../../../assets/logo.png';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/scanner', icon: ScanLine, label: 'Check-in Scanner' },
    { path: '/admin/members', icon: Users, label: 'Members' },
    { path: '/admin/trainers', icon: Dumbbell, label: 'Trainers' },
    { path: '/admin/reports', icon: FileBarChart, label: 'Reports' },
    { path: '/admin/settings', icon: Settings, label: 'General Settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 h-full text-white">
        {/* Logo Section */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800">
           <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center p-2 border border-emerald-500/20">
            <img src={logo} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-white text-xl leading-none tracking-tight">GYM<span className="text-emerald-500">TRACE</span></h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">ADMIN CONSOLE</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Management</p>
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
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                `}
              >
                <Icon size={20} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all group"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative h-full">
         <main className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
            <Outlet />
         </main>
      </div>
    </div>
  );
};

export default AdminLayout;
