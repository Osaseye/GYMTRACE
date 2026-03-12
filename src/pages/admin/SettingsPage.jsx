import React, { useState, useEffect } from 'react';
import { Save, Building, Mail, Phone, Lock, CreditCard, AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getSettings, saveSettings } from '../../services/settingsService';

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [formData, setFormData] = useState({
    gymName: '',
    email: '',
    phone: '',
    basicPrice: 0,
    premiumPrice: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSettings();
        if (data) {
          setFormData({
            gymName: data.gymName || '',
            email: data.email || '',
            phone: data.phone || '',
            basicPrice: data.basicPrice ?? 0,
            premiumPrice: data.premiumPrice ?? 0,
          });
          setMaintenanceMode(data.maintenanceMode || false);
        }
      } catch {
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSettings({
        ...formData,
        basicPrice: Number(formData.basicPrice),
        premiumPrice: Number(formData.premiumPrice),
        maintenanceMode,
      });
      toast.success('Settings saved successfully!');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const toggleMaintenance = async () => {
    const next = !maintenanceMode;
    setMaintenanceMode(next);
    try {
      await saveSettings({ maintenanceMode: next });
      toast.info(`Maintenance mode ${next ? 'enabled' : 'disabled'}`);
    } catch {
      setMaintenanceMode(!next);
      toast.error('Failed to update maintenance mode');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Global Settings</h1>
          <p className="text-gray-500">Configure application preferences</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving || loading}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save size={20} />
          )}
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* General Information */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm md:col-span-2">
          <div className="flex items-center gap-2 mb-6 text-gray-900 font-semibold border-b border-gray-100 pb-2">
            <Building size={20} className="text-blue-500" />
            General Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Gym Name</label>
              <input
                type="text"
                name="gymName"
                value={formData.gymName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Support Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Membership Prices */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-gray-900 font-semibold border-b border-gray-100 pb-2">
            <CreditCard size={20} className="text-green-500" />
            Membership Pricing
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Basic Plan ($/month)</label>
              <input
                type="number"
                step="0.01"
                name="basicPrice"
                value={formData.basicPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Premium Plan ($/month)</label>
              <input
                type="number"
                step="0.01"
                name="premiumPrice"
                value={formData.premiumPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* System & Maintenance */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-gray-900 font-semibold border-b border-gray-100 pb-2">
            <Lock size={20} className="text-orange-500" />
            System Control
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Maintenance Mode</div>
                <div className="text-xs text-gray-500">Disable access for all users</div>
              </div>
              <button 
                type="button"
                onClick={toggleMaintenance}
                className={`p-1 rounded-full w-12 transition-colors ${maintenanceMode ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${maintenanceMode ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 flex gap-3">
              <AlertTriangle className="text-orange-600 flex-shrink-0" size={20} />
              <div className="text-sm text-orange-800">
                <span className="font-semibold block mb-1">Warning Zone</span>
                Make sure to backup the database before enabling maintenance mode.
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default SettingsPage;
