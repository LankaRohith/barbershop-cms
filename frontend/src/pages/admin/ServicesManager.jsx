import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Scissors } from 'lucide-react';
import { getAdminServices, createService, updateService, deleteService } from '../../api';
import AdminLayout from './AdminLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useToast } from '../../hooks/useToast.jsx';

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { addToast, ToastContainer } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    duration_minutes: 30,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getAdminServices();
      setServices(response.data);
    } catch (error) {
      addToast('Failed to load services', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await createService({
        ...formData,
        price: parseFloat(formData.price),
      });
      addToast('Service added successfully');
      setShowAddForm(false);
      setFormData({ name: '', price: '', description: '', duration_minutes: 30 });
      fetchServices();
    } catch (error) {
      addToast('Failed to add service', 'error');
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      await updateService(id, updates);
      addToast('Service updated');
      setEditingId(null);
      fetchServices();
    } catch (error) {
      addToast('Failed to update service', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to deactivate this service?')) return;
    try {
      await deleteService(id);
      addToast('Service deactivated');
      fetchServices();
    } catch (error) {
      addToast('Failed to deactivate service', 'error');
    }
  };

  if (loading) return <AdminLayout><LoadingSpinner /></AdminLayout>;

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-white flex items-center gap-3">
            <Scissors className="w-8 h-8 text-barber-gold" />
            Services
          </h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Service
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <form onSubmit={handleAdd} className="card mb-6">
            <h3 className="font-medium text-white mb-4">Add New Service</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Service name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input"
                required
              />
              <input
                type="number"
                placeholder="Price ($)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="input"
                required
                step="0.01"
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input md:col-span-2"
                required
              />
              <input
                type="number"
                placeholder="Duration (minutes)"
                value={formData.duration_minutes}
                onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
                className="input"
                required
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">Save</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        )}

        {/* Services Table */}
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-barber-700">
              <tr>
                <th className="px-4 py-3 text-left text-white font-medium">Name</th>
                <th className="px-4 py-3 text-left text-white font-medium">Price</th>
                <th className="px-4 py-3 text-left text-white font-medium">Duration</th>
                <th className="px-4 py-3 text-left text-white font-medium">Status</th>
                <th className="px-4 py-3 text-right text-white font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-barber-700">
              {services.map((service) => (
                <tr key={service._id} className={!service.is_active ? 'opacity-50' : ''}>
                  <td className="px-4 py-3">
                    {editingId === service._id ? (
                      <input
                        type="text"
                        value={service.name}
                        onChange={(e) => setServices(services.map(s => 
                          s._id === service._id ? { ...s, name: e.target.value } : s
                        ))}
                        className="input w-full"
                      />
                    ) : (
                      <div>
                        <p className="text-white font-medium">{service.name}</p>
                        <p className="text-gray-400 text-sm">{service.description}</p>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white">
                    {editingId === service._id ? (
                      <input
                        type="number"
                        value={service.price}
                        onChange={(e) => setServices(services.map(s => 
                          s._id === service._id ? { ...s, price: parseFloat(e.target.value) } : s
                        ))}
                        className="input w-24"
                        step="0.01"
                      />
                    ) : (
                      `$${service.price.toFixed(2)}`
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{service.duration_minutes} min</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      service.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {service.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {editingId === service._id ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleUpdate(service._id, { name: service.name, price: service.price })}
                          className="text-green-400 hover:text-green-300"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingId(service._id)}
                          className="text-gray-400 hover:text-barber-gold"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ServicesManager;
