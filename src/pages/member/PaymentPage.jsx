import React, { useState } from 'react';
import { CreditCard, DollarSign, Calendar, Clock, Download, ChevronRight, CheckCircle, Zap, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { updateUserDoc } from '../../services/userService';

const PaymentPage = () => {
  const { user, userData, refreshUserData } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentType, setPaymentType] = useState('monthly'); // 'monthly' | 'one-time'
  
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showManagePlanModal, setShowManagePlanModal] = useState(false);

  // We consider them active on a plan if isPremium is true OR if they have a true oneTimePass boolean.
  const isPremium = userData?.isPremium === true;
  const isOneTimePass = userData?.oneTimePass === true;
  const hasAccess = isPremium || isOneTimePass;

  const handleUpgrade = async (type) => {
    if (!user) return;
    setIsProcessing(true);
    try {
      // Mock payment delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const updateData = type === 'one-time' 
        ? { oneTimePass: true } // just one-time pass
        : { isPremium: true, oneTimePass: false }; // monthly recurring

      await updateUserDoc(user.uid, updateData);
      await refreshUserData();
      alert(type === 'one-time' ? 'One-time Pass activated!' : `Successfully upgraded to Premium!`);
      setShowManagePlanModal(false);
    } catch (error) {
      console.error(error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDowngrade = async () => {
    if (!user) return;
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await updateUserDoc(user.uid, { isPremium: false, oneTimePass: false });
      await refreshUserData();
      alert('Successfully downgraded to Basic plan.');
      setShowManagePlanModal(false);
    } catch (error) {
      console.error(error);
      alert('Downgrade failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddPaymentMethod = (e) => {
    e.preventDefault();
    alert('Payment method added successfully!');
    setShowAddPaymentModal(false);
  };

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
          <button 
            onClick={() => setShowAddPaymentModal(true)}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-600 transition-colors shadow-sm"
          >
            <CreditCard size={18} />
            <span>Add Payment Method</span>
          </button>
        </div>

        {/* Current Plan Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Active Plan Card */}
          <div className="bg-background-dark text-white rounded-2xl p-6 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div>
              <div className="relative z-10 flex justify-between items-start mb-6">
                <div>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Current Plan</p>
                  <h2 className="text-2xl font-display font-bold">
                    {isPremium ? "Pro Member" : isOneTimePass ? "One-Time Pass" : "Basic Member"}
                  </h2>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${hasAccess ? "bg-primary/20 text-primary border-primary/20" : "bg-gray-700/50 text-gray-300 border-gray-600"}`}>
                  {hasAccess ? "ACTIVE" : "FREE"}
                </span>
              </div>

              <div className="text-3xl font-bold mb-1">
                {isPremium ? "₦25,000" : isOneTimePass ? "₦500" : "₦0"}
                <span className="text-lg font-normal text-gray-400">
                  {isPremium ? "/mo" : isOneTimePass ? "/pass" : "/mo"}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                {isPremium ? "Next billing date: March 24, 2026" : isOneTimePass ? "Valid for 1 scan" : "Upgrade to Pro for full access"}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {!hasAccess ? (
                <>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Clock size={16} />
                    <span>Limited Gym Access</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400 line-through opacity-50">
                    <CheckCircle size={16} />
                    <span>No QR Code Access</span>
                  </div>
                </>
              ) : isOneTimePass ? (
                <>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle size={16} className="text-primary" />
                    <span>One-time Gym Access</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Zap size={16} className="text-amber-400" />
                    <span>1 Valid QR Code Scan</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle size={16} className="text-primary" />
                    <span>Unlimited Gym Access</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Zap size={16} className="text-amber-400" />
                    <span>Premium QR Code Generation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle size={16} className="text-primary" />
                    <span>2 Free PT Sessions/mo</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3 mt-auto">
              {!hasAccess ? (
                <button 
                  onClick={() => setShowManagePlanModal(true)}
                  disabled={isProcessing}
                  className="flex-1 bg-amber-500 text-white py-2.5 rounded-lg font-bold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  Manage / Upgrade Plan
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => setShowManagePlanModal(true)}
                    className="flex-1 bg-white text-background-dark py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Manage Plan
                  </button>
                  {isPremium && (
                    <button className="flex-1 border border-white/20 text-white py-2.5 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                      Cancel
                    </button>
                  )}
                </>
              )}
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

      {/* Add Payment Method Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Add Payment Method</h3>
              <button onClick={() => setShowAddPaymentModal(false)} className="text-gray-400 hover:text-gray-900">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleAddPaymentMethod}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input type="text" placeholder="123" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors mt-6">
                    Save Card
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Manage Plan Modal */}
      {showManagePlanModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-900">Manage Your Plan</h3>
              <button onClick={() => setShowManagePlanModal(false)} className="text-gray-400 hover:text-gray-900">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              {/* Payment Type Toggle */}
              <div className="flex bg-gray-100 p-1 rounded-lg mb-6 max-w-xs mx-auto">
                <button 
                  onClick={() => setPaymentType('monthly')}
                  className={`flex-1 py-1.5 text-sm font-bold rounded-md transition-colors ${paymentType === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setPaymentType('one-time')}
                  className={`flex-1 py-1.5 text-sm font-bold rounded-md transition-colors ${paymentType === 'one-time' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  One-time
                </button>
              </div>

              <div className="space-y-4">
                {/* Basic Plan */}
                <div className={`p-4 border rounded-xl relative ${!isPremium && !isOneTimePass ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}>
                  {!isPremium && !isOneTimePass && <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">CURRENT</div>}
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-gray-900">Basic Member</h4>
                    <span className="font-bold text-gray-900">₦0</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Limited gym access. Ideal for beginners.</p>
                  {(isPremium || isOneTimePass) && (
                    <button 
                      onClick={handleDowngrade} 
                      disabled={isProcessing}
                      className="w-full py-2 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      {isProcessing ? 'Processing...' : 'Downgrade to Basic'}
                    </button>
                  )}
                </div>

                {paymentType === 'monthly' ? (
                  /* Pro Plan (Monthly) */
                  <div className={`p-4 border rounded-xl relative ${isPremium ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    {isPremium && <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">CURRENT</div>}
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-gray-900">Pro Member</h4>
                      <span className="font-bold text-gray-900">₦25,000/mo</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Unlimited access, premium features, and 2 PT sessions/mo.</p>
                    {!isPremium && (
                      <button 
                        onClick={() => handleUpgrade('monthly')}
                        disabled={isProcessing}
                        className="w-full py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors text-sm"
                      >
                        {isProcessing ? 'Processing...' : 'Upgrade to Pro'}
                      </button>
                    )}
                  </div>
                ) : (
                  /* One-Time Pass */
                  <div className={`p-4 border rounded-xl relative ${isOneTimePass ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    {isOneTimePass && <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">CURRENT</div>}
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-gray-900">Day Pass</h4>
                      <span className="font-bold text-gray-900">₦500</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Valid for a single gym visit. Expires after 1 QR code scan.</p>
                    {!isOneTimePass && (
                      <button 
                        onClick={() => handleUpgrade('one-time')}
                        disabled={isProcessing || isPremium}
                        className="w-full py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? 'Processing...' : isPremium ? 'Already Pro Member' : 'Buy Day Pass'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
