import { Mail, Lock, LogIn, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png'

const LoginPage = () => {

  return (

    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative">



      {/* 1. Header Section */}

      <div className=" mb-4">

        <img src={logo} alt="" className='w-auto h-36' />

      </div>



      {/* 2. Login Card */}

      <div className="bg-white w-full max-w-md p-8 rounded-3xl border border-slate-100">

        <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>

        <p className="text-slate-500 text-sm mt-2 mb-8 font-medium">

          Access your Babcock University gym account

        </p>



        <form className="space-y-6">

          {/* Email Input */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>

            <div className="relative">

              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

              <input

                type="email"

                placeholder="name@babcock.edu.ng"

                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"

              />

            </div>

          </div>



          {/* Password Input */}

          <div>

            <div className="flex justify-between mb-2">

              <label className="text-sm font-semibold text-slate-700">Password</label>
              <Link to="/forgot-password" className="text-sm text-emerald-600 font-bold hover:underline">Forgot password?</Link>


            </div>

            <div className="relative">

              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

              <input

                type="password"

                placeholder="••••••••"

                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"

              />

            </div>

          </div>



          {/* Remember Me checkbox */}

          <div className="flex items-center space-x-3">

            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500" />

            <span className="text-sm text-slate-600 font-medium">Remember me for 30 days</span>

          </div>



          {/* Submit Button */}

          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-emerald-200 transition-all active:scale-95">

            <LogIn className="w-5 h-5" />

            <span>Login to Dashboard</span>

          </button>

        </form>



        <div className="mt-8 text-center">

          <p className="text-slate-600 text-sm font-medium">

            Don't have an account? <Link to="/register" className="text-emerald-600 font-bold hover:underline">Register as Student/Staff</Link>

          </p>

        </div>

      </div>



      {/* 3. Footer */}

      <div className="mt-12 text-center text-xs text-slate-400 font-medium">

        <p> Secure Access Portal • Babcock University Gym Management</p>

        <p className="mt-2 uppercase tracking-widest">© 2026 GYMTRACE PLATFORM</p>

      </div>

    </div>

  );

};



export default LoginPage;