import React, { useState, useEffect } from 'react';
import { Search, Plus, Star, Users, Briefcase, Edit, Trash2, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getAllTrainers, updateTrainer, deleteTrainer } from '../../services/trainerService';

const TrainersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const data = await getAllTrainers();
      setTrainers(data);
    } catch {
      toast.error('Failed to load trainers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTrainers(); }, []);

  const filteredTrainers = trainers.filter(trainer =>
    (trainer.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (trainer.specialty || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (trainer) => {
    setEditModal({
      uid: trainer.uid,
      name: trainer.name || '',
      email: trainer.email || '',
      phone: trainer.phone || '',
      specialty: trainer.specialty || '',
      status: trainer.status || 'active',
    });
  };

  const handleEditSave = async () => {
    if (!editModal) return;
    setSaving(true);
    try {
      await updateTrainer(editModal.uid, {
        name: editModal.name,
        phone: editModal.phone,
        specialty: editModal.specialty,
        status: editModal.status,
      });
      toast.success('Trainer updated');
      setEditModal(null);
      await fetchTrainers();
    } catch {
      toast.error('Failed to update trainer');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    setSaving(true);
    try {
      await deleteTrainer(deleteModal.uid);
      toast.success('Trainer removed');
      setDeleteModal(null);
      await fetchTrainers();
    } catch {
      toast.error('Failed to delete trainer');
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name) => (name || '?').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trainer Management</h1>
          <p className="text-gray-500">Manage trainers and their schedules</p>
        </div>
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
        <div className="text-sm text-gray-500">{filteredTrainers.length} trainer{filteredTrainers.length !== 1 ? 's' : ''}</div>
      </div>

      {/* Trainers Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : filteredTrainers.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 text-center">
          <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No trainers found</p>
          <p className="text-gray-400 text-sm mt-1">Trainers will appear here once they register with a trainer role.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTrainers.map((trainer) => (
            <div key={trainer.uid} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow relative group">
              {/* Actions */}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(trainer)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit size={16} />
                </button>
                <button onClick={() => setDeleteModal(trainer)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="w-24 h-24 rounded-full bg-orange-100 mb-4 flex items-center justify-center text-orange-600 text-2xl font-semibold">
                {getInitials(trainer.name)}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1">{trainer.name}</h3>
              <span className="text-sm text-gray-500 mb-4">{trainer.specialty || 'General'}</span>

              <div className="w-full grid grid-cols-2 gap-2 py-4 border-t border-b border-gray-100 mb-4">
                <div className="flex flex-col items-center">
                  <Briefcase size={16} className="text-purple-500 mb-1" />
                  <span className="text-xs text-gray-500">Status</span>
                  <span className={`text-xs font-medium ${trainer.status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
                    {trainer.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Star size={16} className="text-yellow-500 mb-1" />
                  <span className="text-xs text-gray-500">Email</span>
                  <span className="text-xs font-medium text-gray-700 truncate w-full">{trainer.email}</span>
                </div>
              </div>

              <button onClick={() => handleEdit(trainer)} className="w-full py-2 px-4 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setEditModal(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Edit Trainer</h2>
              <button onClick={() => setEditModal(null)} className="p-1 text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
                <input type="text" value={editModal.name} onChange={(e) => setEditModal({ ...editModal, name: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                <input type="email" value={editModal.email} disabled className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Phone</label>
                <input type="tel" value={editModal.phone} onChange={(e) => setEditModal({ ...editModal, phone: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Specialty</label>
                  <input type="text" value={editModal.specialty} onChange={(e) => setEditModal({ ...editModal, specialty: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Status</label>
                  <select value={editModal.status} onChange={(e) => setEditModal({ ...editModal, status: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditModal(null)} className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleEditSave} disabled={saving} className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {saving && <Loader2 size={16} className="animate-spin" />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setDeleteModal(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="text-red-600" size={24} />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-900">Delete Trainer</h2>
              <p className="text-sm text-gray-500 mt-1">Remove <span className="font-medium text-gray-700">{deleteModal.name}</span> from the system? This cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleDelete} disabled={saving} className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {saving && <Loader2 size={16} className="animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainersPage;
