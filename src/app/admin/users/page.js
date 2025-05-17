import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../lib/auth-context';
import AuthGuard from '../../../components/AuthGuard';

export default function UserManagement() {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    setUsers([
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@whataboutdinner.food',
        role: 'admin',
        createdAt: '2025-01-15'
      },
      {
        id: '2',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        createdAt: '2025-02-20'
      },
      {
        id: '3',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user',
        createdAt: '2025-03-10'
      }
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = () => {
    setIsLoading(true);
    // In production, this would be an API call
    setTimeout(() => {
      const userToAdd = {
        ...newUser,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setUsers(prev => [...prev, userToAdd]);
      setNewUser({
        name: '',
        email: '',
        password: '',
        role: 'user'
      });
      setIsLoading(false);
    }, 500);
  };

  const handleEditUser = (id) => {
    const userToEdit = users.find(user => user.id === id);
    setNewUser({
      name: userToEdit.name,
      email: userToEdit.email,
      password: '',
      role: userToEdit.role
    });
    setEditingId(id);
  };

  const handleUpdateUser = () => {
    setIsLoading(true);
    // In production, this would be an API call
    setTimeout(() => {
      setUsers(prev => 
        prev.map(user => 
          user.id === editingId ? { 
            ...user, 
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            ...(newUser.password ? { password: newUser.password } : {})
          } : user
        )
      );
      setNewUser({
        name: '',
        email: '',
        password: '',
        role: 'user'
      });
      setEditingId(null);
      setIsLoading(false);
    }, 500);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setIsLoading(true);
      // In production, this would be an API call
      setTimeout(() => {
        setUsers(prev => prev.filter(user => user.id !== id));
        setIsLoading(false);
      }, 500);
    }
  };

  // Admin dashboard content
  const AdminContent = () => {
    // Check if user has admin privileges
    if (!isAdmin()) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          You do not have administrator privileges.
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">User Management</h1>
          <button
            onClick={() => router.push('/admin')}
            className="btn-secondary"
          >
            Back to Dashboard
          </button>
        </div>
        
        {/* User Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit User' : 'Add New User'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password {editingId && '(leave blank to keep current)'}
              </label>
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                className="input-field"
                {...(!editingId && { required: true })}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Role
              </label>
              <select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            {editingId ? (
              <>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setNewUser({
                      name: '',
                      email: '',
                      password: '',
                      role: 'user'
                    });
                  }}
                  className="btn-secondary mr-2"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateUser}
                  className="btn-primary"
                  disabled={isLoading || !newUser.name || !newUser.email}
                >
                  {isLoading ? 'Updating...' : 'Update User'}
                </button>
              </>
            ) : (
              <button
                onClick={handleAddUser}
                className="btn-primary"
                disabled={isLoading || !newUser.name || !newUser.email || !newUser.password}
              >
                {isLoading ? 'Adding...' : 'Add User'}
              </button>
            )}
          </div>
        </div>
        
        {/* User List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User List</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {user.createdAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={user.role === 'admin' && users.filter(u => u.role === 'admin').length === 1}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <AuthGuard
          fallback={
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
              <p className="mb-4">You must be logged in as an administrator to access this page.</p>
              <button
                onClick={() => router.push('/login')}
                className="btn-primary w-full"
              >
                Log In
              </button>
            </div>
          }
        >
          <AdminContent />
        </AuthGuard>
      </div>
    </div>
  );
}
