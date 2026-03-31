import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Users, User } from 'lucide-react';
import { getAdminEmployees, createEmployee, updateEmployee, deleteEmployee } from '../../api';
import AdminLayout from './AdminLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useToast } from '../../hooks/useToast.jsx';

const EmployeesManager = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { addToast, ToastContainer } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    role: 'Barber',
    bio: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getAdminEmployees();
      setEmployees(response.data);
    } catch (error) {
      addToast('Failed to load employees', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      addToast('Please enter employee name', 'error');
      return;
    }
    try {
      await createEmployee(formData);
      addToast('Employee added successfully');
      setShowAddForm(false);
      setFormData({ name: '', role: 'Barber', bio: '' });
      fetchEmployees();
    } catch (error) {
      console.error('Error creating employee:', error.response?.data);
      addToast('Failed to add employee', 'error');
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      await updateEmployee(id, updates);
      addToast('Employee updated');
      setEditingId(null);
      fetchEmployees();
    } catch (error) {
      addToast('Failed to update employee', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to deactivate this employee?')) return;
    try {
      await deleteEmployee(id);
      addToast('Employee deactivated');
      fetchEmployees();
    } catch (error) {
      addToast('Failed to deactivate employee', 'error');
    }
  };

  if (loading) return <AdminLayout><LoadingSpinner /></AdminLayout>;

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-barber-gold" />
            Employees
          </h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Employee
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <form onSubmit={handleAdd} className="card mb-6">
            <h3 className="font-medium text-white mb-4">Add New Employee</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input"
                required
              />
              <input
                type="text"
                placeholder="Role (e.g. Senior Barber)"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="input"
              />
              <textarea
                placeholder="Bio / Description"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="input md:col-span-2"
                rows="3"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">Save</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        )}

        {/* Employees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div key={employee._id} className={`card ${!employee.is_active ? 'opacity-50' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-full bg-barber-700 flex items-center justify-center">
                  {employee.image_url ? (
                    <img src={employee.image_url} alt={employee.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-barber-gold" />
                  )}
                </div>
                <div className="flex gap-2">
                  {editingId === employee._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(employee._id, { name: employee.name, role: employee.role, bio: employee.bio })}
                        className="text-green-400 hover:text-green-300"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button onClick={() => setEditingId(null)} className="text-red-400 hover:text-red-300">
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingId(employee._id)}
                        className="text-gray-400 hover:text-barber-gold"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(employee._id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {editingId === employee._id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={employee.name}
                    onChange={(e) => setEmployees(employees.map(emp => 
                      emp._id === employee._id ? { ...emp, name: e.target.value } : emp
                    ))}
                    className="input w-full"
                  />
                  <input
                    type="text"
                    value={employee.role}
                    onChange={(e) => setEmployees(employees.map(emp => 
                      emp._id === employee._id ? { ...emp, role: e.target.value } : emp
                    ))}
                    className="input w-full"
                  />
                  <textarea
                    value={employee.bio || ''}
                    onChange={(e) => setEmployees(employees.map(emp => 
                      emp._id === employee._id ? { ...emp, bio: e.target.value } : emp
                    ))}
                    className="input w-full"
                    rows="2"
                  />
                </div>
              ) : (
                <>
                  <h3 className="font-display text-xl font-bold text-white">{employee.name}</h3>
                  <p className="text-barber-gold mb-2">{employee.role}</p>
                  {employee.bio && <p className="text-gray-400 text-sm">{employee.bio}</p>}
                  <div className="mt-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      employee.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {employee.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default EmployeesManager;
