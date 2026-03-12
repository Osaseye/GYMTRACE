import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { loginUser } from '../../services/authService';
import { getUserDoc } from '../../services/userService';
import logo from '/logo.png';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const AdminLoginPage = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {  
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const cred = await loginUser(data.email, data.password);
      const profile = await getUserDoc(cred.user.uid);

      if (profile?.role !== 'admin') {
        toast.error('Access denied. Admin accounts only.');
        return;
      }

      toast.success('Welcome back, Administrator');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="z-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 shadow-2xl">
                <img src={logo} alt="GymTrace Logo" className="w-auto h-16 object-contain brightness-0 invert" />
            </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl w-full p-8 rounded-3xl border border-slate-700 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
                <p className="text-slate-400 text-xs">Secure Access Only</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* EMAIL INPUT */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="email" 
                  placeholder="admin@gymtrace.com"
                  className={`w-full bg-slate-900/50 border rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none ${
                    errors.email ? 'border-red-500/50' : 'border-slate-700'
                  }`}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className={`w-full bg-slate-900/50 border rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none ${
                    errors.password ? 'border-red-500/50' : 'border-slate-700'
                  }`}
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 font-medium">{errors.password.message}</p>
              )}
            </div>
            
            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-emerald-900/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isSubmitting ? (
                <span>Verifying Access...</span>
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

          </form>
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-slate-500 text-xs">
                Restricted Area. Unauthorized access is prohibited and monitored.
            </p>
        </div>

      </div>
    </div>
  );
};

export default AdminLoginPage;
