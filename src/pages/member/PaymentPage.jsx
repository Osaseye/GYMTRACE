import React from 'react';
import { CreditCard, DollarSign, Calendar, Clock, Download, ChevronRight, CheckCircle } from 'lucide-react';

const PaymentPage = () => {
  const paymentHistory = [
    // Initialize with empty array for production/backend integration
    // {
    //   id: '#INV-2024-001',
    //   date: 'Feb 24, 2026',
    //   description: 'Monthly Membership (Pro)',
    //   amount: '₦25,000',
    //   status: 'Paid',
    //   method: 'Paystack'
    // },
  ];

  return (
    <div className="p-6 lg:p-10 min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-background-dark">Payments & Billing</h1>
            <p className="text-gray-500 mt-1">Manage your subscription, payment methods, and billing history.</p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-600 transition-colors shadow-sm">
            <CreditCard size={18} />
            <span>Add Payment Method</span>
          </button>
        </div>

        {/* Current Plan Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Active Plan Card */}
          <div className="bg-background-dark text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10 flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Current Plan</p>
                <h2 className="text-2xl font-display font-bold">Pro Member</h2>
              </div>
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">ACTIVE</span>
            </div>

            <div className="text-3xl font-bold mb-1">₦25,000<span className="text-lg font-normal text-gray-400">/mo</span></div>
            <p className="text-gray-400 text-sm mb-6">Next billing date: March 24, 2026</p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle size={16} className="text-primary" />
                <span>Unlimited Gym Access</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle size={16} className="text-primary" />
                <span>2 Free PT Sessions/mo</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle size={16} className="text-primary" />
                <span>Access to Sauna & Pool</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-white text-background-dark py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Manage Plan
              </button>
              <button className="flex-1 border border-white/20 text-white py-2.5 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Cancel
              </button>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                   <h3 className="text-lg font-display font-bold text-background-dark">Payment Method</h3>
                   <p className="text-gray-500 text-sm">Default for recurring billing</p>
                </div>
                <button className="text-primary text-sm font-medium hover:underline">Edit</button>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 mb-4">
                 <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-500">PAY</div>
                 <div>
                    <p className="font-bold text-gray-900 text-sm">Paystack</p>
                    <p className="text-gray-500 text-xs">Default</p>
                 </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
               <h4 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2">
                 <DollarSign size={16} />
                 Billing Address
               </h4>
               <p className="text-blue-800 text-sm leading-relaxed">
                 123 Freedom Way, Lekki Phase 1<br/>
                 Lagos, Nigeria
               </p>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <h3 className="text-lg font-display font-bold text-background-dark">Billing History</h3>
             <div className="flex gap-2">
               <button className="text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors border border-gray-200">
                 Download All
               </button>
               <button className="text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors border border-gray-200">
                 Filter
               </button>
             </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-4 font-medium">Invoice</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paymentHistory.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No payment history available
                    </td>
                  </tr>
                ) : (
                  paymentHistory.map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-primary">
                      {payment.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        {payment.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-background-dark font-medium">
                      {payment.description}
                      <div className="text-xs text-gray-400 font-normal mt-0.5">{payment.method}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {payment.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`
                        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border
                        ${payment.status === 'Paid' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : 'bg-red-50 text-red-700 border-red-100'
                        }
                      `}>
                        {payment.status === 'Paid' ? <CheckCircle size={12} /> : <Clock size={12} />}
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-primary transition-colors p-2 hover:bg-gray-100 rounded-lg">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-100 bg-gray-50/30 text-center">
            <button className="text-sm font-medium text-primary hover:text-emerald-700 transition-colors inline-flex items-center gap-1">
              View all transactions <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
